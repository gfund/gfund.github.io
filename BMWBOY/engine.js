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
        this.width = 32;
        this.height = 32;
        this.powerup = false;
    }

    update(x, y, health, dir, vel, state, powerup) {
        this.powerup = powerup;
        this.x = x;
        this.y = y;
        this.health = health;
        this.dir = dir;
        this.vel = vel;
        this.state = state;
        if (this.health <= 0) {
            this.state = "dead";
        }
    }
}

class bmwoomba {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dir = false;
        this.vel = 0;
        this.dead = false;
        this.width = 32;
        this.height = 32;
    }

    update(matt, dir, vel) {
        this.dir = dir;
        this.vel = vel;

        if (collides(this, matt)) {
            if (this.y + 5 < matt.y + matt.height) {
                this.dead = true;
            } else {
                if (matt.powerup == false) {
                    matt.health -= 1;
                }
            }
            return;
        }

        if (this.dead == false) {
            if (this.dir == false) {
                this.x += vel;
            } else {
                this.x -= vel;
            }
            if (this.x >= wall_max - 20 || this.x <= 20) {
                this.dir = !this.dir;
            }
        }
    }
}