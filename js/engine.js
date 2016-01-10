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
  blocked: false,
  level: {
    data: null,
    charSpawnPos: {x: null, y: null},
    enemySpawnPos: [],
    itemSpawnPos: [],
    blockPoint: [],
    enemiesKilled: 0,
    reset: function()
    {
        this.data = null;
        this.charSpawnPos = {x: null, y: null};
        this.enemySpawnPos = [];
        this.itemSpawnPos = [];
        this.blockPoint = [];
        this. enemiesKilled = 0;
    }
  },
  start: function()
  {
    console.log("Starting game engine...");
    this.level.data = levels[this.currentLevel];
    PIXI.loader
        .add('assets/me.png') // add resources
        .add('assets/enemy.png')
        .add('assets/ground1.png')
        .add('assets/ground2.png')
        .add('assets/char_spawn.png')
        .add('assets/enemy_spawn.png')
        .add('assets/block_point.png')
        .add('assets/star.png')
        //.add('assets/tileset_ground.png')
        .load(setup); // call setup when finished

    window.addEventListener('keydown', function(event) {
      console.log("engine: " + event.keyCode + " pressed!");
      switch (event.keyCode) {
        case 49: // 1
          engine.go_to_level(1);
        break;
        case 50: // 2
          engine.go_to_level(2);
        break;
        case 51: // 3
          engine.go_to_level(3);
        break;
        case 52: // 4
          engine.go_to_level(4);
        break;
        case 53: // 5
          engine.go_to_level(5);
        break;
      }
    });
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
    //var tileset = PIXI.utils.TextureCache['assets/tileset_ground.png'];
    var aspect = this.level.data.tilesets[0].tileCount / this.level.data.tilesets[0].columns;
    var cols = this.level.data.tilesets[0].columns;

    // // load tileset
    // var rectangles = [];
    // for (var i = 0; i < cols; i++)
    // {
    //   for (var j = 0; j < 2; j++)
    //   {
    //     var r = new PIXI.Rectangle(i*tileWidth, j*tileHeight, tileWidth, tileHeight);
    //     rectangles.push(r);
    //   }
    // }

    //console.log(rectangles);

    for (var i = 0; i < height; i++)
    {
      for (var j = 0; j < width; j++, dataIndex++)
      {
        if (data[dataIndex] != 0)
        {
          // tileset.frame = rectangles[data[dataIndex]];
          // console.log(tileset.frame);
          var tileX = tileWidth * j;
          var tileY = tileHeight * i;
        }
        //console.log("dataIndex: " + dataIndex + ", data: " + data[dataIndex]);
        if (data[dataIndex] == 1)
        {
          var t1 = new PIXI.Sprite(PIXI.utils.TextureCache['assets/ground1.png']);
          solid(t1);
          t1.position.x = tileX;
          t1.position.y = tileY;
          stage.addChild(t1);
        }
        else if (data[dataIndex] == 2)
        {
          var t1 = new PIXI.Sprite(PIXI.utils.TextureCache['assets/ground2.png']);
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
        else if (data[dataIndex] == 7)
        {
          //this.level.itemSpawnPos.push({x: tileX, y: tileY});
          //console.log("Item spawn position detected. " + tileX + " " + tileY);
          var i1 = new PIXI.Sprite(PIXI.utils.TextureCache['assets/star.png']);
          collectable(i1);
          i1.position.x = tileX;
          i1.position.y = tileY;
          stage.addChild(i1);
        }
      }
    }
  },
  go_to_level: function(lvl)
  {
    stage.removeChildren();
    this.level.reset();
    console.log("Going to level " + lvl);
    this.currentLevel = lvl;
    this.level.data = levels[this.currentLevel];
    this.load_level();
    this.load_char();
    this.load_enemies();
    // this.load_items();
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
    // this.load_items();
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
    // char movement
    if (this.me.moveLeft)
    {
      this.me.left();
    }
    if (this.me.moveRight)
    {
      this.me.right();
    }

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
              if (cj.solid)
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

              // char - item collision
              if (ci.isCharacter && cj.isCollectable)
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
  talk: function(obj, text, delay, finalDelay, index)
  {
    console.log("j: " + index);
    this.blocked = true;
    if (index == null)
    {
      var index = 0;
    }
    else
    {
      index++;
    }

    if (text == null)
    {
      obj.text.visible = false;
      obj.text = null;
    }
    else
    {
      obj.text = new PIXI.Text(text[index], {dropShadow: true, dropShadowColor: '#BBBBBB'});
      obj.text.x = obj.position.x + 35;
      obj.text.y = obj.position.y - 30;
      obj.text.visible = true;
      obj.textBox = new PIXI.Graphics();
      obj.textBox.lineStyle(2, 0xBBBBBB, 1);
      obj.textBox.beginFill(0xEEEEEE);
      obj.textBox.drawRoundedRect(obj.text.x - 2, obj.text.y - 2, obj.text.width, obj.text.height, 10);
      //obj.text.mask = obj.textBox;

      if (delay == null || delay == 0)
      {
        stage.addChild(obj.text);
      }
      else
      {
        var origText = obj.text.text;
        var i = 0;
        var writeText = function(t)
        {
          obj.text.text = t.slice(0, i);
          var c = stage.addChild(obj.text);
          setTimeout(function(){
            i++;
            if (obj.text.text.length < origText.length)
            {
              stage.removeChild(c);
              writeText(origText);
            }
            else
            {
              setTimeout(function() {
                stage.removeChild(obj.textBox);
                stage.removeChild(obj.text);
                engine.talk(obj, text, delay, finalDelay, index);
              }, finalDelay);
            }
          }, delay);
        };
        stage.addChild(obj.textBox);
        writeText(origText);
      }
    }
    this.blocked = false;
  }
}
