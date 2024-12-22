import { WeatherHourType } from "@/types";
import { getHour12, getIconWeather, temperatureChangeC } from "@/utils";
import React, { memo } from "react";

const WeatherHourItem = ({ data }: { data: WeatherHourType }) => {
  return (
    <div className="flex flex-col gap-2 items-center bg-gray-50 rounded p-2">
      <div className="text-xs text-gray-500">
        {getHour12(new Date(data?.dt_txt))}
      </div>
      <div>
        <img
          src={getIconWeather(data?.weather?.[0]?.icon)}
          alt={getIconWeather(data?.weather?.[0]?.icon)}
          loading="lazy"
        />
      </div>
      <div className="font-medium">
        {temperatureChangeC(data?.main?.temp)}
        <sup>o</sup>
      </div>
    </div>
  );
};

export default memo(WeatherHourItem);
