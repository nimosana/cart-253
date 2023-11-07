p5.prototype.displayObjAsImage = function (obj, type, specialTexture, cameraOffsetX, cameraOffsetY) {
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
};

p5.prototype.chaseFleeTarget = function (mover, target, usage) {
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
};

p5.prototype.keyMovementSolo = function (obj) {
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
};

p5.prototype.displayObjRotatingToTarget = function (obj, target, texture, cameraOffsetX, cameraOffsetY) {
    push();
    angleMode(DEGREES);
    obj.angle = atan2(target.y - obj.y, target.x - obj.x);
    translate(obj.x + cameraOffsetX, obj.y + cameraOffsetY);
    rotate(obj.angle - 90);
    image(texture, -obj.size / 2, -obj.size / 2, obj.size, obj.size);
    pop();
}