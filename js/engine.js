// engine: where the magic happens

// collision checking
var engine =
{
  colision: false,
  cObj: [], // array of collided objects
  viewportX: 50,
  viewportY: -100,
  showColisions: true,
  charSpawnPos: {x: null, y: null},
  enemySpawnPos: {x: null, y: null},
  start: function()
  {
    console.log("Starting game engine...");
    PIXI.loader
        .add('assets/me.png') // add resources
        .add('assets/enemy.png')
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

    for (var i = 0; i < height; i++)
    {
      for (var j = 0; j < width; j++, dataIndex++)
      {
        var tileX = tileWidth * j;
        var tileY = tileHeight * i;
        //console.log("dataIndex: " + dataIndex + ", data: " + data[dataIndex]);
        if (data[dataIndex] == 1 || data[dataIndex] == 2)
        {
          var t1 = new PIXI.Sprite(tileset);
          solid(t1);
          t1.position.x = tileX;
          t1.position.y = tileY;
          stage.addChild(t1);
        }
        else if (data[dataIndex] == 3)
        {
          this.charSpawnPos.x = tileX;
          this.charSpawnPos.y = tileY;
          console.log("Character spawn position detected: " + tileX + " " + tileY);
        }
        else if (data[dataIndex] == 4)
        {
          this.enemySpawnPos.x = tileX;
          this.enemySpawnPos.y = tileY;
          console.log("Character spawn position detected: " + tileX + " " + tileY);
        }
      }
    }
  },
  load_char: function()
  {
    me = new PIXI.Sprite(PIXI.loader.resources['assets/me.png'].texture);

    character(me);
    gravity(me);
    controllable(me);

    // move the sprite to the spawn position
    me.position.x = engine.charSpawnPos.x;
    me.position.y = engine.charSpawnPos.y;

    stage.addChild(me);
  },
  load_enemies: function()
  {
    e = new PIXI.Sprite(PIXI.loader.resources['assets/enemy.png'].texture);

    enemy(e);
    // gravity(e);

    // move the sprite to the spawn position
    e.position.x = engine.enemySpawnPos.x;
    e.position.y = engine.enemySpawnPos.y;

    stage.addChild(e);
  },
  run: function()
  {
    for (i in stage.children)
    {
      // ia
      if (stage.children[i].isEnemy)
      {
        var e = stage.children[i];
        e.position.x += 1;
      }

      for (j in stage.children)
      {
        // collision checking
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
                ci.speed = 0;
                ci.jumping = false;
                cj.speed = 0;
                cj.jumping = false;
              }
            }
        }
      }
    }
    return this.cObj;
  }
}
