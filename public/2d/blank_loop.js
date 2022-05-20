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

    if (Game.grid) {
        graph(cursor);
    }

    if (Game.fps){
        fps();
    }

    Game.assets.forEach(character => {

        //#Input

        //#Physics
        
        //#Online
        
        drawCharacter(cursor, character.image, character.x, character.y, character.width, character.height);
    });
}