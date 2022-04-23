var height = 150;
var width = 300;
var showPositions = false;

//reduce the code length by making the character object oriented and make the 
//character.move(X=true/false, Y=true/false) function to change character position with character speed

var characterImg = "run.png";
var characterX = (width/2)-50;
var characterY = height/2;
var characterXX = (width/2)+50;
var characterYY = height/2;
var characterSpeed = 5;
var character = new Image();


window.onload = function() {

    window.onkeydown = function input(e){
        switch (e.code) {
            case 'Space':
                // Start Game
                character.src = characterImg;
                character.onload = function(){
                    drawGame();
                }
                break;
            case 'KeyW':
                characterY = characterY-characterSpeed;
                break;
            case 'KeyA':
                characterX = characterX-characterSpeed;
                break;
            case 'KeyS':
                characterY = characterY+characterSpeed;
                break;
            case 'KeyD':
                characterX = characterX+characterSpeed;
                break;
            case 'ArrowUp':
                characterYY = characterYY-characterSpeed;
                break;
            case 'ArrowLeft':
                characterXX = characterXX-characterSpeed;
                break;
            case 'ArrowDown':
                characterYY = characterYY+characterSpeed;
                break;
            case 'ArrowRight':
                characterXX = characterXX+characterSpeed;
                break;
            case 'KeyP':
                if (showPositions == false){
                    showPositions = true;
                } else{
                    showPositions = false;
                }
                break;
        
            default:
                break;
        }
    };
};

function drawGame(){
    window.requestAnimationFrame(drawGame);
    var canvas = document.getElementById("screen");
    var cursor = canvas.getContext("2d");
    cursor.clearRect(0, 0, 300, 150);
    //ready world
    if(showPositions == true){
        graph(cursor);
    }
    //ready player one
    picture(cursor, character, characterX, characterY);
    //ready player two
    circle(cursor, characterXX, characterYY);
    //ready npcs
}

function picture(cursor, character, characterX, characterY){
    cursor.beginPath();
    cursor.drawImage(character, characterX, characterY, 20, 20);
    cursor.imageSmoothingEnabled = false;
    if(showPositions == true){
        //draw x=, y=
    }
}

function circle(cursor, characterX, characterY){
    cursor.beginPath();
    cursor.arc(characterX, characterY, 10, 0, 2*Math.PI);
    cursor.fillStyle="#000000";
    cursor.fill();
    if(showPositions == true){
        //draw x=, y=
    }
}

function graph(cursor){
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