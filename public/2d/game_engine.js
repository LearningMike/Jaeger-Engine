// @michael_abia_v1 2022
// Game Engine Variables and Functions

var Game = {
    "name":"",
    "height": window.innerHeight,
    "width" : window.innerWidth,
    "lastframe" : performance.now(),
    "assets" : [],
    "ready" : false,
    "play" : false,
    "grid" : false,
    "fps" : false,
    "online" : false,
    "key" : {},
    "collisionGraph": []
}

var drawCharacter = (cursor, character, characterX, characterY, characterW, characterH) => {
    cursor.beginPath();
    cursor.drawImage(character, characterX, characterY, characterW, characterH);
    cursor.closePath();
    cursor.imageSmoothingEnabled = false;
    if(Game.grid == true){
        //show position
        cursor.beginPath();
        cursor.font = '20px Arial';
        cursor.fillStyle = '#999';
        cursor.fillText('x='+characterX+', y='+characterY, characterX, characterY);
    }
}

var graph = (cursor) => {
    //horizontal lines
    for (let i = 0; i <= Game.height; i++) {
        if (i%50 == 0) {
            cursor.beginPath();
            cursor.lineWidth = 0.5;
            cursor.moveTo(0, i);
            cursor.font = '20px Arial';
            cursor.fillStyle = '#999';
            cursor.fillText(i, 0, i);
            cursor.lineTo(Game.width, i);
            cursor.strokeStyle = "#cfc";
            cursor.stroke();   
        }
    }
    //vertical lines
    for (let i = 0; i <= Game.width; i++) {
        if (i%50 == 0) {
            cursor.beginPath();
            cursor.lineWidth = 0.5;
            cursor.moveTo(i, 0);
            cursor.font = '20px Arial';
            cursor.fillStyle = '#999';
            cursor.fillText(i, i, 20);
            cursor.lineTo(i, Game.height);
            cursor.strokeStyle = "#cfc";
            cursor.stroke();
        }
    }
}

var fps = () => {
    //calculate the time difference and set fps
    var currentFPS = Math.round(1000/((performance.now() - Game.lastframe)));
    document.getElementById("stat").innerText = " FPS: "+currentFPS;
    document.getElementById("pdetails").innerText = ":: 2D/" + Game.name + " | FPS: "+currentFPS;
    Game.lastframe = performance.now();
}

var mousePosition = (evt) => {
    // Get the canvas size and position relative to the web page
    let canvasDimensions = canvas.getBoundingClientRect();
    // Get canvas x & y position
    mousePos.x = Math.floor(evt.clientX - canvasDimensions.left);
    mousePos.y = Math.floor(evt.clientY - canvasDimensions.top);
 
    // Convert to coordinate graph
    mousePos.x -= 300;
    mousePos.y = -1 * (mousePos.y - 300);
    return mousePos;
}

