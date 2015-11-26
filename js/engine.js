// engine: where the magic happens

// win conditions
var winConditions =
{
  killAll: 0,
  collideWithObject: 1
}

// collision checking
var engine =
{
  colision: false,
  cObj: [], // array of collided objects
  viewportX: 50,
  viewportY: -100,
  showColisions: true,
  currentLevel: 1,
  me: null,
  level: {
    data: null,
    charSpawnPos: {x: null, y: null},
    enemySpawnPos: [],
    blockPoint: [],
    enemiesKilled: 0,
    reset: function()
    {
        data = null;
        charSpawnPos = {x: null, y: null};
        enemySpawnPos = [];
        blockPoint = [];
        enemiesKilled = 0;
    }
  },
  start: function()
  {
    console.log("Starting game engine...");
    this.level.data = levels[this.currentLevel];
    PIXI.loader
        .add('assets/me.png') // add resources
        .add('assets/enemy.png')
        .add('assets/ground.png')
        .add('assets/tileset_ground.png')
        .load(setup); // call setup when finished
  },
  load_level: function()
  {
    this.level.enemiesKilled = 0;
    console.log("Loading level...");
    var data = this.level.data.layers[0].data;
    var tileWidth = this.level.data.tilesets[0].tilewidth;
    var tileHeight = this.level.data.tilesets[0].tileheight;
    var width = this.level.data.width;
    var height = this.level.data.height;
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
          this.level.charSpawnPos.x = tileX;
          this.level.charSpawnPos.y = tileY;
          console.log("Character spawn position detected: " + tileX + " " + tileY);
        }
        else if (data[dataIndex] == 4)
        {
          this.level.enemySpawnPos.push({x: tileX, y: tileY});
          console.log("Character spawn position detected: " + tileX + " " + tileY);
        }
        else if (data[dataIndex] == 5)
        {
          this.level.blockPoint.push({x: tileX, y: tileY});
          console.log("Block point detected. " + tileX + " " + tileY);
        }
      }
    }
  },
  next_level: function()
  {
    stage.removeChildren();
    this.level.reset();
    console.log("Going to next level...");
    this.currentLevel++;
    this.level.data = levels[this.currentLevel];
    this.load_level();
    this.load_char();
    this.load_enemies();
  },
  load_char: function()
  {
    this.me = new PIXI.Sprite(PIXI.loader.resources['assets/me.png'].texture);

    character(this.me);
    gravity(this.me);
    controllable(this.me);

    // move the sprite to the spawn position
    this.me.position.x = engine.level.charSpawnPos.x;
    this.me.position.y = engine.level.charSpawnPos.y;

    stage.addChild(this.me);
  },
  load_enemies: function()
  {
    for (i in engine.level.enemySpawnPos)
    {
      e = new PIXI.Sprite(PIXI.loader.resources['assets/enemy.png'].texture);

      enemy(e);
      // gravity(e);

      // move the sprite to the spawn position
      e.position.x = engine.level.enemySpawnPos[i].x;
      e.position.y = engine.level.enemySpawnPos[i].y;

      stage.addChild(e);
    }
  },
  run: function()
  {
    for (i in stage.children)
    {
      // ia
      if (stage.children[i].isEnemy)
      {
        var e = stage.children[i];
        e.position.x += e.speed;
        // console.log("blockPoint " + engine.blockPoint[0].x);
        for (k in engine.level.blockPoint)
        {
          // console.log("testing X: " + e.position.x + " Y: " + e.position.y + " against: X: " +
          //  engine.blockPoint[k].x + " Y: " + engine.blockPoint[k].y);
          if (b.hitTestPoint(engine.level.blockPoint[k], e))
          {
            // console.log("enemy hit with block point");
            e.speed = -e.speed;
          }
        }
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
              //this.cObj.push(ci, cj);
              //console.log("collided objects: ");
              //console.log(this.cObj);

              // stop fall
              if (ci.solid || cj.solid)
              {
                ci.fallSpeed = 0;
                ci.jumping = false;
                cj.fallSpeed = 0;
                cj.jumping = false;
              }

              // char - enemy collision
              if (ci.isCharacter && cj.isEnemy)
              {
                cj.collisionAction(ci);
              }
            }
        }
      }
    }
    // check win condition
    if (this.level.enemiesKilled == this.level.enemySpawnPos.length)
    {
      this.talk(this.me, "Well done!");
      engine.next_level();
    }
    // return this.cObj;
  },
  talk: function(obj, text)
  {
    if (text == null)
    {
      obj.text.visible = false;
      obj.text = null;
    }
    else
    {
      obj.text = new PIXI.Text(text);
      obj.text.x = obj.position.x + 20;
      obj.text.y = obj.position.y - 20;
      obj.text.visible = true;

      stage.addChild(obj.text);
    }
  }
}
