// importing threejs
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// setting up the basic scene
const scene = new THREE.Scene();
// creating the camera
// 4 values here: fov, aspect ratio, near plane, far plane (planes are basically the focus distance on a camera irl)
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// creating the renderer
const renderer = new THREE.WebGLRenderer();
// sets how big your canvas is with the 3D scene (Note: window.innerWidth and window.innerHeight are the width and height of the browser window)
renderer.setSize(window.innerWidth, window.innerHeight);
// appending the renderer's canvas to the body of the document. Basically taking the renderer's canvas and sending it to the html page so you can see it
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// creating a simple cube to the scene
// BoxGeometry is a built-in geometry in three.js that creates a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
// MeshBasicMaterial is a built-in material in three.js that creates a basic material with a color
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// Mesh takes a defined material and a defined geometry and combines them into a mesh
const cube = new THREE.Mesh(geometry, material);
// scene.add() adds the created mesh to the scene, by default it sends it to 0, 0, 0
scene.add(cube);
// moving the camera back on the z axis so we can see the cube. By default the camera is also set at 0 , 0, 0.
camera.position.set(3, 5, 5); // x, y, z
camera.lookAt(0, 0, 0); // look at the center of the scene

const LineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });

const points = [];
points.push(new THREE.Vector3(50, 0, 0));
points.push(new THREE.Vector3(0, 0, 0));
points.push(new THREE.Vector3(-50, 0, 0));

const LineGeometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(LineGeometry, LineMaterial);

scene.add(line);

const loader = new GLTFLoader();

loader.load(
  "./terrarium/scene.gltf",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// a simple render loop to render the scene and camera
// This function is called every frame to update the scene
// most screens run at 60fps
function animate() {
  // rotating the cube infinitely
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
