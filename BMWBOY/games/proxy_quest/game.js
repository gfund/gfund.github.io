wall_max = 300;

function collides(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

class matt {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.health = 3;
        this.state = "idle";
        this.vel = 0;
        this.velY = 0;
        this.width = 32;
        this.height = 32;
        this.powerup = false;
        this.dir = true;
        this.onGround = false;
    }
}

class defect {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dir = false;
        this.vel = 1;
        this.dead = false;
        this.width = 32;
        this.height = 32;
    }

    update(player) {
        if (this.dead) return;

        if (collides(this, player)) {
            if (player.y + player.height - 5 <= this.y) {
                this.dead = true;
            } else {
                if (!player.powerup) {
                    player.health -= 1;
                    player.health = Math.max(player.health, 0);
                }
            }
            return;
        }

        if (this.dir == false) {
            this.x += this.vel;
        } else {
            this.x -= this.vel;
        }
        if (this.x >= wall_max - 20 || this.x <= 20) {
            this.dir = !this.dir;
        }
    }
}

// Platforms: { x, y, width, height }
const PLATFORMS = [
    { x: 20,  y: 180, width: 80,  height: 10 },
    { x: 130, y: 140, width: 80,  height: 10 },
    { x: 220, y: 100, width: 80,  height: 10 },
];

const FLOOR_Y = 220;
const GRAVITY = 0.5;
const JUMP_FORCE = -9;

let _canvas, _ctx;
let player;
let defects = [];
let bg = new Image();
let mattImg = new Image();
let mattJumpImg = new Image();
let defectImg = new Image();
let gameOver = false;
let won = false;
let endImg = new Image();
let imagesLoaded = 0;
const TOTAL_IMAGES = 5;

function onImageLoad() {
    imagesLoaded++;
}

const controller = {
    press(btnId) {
        if (gameOver) return;
        if (btnId === 'btn-right') {
            player.vel = 3;
            player.dir = true;
            player.state = 'walk';
        }
        if (btnId === 'btn-left') {
            player.vel = -3;
            player.dir = false;
            player.state = 'walk';
        }
        if (btnId === 'btn-a' || btnId === 'btn-b') {
            if (player.onGround) {
                player.velY = JUMP_FORCE;
                player.onGround = false;
                player.state = 'jump';
            }
        }
    },
    release(btnId) {
        if (btnId === 'btn-right' || btnId === 'btn-left') {
            player.vel = 0;
            if (player.onGround) player.state = 'idle';
        }
    }
};

function init(canvas, ctx) {
    _canvas = canvas;
    _ctx = ctx;

    player = new matt(50, FLOOR_Y - 32);

    defects = [];
    for (let i = 0; i < 10; i++) {
        defects.push(new defect(30 + i * 25, FLOOR_Y - 32));
    }

    bg.onload = onImageLoad;
    bg.src = './games/proxyquest/bg.png';

    mattImg.onload = onImageLoad;
    mattImg.src = './games/proxyquest/matt.png';

    mattJumpImg.onload = onImageLoad;
    mattJumpImg.src = './games/proxyquest/matt_jump.png';

    defectImg.onload = onImageLoad;
    defectImg.src = './games/proxyquest/defect.png';

    endImg.onload = onImageLoad;
    endImg.src = './games/proxyquest/end.png';

    gameOver = false;
    won = false;
}

function update() {
    if (gameOver) return;

    // Gravity
    player.velY += GRAVITY;
    player.y += player.velY;
    player.x += player.vel;

    // Clamp to canvas width
    player.x = Math.max(0, Math.min(_canvas.width - player.width, player.x));

    // Floor collision
    player.onGround = false;
    if (player.y + player.height >= FLOOR_Y) {
        player.y = FLOOR_Y - player.height;
        player.velY = 0;
        player.onGround = true;
        if (player.state === 'jump') player.state = 'idle';
    }

    // Platform collision
    for (const plat of PLATFORMS) {
        if (
            player.velY >= 0 &&
            player.x + player.width > plat.x &&
            player.x < plat.x + plat.width &&
            player.y + player.height >= plat.y &&
            player.y + player.height <= plat.y + 15
        ) {
            player.y = plat.y - player.height;
            player.velY = 0;
            player.onGround = true;
            if (player.state === 'jump') player.state = 'idle';
        }
    }

    // Defect updates
    for (const d of defects) {
        d.update(player);
    }

    // Win condition — all defects dead
    if (defects.every(d => d.dead)) {
        won = true;
        gameOver = true;
    }

    // Lose condition
    if (player.health <= 0) {
        gameOver = true;
        won = false;
    }
}

function render() {
    _ctx.clearRect(0, 0, _canvas.width, _canvas.height);

    // Background
    if (bg.complete) {
        _ctx.drawImage(bg, 0, 0, _canvas.width, _canvas.height);
    } else {
        _ctx.fillStyle = '#222';
        _ctx.fillRect(0, 0, _canvas.width, _canvas.height);
    }

    // Platforms (orange lines)
    _ctx.strokeStyle = 'orange';
    _ctx.lineWidth = 3;
    for (const plat of PLATFORMS) {
        _ctx.beginPath();
        _ctx.moveTo(plat.x, plat.y);
        _ctx.lineTo(plat.x + plat.width, plat.y);
        _ctx.stroke();
    }

    // Floor line
    _ctx.beginPath();
    _ctx.moveTo(0, FLOOR_Y);
    _ctx.lineTo(_canvas.width, FLOOR_Y);
    _ctx.stroke();

    // Defects
    for (const d of defects) {
        if (!d.dead) {
            if (defectImg.complete) {
                _ctx.drawImage(defectImg, d.x, d.y, d.width, d.height);
            } else {
                _ctx.fillStyle = 'red';
                _ctx.fillRect(d.x, d.y, d.width, d.height);
            }
        }
    }

    // Matt
    const sprite = player.state === 'jump' ? mattJumpImg : mattImg;
    if (sprite.complete) {
        if (!player.dir) {
            _ctx.save();
            _ctx.scale(-1, 1);
            _ctx.drawImage(sprite, -player.x - player.width, player.y, player.width, player.height);
            _ctx.restore();
        } else {
            _ctx.drawImage(sprite, player.x, player.y, player.width, player.height);
        }
    } else {
        _ctx.fillStyle = 'blue';
        _ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    // Health bar
    _ctx.fillStyle = 'red';
    _ctx.fillRect(10, 10, player.health * 20, 8);
    _ctx.strokeStyle = 'white';
    _ctx.strokeRect(10, 10, 60, 8);

    // Game over / win screen
    if (gameOver) {
        if (won && endImg.complete) {
            _ctx.drawImage(endImg, 0, 0, _canvas.width, _canvas.height);
        } else if (!won) {
            _ctx.fillStyle = 'rgba(0,0,0,0.6)';
            _ctx.fillRect(0, 0, _canvas.width, _canvas.height);
            _ctx.fillStyle = 'white';
            _ctx.font = 'bold 24px Arial';
            _ctx.textAlign = 'center';
            _ctx.fillText('MATT DIED... AGAIN', _canvas.width / 2, _canvas.height / 2);
        }
    }
}

function start() {
    function loop() {
        update();
        render();
        if (!gameOver) requestAnimationFrame(loop);
    }
    loop();
}

function stop() {
    gameOver = true;
}

window.__proxyquest = { controller, init, start, stop };