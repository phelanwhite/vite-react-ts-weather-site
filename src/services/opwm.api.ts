import axiosConfig from "@/configs/axios-config";
import { LocationType } from "@/types";

export const searchDirectApi = async (value: string) => {
  const url = `geo/1.0/direct?q=${value}&limit=5`;
  const response = await axiosConfig.get(url);
  return response.data;
};
export const currentWeatherApi = async (location: LocationType) => {
  const url = `data/2.5/weather?lat=${location.lat}&lon=${location.lon}`;
  const response = await axiosConfig.get(url);
  return response.data;
};

export const forecastWeatherApi = async (location: LocationType) => {
  const url = `data/2.5/forecast?lat=${location.lat}&lon=${location.lon}`;
  const response = await axiosConfig.get(url);
  return response.data;
};
export const airWeatherApi = async (location: LocationType) => {
  const url = `data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}`;
  const response = await axiosConfig.get(url);
  return response.data;
};
