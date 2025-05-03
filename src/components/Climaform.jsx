import React, { useState } from 'react';
import { API_KEY } from '../key';

const Climaform = ({ onWeatherDataReceived }) => {
  // Estado para almacenar los nombres de las ciudades
  const [cities, setCities] = useState({
    city1: '',
    city2: '',
    city3: ''
  });
  
  // Estado para manejar errores y carga
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCities(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para consultar el clima de una ciudad
  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`Error al buscar ${cityName}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error con la ciudad ${cityName}:`, error);
      return { error: true, message: error.message, cityName };
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Filtrar ciudades vacías
      const cityNames = Object.values(cities).filter(city => city.trim() !== '');
      
      if (cityNames.length === 0) {
        throw new Error('Por favor, ingresa al menos una ciudad');
      }
      
      // Realizar consultas para todas las ciudades
      const weatherPromises = cityNames.map(city => fetchWeatherData(city));
      const weatherResults = await Promise.all(weatherPromises);
      
      // Enviar resultados al componente padre
      onWeatherDataReceived(weatherResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <header className='header mb-4 text-center'>
            <h4 className="text-xl font-bold mb-4">Consulta el clima por ciudad</h4>
        </header>
    
        <div className="p-4 bg-gray-100 rounded-lg shadow">
            <form onSubmit={handleSubmit}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Primera Ciudad</th>
                                <th className="text-center">Segunda Ciudad</th>
                                <th className="text-center">Tercera Ciudad</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td className="text-center">
                                    <input type="text" id="city1" name="city1" value={cities.city1} onChange={handleInputChange} className="text-center w-full p-2 border rounded" />
                                </td>
                                <td className="text-center">
                                    <input type="text" id="city2" name="city2" value={cities.city2} onChange={handleInputChange} className="text-center w-full p-2 border rounded" />
                                </td>
                                <td className="text-center">
                                    <input type="text" id="city3" name="city3" value={cities.city3} onChange={handleInputChange} className="text-center w-full p-2 border rounded" />
                                </td>
                                <td>
                                <button type="submit" className="bg-orange-50 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300" disabled={loading} >
                                    {loading ? 'Consultando...' : 'Consultar Clima'}
                                </button>
                                {error && (
                                    <div className="mt-3 text-red-500">Error: {error}
                                    </div>
                                )}  
                                </td>
                            </tr>                    
                        </tbody>
                    </table>
            </form>        
        </div>


    </>
    
  );
};


export default Climaform;