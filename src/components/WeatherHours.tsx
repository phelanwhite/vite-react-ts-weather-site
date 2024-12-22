// Import Swiper React components

import { Swiper, SwiperSlide } from "swiper/react"; //-

import { useWeatherContext } from "@/contexts/weather-context"; //-
import { WeatherHourType } from "@/types"; //-
import { getHour12, getIconWeather, temperatureChangeC } from "@/utils"; //-

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
              slidesPerView: 9,
            },
            1200: {
              slidesPerView: 12,
            },
          }}
        >
          {weathers.map((weather) => (
            <SwiperSlide key={weather?.dt_txt}>
              <Item data={weather} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default WeatherHours;

const Item = ({ data }: { data: WeatherHourType }) => {
  return (
    <div className="flex flex-col gap-2 items-center bg-gray-50 rounded p-2">
      <div className="text-xs text-gray-500">
        {getHour12(data?.dt_txt, false)}
      </div>
      <div>
        <img
          src={getIconWeather(data?.weather?.[0]?.icon)}
          loading="lazy"
          alt=""
        />
      </div>
      <div className="font-medium">
        {temperatureChangeC(data?.main?.temp)}
        <sup>o</sup>
      </div>
    </div>
  );
};
