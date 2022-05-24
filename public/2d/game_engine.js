// @michael_abia_v1 2022
// Game Engine Variables and Functions

var Game = {
    "name":"",
    "editor": false,
    "height": window.innerHeight,
    "width" : window.innerWidth,
    "lastframe" : performance.now(),
    "resistance": 0.1,
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
    cursor.imageSmoothingEnabled = false;
    if(Game.grid == true){
        //show position
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
        this.rotate = (angspeed) => {

        }
        this.rotateTo = (direction, time) => {

        }
        this.move = (direction, speed) => {
            //get velocity vector components
            if (speed > this.minspeed && speed < this.maxspeed){
                this.direction = direction;
                this.speed = speed;
                console.log("spd: "+this.speed);
            }
            var vector = this.getvector(direction, this.speed);
            this.x = this.x + vector.x;
            this.y = this.y + vector.y;
        }
        this.moveTo = (x, y, time) => {

        }
        this.scale = (x, y) => {

        }
        this.scaleTo = (x, y, time) => {

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
            //call rotateTo here with time derived from angspeed
            //and use this. direction instead of this angle
            this.move(angle, resspeed);
        }
    }
}

window.onload = () => {

    if (Game.editor){
        //get the project name from the searchparams
        let pparams = (new URL(document.location)).searchParams;
        let pname = pparams.get('name');
        if (pname != null || pname != "") {
            Game.name = pname.replaceAll(' ', '_');
            window.title = "Jaeger Engine - " + Game.name;
            document.title = "Jaeger Engine - " + Game.name;
            //check if project exists in memory
            const exists = localStorage.getItem(Game.name+"_ct");
            if(exists){
                openTab('script.js');
                openTab('loop.js');
                openTab('characters.js');
                window.eval(document.getElementById('charactertab').value);
                window.eval(document.getElementById('looptab').value);
                window.eval(document.getElementById('scripttab').value);
            } else {
                localStorage[Game.name] = "2d";
                saveTab('characters.js');
                saveTab('loop.js');
                saveTab('script.js');
                openTab('script.js');
                openTab('loop.js');
                openTab('characters.js');
            }
        } else {
            Game.name = "project_"+Math.floor(Math.random()*10000);
            window.location.replace("?name="+Game.name);
        }
    }

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
            //do some error handling here
        }
    }
};

window.onkeydown = input = (e) => {

    Game.key[e.code] = true;

};

window.onkeyup = input = (e) => {

    Game.key[e.code] = false;

};