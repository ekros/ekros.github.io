if (smallScreen())
{
  alert("In order to enjoy this experience you need a computer or laptop with a keyboard.");
}
else
{
  b = new Bump(PIXI); // bump, the collision detector
  var renderer = PIXI.autoDetectRenderer(1024, 768, {backgroundColor : 0xfbefc3});
  document.body.appendChild(renderer.view);

  // create the root of the scene graph
  var stage = new PIXI.Container();

  engine.start(); // start game engine


  // start animating
  animate();
}

function smallScreen()
{
  return (window.innerWidth < 1128);
}

// scene setup
function setup()
{
  engine.load_level();

  engine.load_char();

  engine.load_enemies();

  engine.opening_speech();
}
  
function animate() {
      // Determine seconds elapsed since last frame
      // var currtime = new Date().getTime();
      // var delta = (currtime-lasttime)/1000;
      
      requestAnimationFrame(animate);

      engine.me.fall();
      engine.run();

      // document.getElementById("fps").innerHTML = getFPS();

      // render the container
      renderer.render(stage);
  }  