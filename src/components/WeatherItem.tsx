import { useWeatherContext } from "@/contexts/weather-context";
import { useWeatherListContext } from "@/contexts/weather-list-context";
import { WeatherItemType } from "@/types";
import { getHour12, getIconWeather, temperatureChangeC } from "@/utils";
import { memo } from "react";
import toast from "react-hot-toast";
import { IoIosRemove } from "react-icons/io";
import { MdDateRange, MdLocationOn, MdMyLocation } from "react-icons/md";

const WeatherItem = ({
  data,
  onClose,
}: {
  data: WeatherItemType;
  onClose: () => void;
}) => {
  const { handleRemove } = useWeatherListContext();
  const { setLocation, weather } = useWeatherContext();

  return (
    <div className="rounded bg-white p-4 shadow">
      <div className="-ml-1 flex items-center gap-1 mb-2">
        <button
          className="p-1 hover:bg-gray-100 rounded-full"
          onClick={() => {
            setLocation({
              lat: data.coord.lat,
              lon: data.coord.lon,
            });
            toast.success(`Weather changed successfully!`);
            onClose();
          }}
        >
          <MdMyLocation />
        </button>
        <button
          className="p-1 hover:bg-gray-100 rounded-full"
          onClick={() => handleRemove(data._id)}
        >
          <IoIosRemove />
        </button>
      </div>
      {/* time and location */}
      <div className="text-sm flex items-start justify-between">
        <div>
          <div className="font-medium">{weather?.name}</div>
          <div className="text-xs text-gray-500">{weather?.sys?.country}</div>
        </div>
        <div className="font-medium">{weather && getHour12(new Date())}</div>
      </div>
      {/* temperature and weather icon*/}
      <div className="flex items-center justify-between">
        {/* temperature */}
        <div>
          <div className="text-3xl font-medium">
            {weather?.main?.temp &&
              temperatureChangeC(weather?.main?.temp as number)}
          </div>
          <div className="capitalize">{weather?.weather?.[0]?.description}</div>
        </div>
        {/* icon  */}
        <div>
          <img
            src={getIconWeather(weather?.weather?.[0]?.icon as string, "@2x")}
            alt={getIconWeather(weather?.weather?.[0]?.icon as string, "@2x")}
            loading="lazy"
          />
        </div>
      </div>
      {/* date and desc */}
      <ul className="border-t pt-2 space-y-2">
        <li className="flex items-center gap-2 capitalize">
          <MdDateRange />
          <span className="text-xs text-gray-500">
            {new Date().toDateString()}
          </span>
        </li>
        <li className="flex items-center gap-2 capitalize">
          <MdLocationOn />
          <span className="text-xs text-gray-500">{weather?.base}</span>
        </li>
      </ul>
    </div>
  );
};

export default memo(WeatherItem);
