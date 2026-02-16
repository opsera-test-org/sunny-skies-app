import { useState } from "react";
import { Search } from "lucide-react";
import { searchCity, type GeoResult } from "@/lib/weather";

interface SearchBarProps {
  onSelect: (result: GeoResult) => void;
}

const SearchBar = ({ onSelect }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }
    setLoading(true);
    const data = await searchCity(value);
    setResults(data);
    setShowResults(true);
    setLoading(false);
  };

  const handleSelect = (result: GeoResult) => {
    setQuery(result.name);
    setShowResults(false);
    onSelect(result);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="glass-card flex items-center gap-3 px-5 py-3">
        <Search className="w-5 h-5 text-muted-foreground shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for a city..."
          className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-body"
        />
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 glass-card overflow-hidden">
          {results.map((r, i) => (
            <button
              key={`${r.name}-${r.latitude}-${i}`}
              onClick={() => handleSelect(r)}
              className="w-full text-left px-5 py-3 hover:bg-foreground/5 transition-colors text-foreground font-body"
            >
              <span className="font-medium">{r.name}</span>
              <span className="text-muted-foreground ml-2 text-sm">{r.country}</span>
            </button>
          ))}
        </div>
      )}

      {showResults && results.length === 0 && !loading && query.length >= 2 && (
        <div className="absolute z-10 w-full mt-2 glass-card px-5 py-3 text-muted-foreground text-sm">
          No cities found
        </div>
      )}
    </div>
  );
};

export default SearchBar;
