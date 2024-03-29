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
    <code>'name':'mario'</code><br/>
    Like mario, block or powerup, it's a character's name.
  </p>
  <p>
    <code>'visible':true</code><br/>
    Wether the item should start visible in the scene or get in later.
  </p>
  <p>
    <code>'instance':0</code><br/>
    Wether the item is a single object (0) or will be instances (1-above)
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
    <code>'direction':0</code><br/>
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
    <code>'link':'https://link-to-image'</code><br/>
    Link to the image that that visually represents this, could be a jpeg or png or animated gif.
  </p>
  <p>
    <code>'input':{...}</code><br/>
    User inputs this character has actions for.
  </p>
  <p>
    <code>'custom':{...}</code><br/>
    Custom variables for data like score, health etc..
  </p>
</details>
<details>
  <summary><h3>Chapter 2: Acting in a Loop</h3></summary>
  <blockquote>
    <code>var gameLoop = () => {...}</code><br/>
    Every character is repeatedly drawn on the screen using the data you have set in it's object. The game is made by you changing or using that data. I have provided some functions that i think will help you save time (i guess that's what a game engine is).
  </blockquote>
  <p>
    <code>anything.getvectorcomp(direction, magnitude)</code><br/>
    ...
  </p>
  <p>
    <code>anything.getvector(x1, y1, x2, y2)</code><br/>
    ...
  </p>
  <p>
    <code>anything.move(speed)</code><br/>
    ...
  </p>
  <p>
    <code>anything.moveTo(x, y, speed)</code><br/>
    ...
  </p>
  <p>
    <code>anything.rotate(angspeed)</code><br/>
    ...
  </p>
  <p>
    <code>anything.rotateTo(direction, angspeed)</code><br/>
    ...
  </p>
  <p>
    <code>anything.scale(xw, yh)</code><br/>
    ...
  </p>
  <p>
    <code>anything.scaleTo(width, height, speed)</code><br/>
    ...
  </p>
  <p>
    <code>anything.showimage(link, asset)</code><br/>
    ...
  </p>
  <p>
    <code>anything.animate(loop, linklist)</code><br/>
    ...
  </p>
  <p>
    <code>anything.playsound(loop, link)</code><br/>
    ...
  </p>
  <p>
    <code>anything.showtext(cursor, text, size, position)</code><br/>
    ...
  </p>
</details>
<details>
  <summary><h3>Chapter 3: According to Events</h3></summary>
  <blockquote>
    <pre><code>
      //Events
      if(character.name == 'mario'){...}
    </code></pre>
    The character remains the same as it is drawn repeatedly, unless something changes.
    Events are what check for this state of the character and allow you to pick specific characters according to their values. 
    Games are a battlefield of events.
  </blockquote>
  <p>
    <pre><code>
      //Time-Events
      if (Game.time == 3){...}
    </code></pre>
    explain time events
  </p>
  <p>
    <pre><code>
      //Key-Events
      if (Game.key['KeyW'] == true){...}
    </code></pre>
    explain key events
  </p>
  <p>
    <pre><code>
      //Mouse-Events
      if (Game.mousePosition.y > 20){...}
    </code></pre>
    explain mouse events
  </p>
  <p>
    <pre><code>
        //Collision-Events
        for (box in Game.collisionGraph) {
          var collider = Game.collisionGraph[box];
          if (character.name == 'mario' && collider.n == 'powerup'){...}
        }
    </code></pre>
    explain collision events
  </p>
</details>
<details>
  <summary><h3>Chapter α : One More Dimension</h3></summary>
</details>