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
        this.moveTo = (x, y, time) => {
            if (time == 0){
                //teleport
                this.x = x;
                this.y = y;
            } else {
                //animate
            }
        }
        this.rotate = (angspeed) => {
            //we were here
            if (angspeed > this.minspeed && angspeed < this.maxspeed){
                this.angspeed = angspeed;
                console.log("aspd: "+this.angspeed);
                if ((360 - this.direction) > angspeed){
                    this.direction = this.direction + angspeed;
                } else {
                    this.direction = this.direction + (angspeed - (360 - this.direction))
                }
            }
        }
        this.rotateTo = (direction, time) => {
            console.log("dir: "+this.direction);
            if (time == 0){
                //teleport
                this.direction = direction;
            } else {
                //animate
            }
        }
        this.scale = (w, h) => {
            //position
            this.x = this.x - (((this.x + w)-this.x)/2);
            this.y = this.y - (((this.y + h)-this.y)/2);
            //size
            this.width = this.width + w;
            this.height = this.height + h;
        }
        this.scaleTo = (w, h, time) => {
            if (time == 0){
                //teleport
                this.x = this.x - (((this.x*w)-this.x)/2);
                this.y = this.y - (((this.y*h)-this.y)/2);
                //size
                this.width = this.width*w;
                this.height = this.height*h;
            } else {
                //animate
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
            //add speed vector components
            var Cx = fx.x + py.x;
            var Cy = fx.y + py.y;
            //resultant vector of the present speed and proposed speed vectors
            var resspeed = Math.sqrt((Cx**2)+(Cy**2));
            this.rotateTo(angle, this.angspeed);
            this.move(this.direction, resspeed);
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