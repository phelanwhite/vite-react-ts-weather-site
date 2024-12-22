import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WeatherProvider } from "./contexts/weather-context.tsx";
import { WeatherListProvider } from "./contexts/weather-list-context.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <WeatherProvider>
          <WeatherListProvider>
            <App />
          </WeatherListProvider>
        </WeatherProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
