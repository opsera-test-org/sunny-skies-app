import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import { fetchWeather, type WeatherData, type GeoResult } from "@/lib/weather";
import { CloudSun } from "lucide-react";

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCitySelect = async (result: GeoResult) => {
    setLoading(true);
    try {
      const data = await fetchWeather(result.latitude, result.longitude, result.name);
      setWeather(data);
    } catch {
      console.error("Failed to fetch weather");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen gradient-sky flex flex-col items-center justify-center px-4 py-12 gap-8">
      {/* Header */}
      <div className="text-center animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-2">
          <CloudSun className="w-8 h-8 text-primary" />
          <h1 className="font-display text-4xl font-bold text-foreground">Weather</h1>
        </div>
        <p className="text-muted-foreground font-body">Search any city to see current conditions</p>
      </div>

      {/* Search */}
      <SearchBar onSelect={handleCitySelect} />

      {/* Result */}
      {loading && (
        <div className="text-muted-foreground font-body animate-pulse">Loading...</div>
      )}
      {weather && !loading && <WeatherCard data={weather} />}
    </div>
  );
};

export default Index;
