class Player {
    constructor(camera) {
        this.camera = camera;
        this.moveSpeed = 0.1;
        this.turnSpeed = 0.002;
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.keys = { forward: false, backward: false, left: false, right: false };
        this.pitch = new THREE.Object3D();
        this.pitch.add(this.camera);
        this.yaw = new THREE.Object3D();
        this.yaw.add(this.pitch);
        this.yaw.position.y = 5;  // Set initial camera height

        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('click', () => {
            document.body.requestPointerLock();
        });
    }

    onKeyDown(event) {
        switch (event.key) {
            case 'w':
                this.keys.forward = true;
                break;
            case 's':
                this.keys.backward = true;
                break;
            case 'a':
                this.keys.left = true;
                break;
            case 'd':
                this.keys.right = true;
                break;
            case '[':
                this.toggleDebug();
                break;
        }
    }

    onKeyUp(event) {
        switch (event.key) {
            case 'w':
                this.keys.forward = false;
                break;
            case 's':
                this.keys.backward = false;
                break;
            case 'a':
                this.keys.left = false;
                break;
            case 'd':
                this.keys.right = false;
                break;
        }
    }

    onMouseMove(event) {
        if (document.pointerLockElement === document.body) {
            this.yaw.rotation.y -= event.movementX * this.turnSpeed;
            this.pitch.rotation.x -= event.movementY * this.turnSpeed;
            this.pitch.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch.rotation.x));
        }
    }

    update(delta) {
        this.direction.z = Number(this.keys.forward) - Number(this.keys.backward);
        this.direction.x = Number(this.keys.right) - Number(this.keys.left);
        this.direction.normalize();

        if (this.keys.forward || this.keys.backward) {
            this.velocity.z -= this.direction.z * this.moveSpeed * delta;
        } else {
            this.velocity.z = 0;
        }

        if (this.keys.left || this.keys.right) {
            this.velocity.x -= this.direction.x * this.moveSpeed * delta;
        } else {
            this.velocity.x = 0;
        }

        this.yaw.translateX(this.velocity.x);
        this.yaw.translateZ(this.velocity.z);

        this.updateDebugInfo();
    }

    toggleDebug() {
        this.debugMode = !this.debugMode;
        if (this.debugMode) {
            const info = document.createElement('div');
            info.id = 'debug-info';
            document.body.appendChild(info);
            this.updateDebugInfo();
        } else {
            const info = document.getElementById('debug-info');
            if (info) {
                info.remove();
            }
        }
    }

    updateDebugInfo() {
        if (this.debugMode) {
            const info = document.getElementById('debug-info');
            if (info) {
                const currentTime = performance.now();
                const fps = Math.round(1000 / (currentTime - this.lastFrameTime));
                info.innerHTML = `FPS: ${fps}<br>Coordinates: ${this.yaw.position.x.toFixed(2)}, ${this.yaw.position.y.toFixed(2)}, ${this.yaw.position.z.toFixed(2)}`;
                this.lastFrameTime = currentTime;
            }
        }
    }

    getObject() {
        return this.yaw;
    }
}
