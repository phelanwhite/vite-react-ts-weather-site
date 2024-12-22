export function temperatureChangeC(temperature: number) {
  return Math.round(temperature - 273.15);
}
export function getIconWeather(icon: string, size?: "@2x") {
  return size
    ? `http://openweathermap.org/img/wn/${icon}${size}.png`
    : `http://openweathermap.org/img/wn/${icon}.png`;
}
export function getHour12(date: string, isMinutes = true) {
  const hour = new Date(date).getUTCHours();
  const minutes = new Date(date).getUTCMinutes();

  let text = "AM";
  if (hour > 12) {
    text = "PM";
  }
  let minutesString = minutes as unknown as string;
  if (minutes < 10) {
    minutesString = `0${minutesString}`;
  }

  if (isMinutes) {
    return `${hour % 12}:${minutesString} ${text}`;
  } else {
    return `${hour % 12} ${minutesString}`;
  }
}

export function getTimeZone(date: number, timezone: number) {
  const time = (date + timezone) * 1000;

  return getHour12(time as unknown as string, true);
}
