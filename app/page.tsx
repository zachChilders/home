import { Suspense } from 'react';
import WeatherWidget from './weather/WeatherWidget';
import { Home } from 'lucide-react';

export default function HomeDashboard() {
  return (
    <div className="min-h-screen bg-primary-foreground p-4">
        <h1 className="text-2xl font-bold flex flex-row gap-2 mb-3 text-gray-800">
          <Home/> 
        </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<div>Loading weather...</div>}>
          <WeatherWidget />
        </Suspense>
        {/* <IoTDevices /> */}
      </div>
    </div>
  )
}