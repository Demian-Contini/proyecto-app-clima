import "./WeatherApp.css";


export const WeatherApp = () => {
  
  
  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  // Ponemos la URL hasta 'weatrher' lo que le sigue es todo dinamico
  const API_KEY = '21e2816742d266b46510619a21e9f3ef' // Key
  const diffKelvin = 273.15 // Cambio a grados Celsious
  
  
const handleSubmit = (event) => {

  event.preventDefault()
  console.log('Hola Mundo')
}

    return (
    
    <div className = "container">

    <h1>Aplicación del clima actual</h1>

    <form onSubmit={handleSubmit}>
        
        <input type="text" placeholder = "Ingresa una ciudad"/>
        <button type = "submit"> Buscar </button>

    </form>

    </div>
    
  )
}
