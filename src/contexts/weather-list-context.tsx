import { LocationItemType, LocationType } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";

type WeatherListContextType = {
  locations: LocationItemType[];
  handleAdd: (location: LocationType) => void;
  handleRemove: (id: string) => void;
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
    (location: LocationType) => {
      try {
        const checkLocation = locations.find(
          (loc) => loc.lon === location.lon && loc.lat === location.lat
        );
        if (checkLocation) {
          toast.error(`Location already exists!`);
          return;
        }
        const newLocation: LocationItemType = {
          _id: uuid(),
          lat: location.lat,
          lon: location.lon,
        };

        setLocations((prev) => [newLocation, ...prev]);
        toast.success(`Added location successfully!`);
      } catch (error) {
        console.log(error);
      }
    },
    [locations]
  );

  const handleRemove = useCallback((id: string) => {
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
