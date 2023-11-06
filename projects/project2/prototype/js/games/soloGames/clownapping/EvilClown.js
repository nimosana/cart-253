/** Evil Clown class
 * @author Nicolas Morales-Sanabria
 * Allows the creation of evil clowns with a shared texture that can move around chasing other objects,
 * and rotate following the mouse */
class EvilClown {

    /** Creates an evil clown object at the desired position, with the desired size, acceleration & max speed
     * @param  x desired horizontal position
     * @param  y desired vertical position
     * @param  size desired size
     * @param  accel desired acceleration
     * @param  maxSpeed desired max speed */
    constructor(x, y, size, accel, maxSpeed) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.size = size;
        this.accel = accel;
        this.maxSpeed = maxSpeed;
        this.speed = 0;
        this.angle;
        this.fireDelay = 0;
        this.health = 100;
    }

    /** calculates the angle between the clown & the target and draws him rotated, taking into account any camera offset
     * @param cameraOffsetX any horizontal offset to take into account to draw
     * @param cameraOffsetY any vertical offset to take into account to draw */
    displayRotatingClown(cameraOffsetX, cameraOffsetY, target) {
        push();
        this.angle = atan2(target.y - this.y - (this.vy * 4), target.x - this.x - (this.vx * 4));
        translate(this.x + cameraOffsetX, this.y + cameraOffsetY);
        rotate(this.angle - 90);
        image(evilClownImage, -this.size / 2, -this.size / 2, this.size, this.size);
        pop();
    }
}