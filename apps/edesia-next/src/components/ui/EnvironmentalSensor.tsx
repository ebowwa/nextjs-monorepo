// components/ui/EnvironmentalSensor.tsx
"use client";

import React, { useState, useEffect } from 'react';

const EnvironmentalSensor: React.FC = () => {
  const [ambientLight, setAmbientLight] = useState<number | null>(null);

  useEffect(() => {
    // Check if AmbientLightSensor is supported
    if ('AmbientLightSensor' in window) {
      try {
        // Use type assertion here
        const sensor = new (window as any).AmbientLightSensor() as any;
        
        sensor.onreading = () => {
          // Now TypeScript won't complain about onreading not existing on AmbientLightSensor
          setAmbientLight(sensor.illuminance);
        };

        sensor.onerror = (event: any) => {
          // Handle any errors here
          console.log(event.error?.message || 'Sensor error');
        };

        // Start the sensor
        sensor.start();
      } catch (error: unknown) {
        console.log(`Error: ${(error as Error).message}`);
      }
    }
  }, []);

  return <div>Ambient Light: {ambientLight ? `${ambientLight} lux` : 'Sensor not supported or permission denied'}</div>;
};

export default EnvironmentalSensor;
