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
                var charactersjs = "// @michael_abia_v1 2022\n// Characters Created with Game Engine\n\n//#Background\n\n//#Collision\n\n//#NonPlayers\n\n//#Players\n";
                var loopjs = "// @michael_abia_v1 2022\n// Frame Logic Created with Game Engine\n\nvar drawGame = () => {\n    var canvas = document.getElementById('screen');\n    var cursor = canvas.getContext('2d');\n    cursor.canvas.width = Game.width;\n    cursor.canvas.height = Game.height;\n    cursor.clearRect(0, 0, Game.width, Game.height);\n\n    if (Game.grid) {\n        graph(cursor);\n    }\n\n    if (Game.fps){\n        fps();\n    }\n\n    if (Game.play){\n        window.requestAnimationFrame(drawGame);\n\n        Game.assets.forEach(character => {\n\n            //#Input\n            if (Game.key['KeyW'] && character.input['KeyW']){\n                character.applyforce(0, 1);\n            }\n            if (Game.key['KeyA'] && character.input['KeyA']){\n                character.applyforce(270, 1);\n            }\n            if (Game.key['KeyS'] && character.input['KeyS']){\n                character.applyforce(180, 1);\n            }\n            if (Game.key['KeyD'] && character.input['KeyD']){\n                character.applyforce(90, 1);\n            }\n    \n            //#Physics\n            if (character.physics == true){\n                //-inertia\n                //character.applyforce(character.direction, 0);\n                //-gravity\n                //character.applyforce(5, character.mass*character.gravity);\n                //-collision\n                Game.collisionGraph.push([character.x, character.y, character.height, character.width]);\n                Game.collisionGraph.forEach(collider => {\n                    if (collider.x <= (character.x+character.width) && (collider.x+collider.width) >= character.x && collider.y <= (character.y+character.height) && (collider.y+collider.height) >= character.y){\n                        //calculate momentum before and after collision\n                        \n                        if (collider.mass > 0 && character.mass > 0){\n                            //apply force to both colliders\n                            \n                        }\n                    }\n                });\n                //-friction\n            }\n            if (character.massphysics == true){\n                //planetary physics, fluid simulations? have fun\n            }\n            //#Online\n            if (Game.online == true){\n                //stream positions of players to each other\n            }\n            drawCharacter(cursor, character.image, character.x, character.y, character.width, character.height);\n        });\n    } else {\n        window.cancelAnimationFrame(drawGame);\n    }   \n}";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                break;
            case "ground":
                var charactersjs = "";
                var loopjs = "";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                break;
            case "platformer":
                var charactersjs = "";
                var loopjs = "";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                break;
            case "vertical":
                var charactersjs = "";
                var loopjs = "";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                break;
            case "horizontal":
                var charactersjs = "";
                var loopjs = "";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                break;
            case "isometric":
                var charactersjs = "";
                var loopjs = "";
                localStorage[pname+"_ct"] = charactersjs;
                localStorage[pname+"_lt"] = loopjs;
                break;
            case "quake":
                var charactersjs = "";
                var loopjs = "";
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