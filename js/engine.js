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
  engineCount: 0, // used to decide when to fire some actions
  colision: false,
  cObj: [], // array of collided objects
  viewportX: 50,
  viewportY: -100,
  showColisions: true,
  currentLevel: 1,
  me: null,
  blocked: false,
  level: {
    script: null,
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
    this.level.script = levels_script[this.currentLevel];
    PIXI.loader
        .add('assets/me.png') // add resources
        .add('assets/enemy1.png')
        .add('assets/enemy2.png')
        .add('assets/enemy3.png')
        .add('assets/enemy4.png')
        .add('assets/ground1.png')
        .add('assets/ground2.png')
        .add('assets/char_spawn.png')
        .add('assets/enemy_spawn.png')
        .add('assets/block_point.png')
        .add('assets/star.png')
        .add('assets/eros1.png')
        .add('assets/eros2.png')
        .add('assets/eros3.png')
        .add('assets/eros4.png')        
        .add('assets/eros1d.png')
        .add('assets/eros2d.png')
        .add('assets/eros3d.png')
        .add('assets/eros4d.png')
        .add('assets/eros_jump.png')
        .add('assets/eros_jumpd.png')
        .add('assets/download.png')
        //.add('assets/tileset_ground.png')
        .load(setup); // call setup when finished

    window.addEventListener('keydown', function(event) {
      // console.log("engine: " + event.keyCode + " pressed!");
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
    // load level data
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

    // load background
    console.log("Loading background: " + this.level.data.properties.background);
    var background = new PIXI.Sprite.fromImage('assets/' + this.level.data.properties.background);
    background.position.x = 0;
    background.position.y = 0;
    stage.addChild(background);
    
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
  opening_speech: function()
  {
    // opening_speech
    this.talk(this.me, this.level.script.opening_speech, 200, 1000);
  },
  ending_speech: function()
  {
    // ending speech
    this.talk(this.me, this.level.script.ending_speech, 200, 1000, null, true);
  },
  go_to_level: function(lvl)
  {
    stage.removeChildren();
    this.level.reset();
    console.log("Going to level " + lvl);
    this.currentLevel = lvl;
    this.level.data = levels[this.currentLevel];
    this.level.script = levels_script[this.currentLevel];
    this.load_level();
    this.load_char();
    this.load_enemies();
    this.opening_speech();
    // this.load_items();
  },
  next_level: function()
  {
    stage.removeChildren();
    this.level.reset();
    console.log("Going to next level...");
    this.currentLevel++;
    this.level.data = levels[this.currentLevel];
    this.level.script = levels_script[this.currentLevel];
    this.load_level();
    this.load_char();
    this.load_enemies();
    this.opening_speech();
    // this.load_items();
  },
  load_char: function()
  {
    this.me = new PIXI.Sprite(PIXI.loader.resources['assets/eros1.png'].texture);
    this.me.textureIndex = 0;
    this.me.FRAMES = {};
    this.me.FRAMES.right = ["assets/eros1d.png", "assets/eros2d.png", "assets/eros3d.png", "assets/eros4d.png"];
    this.me.FRAMES.left = ["assets/eros1.png", "assets/eros2.png", "assets/eros3.png", "assets/eros4.png"];

    character(this.me);
    gravity(this.me);
    //controllable(this.me);
    mobile(this.me);

    // move the sprite to the spawn position
    this.me.position.x = engine.level.charSpawnPos.x;
    this.me.position.y = engine.level.charSpawnPos.y;

    stage.addChild(this.me);
  },
  load_enemies: function()
  {
    for (i in engine.level.enemySpawnPos)
    {
      e = new PIXI.Sprite(PIXI.loader.resources['assets/enemy1.png'].texture);
      e.textureIndex = 0;
      e.FRAMES = {};
      e.FRAMES.right = ["assets/enemy1.png", "assets/enemy2.png", "assets/enemy3.png", "assets/enemy4.png"];
      e.FRAMES.left = ["assets/enemy1.png", "assets/enemy2.png", "assets/enemy3.png", "assets/enemy4.png"];

      enemy(e);
      mobile(e);

      // move the sprite to the spawn position
      e.position.x = engine.level.enemySpawnPos[i].x;
      e.position.y = engine.level.enemySpawnPos[i].y;

      stage.addChild(e);
    }
  },
  run: function()
  {
    // animations
    if (this.me.status == RUNNING_LEFT)
    {
      this.me.texture = new PIXI.Texture(PIXI.loader.resources[this.me.FRAMES.left[this.me.textureIndex]].texture);
      if (this.me.textureIndex < this.me.FRAMES.left.length - 1)
      {
        if (this.engineCount%4 == 0)
        {
          this.me.textureIndex++;
        }
      }
      else
      {
        this.me.textureIndex = 0;
        // this.me.status = NOOP;
      }
    }
    else if (this.me.status == RUNNING_RIGHT)
    {
      this.me.texture = new PIXI.Texture(PIXI.loader.resources[this.me.FRAMES.right[this.me.textureIndex]].texture);
      if (this.me.textureIndex < this.me.FRAMES.right.length - 1)
      {
        if (this.engineCount%4 == 0)
        {
          this.me.textureIndex++;
        }
      }
      else
      {
        this.me.textureIndex = 0;
        // this.me.status = NOOP;
      }
    }
    else if (this.me.status == STOP_LEFT)
    {
      console.log("STOP_LEFT");
      this.me.textureIndex = 0;
      this.me.texture = new PIXI.Texture(PIXI.loader.resources[this.me.FRAMES.left[this.me.textureIndex]].texture);
      this.me.status = NOOP_LEFT;
    }    
    else if (this.me.status == STOP_RIGHT)
    {
      console.log("STOP_RIGHT");
      this.me.textureIndex = 0;
      this.me.texture = new PIXI.Texture(PIXI.loader.resources[this.me.FRAMES.right[this.me.textureIndex]].texture);
      this.me.status = NOOP_RIGHT;
    }
    else if (this.me.status == JUMP_LEFT)
    {
      console.log("JUMP_LEFT");
      this.me.texture = new PIXI.Texture(PIXI.loader.resources['assets/eros_jump.png'].texture);
    }    
    else if (this.me.status == JUMP_RIGHT)
    {
      console.log("JUMP_RIGHT");
      this.me.texture = new PIXI.Texture(PIXI.loader.resources['assets/eros_jumpd.png'].texture);
    }

    // char movement
    if (this.me.moveLeft)
    {
      this.me.left();
    }
    if (this.me.moveRight)
    {
      this.me.right();
    }

    // checks: blockpoints, collisions, other animations

    for (i in stage.children)
    {
      var child = stage.children[i];

      if (child.isEnemy)
      {
        child.texture = new PIXI.Texture(PIXI.loader.resources[child.FRAMES.left[child.textureIndex]].texture);
        if (child.textureIndex < child.FRAMES.left.length - 1)
        {
          if (this.engineCount%3 == 0)
          {
            child.textureIndex++;
          }
        }
        else
        {
          child.textureIndex = 0;
          // this.me.status = NOOP;
        }
      }

      if (child.mobile)
      {
        // ia
        if (child.isEnemy)
        {
          var e = child;
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
          if (i != j) // not itself
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
                  ci.status = STOP_RIGHT;
                }

                // impact with a "jump_under" block
                if (cj.jump_under && cj.y < ci.y)
                {
                  cj.jump_under_action();
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
    }
    // check win condition
    if (this.level.enemiesKilled == this.level.enemySpawnPos.length)
    {
      this.level.enemiesKilled = 0;
      this.ending_speech();
      //engine.next_level();
    }
    // return this.cObj;
    this.engineCount++;
  },
  talk: function(obj, text, delay, finalDelay, index, isEndingSpeech, inplace)
  {
    console.log("j: " + index);
    obj.blocked = true;
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
      if (inplace)
      {
        obj.text.x = obj.position.x + 50;
        obj.text.y = obj.position.y - 50;
      }
      else
      {
        obj.text.x = 50;
        obj.text.y = 20;
      }
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
                if (isEndingSpeech)
                {
                  engine.talk(obj, text, delay, finalDelay, index, true);
                }
                else
                {
                  engine.talk(obj, text, delay, finalDelay, index);
                }
              }, finalDelay);
              // this.blocked = false;
              // console.log(text.length);
              if (index == text.length - 1)
              {
                console.log("blocked");
                console.log(engine.me.blocked);
                engine.me.blocked = false;
                obj.blocked = false;
                console.log(engine.me.blocked);
                engine.talkCallback(isEndingSpeech);
              }
            }
          }, delay);
        };
        stage.addChild(obj.textBox);
        writeText(origText);
      }
    }
  },
  talkCallback: function(isEndingSpeech) 
  {
    if (isEndingSpeech)
    {
      if (this.currentLevel == 3)
      {
          var b1 = new PIXI.Sprite(PIXI.utils.TextureCache['assets/download.png']);
          solid(b1);
          jump_under(b1, function() {
            window.open("http://ekros.github.com/assets/Eric_resume_gamified.pdf");
          });
          b1.position.x = this.me.x;
          b1.position.y = this.me.y - 80;
          stage.addChild(b1);
      }
      else
      {
        engine.next_level();
      }
    }
    else
    {
      controllable(engine.me);
    }
  }
}
