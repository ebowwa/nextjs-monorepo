// ambient-light-sensor.d.ts

declare global {
  interface AmbientLightSensor extends Sensor {
    readonly illuminance: number;
    onreading: () => void;
    onerror: (event: ErrorEvent) => void;
    start: () => void;
    stop: () => void;
  }
}
