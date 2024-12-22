import React, { memo, useState } from "react";
import SearchInput from "./SearchInput";
import { MdAddLocationAlt } from "react-icons/md";
import { useWeatherContext } from "@/contexts/weather-context";
import { Link } from "react-router-dom";
import { useWeatherListContext } from "@/contexts/weather-list-context";
import { PiListBold } from "react-icons/pi";
import SidebarLeft from "./SidebarLeft";
import ButtonCurrentLocation from "./ButtonCurrentLocation";

const Header = () => {
  const { location } = useWeatherContext();

  const { handleAdd } = useWeatherListContext();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="z-10 py-2 bg-white shadow sticky top-0 left-0 right-0">
        <div className="max-w-[1332px] px-4 mx-auto flex gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link className="text-xl font-medium text-blue-500" to={`/`}>
              Weather
            </Link>
            <SearchInput />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                handleAdd(location);
              }}
            >
              <MdAddLocationAlt size={20} />
            </button>
            <div className="hidden md:block">
              <ButtonCurrentLocation />
            </div>
            <button onClick={() => setIsOpen(true)}>
              <PiListBold size={20} />
            </button>
          </div>
        </div>
      </div>
      <SidebarLeft isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default memo(Header);
