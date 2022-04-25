// @michael_abia_v1 2022
// Game Logic Created with Game Engine

//#Background

//#Collision

//#NonPlayers

//#Players
var playerOne = new Character({
    'name':'mario',
    'x':Game.width/2,
    'y':Game.height/2,
    'width':20,
    'height':20,
    'direction':0,
    'speed':0,
    'maxspeed':10,
    'minspeed':0,
    'mass':10,
    'acceleration':0,
    'link':'pic1.png',
    'physics':true,
    'gravity':0.9,
    'friction':0.7,
    'massphysics':false,
    'input':true
});

//#Frame
var drawGame = () => {
    window.requestAnimationFrame(drawGame);
    var canvas = document.getElementById("screen");
    var cursor = canvas.getContext("2d");
    cursor.canvas.width = Game.width;
    cursor.canvas.height = Game.height;
    cursor.clearRect(0, 0, Game.width, Game.height);

    if (Game.grid == true) {
        graph(cursor);
    }

    Game.assets.forEach(character => {

        if (character.input == true){
            if (Game.key['KeyW']){
                character.applyforce(1, 1);
            }
            if (Game.key['KeyA']){
                character.applyforce(7, 1);
            }
            if (Game.key['KeyS']){
                character.applyforce(5, 1);
            }
            if (Game.key['KeyD']){
                character.applyforce(3, 1);
            }
        }

        if (character.physics == true){
            //inertia
            character.applyforce(character.direction, character.mass*character.acceleration);
            //gravity
            character.applyforce(5, character.mass*character.gravity);
            //collision
            Game.collisionGraph.push([character.x, character.y, character.height, character.width]);
            Game.collisionGraph.forEach(collider =>{
                if (collider.x <= (character.x+character.width) && (collider.x+collider.width) >= character.x && collider.y <= (character.y+character.height) && (collider.y+collider.height) >= character.y){
                    //calculate momentum before and after collision
                    //apply force to both colliders (bounce or no bounce? i mean should the collision be elastic?)
                }
            });
            //friction
        }
        if (character.massphysics == true){
            //planetary physics, fluid simulations? have fun
        }
        if (Game.online == true){
            //stream positions of players to each other
        }
        drawCharacter(cursor, character.image, character.x, character.y, character.width, character.height);
    });
}