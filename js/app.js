b = new Bump(PIXI); // bump, the collision detector
var renderer = PIXI.autoDetectRenderer(1024, 768, {backgroundColor : 0xfbefc3});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

engine.start(); // start game engine

// scene setup
function setup()
{
  engine.load_level();

  engine.load_char();

  engine.load_enemies();
}

// start animating
animate();
function animate() {
    requestAnimationFrame(animate);

    engine.me.fall();
    engine.run();
    
    document.getElementById("fps").innerHTML = getFPS();

    // render the container
    renderer.render(stage);
}
