import { useQuery } from "@tanstack/react-query";
import { useWeatherListContext } from "@/contexts/weather-list-context";
import { memo, useEffect } from "react";
import WeatherItem from "./WeatherItem";
import ButtonCurrentLocation from "./ButtonCurrentLocation";
import { MdClose } from "react-icons/md";
import { currentWeatherApi } from "@/services/opwm.api";
import { WeatherType } from "@/types";
import Loader from "./loader";
type Type = {
  isOpen?: boolean;
  onClose: () => void;
};
const SidebarLeft = ({ isOpen, onClose }: Type) => {
  const { locations } = useWeatherListContext();

  const getWeathersResult = useQuery({
    queryKey: ["weather", "saved", locations],
    queryFn: async () => {
      const weathers = await Promise.all(
        locations.map((location) => currentWeatherApi(location))
      );
      return weathers as WeatherType[];
    },
    enabled: !!isOpen,
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
      {getWeathersResult.isLoading && <Loader />}
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
            {getWeathersResult.data?.map((data) => {
              return (
                <WeatherItem key={data?.id} data={data} onClose={onClose} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(SidebarLeft);