class Character {
    constructor (data){
        this.name = data.name;
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.direction = data.direction;
        this.speed = data.speed;
        this.angspeed = data.angspeed;
        this.maxspeed = data.maxspeed;
        this.minspeed = data.minspeed;
        this.mass = data.mass;
        this.acceleration = data.acceleration;
        this.link = data.link;
        this.image = new Image();
        this.physics = data.physics;
        this.gravity = data.gravity;
        this.friction = data.friction;
        this.massphysics = data.massphysics;
        this.input = data.input;
        Game.assets.push(this);
        this.getvector = (direction, magnitude) => {
            //choose quadrant based on the canvas position style
            if (direction >= 0 && direction < 90 || direction == 360){
                var x = magnitude * Math.cos((90-direction) * Math.PI / 180);
                var y = -magnitude * Math.sin((90-direction) * Math.PI / 180);
                return {x, y};
            } else if (direction >= 90 && direction < 180){
                var x = magnitude * Math.cos((direction-90)* Math.PI / 180);
                var y = magnitude * Math.sin((direction-90)* Math.PI / 180);
                return {x, y};
            } else if (direction >= 180 && direction < 270){
                var x = -magnitude * Math.cos((270-direction) * Math.PI / 180);
                var y = magnitude * Math.sin((270-direction) * Math.PI / 180);
                return {x, y};
            } else if (direction >= 270 && direction < 360){
                var x = -magnitude * Math.cos((direction-270) * Math.PI / 180);
                var y = -magnitude * Math.sin((direction-270) * Math.PI / 180);
                return {x, y};
            }
        }
        this.getangle = (x1, y1, x2, y2) => {
            var direction = Math.atan2((y1+y2), (x1+x2));
            direction = direction * (180/Math.PI);
            direction = direction + 90;
            if (direction >= -90 && direction < 0) {
                direction = 360 - Math.abs(direction);
            }
            var magnitude = Math.sqrt(((x1+x2)**2) + ((y1+y2)**2));
            console.log(direction+"° :"+magnitude);
            return {direction, magnitude};
        }
        this.move = (direction, speed) => {
            if (speed > this.minspeed && speed < this.maxspeed){
                this.direction = direction;
                this.speed = speed;
                console.log("spd: "+this.speed);
            }
            //get velocity vector components
            var vector = this.getvector(direction, this.speed);
            this.x = this.x + vector.x;
            this.y = this.y + vector.y;
        }
        this.moveTo = (x, y, speed) => {
            if (this.x <= (x+1) && this.x >= (x-1) && this.y <= (y+1) && this.y >= (y-1)) {
                //do nothing
            } else {
                var rotcev = this.getangle(-this.x, -this.y, x, y);
                this.move(rotcev.direction, speed);
            }
        }
        this.rotate = (angspeed) => {
            if ((this.direction+angspeed) < 0 ) {
                this.direction = 360 + (this.direction+angspeed);
            } else if (this.direction+angspeed > 360){
                this.direction = (this.direction+angspeed) - 360;
            } else {
                this.direction = this.direction + angspeed;
            }
            this.angspeed = angspeed;
        }
        this.rotateTo = (direction, angspeed) => {
            if (this.direction <= (direction+1) && this.direction >= (direction-1)){
                //do nothing
            } else {
                //make sure it reaches the angle
                if ((Math.abs(this.direction-direction)) < angspeed){
                    angspeed = Math.abs(this.direction-direction);
                }
                //pick the shortest direction to turn
                if (direction > this.direction){
                    if ((direction - this.direction) <= 180){
                        this.rotate(angspeed);
                    } else {
                        this.rotate(-angspeed);
                    }
                } else {
                    if ((this.direction - direction) <= 180){
                        this.rotate(-angspeed);
                    } else {
                        this.rotate(angspeed);
                    }
                }
            }   
        }
        this.scale = (w, h) => {
            //reposition
            this.x = this.x - (((this.width * w)-this.width)/2);
            this.y = this.y - (((this.height * h)-this.height)/2);
            //resize
            this.width = this.width * w;
            this.height = this.height * h;
        }
        this.scaleTo = (width, height, speed) => {
            if (this.width < (width+1) && this.width > (width-1) && this.height < (height+1) && this.height > (height-1)){
                //do nothing
            } else {
                this.scale((1+(speed/width)), (1+(speed/height)));
            }
        }
        this.applyforce = (angle, force) => {
            //get components of the future speed and present speed vectors
            var speedfx = this.speed+(force/this.mass);
            var anglefx = angle;
            var speedpy = this.speed;
            var anglepy = this.direction;
            var fx = this.getvector(anglefx, speedfx);
            var py = this.getvector(anglepy, speedpy);

            //resultant vector of the present speed and proposed speed vectors
            var resspeed = this.getangle(fx.x, fx.y, py.x, py.y).magnitude;
            //var resangle = this.getangle(fx.x, fx.y, py.x, py.y).direction;
            this.move(angle, resspeed);
        }
        this.showimage = (link) => {
            this.image.src = link;
            this.image.onload = () => {
                console.log(this.name+" loaded "+link);
            }
            asset.image.onerror = () => {
                alert(this.name+" failed to get "+link);
            }
        }
    }
}

window.onload = () => {
    //load all starting assets images, if assets have multiple images in future do a nested loop
    for (i = 0; i < Game.assets.length; i++) {
        const asset = Game.assets[i];
        const percent = ((i+1)/Game.assets.length)*100;
        asset.image.src = asset.link;
        asset.image.onload = () => {
            console.log(asset.name+" loaded "+percent+"% complete");
            if (percent == 100){
                Game.ready = true;
            }
        }
        asset.image.onerror = () => {
            alert(asset.name+" failed to get image");
        }
    }
};

window.onkeydown = input = (e) => {

    Game.key[e.code] = true;

};

window.onkeyup = input = (e) => {

    Game.key[e.code] = false;

};