import { useWeatherContext } from "@/contexts/weather-context";
import { getIconWeather, temperatureChangeC } from "@/utils";
import React, { memo, useMemo } from "react";

const WeatherForecast = () => {
  const { weathers } = useWeatherContext();
  const weatherList = useMemo(() => {
    return weathers?.filter((item, index) => index % 8 === 0);
  }, [weathers]);
  return (
    <div className="rounded bg-white p-4 shadow">
      <div className="font-medium mb-4">5 day forecast</div>
      <div>
        {weatherList?.map((item) => (
          <div
            key={item?.dt}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              <div>
                <img
                  src={getIconWeather(item?.weather?.[0]?.icon)}
                  loading="lazy"
                  alt=""
                />
              </div>
              <div>
                {temperatureChangeC(item?.main?.temp)}
                <sup>o</sup>
              </div>
            </div>
            <div className="text-secondary text-xs">
              {Intl.DateTimeFormat("en-GB", { day: "numeric" }).format(
                new Date(item?.dt_txt)
              )}{" "}
              {Intl.DateTimeFormat("en-GB", { month: "short" }).format(
                new Date(item?.dt_txt)
              )}
            </div>
            <div className="text-secondary text-xs">
              {Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(
                new Date(item?.dt_txt)
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(WeatherForecast);
