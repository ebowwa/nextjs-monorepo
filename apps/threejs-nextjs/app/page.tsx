// src/app/page.tsx
"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
import { VertexTangentsHelper } from 'three/addons/helpers/VertexTangentsHelper.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

type ThreeJSPageState = {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  light: THREE.PointLight;
  controls: OrbitControls | null;
  modelGroup: THREE.Group | null;
};

export default function ThreeJSPage() {
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (isInitializedRef.current) {
      return;
    }

    const state: ThreeJSPageState = {
      scene: new THREE.Scene(),
      renderer: new THREE.WebGLRenderer(),
      camera: new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000),
      light: new THREE.PointLight(),
      controls: null,
      modelGroup: null,
    };

    function init() {
      state.renderer.setPixelRatio(window.devicePixelRatio);
      state.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(state.renderer.domElement);

      state.camera.position.z = 400;

      state.light.position.set(200, 100, 150);
      state.scene.add(state.light);

      state.scene.add(new THREE.PointLightHelper(state.light, 15));

      const gridHelper = new THREE.GridHelper(400, 40, 0x0000ff, 0x808080);
      gridHelper.position.y = -150;
      gridHelper.position.x = -150;
      state.scene.add(gridHelper);

      const polarGridHelper = new THREE.PolarGridHelper(200, 16, 8, 64, 0x0000ff, 0x808080);
      polarGridHelper.position.y = -150;
      polarGridHelper.position.x = 200;
      state.scene.add(polarGridHelper);

      const loader = new GLTFLoader();
      loader.load('https://cdn.jsdelivr.net/gh/ebowwar/threejs-assets@main/space_boi.glb', (gltf) => {
        const mesh = gltf.scene.children[0] as THREE.Mesh;

        try {
          mesh.geometry.computeTangents();
        } catch (error) {
          console.error('Error computing tangents:', error);
        }

        const group = new THREE.Group();
        group.scale.multiplyScalar(50);
        group.position.y = -150;
        state.scene.add(group);

        group.updateMatrixWorld(true);
        group.add(mesh);

        const vnh = new VertexNormalsHelper(mesh, 5);
        vnh.position.y = -150;
        group.add(vnh);

        const vth = new VertexTangentsHelper(mesh, 5);
        vth.position.y = -150;
        group.add(vth);

        const wireframeMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          depthTest: false,
          opacity: 0.25,
          transparent: true,
        });

        const edgesMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          depthTest: false,
          opacity: 0.25,
          transparent: true,
        });

        const wireframe = new THREE.LineSegments(
          new THREE.WireframeGeometry(mesh.geometry),
          wireframeMaterial
        );
        wireframe.position.x = 4;
        wireframe.position.y = -150;
        group.add(wireframe);

        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(mesh.geometry),
          edgesMaterial
        );
        edges.position.x = -4;
        edges.position.y = -150;
        group.add(edges);

        state.modelGroup = group;
        state.scene.add(state.modelGroup);
        state.scene.add(new THREE.BoxHelper(state.modelGroup));
      }, undefined, (error) => {
        console.error('Error loading GLTF model:', error);
      });

      state.controls = new OrbitControls(state.camera, state.renderer.domElement);
      state.controls.target.set(0, 0, 0);
      state.controls.update();

      // Prevent the user from going below the 2D x-axis (surface)
      state.controls.minPolarAngle = Math.PI / 2;
      state.controls.maxPolarAngle = Math.PI / 2;
      // Note: You may want to implement a more complex solution to manage the state of the x-axis
      // and prevent the user from going below the ground level, while still allowing them to interact
      // with the scene above the ground. This could involve techniques like collision detection,
      // ray casting, or defining a bounding box for the camera movement.

      window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
      state.camera.aspect = window.innerWidth / window.innerHeight;
      state.camera.updateProjectionMatrix();

      state.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);

      if (state.controls) {
        state.controls.update();
      }

      if (state.modelGroup) {
        state.modelGroup.rotation.y += 0.01;
      }

      state.renderer.render(state.scene, state.camera);
    }

    init();
    animate();

    isInitializedRef.current = true;

    return () => {
      window.removeEventListener('resize', onWindowResize);
      state.renderer.dispose();
    };
  }, []);

  return <div id="three-js-container"></div>;
}
