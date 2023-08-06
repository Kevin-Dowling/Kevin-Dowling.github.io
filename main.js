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
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
