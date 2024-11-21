"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cloud, Search } from "lucide-react";

interface WeatherInputProps {
  value?: string;
  onChange: (weather: string) => void;
}

export function WeatherInput({ value, onChange }: WeatherInputProps) {
  const [location, setLocation] = useState("");

  const getWeather = async () => {
    try {
      // In a real app, you would call a weather API here
      const mockWeather = "☀️ Sunny, 72°F";
      onChange(mockWeather);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => {
        getWeather();
      });
    }
  }, []);

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Cloud className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location..."
          className="pl-9"
        />
      </div>
      <Button onClick={getWeather} size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}