import { useWeatherContext } from "@/contexts/weather-context";
import { getTimeZone, temperatureChangeC } from "@/utils";
import React, { useMemo } from "react";
import {
  FaEarthAsia,
  FaEarthOceania,
  FaTemperatureThreeQuarters,
} from "react-icons/fa6";
import { MdVisibility } from "react-icons/md";
import { PiSunHorizonFill, PiSunHorizonLight } from "react-icons/pi";
import { TiWaves } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";

const WeatherHighlights = () => {
  const { weather, air } = useWeatherContext();
  const weatherDetail = useMemo(() => {
    const sun = [
      {
        title: "Sunrise",
        icon: <PiSunHorizonLight />,
        value:
          weather &&
          getTimeZone(
            weather?.sys?.sunrise as number,
            weather?.timezone as number
          ),
      },
      {
        title: "Sunset",
        icon: <PiSunHorizonFill />,
        value:
          weather &&
          getTimeZone(
            weather?.sys?.sunset as number,
            weather?.timezone as number
          ),
      },
    ];
    const level = [
      {
        title: "Sea level",
        icon: <FaEarthOceania />,
        value: weather?.main?.sea_level,
        util: "hPa",
      },
      {
        title: "Grnd level",
        icon: <FaEarthAsia />,
        value: weather?.main?.grnd_level,
        util: "hPa",
      },
    ];
    const list = [
      {
        title: "Humidity",
        icon: <WiHumidity />,
        value: weather?.main?.humidity,
        util: "%",
      },
      {
        title: "Pressure",
        icon: <TiWaves />,
        value: weather?.main?.pressure,
        util: "hPa",
      },
      {
        title: "Visibility",
        icon: <MdVisibility />,
        value: weather?.visibility && Math.round(weather?.visibility / 1000),
        util: "km",
      },
      {
        title: "Feels like",
        icon: <FaTemperatureThreeQuarters />,
        value:
          weather?.main?.feels_like &&
          temperatureChangeC(weather?.main?.feels_like as number),
        util: "<sup>o</sup>",
      },
    ];

    return {
      sun,
      level,
      list,
    };
  }, [weather]);

  return (
    <div className="rounded bg-white p-4 shadow space-y-4">
      <div className="font-medium">Todays Highlights</div>
      {/* air */}
      <div className="bg-gray-50 rounded p-4">
        <div className="text-xs text-gray-500 mb-4">Air Quality index</div>
        <div className="grid gap-4 grid-cols-4 lg:grid-cols-8">
          {air?.list?.[0]?.components &&
            Object.entries(air?.list?.[0]?.components)?.map(([key, value]) => (
              <div key={key}>
                <div className="text-xs text-gray-500 mb-2">{key}</div>
                <div className="font-medium text-base">{value.toFixed(1)}</div>
              </div>
            ))}
        </div>
      </div>
      {/* sun and level */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* sun */}
        <div className="bg-gray-50 rounded p-4">
          <div className="text-gray-500 text-xs mb-4">Sunrise & Sunset</div>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
            {weatherDetail.sun.map((item) => (
              <div key={item.title}>
                <div className="text-gray-500 text-xs mb-2">{item.title}</div>
                <div className="flex items-center justify-between">
                  <div className="text-xl">{item.icon}</div>
                  <div className="font-medium text-base">
                    <span>{item.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* level */}
        <div className="bg-gray-50 rounded p-4">
          <div className="text-gray-500 text-xs mb-4">
            Sea level & Grnd level
          </div>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
            {weatherDetail.level.map((item) => (
              <div key={item.title}>
                <div className="text-gray-500 text-xs mb-2">{item.title}</div>
                <div className="flex items-center justify-between">
                  <div className="text-xl">{item.icon}</div>
                  <div className="font-medium text-base">
                    <span>{item.value}</span>
                    <span
                      dangerouslySetInnerHTML={{ __html: item.util }}
                    ></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* list */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {weatherDetail.list.map((item) => (
          <div key={item.title} className="bg-gray-50 rounded p-4">
            <div className="text-gray-500 text-xs mb-2">{item.title}</div>
            <div className="flex items-center justify-between">
              <div className="text-xl">{item.icon}</div>
              <div className="font-medium text-base">
                <span>{item.value}</span>
                <span dangerouslySetInnerHTML={{ __html: item.util }}></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherHighlights;
