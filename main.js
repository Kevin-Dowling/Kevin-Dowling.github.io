// Setup webcam
const video = document.getElementById('video');

navigator.mediaDevices.getUserMedia({ video: {} })
  .then(stream => {
    video.srcObject = stream;
  });

// Setup Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

// Load face-api.js models
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
]).then(startVideo);

function startVideo() {
  video.play();
}

// Detect face position and adjust camera
video.addEventListener('play', () => {
  setInterval(async () => {
    const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
    if (detections) {
      const faceCenterX = (detections.landmarks.positions[0]._x + detections.landmarks.positions[16]._x) / 2;
      const offset = (faceCenterX - video.width / 2) / video.width; // normalized offset
      camera.position.x = offset * 5; // multiply for stronger effect
    }
  }, 100);
});

// Three.js render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Pillar properties
const pillarHeight = 5;
const pillarRadius = 0.5;
const pillarMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Brown color

// Create and add multiple pillars to the scene
for (let i = -2; i <= 2; i += 2) {  // Positioning pillars at intervals
    const pillarGeometry = new THREE.CylinderGeometry(pillarRadius, pillarRadius, pillarHeight);
    const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    pillar.position.x = i; // Setting x position
    pillar.position.y = pillarHeight / 2 - 1; // Half of pillar's height minus a small offset
    scene.add(pillar);
}

// Mountain properties
const mountainBase = 3;
const mountainHeight = 7;
const mountainMaterial = new THREE.MeshBasicMaterial({ color: 0x696969 }); // Gray color

// Create and add multiple mountains to the scene
for (let i = -10; i <= 10; i += 5) {  // Positioning mountains at intervals
    const mountainGeometry = new THREE.ConeGeometry(mountainBase, mountainHeight);
    const mountain = new THREE.Mesh(mountainGeometry, mountainMaterial);
    mountain.position.x = i; // Setting x position
    mountain.position.y = -1; // Setting y position to ground level
    mountain.position.z = -10; // Placing them further back in the scene
    scene.add(mountain);
}
