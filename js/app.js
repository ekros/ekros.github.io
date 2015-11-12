var renderer = PIXI.autoDetectRenderer(window.innerWidth-30, window.innerHeight-30,{backgroundColor : 0xfbefc3});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// ME...............
// create a texture from an image path
// var texture = PIXI.Texture.fromImage('assets/me.png');

var me;

PIXI.loader
    // add resources
    .add('me', 'assets/me.png')
    // listen for progress
    .on('progress', onProgressCallback)
    // load resources
    .load(function (loader, resources) {
        // resources is an object containing the loaded resources, keyed by the names you used above.
        me = new PIXI.Sprite(resources.me.texture);
    })
    .once('complete', onLoadedCallback);

function onProgressCallback()
{
    // do nothing
}

// scene setup
function onLoadedCallback()
{
  // create a new Sprite using the texture
  // var meTexture = PIXI.TextureCache["assets/me.png"];
  // var me = new PIXI.Sprite(meTexture);

  gravity(me);
  controllable(me);

  // center the sprite's anchor point
  me.anchor.x = 0.5;
  me.anchor.y = 0.5;

  // move the sprite to the center of the screen
  me.position.x = window.innerWidth/2 - 100;
  me.position.y = window.innerHeight/2;

  console.log("1, 1: " + me.getBounds().contains(1, 1));
  console.log(me.position.x + ", " + me.position.y + ": " + me.getBounds().contains(me.position.x, me.position.y));

  stage.addChild(me);
}

// start animating
animate();
function animate() {
    requestAnimationFrame(animate);

    me.fall();

    // render the container
    renderer.render(stage);
}
