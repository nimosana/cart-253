/** Projectile class
 * @author Nicolas Morales-Sanabria
 Allows the creation, repositioning and drawing of a single or multiple Projectile objects 
 at different positions, with different speeds, sizes and directions*/
class Projectile {
    
    //Array of exisitng projectiles
    static projectiles = [];
    /** Creates a new projectile at the desired coordinates, with the desired size, speed and angle
     * @param  x desired horizontal position
     * @param  y desired vertical position
     * @param  size desired size
     * @param  speed desired acceleration
     * @param  angle desired max speed
     */
    constructor(x, y, size, speed, angle) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.angle = angle;
    }
    /**creates a projectile at the desired position and angle, with a set size and velocity, adds it to an array of existing projectiles */
    static shoot(x, y, angle) {
        if ((keyIsDown(32) || (mouseIsPressed && mouseButton === LEFT))) {
            Projectile.projectiles.push(new Projectile(x, y, windowWidth * 3.90625E-3, windowWidth * 7.8125E-3 * 2, angle));
        }
    }

    /** recalculates the positions of existing projectiles according to their angle and draws them taking into account any visual offsets
     * @param cameraOffsetX any horizontal offset to take into account to draw the projectile
     * @param cameraOffsetY any vertical offset to take into account to draw the projectile */
    static moveDrawProjectiles(cameraOffsetX, cameraOffsetY) {
        for (let projectile of Projectile.projectiles) {
            projectile.x += (cos(projectile.angle) * projectile.speed);
            projectile.y += (sin(projectile.angle) * projectile.speed);
            ellipse(projectile.x + cameraOffsetX, projectile.y + cameraOffsetY, projectile.size, projectile.size);
            // console.log(`Proj speeds: X: ${cos(projectile.angle)} speed: ${projectile.speed}`);
        }
    }
}