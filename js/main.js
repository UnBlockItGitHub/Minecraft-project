const scene = new THREE.Scene();
scene.background = new THREE.Color(Config.SKY_COLOR);

const camera = new THREE.PerspectiveCamera(75, Config.SCREEN_WIDTH / Config.SCREEN_HEIGHT, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(Config.SCREEN_WIDTH, Config.SCREEN_HEIGHT);
document.getElementById('game').appendChild(renderer.domElement);

const chunk = new Chunk();
chunk.draw(scene);

const player = new Player(camera);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
