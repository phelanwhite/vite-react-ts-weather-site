import ENV_CONFIG from "@/configs/env.config";
import { useWeatherContext } from "@/contexts/weather-context";
import { DirectType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useDebounce } from "use-debounce";

const SearchInput = () => {
  const { setLocation } = useWeatherContext();
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const [debounceValue] = useDebounce(search, 500);

  const getGeocodingResult = useQuery({
    queryKey: ["air", debounceValue],
    queryFn: async () => {
      const response = await axios.get(`
          https://api.openweathermap.org/geo/1.0/direct?q=${debounceValue}&limit=5&appid=${ENV_CONFIG.OPWM}
  `);
      return response.data;
    },
    enabled: !!debounceValue,
  });

  return (
    <div className="max-w-[500px] relative">
      <div className=" px-4 rounded-full bg-gray-100 flex items-center gap-2">
        <FaSearch />
        <input
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setLocation({
                lat: getGeocodingResult.data[0].lat,
                lon: getGeocodingResult.data[0].lon,
              });
              setShow(false);
            }
          }}
          value={search}
          onChange={(e) => {
            if (!show) {
              setShow(true);
            }
            setSearch(e.target.value);
          }}
          placeholder="Search for places"
          type="text"
          className="w-full py-2 bg-transparent border-none outline-none"
        />
      </div>
      {show && (
        <ul className="absolute w-full bg-white rounded shadow-lg top-full left-[0] z-10">
          {getGeocodingResult.data?.map((item: DirectType, index: number) => (
            <li
              tabIndex={index + 1}
              key={index}
              className="py-2 px-4 flex items-start gap-2 hover:bg-gray-50 cursor-pointer"
              onMouseDown={() => {
                setLocation({
                  lat: item.lat,
                  lon: item.lon,
                });
                setShow(false);
              }}
            >
              <MdLocationOn className="mt-1" size={16} />
              <div className="flex-1">
                <div className="font-normal">{item.name}</div>
                <div className="text-xs text-gray-500">
                  {item?.state && <span>{item?.state}, </span>}
                  <span>{item?.country}</span>
                </div>
              </div>
            </li>
          ))}
          {getGeocodingResult.data?.length === 0 && (
            <li className="py-2 px-4 flex items-start gap-2 hover:bg-gray-50 cursor-pointer">
              No results found
            </li>
          )}
          {getGeocodingResult.isLoading && (
            <li className="py-2 px-4 flex items-start gap-2 hover:bg-gray-50 cursor-pointer">
              Loading...
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
