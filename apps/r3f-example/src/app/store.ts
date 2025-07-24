import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import threeJSDefaultState from './threeJSDefaultState.json';
import threeJSConfig from './threeJSConfig.json';
import threeJSLightingConfig from './threeJSLightingConfig.json';
import threeJSModelConfig from './threeJSModelConfig.json';
import threeJSSceneConfig from './threeJSSceneConfig.json';

export class ThreeJSStore {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    light: THREE.PointLight;
    controls: OrbitControls | null;
    modelGroup: THREE.Group | null;

    constructor() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera(
            threeJSDefaultState.camera.fov,
            typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 1,
            threeJSDefaultState.camera.near,
            threeJSDefaultState.camera.far
        );
        this.light = new THREE.PointLight();
        this.controls = null;
        this.modelGroup = null;

        this.setupCamera();
        this.setupRenderer();
        this.setupLighting();
        this.loadModels();
        this.setupControls();
    }

    private setupCamera() {
        this.camera.position.z = threeJSConfig.camera.position.z;
    }

    private setupRenderer() {
        this.renderer.setSize(threeJSConfig.renderer.width, threeJSConfig.renderer.height);
    }

    private setupLighting() {
        const ambientLight = new THREE.AmbientLight(threeJSLightingConfig.ambientLight.color);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(threeJSLightingConfig.directionalLight.color, threeJSLightingConfig.directionalLight.intensity);
        directionalLight.position.set(threeJSLightingConfig.directionalLight.position.x, threeJSLightingConfig.directionalLight.position.y, threeJSLightingConfig.directionalLight.position.z);
        this.scene.add(directionalLight);
    }

    private loadModels() {
        const gltfLoader = new GLTFLoader();

        gltfLoader.load(threeJSModelConfig.spaceBoi.url, (gltf) => {
            const spaceBoiModel = gltf.scene;
            this.setupSpaceBoiModel(spaceBoiModel);
            this.scene.add(spaceBoiModel);
            this.animateSpaceBoi(spaceBoiModel);
        });

        gltfLoader.load(threeJSModelConfig.twitterLogo.url, (gltf) => {
            const twitterLogoModel = gltf.scene;
            this.setupTwitterLogoModel(twitterLogoModel);
            this.scene.add(twitterLogoModel);
            this.animateTwitterLogo(twitterLogoModel);
        });
    }

    private setupSpaceBoiModel(model: THREE.Object3D) {
        model.position.set(threeJSModelConfig.spaceBoi.position.x, threeJSModelConfig.spaceBoi.position.y, threeJSModelConfig.spaceBoi.position.z);
        model.rotation.set(threeJSModelConfig.spaceBoi.rotation.x, threeJSModelConfig.spaceBoi.rotation.y, threeJSModelConfig.spaceBoi.rotation.z);
        model.visible = threeJSModelConfig.spaceBoi.visible;
        model.castShadow = threeJSModelConfig.spaceBoi.castShadow;
        model.receiveShadow = threeJSModelConfig.spaceBoi.receiveShadow;
    }

    private setupTwitterLogoModel(model: THREE.Object3D) {
        model.position.set(threeJSModelConfig.twitterLogo.position.x, threeJSModelConfig.twitterLogo.position.y, threeJSModelConfig.twitterLogo.position.z);
        model.rotation.set(threeJSModelConfig.twitterLogo.rotation.x, threeJSModelConfig.twitterLogo.rotation.y, threeJSModelConfig.twitterLogo.rotation.z);
        model.visible = threeJSModelConfig.twitterLogo.visible;
        model.castShadow = threeJSModelConfig.twitterLogo.castShadow;
        model.receiveShadow = threeJSModelConfig.twitterLogo.receiveShadow;
        model.userData.onClick = () => {
            // Redirect the user to a new page
            window.location.href = threeJSModelConfig.twitterLogo.redirectUrl;
        };
    }

    private animateSpaceBoi(model: THREE.Object3D) {
        gsap.to(model.rotation, threeJSModelConfig.spaceBoi.animation);
    }

    private animateTwitterLogo(model: THREE.Object3D) {
        gsap.to(model.rotation, threeJSModelConfig.twitterLogo.animation);
    }

    private setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.maxPolarAngle = threeJSSceneConfig.maxTilt;
        this.controls.maxAzimuthAngle = threeJSSceneConfig.maxPan;
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    animate = () => {
        if (this.controls) {
            this.controls.update();
            requestAnimationFrame(this.animate);
            this.renderer.render(this.scene, this.camera);
        }
    };
}