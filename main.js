const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
const gravity = 0.7;
const moveSpeed = 5;
const jumpPower = -20;
c.fillRect(0, 0, canvas.width, canvas.height);
class Sprite {
    constructor({ position, velocity, color = 'red' }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastKey;
        this.attackBox = { position: this.position, width: 200, height: 50 };
        this.color = color;
        this.isAttacking;
    }
    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, 50, this.height);

        if (this.isAttacking) {
            c.fillStyle = 'green';
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            );
        }
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }
    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
}
const keys = {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowUp: { pressed: false },
};
const player = new Sprite({ position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 } });
const enemy = new Sprite({ position: { x: 400, y: 100 }, velocity: { x: 0, y: 0 }, color: 'blue' });
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
    player.velocity.x = 0;
    enemy.velocity.x = 0;
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -moveSpeed;
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = moveSpeed;
    }
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -moveSpeed;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = moveSpeed;
    }

    if (
        player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
        player.attackBox.position.x <= enemy.position.x + enemy.width &&
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
        player.attackBox.position.y <= enemy.position.y + enemy.height &&
        player.isAttacking
    ) {
		console.log("!")
        player.isAttacking = false;
    }
}
animate();
window.addEventListener('keydown', (event) => {
	console.log(event.key)
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
            player.velocity.y = jumpPower;
            player.lastKey = 'w';
            break;
		case ' ':
            player.attack();
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp': //
            keys.ArrowUp.pressed = true;
            enemy.velocity.y = jumpPower;
            enemy.lastKey = 'ArrowUp';
            break;
    }
});
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = false;
            lastKey = 'a';
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            enemy.lastKey = 'ArrowLeft';
            break;
    }
});