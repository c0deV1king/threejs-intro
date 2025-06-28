// importing threejs
import * as THREE from "three";

// setting up the basic scene
const scene = new THREE.Scene();
// creating the camera
// 4 values here: fov, aspect ratio, near plane, far plane (planes are basically the focus distance on a camera irl)
const camera = new THREE.PerspectiveCamera(
  75,
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
camera.position.z = 5;

// a simple render loop to render the scene and camera
// This function is called every frame to update the scene
// most screens run at 60fps
function animate() {
  // rotating the cube infinitely
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
