import * as THREE from '../node_modules/three/build/three.module.js';
import { TrackballControls } from '../node_modules/three/examples/jsm/controls/TrackballControls.js';
// import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

const scene = new THREE.Scene(); //for setting the scene of the canvas 
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.6,1200); //camera defines our view
camera.position.z = 5;  //changing the initial position from origin
const renderer = new THREE.WebGLRenderer({antialias:true}); //renderer renders our view

renderer.setClearColor("#233143");   //setting our background
renderer.setSize(window.innerWidth,window.innerHeight); //setting size of our render view
document.body.appendChild(renderer.domElement); //placeing in our HTML DOM

//if user resizes tab , responsive 
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

// creating box 
const boxGeometry = new THREE.BoxGeometry(2,2,2);   //passing width, height and bredth
const boxMaterial = new THREE.MeshLambertMaterial({color:0xFFFFF});    //defining color
const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);    //building the box
boxMesh.rotation.set(40,0,40);  //setting initial rotation
scene.add(boxMesh); //add the box to our scene

// rendering  
const rendering = function(){
    requestAnimationFrame(rendering);   //creates loop of the function 
    scene.rotation.z -= 0.005;  //moving the box on every rotation
    scene.rotation.x -= 0.01;
    controls.update();

    renderer.render(scene, camera);
} 

// adding light 
const light = new THREE.PointLight(0xFFFFFF,1,100);
light.position.set(5,5,5);
scene.add(light);

// adding light from all side 
const lights = [];
const lightValues = [
    {colour: 0x14D14A, intensity: 8, dist:12, X:1, y:0, z:8},
    {colour: 0xBE61CF, intensity: 6, dist: 12, x: -2, y: 1, z: -10},
    {colour: 0x00FFFF, intensity: 3, dist: 10, x: 0, y: 10, z: 1},
    {colour: 0x00FF00, intensity: 6, dist: 12, x: 0, y: -10, z: -1},
    {colour: 0x16A7F5, intensity: 6, dist: 12, x: 10, y: 3, z: 0},
    {colour: 0x90F615, intensity: 6, dist: 12, x: -10, y: -1, z: 0}
];

for (let i=0; i<6;  i++){
    lights[i] =new THREE.PointLight(
        lightValues[i]['colour'],
        lightValues[i]['intensity'],
        lightValues[i]['dist']
    );
    lights[i].position.set(
        lightValues[i]['x'],
        lightValues[i]['y'],
        lightValues[i]['z']
    );
    scene.add(lights[i]);
}

// trackball control for camera 
const controls = new TrackballControls(camera,renderer.domElement);
controls.rotateSpeed = 4;
controls.dynamicDampingFactor = 0.15;

rendering();
