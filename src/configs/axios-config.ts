import axios from "axios";
import ENV_CONFIG from "./env.config";

const axiosConfig = axios.create({
  baseURL: "https://api.openweathermap.org",
  params: {
    appid: ENV_CONFIG.OPWM,
  },
});

export default axiosConfig;
