// Import Swiper React components

import { Swiper, SwiperSlide } from "swiper/react"; //-

import { useWeatherContext } from "@/contexts/weather-context";
import { memo } from "react";
import WeatherHourItem from "./WeatherHourItem";

const WeatherHours = () => {
  const { weathers } = useWeatherContext();
  return (
    <div className="rounded bg-white p-4 shadow space-y-4">
      <div className="font-medium mb-4">Today at</div>
      <div className="overflow-hidden">
        <Swiper
          spaceBetween={8}
          slidesPerView={2}
          breakpoints={{
            300: {
              slidesPerView: 4,
            },
            440: {
              slidesPerView: 4,
            },
            640: {
              slidesPerView: 6,
            },
            768: {
              slidesPerView: 7,
            },
            1024: {
              slidesPerView: 8,
            },
            1200: {
              slidesPerView: 12,
            },
          }}
        >
          {weathers.map((weather) => (
            <SwiperSlide key={weather?.dt_txt}>
              <WeatherHourItem data={weather} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default memo(WeatherHours);
