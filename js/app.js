var renderer = PIXI.autoDetectRenderer(window.innerWidth-30, window.innerHeight-30,{backgroundColor : 0xfbefc3});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// ME...............
var me;

PIXI.loader
    .add('assets/me.png') // add resources
    .add('assets/wall.png') // add resources
    .load(setup); // call setup when finished

engine.start(); // start game engine

// scene setup
function setup()
{
  me = new PIXI.Sprite(PIXI.loader.resources['assets/me.png'].texture);
  wall = new PIXI.Sprite(PIXI.loader.resources['assets/wall.png'].texture);

  gravity(me);
  controllable(me);

  solid(wall);

  // center the sprite's anchor point
  // me.anchor.x = 0.5;
  // me.anchor.y = 0.5;

  // move the sprite to the center of the screen
  me.position.x = window.innerWidth/2 - 100;
  me.position.y = window.innerHeight/2;
  wall.position.x = window.innerWidth/2;
  wall.position.y = window.innerHeight - 100;

  console.log("1, 1: " + me.getBounds().contains(1, 1));
  console.log(me.position.x + ", " + me.position.y + ": " + me.getBounds().contains(me.position.x, me.position.y));

  stage.addChild(me);
  stage.addChild(wall);
}

// start animating
animate();
function animate() {
    requestAnimationFrame(animate);

    me.fall();
    engine.check();

    // render the container
    renderer.render(stage);
}
