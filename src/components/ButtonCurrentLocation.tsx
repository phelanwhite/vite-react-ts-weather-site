import { useWeatherContext } from "@/contexts/weather-context";
import React, { memo } from "react";
import { MdMyLocation } from "react-icons/md";

const ButtonCurrentLocation = () => {
  const { setLocation } = useWeatherContext();

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      setLocation({
        lat: latitude,
        lon: longitude,
      });
    });
  };

  return (
    <button
      onClick={handleCurrentLocation}
      className="flex items-center gap-1 px-4 py-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white"
    >
      <MdMyLocation />
      <span className="text-xs">Current Location</span>
    </button>
  );
};

export default memo(ButtonCurrentLocation);
