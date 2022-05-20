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
    if (pname == null) {
        pname = "project_"+Math.floor(Math.random()*10000);
    }
    //read the template js files and save it to localStorage
    var charactersjs = ptype + "/" +ptemplate + "_characters.js";
    var loopjs = ptype + "/" + ptemplate + "_loop.js";
    var scriptjs = ptype + "/" + ptemplate + "_script.js";

    //then open project
    pname = pname.replaceAll(' ','_');
    openProject(pname, ptype);
}