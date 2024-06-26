import "./App.css";
import Forecast from "./Weather";

const App = () => {
  // previous html part is now written inside the return method
  return (
    <div className="container">
      <select id="city-list">
        <option>Select a city...</option>
        {/* City options will be dynamically added here in Forecast component */}
      </select>
      {/* Button to trigger the weather fetch for the selected city */}
      <button id="get-weather-btn">Get Weather</button>

      {/* Container to display the current weather */}
      <div>
        <h2 className="title">Current Weather</h2>
        <div id="current-weather"></div>
      </div>

      {/* Container to display the 7-day weather forecast */}
      <div>
        <h2 className="title">7-Day Forecast</h2>
        <div id="forecast"></div>
      </div>

      {/* We call the Forecast component that was our js code -it's now a jsx component- */}
      <Forecast />
    </div>
  );
};

export default App;
