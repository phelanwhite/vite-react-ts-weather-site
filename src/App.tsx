import React from "react";
import WeatherDetail from "./components/WeatherDetail";
import WeatherForecast from "./components/WeatherForecast";
import WeatherHighlights from "./components/WeatherHighlights";
import WeatherHours from "./components/WeatherHours";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Header />
      <div className="my-4 max-w-[1332px] px-4 mx-auto flex flex-col md:flex-row items-start gap-6">
        <div className="md:max-w-[300px] w-full space-y-6">
          <WeatherDetail />
          <WeatherForecast />
        </div>
        <div className="w-full overflow-hidden space-y-6">
          <WeatherHighlights />
          <WeatherHours />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
