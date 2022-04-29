// @michael_abia_v1 2022
// Game Engine Variables and Functions

var Game = {
    "height": window.innerHeight,
    "width" : window.innerWidth,
    "resistance": 0.1,
    "assets" : [],
    "ready" : false,
    "grid" : false,
    "online" : false,
    "key" : {},
    "collisionGraph": []
}

var togglePositions = () => {
    if (Game.grid == false){
        Game.grid = true;
    } else {
        Game.grid = false;
    }
}

var drawCharacter = (cursor, character, characterX, characterY, characterW, characterH) => {
    cursor.beginPath();
    cursor.drawImage(character, characterX, characterY, characterW, characterH);
    cursor.imageSmoothingEnabled = false;
    if(Game.grid == true){
        //show position
        cursor.font = '10px Arial';
        cursor.fillStyle = '#000000';
        cursor.fillText('x='+characterX+', y='+characterY, characterX, characterY);
    }
}

var graph = (cursor) => {
    //horizontal lines
    for (let i = 0; i <= Game.height; i++) {
        if (i%25 == 0) {
            cursor.beginPath();
            cursor.lineWidth = 0.2;
            cursor.moveTo(0, i);
            cursor.font = '10px Arial';
            cursor.fillStyle = '#000000';
            cursor.fillText(i, 10, i);
            cursor.lineTo(Game.width, i);
            cursor.strokeStyle = "#005500";
            cursor.stroke();   
        }
    }
    //vertical lines
    for (let i = 0; i <= Game.width; i++) {
        if (i%25 == 0) {
            cursor.beginPath();
            cursor.lineWidth = 0.2;
            cursor.moveTo(i, 0);
            cursor.font = '10px Arial';
            cursor.fillStyle = '#000000';
            cursor.fillText(i, i, 10);
            cursor.lineTo(i, Game.height);
            cursor.strokeStyle = "#005500";
            cursor.stroke();
        }
    }
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
            this.move(angle, resspeed);
        }
    }
}

window.onload = () => {

    //flip mobile screens
    window.mobileAndTabletCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    if(window.mobileAndTabletCheck()){
        document.body.requestFullscreen();
        screen.orientation.lock('landscape');
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
        }
    }
};

window.onkeydown = input = (e) => {

    Game.key[e.code] = true;

};

window.onkeyup = input = (e) => {

    Game.key[e.code] = false;

};