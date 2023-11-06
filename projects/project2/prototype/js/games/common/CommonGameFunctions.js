class CommonGameFunctions {

    /** returns a boolean indicating if two ellipses are overlapping
     * @param a the first ellipse
     * @param b the second ellipse
     * @return true if they are overlapping, false if they aren't */
    static ellipseSuperpositionDetection(a, b) {
        if (dist(a.x, a.y, b.x, b.y) < a.size / 2 + b.size / 2)
            return true;
        else
            return false;
    }

    /** easily display images instead of shapes
     * @param obj object to be drawn
     * @param type type or case of object to be drawn
     * @param specialTexture a specific texture to be used (for type 2)*/
    static displayImage(obj, type, specialTexture, cameraOffsetX, cameraOffsetY) {
        switch (type) {
            case 0: //adjust to draw instead of an ellispe (centered)
                image(obj.texture, obj.x - obj.size / 2, obj.y - obj.size / 2, obj.size, obj.size);
                break;
            case 1: //adjust to draw instead of a square (corner)
                image(obj.texture, obj.x, obj.y, obj.size, obj.size);
                break;
            case 2: //adjust to draw instead of an ellispe but using a predefined texture
                image(specialTexture, obj.x - obj.size / 2, obj.y - obj.size / 2, obj.size, obj.size);
                break;
            case 3:
                image(obj.texture, obj.x + cameraOffsetX, obj.y + cameraOffsetY, obj.w, obj.h);
                break;
            default: //invalid type
                console.log("DisplayImage Wrong type bud: " + type);
                break;
        }
    }

    /**compares X & Y of two objects & affects the mover's accel/speed to go towards or flee the target
     * @param  mover the object being moved
     * @param  target the object being chased
     * @param  usage 1 to  chase, -1 to flee */
    static chaseFleeTarget(mover, target, usage) {
        //horizontal movement - detect direction change & affect speed
        let directionX = usage * Math.sign(target.x - mover.x);
        let accelX = directionX * mover.accel;
        mover.vx += accelX;
        //limit speed to max speed then move object
        if (abs(mover.vx) > abs(mover.maxSpeed)) {
            mover.vx = mover.maxSpeed * directionX;
        }
        mover.x += mover.vx;
        //vertical movement - detect direction change & affect speed
        let directionY = usage * Math.sign(target.y - mover.y);
        let accelY = directionY * mover.accel;
        mover.vy += accelY;
        //limit speed to max speed then move object
        if (abs(mover.vy) > abs(mover.maxSpeed)) {
            mover.vy = mover.maxSpeed * directionY;
        }
        mover.y += mover.vy;
        // console.log("mover speed X: " + mover.vx + "mover speed Y: " + mover.vy); //test acceleration
    }

    /** Allows the user to control an object's speed with accelerations, using the arrow keys or WASD
     * @param obj object to be controlled with keys */
    static keyMovementSolo(obj) {
        //horizontal movement
        if ((keyIsDown(39) && !keyIsDown(37)) || (keyIsDown(68) && !keyIsDown(65))) {
            obj.vx = obj.vx + obj.accel;
        } else if (keyIsDown(37) && !keyIsDown(39) || (keyIsDown(65) && !keyIsDown(68))) {
            obj.vx = obj.vx - obj.accel;

        } else if ((!keyIsDown(37) && !keyIsDown(39)) || (keyIsDown(37) && keyIsDown(39)) || (keyIsDown(65) && keyIsDown(68))) {
            if (abs(obj.vx) > (obj.maxSpeed * 0.01)) {
                obj.vx /= 1.03;
            } else {
                obj.vx = 0;
            }
        }
        //vertical movement
        if ((keyIsDown(38) && !keyIsDown(40)) || (keyIsDown(87) && !keyIsDown(83))) {
            obj.vy -= obj.accel;
        } else if (keyIsDown(40) && !keyIsDown(38) || (keyIsDown(83) && !keyIsDown(87))) {
            obj.vy += obj.accel;
        } else if ((!keyIsDown(40) && !keyIsDown(38)) || (keyIsDown(40) && keyIsDown(38)) || (keyIsDown(83) && keyIsDown(87))) {
            if (abs(obj.vy) > (obj.maxSpeed * 0.01)) {
                obj.vy /= 1.03;
            } else {
                obj.vy = 0;
            }
        }
        //limit to max speed
        obj.speed = sqrt(pow(obj.vx, 2) + pow(obj.vy, 2));
        if (obj.speed > obj.maxSpeed) {
            obj.vx *= (obj.maxSpeed / obj.speed);
            obj.vy *= (obj.maxSpeed / obj.speed);
        } //move obj
        obj.x += obj.vx;
        obj.y += obj.vy;
    }

    /** calculates the angle between the user and draws him rotated, taking into account any offset of the user (ie. from the middle of the screen)
     * @param cameraOffsetX any horizontal offset to take into account to draw the user
     * @param cameraOffsetY any vertical offset to take into account to draw the user */
    static displayObjRotatingToTarget(obj, target, texture, cameraOffsetX, cameraOffsetY) {
        push();
        angleMode(DEGREES);
        obj.angle = atan2(target.y - obj.y, target.x - obj.x);
        translate(obj.x + cameraOffsetX, obj.y + cameraOffsetY);
        rotate(obj.angle - 90);
        image(texture, -obj.size / 2, -obj.size / 2, obj.size, obj.size);
        pop();
        // console.log(`User angle: ${angle}`)
    }
}