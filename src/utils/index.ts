export function temperatureChangeC(temperature: number) {
  return Math.round(temperature - 273.15);
}
export function getIconWeather(icon: string, size?: "@2x") {
  return size
    ? `https://openweathermap.org/img/wn/${icon}${size}.png`
    : `https://openweathermap.org/img/wn/${icon}.png`;
}
export function getHour12(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function getTimeZone(date: number, timezone: number) {
  const time = (date + timezone) * 1000;

  return getHour12(new Date(time));
}
