// engine: where the magic happens

// collision checking
var engine =
{
  colision: false,
  cObj: [], // array of collided objects
  showColisions: true,
  start: function()
  {
    console.log("Starting game engine...");
    PIXI.loader
        .add('assets/me.png') // add resources
        .add('assets/ground.png')
        .add('assets/tileset_ground.png')
        .load(setup); // call setup when finished
  },
  load_level: function()
  {
    console.log("Loading level...");
    var data = ground.layers[0].data;
    var tileWidth = ground.tilesets[0].tilewidth;
    var tileHeight = ground.tilesets[0].tileheight;
    var width = ground.width;
    var height = ground.height;
    console.log("tile -> width: " + tileWidth + ", height: " + tileHeight);
    console.log("level -> width: " + width + ", height: " + height);
    var s = null;
    var dataIndex = 0;
    var tileset = PIXI.utils.TextureCache['assets/tileset_ground.png'];
    var rect = new PIXI.Rectangle(0, 0, tileWidth, tileHeight);
    tileset.frame = rect;

    for (var i = 0; i < height - 1; i++)
    {
      for (var j = 0; j < width - 1; j++, dataIndex++)
      {
        console.log("dataIndex: " + dataIndex + ", data: " + data[dataIndex]);
        if (data[dataIndex] != 0)
        {
          var t1 = new PIXI.Sprite(tileset);
          solid(t1);
          t1.position.x = tileWidth * j;
          t1.position.y = tileHeight * i;
          stage.addChild(t1);
        }
      }
    }
  },
  check: function()
  {
    for (i in stage.children)
    {
      for (j in stage.children)
      {
        if (i != j)
        {
          var ci = stage.children[i];
          var cj = stage.children[j];

            if (!ci.solid && b.hit(ci, cj, (ci.solid || cj.solid)))
            {
              //console.log("colision!!");
              this.cObj.push(ci, cj);
              //console.log("collided objects: ");
              //console.log(this.cObj);

              // stop fall
              if (ci.solid || cj.solid)
              {
                gravity(ci);
                gravity(cj);
              }
            }
        }
      }
    }
    return this.cObj;
  }
}
