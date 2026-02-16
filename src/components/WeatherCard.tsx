import { Droplets, Wind, Thermometer } from "lucide-react";
import { type WeatherData, getWeatherInfo } from "@/lib/weather";

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard = ({ data }: WeatherCardProps) => {
  const info = getWeatherInfo(data.weatherCode);

  return (
    <div className="glass-card p-8 w-full max-w-md mx-auto animate-fade-in">
      {/* City & Condition */}
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">{data.city}</h2>
        <p className="text-muted-foreground font-body mt-1">{info.label}</p>
      </div>

      {/* Big temp + icon */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="text-7xl">{info.icon}</span>
        <span className="font-display text-7xl font-bold text-foreground">{data.temperature}°</span>
      </div>

      {/* Detail row */}
      <div className="grid grid-cols-3 gap-4">
        <DetailItem icon={<Thermometer className="w-5 h-5 text-primary" />} label="Feels like" value={`${data.feelsLike}°`} />
        <DetailItem icon={<Droplets className="w-5 h-5 text-accent" />} label="Humidity" value={`${data.humidity}%`} />
        <DetailItem icon={<Wind className="w-5 h-5 text-muted-foreground" />} label="Wind" value={`${data.windSpeed} km/h`} />
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex flex-col items-center gap-1 text-center">
    {icon}
    <span className="text-xs text-muted-foreground font-body">{label}</span>
    <span className="text-sm font-semibold text-foreground font-body">{value}</span>
  </div>
);

export default WeatherCard;
