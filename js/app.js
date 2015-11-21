b = new Bump(PIXI); // bump, the collision detector
var renderer = PIXI.autoDetectRenderer(window.innerWidth-30, window.innerHeight-30,{backgroundColor : 0xfbefc3});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// ME...............
var me;

engine.start(); // start game engine

// scene setup
function setup()
{
  me = new PIXI.Sprite(PIXI.loader.resources['assets/me.png'].texture);

  engine.load_level();

  gravity(me);
  controllable(me);

  // center the sprite's anchor point
  // me.anchor.x = 0.5;
  // me.anchor.y = 0.5;

  // move the sprite to the center of the screen
  me.position.x = window.innerWidth/2 - 100;
  me.position.y = window.innerHeight/2;

  stage.addChild(me);
}

// start animating
animate();
function animate() {
    requestAnimationFrame(animate);

    me.fall();
    engine.check();

    if (me.moveLeft)
    {
      me.left();
    }
    if (me.moveRight)
    {
      me.right();
    }

    document.getElementById("fps").innerHTML = getFPS();

    // render the container
    renderer.render(stage);
}
