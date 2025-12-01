import { useState } from "react";
import "./WeatherApp.css";

export const WeatherApp = () => {
    
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)
    // Estado Para manejar el estado de carga
    const [isLoading, setIsLoading] = useState(false)
    // Estado Para guardar el mensaje de error
    const [errorMsg, setErrorMsg] = useState(null)


    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '21e2816742d266b46510619a21e9f3ef'
    const diffKelvin = 273.15
    
    const fetchWeatherData = async() => {
        // INICIO DE CARGA: Activar isLoading al empezar la petición
        setIsLoading(true);
        // Limpiar cualquier estado anterior al inicio de una nueva búsqueda
        setErrorMsg(null); 
        setWeatherData(null); 

        try {
            
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
            
            // MANEJO DE ERROR HTTP (Ej: 404 Not Found)
            if (!response.ok) {
                // Si hay un error HTTP, establece el mensaje de error
                if (response.status === 404) {
                    setErrorMsg(`Ciudad "${city}" no encontrada. Intenta con otro nombre.`);
                } else {
                    setErrorMsg(`Error de servidor (${response.status}). Intenta de nuevo.`);
                }
                
                // Lanza el error para que caiga en el bloque catch
                throw new Error('Ciudad no encontrada, pruebe con otra!'); 
            }

            const data = await response.json()
            console.log(data)
            setWeatherData(data)

        } catch (error) {
            console.error('Ha Ocurrido un error: ', error)
            // Si no hay un error específico de HTTP, muestra un error genérico (ej: red)
            if (!errorMsg) {
                setErrorMsg('Error de conexión. Revisa tu internet o la URL.');
            }
            
        } finally {
            // FIN DE CARGA: Desactivar isLoading, sin importar el resultado
            setIsLoading(false);
        }

    }


    const handleCityChange = (event) => {
        // Al empezar a escribir, limpiamos el mensaje de error
        setErrorMsg(null); 
        setCity (event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Opcional: Validar que haya texto antes de llamar a la API
        if (city.trim().length > 0) {
            fetchWeatherData()
        } else {
            // Error si el campo está vacío
            setErrorMsg("Por favor, ingresa el nombre de una ciudad.");
        }
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


            {/* El botón no se puede presionar si isLoading es true */}
            <button type = "submit" disabled={isLoading}> 
                {isLoading ? 'Buscando...' : 'Buscar'} 
            </button>

        </form>

        {/* Muestra el mensaje de error si existe */}
        {errorMsg && (
            <div className="weather-info error-message">
                <p>{errorMsg}</p>
            </div>
        )}

        {/* ESTADO DE CARGA: Si isLoading es true, mostramos un mensaje */}
        {isLoading && (
            <div className="weather-info">
                <p>Cargando datos del clima...</p>
            </div>
        )}

        {
            // Solo muestra los resultados si NO está cargando, NO hay error Y hay datos
            !isLoading && !errorMsg && weatherData && (

                <div className = "weather-info">
                    <h2>
                        {weatherData.name}, 
                        {weatherData.sys.country}, 
                    </h2>
                    <p>
                            Temperatura Actual: {Math.floor(weatherData.main.temp - diffKelvin)}°C
                    </p>
                    <p>   Humedad: {weatherData.main.humidity}%</p>
                    <p>
                            Condición Meteorológica: {weatherData.weather[0].description}
                    </p>
                    <img 
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                            alt={weatherData.weather[0].description} />

                    <p>   Viento: {weatherData.wind.speed} m/s</p>
                </div>

            )
        }

        </div>
        
    )
}