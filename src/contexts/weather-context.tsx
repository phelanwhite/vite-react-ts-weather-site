import Loader from "@/components/loader";
import ENV_CONFIG from "@/configs/env.config";
import { AirType, LocationType, WeatherHourType, WeatherType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

type WeatherContextType = {
  weather: WeatherType | null;
  air: AirType | null;
  weathers: WeatherHourType[];
  location: LocationType;
  setLocation: (location: LocationType) => void;
};

const WeatherContext = React.createContext<WeatherContextType>({
  weather: null,
  weathers: [],
  air: null,
  location: {
    lat: 0,
    lon: 0,
  },
  setLocation: () => {},
});

export const WeatherProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState<LocationType>(() => {
    const savedLocation = localStorage.getItem("weather");
    if (savedLocation) {
      return JSON.parse(savedLocation);
    }
    return { lat: 0, lon: 0 };
  });

  const getWeatherResult = useQuery({
    queryKey: ["weather", location],
    queryFn: async () => {
      const response = await axios.get(`
          https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${ENV_CONFIG.OPWM}
  `);
      return response.data;
    },
  });
  const getForecastResult = useQuery({
    queryKey: ["forecast", location],
    queryFn: async () => {
      const response = await axios.get(`
          https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${ENV_CONFIG.OPWM}
  `);
      return response.data;
    },
  });
  const getAirResult = useQuery({
    queryKey: ["air", location],
    queryFn: async () => {
      const response = await axios.get(`
          http://api.openweathermap.org/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${ENV_CONFIG.OPWM}
  `);
      return response.data;
    },
  });

  useEffect(() => {
    localStorage.setItem("weather", JSON.stringify(location));
  }, [location]);

  return (
    <>
      {(getAirResult.isLoading ||
        getWeatherResult.isLoading ||
        getForecastResult.isLoading) && <Loader />}
      <WeatherContext.Provider
        value={{
          location,
          setLocation,
          weather: getWeatherResult.data,
          air: getAirResult.data,
          weathers: getForecastResult.data?.list || [],
        }}
      >
        {children}
      </WeatherContext.Provider>
    </>
  );
};

export const useWeatherContext = () => React.useContext(WeatherContext);
