

// Game Engine Variables and Functions
var height = 150;
var width = 300;
var assets = [];
var ready = false;
var started = false;
var grid = false;
var togglePositions = () => {
    if (grid == false){
        grid = true;
    } else {
        grid = false;
    }
}
var drawGame = () => {
    window.requestAnimationFrame(drawGame);
    var canvas = document.getElementById("screen");
    var cursor = canvas.getContext("2d");
    cursor.clearRect(0, 0, 300, 150);
    //draw background assets first, physics objects last
    if (grid == true) {
        //draw graph
        graph(cursor);
    }
    assets.forEach(character => {
        drawCharacter(cursor, character.image, character.x, character.y);
    });
    started = true;
}
var drawCharacter = (cursor, character, characterX, characterY) => {
    cursor.beginPath();
    cursor.drawImage(character, characterX, characterY, 20, 20);
    cursor.imageSmoothingEnabled = false;
    if(grid == true){
        //show position
        cursor.font = '10px Arial';
        cursor.fillStyle = '#000000';
        cursor.fillText('x='+characterX+', y='+characterY, characterX, characterY);
    }
}
var graph = (cursor) => {
    //horizontal lines
    for (let i = 0; i <= height; i++) {
        if (i%20 == 0) {
            cursor.beginPath();
            cursor.lineWidth = 0.2;
            cursor.moveTo(0, i);
            cursor.font = '10px Arial';
            cursor.fillStyle = '#000000';
            cursor.fillText(i, 10, i);
            cursor.lineTo(width, i);
            cursor.strokeStyle = "#009900";
            cursor.stroke();   
        }
    }
    //vertical lines
    for (let i = 0; i <= width; i++) {
        if (i%20 == 0) {
            cursor.beginPath();
            cursor.lineWidth = 0.2;
            cursor.moveTo(i, 0);
            cursor.font = '10px Arial';
            cursor.fillStyle = '#000000';
            cursor.fillText(i, i, 10);
            cursor.lineTo(i, height);
            cursor.strokeStyle = "#009900";
            cursor.stroke();
        }
    }
}

class Character {
    constructor(name, x, y, mass, link, physics){
        this.name = name;
        this.x = x;
        this.y = y;
        this.direction = 0;
        this.speed = 0;
        this.maxspeed = 10;
        this.minspeed = 0;
        this.move = (direction, speed) => {
            this.speed = speed;
            this.direction = direction;
            console.log("speed:"+this.speed);
            switch (direction) {
                case 1:
                    //up
                    this.y = this.y - speed;
                    break;
                case 2:
                    //up and right
                    this.y = this.y - speed;
                    this.x = this.x + speed;
                    break;
                case 3:
                    //right
                    this.x = this.x + speed;
                    break;
                case 4:
                    //right and down
                    this.x = this.x + speed;
                    this.y = this.y + speed;
                    break;
                case 5:
                    //down
                    this.y = this.y + speed;
                    break;
                case 6:
                    //down and left
                    this.y = this.y + speed;
                    this.x = this.x - speed;
                    break;
                case 7:
                    //left
                    this.x = this.x - speed;
                    break;
                case 8:
                    //left and up
                    this.x = this.x - speed;
                    this.y = this.y - speed;
                    break;
                default:
                    break;
            }
        }
        this.mass = mass;
        this.acceleration = 0;
        this.applyforce = (direction, amount) => {
            if (this.speed < this.maxspeed){
                this.speed = this.speed + (amount/this.mass);
            }
            this.move(direction, this.speed);
            this.acceleration = amount/this.mass;
            console.log(direction+" acceleration="+this.acceleration);
        }
        this.link = link;
        this.image = new Image();
        this.physics = physics;
        this.gravity = 9.8;
        this.friction = 0.7;
        assets.push(this);
    }
}

//create characters\\ this is what the editor should create and run
var playerOne = new Character('mario', (width/2)-50, height/2, 10, 'pic1.png', true);
var playerTwo = new Character('luigi', (width/2)+50, height/2, 10, 'pic2.png', false);

//load all assets, if assets have multiple images in future do a nested loop
for (i = 0; i < assets.length; i++) {
    const asset = assets[i];
    const percent = ((i+1)/assets.length)*100;
    asset.image.src = asset.link;
    asset.image.onload = () => {
        console.log(asset.name+" loaded "+percent+"% complete");
        if (percent == 100){
            ready = true;
        }
    }
}

window.onload = () => {

    //Characters behave according to #logic, #input and #inputstreams
    
    //#LOGIC
    setInterval(() => {
        if (started == true) {
            //Physics
            assets.forEach(asset => {
                if (asset.physics == true){
                    //inertia
                    asset.applyforce(asset.direction, asset.mass*asset.acceleration);
                    //gravity
                    //collision
                    //friction
                }
                if (asset.collision == true){
                    //
                }
                if (asset.massphysics == true){
                    //planetary physics, have fun
                }
            }); 
        }
    }, 167);
    
    //#INPUT
    window.onkeydown = input = (e) => {
        switch (e.code) {
            case 'Space':
                // Start Game
                if (ready == true){
                    drawGame();
                } else {
                    console.log("asset load not complete");
                }
                break;
            case 'KeyW':
                playerOne.applyforce(1, 1);
                break;
            case 'KeyA':
                playerOne.applyforce(7, 1);
                break;
            case 'KeyS':
                playerOne.applyforce(5, 1);
                break;
            case 'KeyD':
                playerOne.applyforce(3, 1);
                break;
            case 'ArrowUp':
                playerTwo.move(1, 5);
                break;
            case 'ArrowLeft':
                playerTwo.move(7, 5);
                break;
            case 'ArrowDown':
                playerTwo.move(5, 5);
                break;
            case 'ArrowRight':
                playerTwo.move(3, 5);
                break;
            case 'KeyP':
                togglePositions();
                break;
        
            default:
                break;
        }
    };

    //#INPUTSTREAMS
    //get position from realtime database or sockets and update it
};