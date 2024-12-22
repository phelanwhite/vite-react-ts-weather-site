import Loader from "@/components/loader";
import {
  airWeatherApi,
  currentWeatherApi,
  forecastWeatherApi,
} from "@/services/opwm.api";
import { AirType, LocationType, WeatherHourType, WeatherType } from "@/types";
import { useQuery } from "@tanstack/react-query";
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
    queryFn: async () => await currentWeatherApi(location),
  });
  const getForecastResult = useQuery({
    queryKey: ["forecast", location],
    queryFn: async () => await forecastWeatherApi(location),
  });
  const getAirResult = useQuery({
    queryKey: ["air", location],
    queryFn: async () => await airWeatherApi(location),
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
