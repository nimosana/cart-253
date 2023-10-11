class Projectile {
    static projectiles = [];
    constructor(x, y, size, speed, angle) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.angle = angle;
    }
    static shoot(x, y, angle, fireRate) {
        if ((keyIsDown(32) || (mouseIsPressed && mouseButton === LEFT)) && frameCount % fireRate === 0) {
            Projectile.projectiles.push(new Projectile(x, y, windowWidth * 3.90625E-3, windowWidth * 7.8125E-3 * 3, angle));
        }
    }
    static moveDrawProjectiles(cameraOffsetX, cameraOffsetY) {
        for (let projectile of Projectile.projectiles) {
            projectile.x += (cos(projectile.angle) * projectile.speed);
            projectile.y += (sin(projectile.angle) * projectile.speed);
            console.log(`Proj speeds: X: ${cos(projectile.angle)} speed: ${projectile.speed}`)
            ellipse(projectile.x + cameraOffsetX, projectile.y + cameraOffsetY, projectile.size, projectile.size);
        }
    }
}