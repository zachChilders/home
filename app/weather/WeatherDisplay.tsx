import React from 'react';
import { Sun, Cloud, CloudDrizzle, CloudRain, CloudSnow, CloudLightning, CloudHail, CloudFog } from 'lucide-react'; // Import icons you need

// Weather code to description map
const weatherCodeMap: { [key: number]: { description: string, Icon: React.ComponentType } } = {
  0: { description: 'Clear sky', Icon: Sun },
  1: { description: 'Mainly clear', Icon: Sun },
  2: { description: 'Partly cloudy', Icon: Cloud },
  3: { description: 'Overcast', Icon: Cloud },
  45: { description: 'Fog', Icon: CloudFog },
  48: { description: 'Depositing rime fog', Icon: CloudFog },
  51: { description: 'Light drizzle', Icon: CloudDrizzle },
  53: { description: 'Moderate drizzle', Icon: CloudDrizzle },
  55: { description: 'Dense drizzle', Icon: CloudDrizzle },
  56: { description: 'Freezing light drizzle', Icon: CloudDrizzle },
  57: { description: 'Freezing dense drizzle', Icon: CloudDrizzle },
  61: { description: 'Slight rain', Icon: CloudRain },
  63: { description: 'Moderate rain', Icon: CloudRain },
  65: { description: 'Heavy rain', Icon: CloudRain },
  66: { description: 'Freezing light rain', Icon: CloudRain },
  67: { description: 'Freezing heavy rain', Icon: CloudRain },
  71: { description: 'Slight snow fall', Icon: CloudSnow },
  73: { description: 'Moderate snow fall', Icon: CloudSnow },
  75: { description: 'Heavy snow fall', Icon: CloudSnow },
  77: { description: 'Snow grains', Icon: CloudSnow },
  80: { description: 'Slight rain showers', Icon: CloudRain },
  81: { description: 'Moderate rain showers', Icon: CloudRain },
  82: { description: 'Violent rain showers', Icon: CloudRain },
  85: { description: 'Slight snow showers', Icon: CloudSnow },
  86: { description: 'Heavy snow showers', Icon: CloudSnow },
  95: { description: 'Thunderstorm', Icon: CloudLightning },
  96: { description: 'Thunderstorm with slight hail', Icon: CloudHail },
  99: { description: 'Thunderstorm with heavy hail', Icon: CloudHail }
};

// Weather component that displays both icon and description
export const WeatherDisplay: React.FC<{ code: number }> = ({ code }) => {
  const weatherData = weatherCodeMap[code] || { description: 'Unknown weather condition', Icon: Cloud };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <weatherData.Icon /> {/* Display the icon */}
      <span>{weatherData.description}</span> {/* Display the description */}
    </div>
  );
};
