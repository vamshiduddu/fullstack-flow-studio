
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, Gauge, MapPin, Sunrise, Sunset, Moon, CloudSnow, Zap, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WeatherData {
  location: string;
  coordinates: { lat: number; lon: number };
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  pressure: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  moonPhase: string;
  airQuality: {
    index: number;
    quality: string;
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
  };
  forecast: Array<{
    day: string;
    date: string;
    high: number;
    low: number;
    condition: string;
    precipitation: number;
    windSpeed: number;
    humidity: number;
  }>;
  hourlyForecast: Array<{
    time: string;
    temperature: number;
    condition: string;
    precipitation: number;
    windSpeed: number;
  }>;
}

interface WeatherAlert {
  id: number;
  type: 'warning' | 'watch' | 'advisory';
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  expires: string;
}

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: "Denton, TX",
    coordinates: { lat: 33.2148, lon: -97.1331 },
    temperature: 72,
    feelsLike: 75,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 8,
    windDirection: 180,
    visibility: 10,
    pressure: 30.15,
    uvIndex: 6,
    sunrise: "07:15 AM",
    sunset: "06:45 PM",
    moonPhase: "Waxing Crescent",
    airQuality: {
      index: 42,
      quality: "Good",
      pm25: 8.2,
      pm10: 12.5,
      o3: 85.3,
      no2: 15.7
    },
    forecast: [
      { day: "Today", date: "Jan 26", high: 75, low: 58, condition: "Sunny", precipitation: 0, windSpeed: 8, humidity: 65 },
      { day: "Tomorrow", date: "Jan 27", high: 78, low: 62, condition: "Partly Cloudy", precipitation: 10, windSpeed: 12, humidity: 68 },
      { day: "Wednesday", date: "Jan 28", high: 71, low: 55, condition: "Rainy", precipitation: 80, windSpeed: 15, humidity: 85 },
      { day: "Thursday", date: "Jan 29", high: 69, low: 53, condition: "Cloudy", precipitation: 20, windSpeed: 10, humidity: 75 },
      { day: "Friday", date: "Jan 30", high: 74, low: 59, condition: "Sunny", precipitation: 0, windSpeed: 6, humidity: 60 },
      { day: "Saturday", date: "Jan 31", high: 76, low: 61, condition: "Partly Cloudy", precipitation: 5, windSpeed: 9, humidity: 62 },
      { day: "Sunday", date: "Feb 1", high: 73, low: 57, condition: "Sunny", precipitation: 0, windSpeed: 7, humidity: 58 }
    ],
    hourlyForecast: [
      { time: "12 AM", temperature: 65, condition: "Clear", precipitation: 0, windSpeed: 5 },
      { time: "3 AM", temperature: 62, condition: "Clear", precipitation: 0, windSpeed: 4 },
      { time: "6 AM", temperature: 60, condition: "Clear", precipitation: 0, windSpeed: 6 },
      { time: "9 AM", temperature: 68, condition: "Sunny", precipitation: 0, windSpeed: 8 },
      { time: "12 PM", temperature: 72, condition: "Partly Cloudy", precipitation: 0, windSpeed: 10 },
      { time: "3 PM", temperature: 75, condition: "Partly Cloudy", precipitation: 0, windSpeed: 12 },
      { time: "6 PM", temperature: 71, condition: "Cloudy", precipitation: 10, windSpeed: 9 },
      { time: "9 PM", temperature: 67, condition: "Cloudy", precipitation: 15, windSpeed: 7 }
    ]
  });

  const [weatherAlerts] = useState<WeatherAlert[]>([
    {
      id: 1,
      type: "watch",
      title: "Severe Thunderstorm Watch",
      description: "Conditions are favorable for the development of severe thunderstorms in and close to the watch area.",
      severity: "moderate",
      expires: "2024-01-26T22:00:00Z"
    }
  ]);

  const [cities] = useState([
    { name: "Denton, TX", lat: 33.2148, lon: -97.1331 },
    { name: "Dallas, TX", lat: 32.7767, lon: -96.7970 },
    { name: "Austin, TX", lat: 30.2672, lon: -97.7431 },
    { name: "Houston, TX", lat: 29.7604, lon: -95.3698 },
    { name: "New York, NY", lat: 40.7128, lon: -74.0060 },
    { name: "Los Angeles, CA", lat: 34.0522, lon: -118.2437 }
  ]);

  const [selectedCity, setSelectedCity] = useState("Denton, TX");
  const [viewMode, setViewMode] = useState<'current' | 'hourly' | 'weekly' | 'radar'>('current');
  const [temperatureUnit, setTemperatureUnit] = useState<'F' | 'C'>('F');

  // Simulate API call with more comprehensive data
  const fetchWeatherData = (cityName: string) => {
    const city = cities.find(c => c.name === cityName);
    if (!city) return;

    const mockData: { [key: string]: Partial<WeatherData> } = {
      "Denton, TX": { 
        temperature: 72, 
        feelsLike: 75,
        condition: "Partly Cloudy", 
        humidity: 65,
        windSpeed: 8,
        windDirection: 180,
        airQuality: { index: 42, quality: "Good", pm25: 8.2, pm10: 12.5, o3: 85.3, no2: 15.7 }
      },
      "Dallas, TX": { 
        temperature: 75, 
        feelsLike: 78,
        condition: "Sunny", 
        humidity: 58,
        windSpeed: 12,
        windDirection: 220,
        airQuality: { index: 38, quality: "Good", pm25: 7.8, pm10: 11.2, o3: 82.1, no2: 14.3 }
      },
      "Austin, TX": { 
        temperature: 78, 
        feelsLike: 82,
        condition: "Hot", 
        humidity: 55,
        windSpeed: 6,
        windDirection: 160,
        airQuality: { index: 45, quality: "Good", pm25: 9.1, pm10: 13.7, o3: 88.9, no2: 16.8 }
      },
      "Houston, TX": { 
        temperature: 82, 
        feelsLike: 87,
        condition: "Humid", 
        humidity: 78,
        windSpeed: 14,
        windDirection: 140,
        airQuality: { index: 55, quality: "Moderate", pm25: 12.4, pm10: 18.9, o3: 95.2, no2: 22.1 }
      },
      "New York, NY": { 
        temperature: 68, 
        feelsLike: 71,
        condition: "Cloudy", 
        humidity: 70,
        windSpeed: 18,
        windDirection: 290,
        airQuality: { index: 62, quality: "Moderate", pm25: 15.3, pm10: 22.8, o3: 102.7, no2: 28.4 }
      },
      "Los Angeles, CA": { 
        temperature: 77, 
        feelsLike: 79,
        condition: "Sunny", 
        humidity: 45,
        windSpeed: 9,
        windDirection: 270,
        airQuality: { index: 71, quality: "Moderate", pm25: 18.9, pm10: 28.3, o3: 115.6, no2: 32.7 }
      }
    };

    setWeatherData(prev => ({
      ...prev,
      location: cityName,
      coordinates: city,
      ...mockData[cityName]
    }));
  };

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity]);

  const convertTemperature = (temp: number) => {
    if (temperatureUnit === 'C') {
      return Math.round((temp - 32) * 5/9);
    }
    return temp;
  };

  const getWeatherIcon = (condition: string, size: number = 40) => {
    const iconProps = { size, className: "mx-auto" };
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'hot':
      case 'clear':
        return <Sun className="text-yellow-500" {...iconProps} />;
      case 'rainy':
        return <CloudRain className="text-blue-500" {...iconProps} />;
      case 'cloudy':
        return <Cloud className="text-gray-500" {...iconProps} />;
      case 'snowy':
        return <CloudSnow className="text-blue-300" {...iconProps} />;
      case 'stormy':
        return <Zap className="text-purple-500" {...iconProps} />;
      default:
        return <Cloud className="text-blue-400" {...iconProps} />;
    }
  };

  const getConditionGradient = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'hot':
      case 'clear':
        return 'from-yellow-400 to-orange-500';
      case 'rainy':
        return 'from-blue-400 to-blue-600';
      case 'cloudy':
        return 'from-gray-400 to-gray-600';
      case 'snowy':
        return 'from-blue-200 to-blue-400';
      case 'stormy':
        return 'from-purple-500 to-gray-700';
      default:
        return 'from-blue-400 to-indigo-600';
    }
  };

  const getAirQualityColor = (index: number) => {
    if (index <= 50) return 'text-green-600';
    if (index <= 100) return 'text-yellow-600';
    if (index <= 150) return 'text-orange-600';
    if (index <= 200) return 'text-red-600';
    if (index <= 300) return 'text-purple-600';
    return 'text-red-800';
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Weather Analytics Dashboard</h2>
        <p className="text-gray-600">Comprehensive weather data with real-time updates and detailed forecasts</p>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <Button
                  key={city.name}
                  variant={selectedCity === city.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCity(city.name)}
                  className="text-xs"
                >
                  <MapPin size={12} className="mr-1" />
                  {city.name}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2 items-center">
              <Button
                variant={temperatureUnit === 'F' ? "default" : "outline"}
                size="sm"
                onClick={() => setTemperatureUnit('F')}
              >
                °F
              </Button>
              <Button
                variant={temperatureUnit === 'C' ? "default" : "outline"}
                size="sm"
                onClick={() => setTemperatureUnit('C')}
              >
                °C
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      {weatherAlerts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <Zap size={20} />
              Active Weather Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weatherAlerts.map((alert) => (
              <div key={alert.id} className="p-3 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-orange-900">{alert.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs ${
                    alert.severity === 'extreme' ? 'bg-red-100 text-red-800' :
                    alert.severity === 'severe' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{alert.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Expires: {new Date(alert.expires).toLocaleString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* View Mode Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            {[
              { mode: 'current', label: 'Current' },
              { mode: 'hourly', label: 'Hourly' },
              { mode: 'weekly', label: '7-Day' },
              { mode: 'radar', label: 'Radar' }
            ].map(({ mode, label }) => (
              <Button
                key={mode}
                variant={viewMode === mode ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode(mode as any)}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Weather Card */}
      <Card className={`bg-gradient-to-br ${getConditionGradient(weatherData.condition)} text-white`}>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <MapPin size={24} />
                {weatherData.location}
              </h3>
              <div className="flex items-center gap-6 mb-4">
                {getWeatherIcon(weatherData.condition, 60)}
                <div>
                  <div className="text-6xl font-bold">
                    {convertTemperature(weatherData.temperature)}°{temperatureUnit}
                  </div>
                  <div className="text-xl opacity-90">{weatherData.condition}</div>
                  <div className="text-lg opacity-75">
                    Feels like {convertTemperature(weatherData.feelsLike)}°{temperatureUnit}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-right">
                <div className="text-sm opacity-75">Last Updated</div>
                <div className="text-lg">{new Date().toLocaleTimeString()}</div>
              </div>
              
              <div className="flex items-center gap-2">
                <Sunrise size={18} />
                <span>{weatherData.sunrise}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Sunset size={18} />
                <span>{weatherData.sunset}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Moon size={18} />
                <span>{weatherData.moonPhase}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Weather Information */}
      <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
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
            <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <Navigation size={12} style={{ transform: `rotate(${weatherData.windDirection}deg)` }} />
              {getWindDirection(weatherData.windDirection)}
            </div>
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

        <Card>
          <CardContent className="p-4 text-center">
            <Sun className="mx-auto mb-2 text-yellow-500" size={24} />
            <div className="text-2xl font-bold">{weatherData.uvIndex}</div>
            <div className="text-sm text-gray-600">UV Index</div>
            <div className={`text-xs ${
              weatherData.uvIndex <= 2 ? 'text-green-600' :
              weatherData.uvIndex <= 5 ? 'text-yellow-600' :
              weatherData.uvIndex <= 7 ? 'text-orange-600' :
              weatherData.uvIndex <= 10 ? 'text-red-600' : 'text-purple-600'
            }`}>
              {weatherData.uvIndex <= 2 ? 'Low' :
               weatherData.uvIndex <= 5 ? 'Moderate' :
               weatherData.uvIndex <= 7 ? 'High' :
               weatherData.uvIndex <= 10 ? 'Very High' : 'Extreme'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Wind className="mx-auto mb-2 text-gray-500" size={24} />
            <div className={`text-2xl font-bold ${getAirQualityColor(weatherData.airQuality.index)}`}>
              {weatherData.airQuality.index}
            </div>
            <div className="text-sm text-gray-600">Air Quality</div>
            <div className={`text-xs ${getAirQualityColor(weatherData.airQuality.index)}`}>
              {weatherData.airQuality.quality}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conditional Content Based on View Mode */}
      {viewMode === 'hourly' && (
        <Card>
          <CardHeader>
            <CardTitle>24-Hour Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {weatherData.hourlyForecast.map((hour, index) => (
                <div key={index} className="text-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-sm mb-2">{hour.time}</div>
                  <div className="mb-2">{getWeatherIcon(hour.condition, 32)}</div>
                  <div className="font-bold">{convertTemperature(hour.temperature)}°</div>
                  <div className="text-xs text-blue-600 mt-1">{hour.precipitation}%</div>
                  <div className="text-xs text-gray-500">{hour.windSpeed} mph</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {viewMode === 'weekly' && (
        <Card>
          <CardHeader>
            <CardTitle>7-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="font-medium w-20">{day.day}</div>
                    <div className="text-sm text-gray-600 w-16">{day.date}</div>
                    {getWeatherIcon(day.condition, 32)}
                    <div className="flex-1">
                      <div className="font-medium">{day.condition}</div>
                      <div className="text-sm text-gray-600">
                        Precipitation: {day.precipitation}% | Wind: {day.windSpeed} mph | Humidity: {day.humidity}%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold">{convertTemperature(day.high)}°</div>
                      <div className="text-gray-600">{convertTemperature(day.low)}°</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {viewMode === 'radar' && (
        <Card>
          <CardHeader>
            <CardTitle>Weather Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-blue-400"
                    style={{
                      width: `${Math.random() * 40 + 10}px`,
                      height: `${Math.random() * 40 + 10}px`,
                      left: `${Math.random() * 90}%`,
                      top: `${Math.random() * 90}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
              <div className="z-10 text-center">
                <div className="text-2xl font-bold text-gray-700 mb-2">Interactive Radar Map</div>
                <div className="text-gray-600">Precipitation and weather patterns</div>
                <div className="mt-4 p-4 bg-white/80 rounded-lg">
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-300 rounded"></div>
                      <span>Light</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>Moderate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-700 rounded"></div>
                      <span>Heavy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Air Quality Details */}
      <Card>
        <CardHeader>
          <CardTitle>Air Quality Index (AQI)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getAirQualityColor(weatherData.airQuality.index)}`}>
                {weatherData.airQuality.index}
              </div>
              <div className="text-sm text-gray-600">Overall AQI</div>
              <div className={`text-sm font-medium ${getAirQualityColor(weatherData.airQuality.index)}`}>
                {weatherData.airQuality.quality}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-xl font-bold">{weatherData.airQuality.pm25}</div>
              <div className="text-sm text-gray-600">PM2.5</div>
              <div className="text-xs text-gray-500">μg/m³</div>
            </div>
            
            <div className="text-center">
              <div className="text-xl font-bold">{weatherData.airQuality.pm10}</div>
              <div className="text-sm text-gray-600">PM10</div>
              <div className="text-xs text-gray-500">μg/m³</div>
            </div>
            
            <div className="text-center">
              <div className="text-xl font-bold">{weatherData.airQuality.o3}</div>
              <div className="text-sm text-gray-600">Ozone</div>
              <div className="text-xs text-gray-500">μg/m³</div>
            </div>
            
            <div className="text-center">
              <div className="text-xl font-bold">{weatherData.airQuality.no2}</div>
              <div className="text-sm text-gray-600">NO₂</div>
              <div className="text-xs text-gray-500">μg/m³</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Temperature Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Temperature Trend (24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-gradient-to-r from-blue-100 to-orange-100 rounded-lg flex items-end justify-between p-4 relative">
            <div className="absolute inset-x-4 top-4 flex justify-between text-xs text-gray-500">
              {weatherData.hourlyForecast.map((hour, i) => (
                <span key={i}>{convertTemperature(hour.temperature)}°</span>
              ))}
            </div>
            {weatherData.hourlyForecast.map((hour, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-blue-500 to-orange-500 rounded-t-md transition-all hover:opacity-80"
                style={{
                  height: `${((hour.temperature - 50) / 40) * 100}%`,
                  width: '10%'
                }}
                title={`${hour.time}: ${convertTemperature(hour.temperature)}°${temperatureUnit}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            {weatherData.hourlyForecast.map((hour, i) => (
              <span key={i}>{hour.time}</span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack Info */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-3">Technologies & Features</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Frontend</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• React.js with TypeScript</li>
                <li>• Custom Chart Components</li>
                <li>• Responsive Design with Tailwind</li>
                <li>• Real-time Data Updates</li>
                <li>• Interactive Weather Maps</li>
                <li>• Progressive Web App (PWA)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Backend & APIs</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• OpenWeather API Integration</li>
                <li>• Air Quality API</li>
                <li>• Node.js REST API</li>
                <li>• Data Caching with Redis</li>
                <li>• Geolocation Services</li>
                <li>• Weather Alert System</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Features</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Multiple city comparison</li>
                <li>• 7-day detailed forecasts</li>
                <li>• Hourly weather data</li>
                <li>• Air quality monitoring</li>
                <li>• Weather alerts & warnings</li>
                <li>• Historical data analysis</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherDashboard;
