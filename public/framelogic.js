// @michael_abia_v1 2022
// Frame Logic Created with Game Engine

var drawGame = () => {
    if (Game.play == true){
        window.requestAnimationFrame(drawGame);
    } else {
        window.cancelAnimationFrame(drawGame);
    }
    var canvas = document.getElementById("screen");
    var cursor = canvas.getContext("2d");
    cursor.canvas.width = Game.width;
    cursor.canvas.height = Game.height;
    cursor.clearRect(0, 0, Game.width, Game.height);

    if (Game.grid == true) {
        graph(cursor);
    }

    Game.assets.forEach(character => {

        //#Input
        if (Game.key['KeyW'] && character.input['KeyW']){
            character.applyforce(0, 1);
        }
        if (Game.key['KeyA'] && character.input['KeyA']){
            character.applyforce(270, 1);
        }
        if (Game.key['KeyS'] && character.input['KeyS']){
            character.applyforce(180, 1);
        }
        if (Game.key['KeyD'] && character.input['KeyD']){
            character.applyforce(90, 1);
        }

        //#Physics
        if (character.physics == true){
            //inertia
            //character.applyforce(character.direction, 0);
            //gravity
            //character.applyforce(5, character.mass*character.gravity);
            //collision
            Game.collisionGraph.push([character.x, character.y, character.height, character.width]);
            Game.collisionGraph.forEach(collider => {
                if (collider.x <= (character.x+character.width) && (collider.x+collider.width) >= character.x && collider.y <= (character.y+character.height) && (collider.y+collider.height) >= character.y){
                    //calculate momentum before and after collision
                    
                    //apply force to both colliders (bounce or no bounce? i mean should the collision be elastic?)
                }
            });
            //friction with friction coefficients of object surfaces
            //friction with Game.resistance
        }
        if (character.massphysics == true){
            //planetary physics, fluid simulations? have fun
        }
        //#Online
        if (Game.online == true){
            //stream positions of players to each other
        }
        drawCharacter(cursor, character.image, character.x, character.y, character.width, character.height);
    });
}