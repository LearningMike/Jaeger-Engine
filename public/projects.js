//show projects
var projectlist = "";
for (const key in localStorage) {
    if (Object.hasOwnProperty.call(localStorage, key)) {
        const element = localStorage[key];
        if (key.endsWith('ct')){
            var pname = key.replace('_ct','');
            var ptype = localStorage[pname];
            projectlist = projectlist + '<div class="tile" onclick=openProject("'+pname+'","'+ptype+'")> :: '+ptype.toUpperCase()+'/'+pname+'</div>';
        }
    }
}
document.getElementById("plist").innerHTML = projectlist;
var showTemplates = () => {
    document.getElementById("templates").style.display = "block";
}
var closeTemplates = () => {
    document.getElementById("templates").style.display = "none";
}
var openProject = (pname, ptype) => {
    window.location.assign(ptype+"?name="+pname);
}
var useTemplate = (ptype, ptemplate) => {
    var pname = document.getElementById("pname").value;
    if (pname == null || pname == "") {
        pname = "project_"+Math.floor(Math.random()*10000);
    } else {
        pname = pname.replaceAll(' ','_');
    }
    //read the save template to localStorage
    if (ptype = "2d") {
        localStorage[pname] = "2d";
        
        switch (ptemplate) {
            case "blank":
                var charactersjs = "// @michael_abia_v1 2022\n// Characters Created with Game Engine\n\n//#Background\n\n//#Collision\n\n//#NonPlayers\n\n//#Players\n";
                var loopjs = "// @michael_abia_v1 2022\n// Frame Logic Created with Game Engine\n\nvar drawGame = () => {\n    if (Game.play == true){\n        window.requestAnimationFrame(drawGame);\n    } else {\n        window.cancelAnimationFrame(drawGame);\n    }\n    var canvas = document.getElementById('screen');\n    var cursor = canvas.getContext('2d');\n    cursor.canvas.width = Game.width;\n    cursor.canvas.height = Game.height;\n    cursor.clearRect(0, 0, Game.width, Game.height);\n\n    if (Game.grid) {\n        graph(cursor);\n    }\n\n    if (Game.fps){\n        fps();\n    }\n\n    Game.assets.forEach(character => {\n\n        //#Input\n        \n        //#Physics\n        \n        //#Online\n        \n        drawCharacter(cursor, character.image, character.x, character.y, character.width, character.height);\n    });\n}";
                var scriptjs = "// @michael_abia_v1 2022\n// Script Created with Game Engine\n";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                localStorage[pname+"_st"] = scriptjs;
                break;
            case "ground":
                var charactersjs = "";
                var loopjs = "";
                var scriptjs = "";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                localStorage[pname+"_st"] = scriptjs;
                break;
            case "platformer":
                var charactersjs = "";
                var loopjs = "";
                var scriptjs = "";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                localStorage[pname+"_st"] = scriptjs;
                break;
            case "vertical":
                var charactersjs = "";
                var loopjs = "";
                var scriptjs = "";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                localStorage[pname+"_st"] = scriptjs;
                break;
            case "horizontal":
                var charactersjs = "";
                var loopjs = "";
                var scriptjs = "";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                localStorage[pname+"_st"] = scriptjs;
                break;
            case "isometric":
                var charactersjs = "";
                var loopjs = "";
                var scriptjs = "";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                localStorage[pname+"_st"] = scriptjs;
                break;
            case "quake":
                var charactersjs = "";
                var loopjs = "";
                var scriptjs = "";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                localStorage[pname+"_st"] = scriptjs;
                break;
        
            default:
                break;
        }

    } else if (ptype = "3d") {
        localStorage[pname] = "3d";
    }

    //then open project
    openProject(pname, ptype);
}