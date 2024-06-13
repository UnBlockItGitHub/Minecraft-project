class Player {
    constructor(camera) {
        this.camera = camera;
        this.camera.position.set(0, 5, 10);
        this.camera.lookAt(0, 0, 0);
        this.moveSpeed = 0.1;

        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    onKeyDown(event) {
        switch (event.key) {
            case 'w':
                this.camera.position.z -= this.moveSpeed;
                break;
            case 's':
                this.camera.position.z += this.moveSpeed;
                break;
            case 'a':
                this.camera.position.x -= this.moveSpeed;
                break;
            case 'd':
                this.camera.position.x += this.moveSpeed;
                break;
            case '[':
                this.toggleDebug();
                break;
        }
    }

    toggleDebug() {
        const debugInfo = document.getElementById('debug-info');
        if (debugInfo) {
            debugInfo.remove();
        } else {
            const info = document.createElement('div');
            info.id = 'debug-info';
            info.style.position = 'absolute';
            info.style.top = '10px';
            info.style.left = '10px';
            info.style.color = 'white';
            info.innerHTML = `FPS: ${Math.round(1000 / (performance.now() - this.lastFrameTime))}<br>Coordinates: ${this.camera.position.x.toFixed(2)}, ${this.camera.position.y.toFixed(2)}, ${this.camera.position.z.toFixed(2)}`;
            document.body.appendChild(info);
            this.lastFrameTime = performance.now();
        }
    }
}
