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
    window.location.assign(ptype+"/index.html?name="+pname);
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
                var charactersjs = "// @michael_abia_v1 2022\n// Characters Created with Game Engine";
                var loopjs = "// @michael_abia_v1 2022\n// Frame Logic Created with Game Engine\n\nvar gameLoop = () => {\n \tvar canvas = document.getElementById('screen');\n    var cursor = canvas.getContext('2d');\n    cursor.canvas.width = Game.width;\n    cursor.canvas.height = Game.height;\n    cursor.clearRect(0, 0, Game.width, Game.height);\n    Game.time = Math.floor((performance.now() - Game.firstFrame)/1000);\n\n    if (Game.grid) {\n        graph(cursor);\n    }\n\n    if (Game.fps){\n        fps();\n    }\n\n    if (Game.play){\n        window.requestAnimationFrame(gameLoop);\n\n        for(asset in Game.assets) {\n          \t\n          \tvar character = Game.assets[asset];\n          \tdrawCharacter(cursor, character.image, character.x, character.y, character.width, character.height, character.direction);\n          \t\n          \t//#Time-Events\n          \t\n          \t\n            //#Key-Events\n       \t\t\n          \t\n          \t//#Mouse-Events\n          \t\n            for (box in Game.collisionGraph) {\n              \tvar collider = Game.collisionGraph[box];\n            \tif (character.name != collider.n){\n                \tif ((character.x <= collider.x+collider.w && character.x >= collider.x) || (character.x+character.width >= collider.x && character.x+character.width <= collider.x+collider.w)){\n                    \t//#Collision-Events\n                      \t\n                      \t\n                    }\n            \t}\n           \t};\n            \n        };\n    } else {\n        window.cancelAnimationFrame(gameLoop);\n    }   \n}";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                break;
            case "ground":
                var charactersjs = "// template not ready";
                var loopjs = "// template not ready";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                break;
            case "platformer":
                var charactersjs = "// template not ready";
                var loopjs = "// template not ready";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                break;
            case "vertical":
                var charactersjs = "// template not ready";
                var loopjs = "// template not ready";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                break;
            case "horizontal":
                var charactersjs = "// template not ready";
                var loopjs = "// template not ready";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                break;
            case "isometric":
                var charactersjs = "// template not ready";
                var loopjs = "// template not ready";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                break;
            case "quake":
                var charactersjs = "// template not ready";
                var loopjs = "// template not ready";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
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