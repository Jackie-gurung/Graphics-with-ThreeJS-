import * as THREE from '../node_modules/three/build/three.module.js';
import { TrackballControls } from '../node_modules/three/examples/jsm/controls/TrackballControls.js'

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

// create sphere
const sphereMeshes = [];
const sphereGeometry = new THREE.SphereGeometry(0.1,32,32);
const SphereMaterial = new THREE.MeshLambertMaterial({color:0xC56CEF});

for (let i = 0; i < 4; i++){
    sphereMeshes[i] = new THREE.Mesh(sphereGeometry,SphereMaterial);
    sphereMeshes[i].position.set(0,0,0);
    scene.add(sphereMeshes[i]);
}

// for roation of sphere 
let theta = 0;
const dtheta = 2*Math.PI/500;

// rendering  
const rendering = function(){
    requestAnimationFrame(rendering);   //creates loop of the function 
    scene.rotation.z -= 0.005;  //moving the box on every rotation
    scene.rotation.x -= 0.01;

    controls.update();

    theta += dtheta; 

    const trigs = [
        {
            x: Math.cos(theta*1.05),
            y: Math.sin(theta*1.05),
            z: Math.cos(theta*1.05),
            r: 2
        },
        {
            x: Math.cos(theta*0.8),
            y: Math.sin(theta*0.8),
            z: Math.sin(theta*0.8),
            r: 2.25
        },
        {
            x: Math.cos(theta*1.25),
            y: Math.cos(theta*1.25),
            z: Math.sin(theta*1.25),
            r: 2.5
        },
        {
            x: Math.sin(theta*0.6),
            y: Math.cos(theta*0.6),
            z: Math.sin(theta*0),
            r: 2.75
        }
    ]

    for(let i=0; i<4; i++){
        sphereMeshes[i].position.x = trigs[i]['r']*trigs[i]['x'];
        sphereMeshes[i].position.y = trigs[i]['r']*trigs[i]['y'];
        sphereMeshes[i].position.z = trigs[i]['r']*trigs[i]['z'];
    }


    renderer.render(scene, camera);
} ;

// adding light 
const light = new THREE.PointLight(0xFFFFFF,1,100);
light.position.set(5,5,5);
scene.add(light);

// adding light from all side 
const lights = [];
const lightHelpers = [];    //to visualize where lights are in space
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

    // adding light helper for each light  
    lightHelpers[i] = new THREE.PointLightHelper(lights[i],0.7);
    scene.add(lightHelpers[i]);

    //adding axes helper for the box
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
}

// trackball control for camera 
const controls = new TrackballControls(camera,renderer.domElement);
controls.rotateSpeed = 4;
controls.dynamicDampingFactor = 0.15;



rendering();
