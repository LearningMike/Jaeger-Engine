// @michael_abia_v1 2022
// Game Editor Functions

var compileCode = () => {
    window.location.reload();
}

var toggleGame = () => {
    if (Game.play == false){
        Game.play = true;
        document.getElementById("togglegame").innerText = "⏸ Pause";
        window.eval(characterseditor.getDoc().getValue());
        window.eval(loopeditor.getDoc().getValue());
        drawGame();
    } else {
        Game.play = false;
        document.getElementById("togglegame").innerText = "▶️ Play";
    }
}

var togglePositions = () => {
    if (Game.play) {
        if (Game.grid == false){
            Game.grid = true;
        } else {
            Game.grid = false;
        }
    }
}

var toggleFPS = () => {
    if (Game.play) {
        if (Game.fps == false){
            Game.fps = true;
            document.getElementById("stat").style.display = 'block';
        } else {
            Game.fps = false;
            document.getElementById("stat").style.display = 'none';
        }
    }
}

var importGame = () => {
    //read character.js, loop.js and from a folder
    //and write to the tabs
}

var exportGame = () => {
    //save character.js, loop.js and to a folder
    //and save a game-only index.html
}

var saveTab = (js) => {
    switch (js) {
        case 'characters.js':
            var code = characterseditor.getDoc().getValue();
            //save to memory
            localStorage.setItem(Game.name + "_ct", code);
            //show compile button
            document.getElementById('compile').style.display = 'inline-block';
            document.getElementById('togglegame').style.display = 'none';
            break;
        case 'loop.js':
            var code = loopeditor.getDoc().getValue();
            //save to memory
            localStorage.setItem(Game.name + "_lt", code);
            //show compile button
            document.getElementById('compile').style.display = 'inline-block';
            document.getElementById('togglegame').style.display = 'none';
            break;
    
        default:
            break;
    }
}

var openTab = (js) => {
    switch (js) {
        case 'characters.js':
            //highlight tab
            document.getElementById('ct').style.backgroundColor = "orangered";
            document.getElementById('lt').style.backgroundColor = "black";
            //show textarea
            document.getElementById('charactertab').style.display = "block";
            document.getElementById('looptab').style.display = "none";
            //show menu
            document.getElementById('charactermenu').style.display = "block";
            document.getElementById('loopmenu').style.display = "none";
            //get characters.js from memory
            characterseditor.getDoc().setValue(localStorage.getItem(Game.name+"_ct"));
            characterseditor.setSize("100%", "94vh");
            characterseditor.refresh();
            break;
        case 'loop.js':
            //highlight tab
            document.getElementById('ct').style.backgroundColor = "black";
            document.getElementById('lt').style.backgroundColor = "orangered";
            //show textarea
            document.getElementById('charactertab').style.display = "none";
            document.getElementById('looptab').style.display = "block";
            //show menu
            document.getElementById('charactermenu').style.display = "none";
            document.getElementById('loopmenu').style.display = "block";
            //get loop.js from memory
            loopeditor.getDoc().setValue(localStorage.getItem(Game.name+"_lt"));
            loopeditor.setSize("100%", "94vh");
            loopeditor.refresh();
            break;
    
        default:
            break;
    }
}

var deleteAll = () => {
    var sure = confirm("Are you sure you want to delete '"+Game.name+"' ?");
    if(sure) {             
        localStorage.removeItem(Game.name);
        localStorage.removeItem(Game.name+"_ct");
        localStorage.removeItem(Game.name+"_lt");
        window.location.replace("../index.html");
    }
}

var createCharacter = (type) => {
    //switch to character tab first
    openTab('characters.js');

    //then add the character object to the character.js tab
    switch (type) {
        case b:

            break;

        case c:
            
            break;
        
        case n:
            
            break;

        case p:
            
            break;
    
        default:
            break;
    }
}