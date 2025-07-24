// src/app/test/page.tsx
"use client";

import React from 'react';
import { useViewportSize } from '@/components/ui/useViewportSize';
import { useTouchCapability } from '@/components/ui/useTouchCapability';
import CameraCapture from '@/components/ui/CameraCapture'; // Import the camera component
import NetworkDetails from '@/components/ui/NetworkDetails'; // Import the network details component
import AudioAnalysis from '@/components/ui/AudioAnalysis'; // Import the audio analysis component
import LocationDisplayComponent from '@/components/ui/LocationDisplayComponent'; // Import the location display component
import EnvironmentalSensor from '@/components/ui/EnvironmentalSensor'; // Import the environmental sensor component

const DisplayScreenInfo = () => {
  const { width, height } = useViewportSize();
  const isTouchEnabled = useTouchCapability();

  return (
    <div>
      <h2>Screen Information</h2>
      <p>Viewport Width: {width}px</p>
      <p>Viewport Height: {height}px</p>
      <p>Touch Enabled: {isTouchEnabled ? 'Yes' : 'No'}</p>
      {/* Camera capture component */}
      <CameraCapture />
      {/* Network details component */}
      <NetworkDetails />
      {/* Audio analysis component */}
      <AudioAnalysis />
      {/* Location display component */}
      <LocationDisplayComponent />
      {/* Environmental sensor component */}
      <EnvironmentalSensor />
    </div>
  );
};

export default DisplayScreenInfo;
