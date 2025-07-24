// app/config/store.ts
import create from 'zustand';
import { Config, LightingConfig, SceneObjects, ControlsLimits } from '../types';
import { get, set } from 'lodash';

interface ThreeJSState {
    threeJSConfig: Config;
    threeJSLightingConfig: LightingConfig;
    threeJSSceneConfig: SceneObjects;
    threeJSControlsLimits: ControlsLimits;
    loadThreeJSConfig: () => Promise<void>;
}

export const useThreeJSStore = create<ThreeJSState>((set) => ({
    threeJSConfig: {} as Config,
    threeJSLightingConfig: {} as LightingConfig,
    threeJSSceneConfig: {} as SceneObjects,
    threeJSControlsLimits: { maxPan: 0, maxTilt: 0 },
    loadThreeJSConfig: async () => {
        const [
            threeJSConfigResponse,
            threeJSLightingConfigResponse,
            threeJSSceneConfigResponse,
        ] = await Promise.all([
            fetch('./threeJSConfig.json'),
            fetch('./threeJSLightingConfig.json'),
            fetch('./threeJSSceneConfig.json'),
        ]);

        const [
            threeJSConfigData,
            threeJSLightingConfigData,
            threeJSSceneConfigData,
        ] = await Promise.all([
            threeJSConfigResponse.json(),
            threeJSLightingConfigResponse.json(),
            threeJSSceneConfigResponse.json(),
        ]);

        set({
            threeJSConfig: threeJSConfigData,
            threeJSLightingConfig: threeJSLightingConfigData,
            threeJSSceneConfig: threeJSSceneConfigData,
            threeJSControlsLimits: {
                maxPan: get(threeJSSceneConfigData, 'maxPan', 0),
                maxTilt: get(threeJSSceneConfigData, 'maxTilt', 0),
            },
        });
    },
}));