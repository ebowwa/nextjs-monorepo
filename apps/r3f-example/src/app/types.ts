// json files
// types.ts

// Import the JSON files
import threeJSConfig from './threeJSConfig.json';
import threeJSDefaultState from './threeJSDefaultState.json';
import threeJSLightingConfig from './threeJSLightingConfig.json';
import threeJSModelConfig from './threeJSModelConfig.json';
import threeJSSceneConfig from './threeJSSceneConfig.json';

// First JSON file
export interface RendererConfig {
    width: number;
    height: number;
}

export interface CameraConfig {
    position: {
        z: number;
    };
}

export interface ControlsConfig {
    maxPan: number;
    maxTilt: number;
}

export interface Config {
    renderer: RendererConfig;
    camera: CameraConfig;
    controls: ControlsConfig;
}

// Second JSON file
export interface CameraSettings {
    fov: number;
    near: number;
    far: number;
}

// Third JSON file
export interface AmbientLightConfig {
    color: number;
}

export interface DirectionalLightConfig {
    color: number;
    intensity: number;
    position: {
        x: number;
        y: number;
        z: number;
    };
}

export interface LightingConfig {
    ambientLight: AmbientLightConfig;
    directionalLight: DirectionalLightConfig;
}

// Fourth JSON file
export interface SpaceBoi {
    url: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
    rotation: {
        x: number;
        y: number;
        z: number;
    };
    visible: boolean;
    castShadow: boolean;
    receiveShadow: boolean;
    animation: {
        y: string;
        duration: number;
        repeat: number;
        ease: string;
    };
}

export interface TwitterLogo {
    url: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
    rotation: {
        x: number;
        y: number;
        z: number;
    };
    visible: boolean;
    castShadow: boolean;
    receiveShadow: boolean;
    animation: {
        y: string;
        duration: number;
        repeat: number;
        ease: string;
    };
    redirectUrl: string;
}

export interface SceneObjects {
    spaceBoi: SpaceBoi;
    twitterLogo: TwitterLogo;
}

// Fifth JSON file
export interface ControlsLimits {
    maxPan: number;
    maxTilt: number;
}