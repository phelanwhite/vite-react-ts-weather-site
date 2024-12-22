import { useQueries } from "@tanstack/react-query";
import { useWeatherListContext } from "@/contexts/weather-list-context";
import ENV_CONFIG from "@/configs/env.config";
import axios from "axios";
import { memo, useEffect } from "react";
import WeatherItem from "./WeatherItem";
import ButtonCurrentLocation from "./ButtonCurrentLocation";
import { MdClose } from "react-icons/md";
type Type = {
  isOpen?: boolean;
  onClose: () => void;
};
const SidebarLeft = ({ isOpen, onClose }: Type) => {
  const { locations } = useWeatherListContext();

  const getWeathersResult = useQueries({
    queries: locations.map(({ lat, lon, _id }) => ({
      queryKey: ["weather", lat, lon],
      queryFn: async () => {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ENV_CONFIG.OPWM}`
        );
        return { _id, ...response.data };
      },
      enabled: !!isOpen,
    })),
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return <></>;
  return (
    <>
      <div className="bg-black/50 fixed z-10 inset-0 top-0 left-0 right-0 bottom-0">
        <div
          onClick={onClose}
          className="-z-10 absolute inset-0 top-0 left-0 right-0 bottom-0"
        ></div>
        <div className="p-4 shadow bg-white h-screen overflow-y-auto w-full sm:w-[640px]">
          <div className="flex items-center justify-between gap-8 mb-4">
            <div className="font-medium">Weather Saved List</div>
            <div className="flex items-center gap-2">
              <div onClick={onClose}>
                <ButtonCurrentLocation />
              </div>
              <button
                onClick={onClose}
                className="hover:bg-gray-100 rounded-full p-1"
              >
                <MdClose size={20} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {getWeathersResult?.map((weather, index) => {
              return (
                <WeatherItem
                  key={index}
                  weather={weather.data}
                  onClose={onClose}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(SidebarLeft);
