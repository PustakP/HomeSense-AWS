// Next.js app entry (TypeScript)
import React from 'react';

const sampleDevices = [
  { id: 1, name: 'Living Room Light', type: 'Light', status: 'On', brightness: 80 },
  { id: 2, name: 'Bedroom Thermostat', type: 'Thermostat', status: 'Cooling', temperature: 22 },
  { id: 3, name: 'Front Door Lock', type: 'Lock', status: 'Locked' },
  { id: 4, name: 'Motion Sensor', type: 'Sensor', status: 'No Motion' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <header className="mb-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">HomeSense Dashboard</h1>
        <p className="text-gray-600">Monitor and control your smart home devices</p>
      </header>
      <main className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Devices</h2>
        <div className="grid grid-cols-1 gap-4">
          {sampleDevices.map(device => (
            <div key={device.id} className="flex items-center justify-between p-4 border rounded hover:shadow transition">
              <div>
                <div className="font-semibold text-lg">{device.name}</div>
                <div className="text-sm text-gray-500">{device.type}</div>
              </div>
              <div className="text-right">
                {device.type === 'Light' && (
                  <>
                    <span className="text-green-600 font-medium">{device.status}</span>
                    <div className="text-xs text-gray-400">Brightness: {device.brightness}%</div>
                  </>
                )}
                {device.type === 'Thermostat' && (
                  <>
                    <span className="text-blue-600 font-medium">{device.status}</span>
                    <div className="text-xs text-gray-400">{device.temperature}&deg;C</div>
                  </>
                )}
                {device.type === 'Lock' && (
                  <span className="text-purple-600 font-medium">{device.status}</span>
                )}
                {device.type === 'Sensor' && (
                  <span className="text-orange-600 font-medium">{device.status}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="mt-8 text-center text-gray-400 text-xs">Sample UI &mdash; HomeSense</footer>
    </div>
  );
}
