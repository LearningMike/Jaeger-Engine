// @michael_abia_v1 2022
// Characters Created with Game Engine

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
    'direction': 90,
    'speed':0,
    'angspeed':0,
    'maxspeed':10,
    'minspeed':0,
    'mass':10,
    'acceleration':0,
    'link':'https://jaeger-engine.web.app/assets/pic1.png',
    'physics':true,
    'gravity':0.9,
    'friction':0.7,
    'massphysics':false,
    'input':{'KeyW':true, 'KeyA':true, 'KeyS':true, 'KeyD':true}
});