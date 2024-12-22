import { useWeatherContext } from "@/contexts/weather-context";
import { useWeatherListContext } from "@/contexts/weather-list-context";
import { WeatherItemType } from "@/types";
import { getIconWeather, getTimeZone, temperatureChangeC } from "@/utils";
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
  const { setLocation } = useWeatherContext();

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
          onClick={() => handleRemove(data.id)}
        >
          <IoIosRemove />
        </button>
      </div>
      {/* time and location */}
      <div className="text-sm flex items-start justify-between">
        <div>
          <div className="font-medium">{data?.name}</div>
          <div className="text-xs text-gray-500">{data?.sys?.country}</div>
        </div>
        <div className="font-medium">
          {data && getTimeZone(data.dt, data.timezone)}
        </div>
      </div>
      {/* temperature and weather icon*/}
      <div className="flex items-center justify-between">
        {/* temperature */}
        <div>
          <div className="text-3xl font-medium">
            {data?.main?.temp && temperatureChangeC(data?.main?.temp as number)}
          </div>
          <div className="capitalize">{data?.weather?.[0]?.description}</div>
        </div>
        {/* icon  */}
        <div>
          <img
            src={getIconWeather(data?.weather?.[0]?.icon as string, "@2x")}
            alt={getIconWeather(data?.weather?.[0]?.icon as string, "@2x")}
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
          <span className="text-xs text-gray-500">{data?.base}</span>
        </li>
      </ul>
    </div>
  );
};

export default memo(WeatherItem);
