
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, Gauge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  uvIndex: number;
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
  }>;
}

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: "Denton, TX",
    temperature: 72,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 8,
    visibility: 10,
    pressure: 30.15,
    uvIndex: 6,
    forecast: [
      { day: "Today", high: 75, low: 58, condition: "Sunny" },
      { day: "Tomorrow", high: 78, low: 62, condition: "Partly Cloudy" },
      { day: "Wednesday", high: 71, low: 55, condition: "Rainy" },
      { day: "Thursday", high: 69, low: 53, condition: "Cloudy" },
      { day: "Friday", high: 74, low: 59, condition: "Sunny" },
    ]
  });

  const [cities] = useState([
    "Denton, TX", "Dallas, TX", "Austin, TX", "Houston, TX", "New York, NY", "Los Angeles, CA"
  ]);

  const [selectedCity, setSelectedCity] = useState("Denton, TX");

  // Simulate API call
  const fetchWeatherData = (city: string) => {
    const mockData: { [key: string]: Partial<WeatherData> } = {
      "Denton, TX": { temperature: 72, condition: "Partly Cloudy", humidity: 65 },
      "Dallas, TX": { temperature: 75, condition: "Sunny", humidity: 58 },
      "Austin, TX": { temperature: 78, condition: "Hot", humidity: 55 },
      "Houston, TX": { temperature: 82, condition: "Humid", humidity: 78 },
      "New York, NY": { temperature: 68, condition: "Cloudy", humidity: 70 },
      "Los Angeles, CA": { temperature: 77, condition: "Sunny", humidity: 45 }
    };

    setWeatherData(prev => ({
      ...prev,
      location: city,
      ...mockData[city]
    }));
  };

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'hot':
        return <Sun className="text-yellow-500" size={40} />;
      case 'rainy':
        return <CloudRain className="text-blue-500" size={40} />;
      case 'cloudy':
        return <Cloud className="text-gray-500" size={40} />;
      default:
        return <Cloud className="text-blue-400" size={40} />;
    }
  };

  const getConditionGradient = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'hot':
        return 'from-yellow-400 to-orange-500';
      case 'rainy':
        return 'from-blue-400 to-blue-600';
      case 'cloudy':
        return 'from-gray-400 to-gray-600';
      default:
        return 'from-blue-400 to-indigo-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Weather Analytics Dashboard</h2>
        <p className="text-gray-600">Real-time weather data with interactive visualizations</p>
      </div>

      {/* City Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Button
                key={city}
                variant={selectedCity === city ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCity(city)}
                className="text-xs"
              >
                {city}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Weather Card */}
      <Card className={`bg-gradient-to-br ${getConditionGradient(weatherData.condition)} text-white`}>
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">{weatherData.location}</h3>
              <div className="flex items-center gap-4 mb-4">
                {getWeatherIcon(weatherData.condition)}
                <div>
                  <div className="text-5xl font-bold">{weatherData.temperature}°F</div>
                  <div className="text-xl opacity-90">{weatherData.condition}</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-75">Last Updated</div>
              <div className="text-lg">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Details Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Droplets className="mx-auto mb-2 text-blue-500" size={24} />
            <div className="text-2xl font-bold">{weatherData.humidity}%</div>
            <div className="text-sm text-gray-600">Humidity</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Wind className="mx-auto mb-2 text-green-500" size={24} />
            <div className="text-2xl font-bold">{weatherData.windSpeed} mph</div>
            <div className="text-sm text-gray-600">Wind Speed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="mx-auto mb-2 text-purple-500" size={24} />
            <div className="text-2xl font-bold">{weatherData.visibility} mi</div>
            <div className="text-sm text-gray-600">Visibility</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Gauge className="mx-auto mb-2 text-orange-500" size={24} />
            <div className="text-2xl font-bold">{weatherData.pressure}"</div>
            <div className="text-sm text-gray-600">Pressure</div>
          </CardContent>
        </Card>
      </div>

      {/* 5-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="font-medium text-sm mb-2">{day.day}</div>
                <div className="mb-2">{getWeatherIcon(day.condition)}</div>
                <div className="font-bold">{day.high}°</div>
                <div className="text-gray-600 text-sm">{day.low}°</div>
                <div className="text-xs text-gray-500 mt-1">{day.condition}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chart Simulation */}
      <Card>
        <CardHeader>
          <CardTitle>Temperature Trend (24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-gradient-to-r from-blue-100 to-orange-100 rounded-lg flex items-end justify-between p-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="bg-blue-500 rounded-t-sm"
                style={{
                  height: `${Math.random() * 80 + 20}%`,
                  width: '6%'
                }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>12 AM</span>
            <span>6 AM</span>
            <span>12 PM</span>
            <span>6 PM</span>
            <span>12 AM</span>
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack Info */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-3">Technologies Used</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Frontend</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• React.js with TypeScript</li>
                <li>• Custom SVG Chart Components</li>
                <li>• Responsive Design with Tailwind</li>
                <li>• Real-time Data Updates</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Backend & APIs</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• OpenWeather API Integration</li>
                <li>• Node.js REST API</li>
                <li>• Data Caching with Redis</li>
                <li>• Geolocation Services</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherDashboard;
