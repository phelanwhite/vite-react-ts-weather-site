import { LocationItemType } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

type WeatherListContextType = {
  locations: LocationItemType[];
  handleAdd: (location: LocationItemType) => void;
  handleRemove: (id: number) => void;
};
const WeatherListContext = React.createContext<WeatherListContextType>({
  locations: [],
  handleAdd: () => {},
  handleRemove: () => {},
});

export const WeatherListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [locations, setLocations] = useState(() => {
    const savedLocations: LocationItemType[] =
      JSON.parse(localStorage.getItem("locations") as string) || [];
    return savedLocations;
  });

  const handleAdd = useCallback(
    (location: LocationItemType) => {
      try {
        const checkLocation = locations.find((loc) => loc._id === location._id);
        if (checkLocation) {
          toast.error(`Location already exists!`);
          return;
        }

        setLocations((prev) => [location, ...prev]);
        toast.success(`Added location successfully!`);
      } catch (error) {
        console.log(error);
      }
    },
    [locations]
  );

  const handleRemove = useCallback((id: number) => {
    try {
      setLocations((prev) => prev.filter((loc) => loc._id !== id));
      toast.success(`Removed location successfully!`);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("locations", JSON.stringify(locations));
  }, [locations]);
  return (
    <WeatherListContext.Provider value={{ locations, handleAdd, handleRemove }}>
      {children}
    </WeatherListContext.Provider>
  );
};

export const useWeatherListContext = () => React.useContext(WeatherListContext);
