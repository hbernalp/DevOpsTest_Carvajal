import React, { useState } from 'react'

import Climaform from "./components/Climaform"
import Climadatos from './components/Climadatos';


function App() {
  const [weatherData, setWeatherData] = useState([]);

  // Función que se pasará al formulario para recibir los datos del clima
  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="text-2xl font-bold text-center mb-6">
        Consulta el Clima - Usando la API de openweathermap.org
      </h2>
      
      {/* Formulario para ingresar ciudades */}
      <Climaform onWeatherDataReceived={handleWeatherData} />
      
      {/* Componente para mostrar los resultados */}
      <Climadatos weatherData={weatherData} />
    </div>
  );
}

export default App;
