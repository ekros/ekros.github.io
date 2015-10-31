var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight,{backgroundColor : 0xfbefc3});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// ME...............
// create a texture from an image path
var texture = PIXI.Texture.fromImage('assets/me.png');

// create a new Sprite using the texture
var me = new PIXI.Sprite(texture);

gravity(me);

// center the sprite's anchor point
me.anchor.x = 0.5;
me.anchor.y = 0.5;

// move the sprite to the center of the screen
me.position.x = window.innerWidth/2 - 100;
me.position.y = window.innerHeight/2;

stage.addChild(me);

// start animating
animate();
function animate() {
    requestAnimationFrame(animate);

    me.fall();
    
    // render the container
    renderer.render(stage);
}
