import React from 'react';

 const Climadatos = ({ weatherData }) => {
  // Si no hay datos todavía, mostrar mensaje informativo
  if (!weatherData || weatherData.length === 0) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg text-center">
        <p>Ingresa una o más ciudades y presiona "Consultar Clima" para ver los resultados.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">Resultados del Clima</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {weatherData.map((data, index) => (
          <WeatherCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

// Componente para mostrar el clima de una ciudad individual
const WeatherCard = ({ data }) => {
  // Si hubo un error al consultar esta ciudad
  if (data.error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-700">Error: {data.cityName}</h3>
        <p className="text-red-600">{data.message}</p>
      </div>
    );
  }

  // Obtener un ícono para el clima
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <table className="w-100">
          <thead>
            <tr>
              <td>
                <div className="card border-0">
                  <div className="card-body p-0">
                    <h5 className="card-title">
                      {data.name}, {data.sys.country}
                    </h5>
                    <h2 className="display-6 my-2">
                      {Math.round(data.main.temp)}°C
                    </h2>
                    <p className="card-text text-muted text-capitalize">
                      {data.weather[0].description}
                    </p>
                    <img
                      className="img-fluid"
                      style={{ width: "64px", height: "64px" }}
                      src={iconUrl}
                      alt={data.weather[0].description}
                    />
                  </div>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="mt-3">
                  <div className="row g-2">
                    <div className="col-6">
                      <p className="text-muted small mb-1">Sensación térmica</p>
                      <p className="fw-medium">
                        {Math.round(data.main.feels_like)}°C
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted small mb-1">Humedad</p>
                      <p className="fw-medium">{data.main.humidity}%</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted small mb-1">Viento</p>
                      <p className="fw-medium">
                        {(data.wind.speed * 3.6).toFixed(1)} km/h
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted small mb-1">Presión</p>
                      <p className="fw-medium">{data.main.pressure} hPa</p>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

};
export default Climadatos;