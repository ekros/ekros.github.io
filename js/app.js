var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight,{backgroundColor : 0xfbefc3});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// ME...............
// create a texture from an image path
var texture = PIXI.Texture.fromImage('assets/me.png');

// create a new Sprite using the texture
var me = new PIXI.Sprite(texture);

// center the sprite's anchor point
me.anchor.x = 0.5;
me.anchor.y = 0.5;

// move the sprite to the center of the screen
me.position.x = window.innerWidth/2 - 100;
me.position.y = window.innerHeight/2;

stage.addChild(me);

// TEXT...............
var basicText = new PIXI.Text('UNDER CONSTRUCTION');
basicText.x = window.innerWidth/2;
basicText.y = window.innerHeight/2;

stage.addChild(basicText);

var style = {
    font : 'bold italic 36px Arial',
    fill : '#F7EDCA',
    stroke : '#4a1850',
    strokeThickness : 5,
    dropShadow : true,
    dropShadowColor : '#000000',
    dropShadowAngle : Math.PI / 6,
    dropShadowDistance : 6,
    wordWrap : true,
    wordWrapWidth : 440
};

// start animating
animate();
function animate() {
    requestAnimationFrame(animate);

    // render the container
    renderer.render(stage);
}
