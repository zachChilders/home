import { Cloud, Wind, Thermometer, HandHelping } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchWeatherApi } from 'openmeteo'
import { WeatherDisplay } from './WeatherDisplay'

async function getWeatherData() {
  const params = {
    "latitude": 37.652452,
    "longitude": -118.980064,
    "current": ["temperature_2m", "apparent_temperature", "precipitation", "snowfall", "weather_code", "wind_speed_10m", "wind_gusts_10m"],
    "hourly": ["snowfall", "snow_depth"],
    "daily": ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "precipitation_hours", "precipitation_probability_max"],
    "temperature_unit": "fahrenheit",
    "wind_speed_unit": "mph",
    "precipitation_unit": "inch",
    "timezone": "America/Los_Angeles"
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      feelsLike: current.variables(1)!.value(),
      precipitation: current.variables(1)!.value(),
      snowfall: current.variables(2)!.value(),
      weatherCode: current.variables(3)!.value(),
      windSpeed10m: current.variables(4)!.value(),
      windGusts10m: current.variables(6)!.value(),
    },
    hourly: {
      time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      snowfall: hourly.variables(0)!.valuesArray()!,
      snowDepth: hourly.variables(1)!.valuesArray()!,
    },
    daily: {
      time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      temperature2mMax: daily.variables(0)!.valuesArray()!,
      temperature2mMin: daily.variables(1)!.valuesArray()!,
      sunrise: daily.variables(2)!.valuesArray()!,
      sunset: daily.variables(3)!.valuesArray()!,
      precipitationHours: daily.variables(4)!.valuesArray()!,
      precipitationProbabilityMax: daily.variables(5)!.valuesArray()!,
    },

  };

  return weatherData;
}

export default async function WeatherWidget() {
  const weather = await getWeatherData()

  console.log(weather.current.windSpeed10m)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-3 space-y-0 pb-2">
        <CardTitle className="flex items-center">
          Weather
        </CardTitle>
        <WeatherDisplay code={weather.current.weatherCode} />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Cloud className="mr-2" />
            <span>{weather.daily.precipitationProbabilityMax[0]}% precip</span>
          </div>
          <div className="flex items-center">
            <Wind className="mr-2" />
            <span>{Math.round(weather.current.windGusts10m)} mph winds</span>
          </div>
          <div className="flex items-center">
            <div className='flex flex-col'>
              <div className="flex items-center">
                <Thermometer className="mr-2" />
                <div className="text-2xl font-bold">{Math.round(weather.current.temperature2m)}°F</div>
              </div>
              <span className='flex place-items-end'>
                  <div className='text-sm'>
                    {Math.round(weather.daily.temperature2mMax[0])}
                    /
                    {Math.round(weather.daily.temperature2mMin[0])}
                  </div>
                </span>
            </div>
          </div>
          <div className="flex items-center">
            <HandHelping className="mr-2" />
            <span>Feels like {Math.round(weather.current.feelsLike)}°F</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
