<p align="center">
  <img src="https://jaeger-engine.web.app/assets/jaeger-engine.png"/>
</p>

<h1 align="center">Jaeger Engine Documentation</h1>
<details>
  <summary><h3>Chapter 1: Everything is a Character</h3></summary>
  <blockquote>
    <code>var anything = new Character({...})</code><br/>
    From the backgrounds to collision blocks, NPCs and player characters, 
    everything you see on the game screen is created using a character object.
    The Character object is defined in characters.js and contains data that is used by the game engine to decide the characters state or behaviour on screen.
  </blockquote>
  <p>
    <code>'name':'mario',</code><br/>
    Like mario, block or powerup, it's a character's name.
  </p>
  <p>
    <code>'x':50</code><br/>
    The horizontal position, visible from 0 (left) to the value of the screen width (right).
  </p>
  <p>
    <code>'y':50</code><br/>
    The vertical position, visible from 0 (top) to the value of the screen height (bottom).
  </p>
  <p>
    <code>'width':100</code><br/>
    The horizontal span, drawn from the value of x (50) to to this value of the width (100).
  </p>
  <p>
    <code>'height':100</code><br/>
    The vertical span, drawn from the value of y (50) to to this value of the height (100).
  </p>
  <p>
    <code>'direction':90</code><br/>
    The clockwise angle around its imaginary z-axis, in degrees 0/360 (up) to 90 (right), to 180 (down), to 270 (left).  
  </p>
  <p>
    <code>'speed':0</code><br/>
    The starting and current speed, how much it changes its position by.
  </p>
  <p>
    <code>'angspeed':0</code><br/>
    The starting and current angular speed, how much it changes its direction/angle by.
  </p>
  <p>
    <code>'maxspeed':10</code><br/>
    The maximum speed allowed or possible.
  </p>
  <p>
    <code>'minspeed':0</code><br/>
    The minimum speed allowed or possible.
  </p>
  <p>
    <code>'mass':9</code><br/>
    I like to call it inertial influence, this is only used when physics is turned on.
  </p>
  <p>
    <code>'acceleration':0</code><br/>
    The starting or current acceleration, how much it changes its speed by.
  </p>
  <p>
    <code>'link':'https://link-to-image'</code><br/>
    Link to the image that that visually represents this, could be a jpeg or png or animated gif.
  </p>
  <p>
    <code>'physics':true</code><br/>
    Whether physics should be used or not, physics includes inertia, gravity, friction and collisions.
  </p>
  <p>
    <code>'gravity':0.9</code><br/>
    Newt would be embarassed, but this one works without crashing your computer.
  </p>
  <p>
    <code>'friction':0.7</code><br/>
    Friction coefficient or something, it's how contact affects speed or acceleration.
  </p>
  <p>
    <code>'massphysics':false</code><br/>
    If you want to crash your computer, you can turn this on. Used for planetary physics, fluid simulations? It's more accurate but use at your CPU's risk.
  </p>
  <p>
    <code>'input':{...}</code><br/>
    User inputs this character has actions for.
  </p>
</details>
<details>
  <summary><h3>Chapter 2: Stuck in a Loop</h3></summary>
  <blockquote>
    <code>var gameLoop = () => {...}</code><br/>
    Every character is repeatedly drawn on the screen using the data you have set in it's object. The game is made by you changing or using that data. I have provided some functions that i think will help you save time (i guess that's what a game engine is).
  </blockquote>
  <p>
    <code>anything.getvector(direction, magnitude)</code><br/>
    vec
  </p>
  
</details>
<details>
<summary><h3>Chapter 3: If there's a Template</h3></summary>
<p>explain templates and the things in them like keyevents, arrowevents, physicsevents and animations</p>
</details>
