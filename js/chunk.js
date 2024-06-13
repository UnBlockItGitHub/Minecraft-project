class Chunk {
    constructor() {
        this.chunkData = [];
        this.generateChunk();
    }

    generateChunk() {
        for (let x = 0; x < Config.CHUNK_SIZE; x++) {
            this.chunkData[x] = [];
            for (let y = 0; y < Config.CHUNK_SIZE; y++) {
                this.chunkData[x][y] = [];
                for (let z = 0; z < Config.WORLD_HEIGHT; z++) {
                    this.chunkData[x][y][z] = (z === 0) ? 1 : 0;  // Ground layer
                }
            }
        }
    }

    draw(scene) {
        const geometry = new THREE.BoxGeometry(Config.BLOCK_SIZE, Config.BLOCK_SIZE, Config.BLOCK_SIZE);
        const material = new THREE.MeshBasicMaterial({ color: 0x8b4513 });  // Brown color for dirt blocks
        for (let x = 0; x < Config.CHUNK_SIZE; x++) {
            for (let y = 0; y < Config.CHUNK_SIZE; y++) {
                for (let z = 0; z < Config.WORLD_HEIGHT; z++) {
                    if (this.chunkData[x][y][z] !== 0) {
                        const cube = new THREE.Mesh(geometry, material);
                        cube.position.set(x * Config.BLOCK_SIZE, z * Config.BLOCK_SIZE, y * Config.BLOCK_SIZE);
                        scene.add(cube);
                    }
                }
            }
        }
    }
}
