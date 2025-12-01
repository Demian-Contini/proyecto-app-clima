import { useState } from "react";
import "./WeatherApp.css";



export const WeatherApp = () => {
  
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)


  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  // Ponemos la URL hasta 'weatrher' lo que le sigue es todo dinamico
  const API_KEY = '21e2816742d266b46510619a21e9f3ef' // Key
  const diffKelvin = 273.15 // Cambio a grados Celsious
  
  const fetchWeatherData = async() => {
  
    try {
  
      const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
    // Backticks con Alt Gr + }       (el que es paa comentar con Shift)
      const data = await response.json()
      console.log(data)
      setWeatherData(data)

} catch (error) {
  console.error('Ha Ocurrido un error: ',{error})
}

  }


  const handleCityChange = (event) => {
    setCity (event.target.value)
    // Evento que nos manda 'onChange = {handleCityChange}'
  }

  const handleSubmit = (event) => {
      event.preventDefault()
      fetchWeatherData()
}

    return (
    
    <div className = "container">

    <h1>Aplicación del clima actual</h1>

    <form onSubmit={handleSubmit}>
        
        <input 
        type="text" 
        placeholder = "Ingresa una ciudad"
        value={city}
        onChange={handleCityChange}
        />


        <button type = "submit"> Buscar </button>

    </form>

    {
      weatherData && (

        <div>
          <h2>
            {weatherData.name}, 
            {weatherData.sys.country}, 
        </h2>
        <p>
              Temperatura Actual: {Math.floor(weatherData.main.temp - diffKelvin)}°C
        </p>
        <p>
              Condición Meteorológica: {weatherData.weather[0].description}
        </p>
        <img 
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
              alt={weatherData.weather[0].description} />
        </div>

      )
    }

    </div>
    
  )
}
