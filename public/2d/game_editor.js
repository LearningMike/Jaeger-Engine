// @michael_abia_v1 2022
// Game Editor Functions

Game.editor = true;

var toggleGame = () => {
    if (Game.play == false){
        Game.play = true;
        document.getElementById("togglegame").innerText = "⏸ Pause";
        window.eval(characterseditor.getDoc().getValue());
        window.eval(loopeditor.getDoc().getValue());
        window.eval(scripteditor.getDoc().getValue());
        drawGame();
    } else {
        Game.play = false;
        document.getElementById("togglegame").innerText = "▶️ Play";
    }
}

var togglePositions = () => {
    if (Game.grid == false){
        Game.grid = true;
    } else {
        Game.grid = false;
    }
    if (Game.play == false) {
        toggleGame();
    }
}

var toggleFPS = () => {
    if (Game.fps == false){
        Game.fps = true;
        document.getElementById("stat").style.display = 'block';
    } else {
        Game.fps = false;
        document.getElementById("stat").style.display = 'none';
    }
    if (Game.play == false) {
        toggleGame();
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
            break;
        case 'loop.js':
            var code = loopeditor.getDoc().getValue();
            //save to memory
            localStorage.setItem(Game.name + "_lt", code);
            break;
        case 'script.js':
            var code = scripteditor.getDoc().getValue();
            //save to memory
            localStorage.setItem(Game.name + "_st", code);
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
            document.getElementById('st').style.backgroundColor = "black";
            //show textarea
            document.getElementById('charactertab').style.display = "block";
            document.getElementById('looptab').style.display = "none";
            document.getElementById('scripttab').style.display = "none";
            //show menu
            document.getElementById('charactermenu').style.display = "block";
            document.getElementById('loopmenu').style.display = "none";
            document.getElementById('scriptmenu').style.display = "none";
            //get characters.js from memory
            characterseditor.getDoc().setValue(localStorage.getItem(Game.name+"_ct"));
            characterseditor.setSize("100%", "94vh");
            characterseditor.refresh();
            break;
        case 'loop.js':
            //highlight tab
            document.getElementById('ct').style.backgroundColor = "black";
            document.getElementById('lt').style.backgroundColor = "orangered";
            document.getElementById('st').style.backgroundColor = "black";
            //show textarea
            document.getElementById('charactertab').style.display = "none";
            document.getElementById('looptab').style.display = "block";
            document.getElementById('scripttab').style.display = "none";
            //show menu
            document.getElementById('charactermenu').style.display = "none";
            document.getElementById('loopmenu').style.display = "block";
            document.getElementById('scriptmenu').style.display = "none";
            //get loop.js from memory
            loopeditor.getDoc().setValue(localStorage.getItem(Game.name+"_lt"));
            loopeditor.setSize("100%", "94vh");
            loopeditor.refresh();
            break;
        case 'script.js':
            //highlight tab
            document.getElementById('ct').style.backgroundColor = "black";
            document.getElementById('lt').style.backgroundColor = "black";
            document.getElementById('st').style.backgroundColor = "orangered";
            //show textarea
            document.getElementById('charactertab').style.display = "none";
            document.getElementById('looptab').style.display = "none";
            document.getElementById('scripttab').style.display = "block";
            //show menu
            document.getElementById('charactermenu').style.display = "none";
            document.getElementById('loopmenu').style.display = "none";
            document.getElementById('scriptmenu').style.display = "block";
            //get script.js from memory
            scripteditor.getDoc().setValue(localStorage.getItem(Game.name+"_st"));
            scripteditor.setSize("100%", "94vh");
            scripteditor.refresh();
            break;
    
        default:
            break;
    }
}

var deleteAll = () => {

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