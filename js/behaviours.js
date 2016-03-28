// behaviours
const NOOP_LEFT = 0;
const NOOP_RIGHT = 1;
const RUNNING_LEFT = 2;
const RUNNING_RIGHT = 3;
const STOP_LEFT = 4;
const STOP_RIGHT = 5;
const JUMP_LEFT = 6;
const JUMP_RIGHT = 7;

// game character
var character = function(obj)
{
  console.log("Character behavior enabled.");
  obj.isCharacter = true;
  obj.blocked = false;
  obj.jumpPower = 30;
  obj.status = NOOP_RIGHT;
  obj.respawn = function()
  {
    obj.fallSpeed = 0;
    obj.jumping = 0;
    obj.position.x = engine.level.charSpawnPos.x;
    obj.position.y = engine.level.charSpawnPos.y;
  };
  obj.block = function()
  {
    obj.blocked = true;
  };
  obj.unblock = function()
  {
    obj.blocked = false;
  };
};

// enemy
var enemy = function(obj)
{
  console.log("Enemy behavior enabled.");
  obj.isEnemy = true;
  obj.speed = 1.5;

  // action when a character collision is detected
  obj.collisionAction = function(c)
  {
    if (c.position.y < obj.position.y && c.fallSpeed > 0)
    {
      console.log("killed!");
      c.jump(c.jumpPower/2);
      obj.position.y = 2000;
      engine.level.enemiesKilled++;
      var text = engine.level.script.resume_pieces[engine.level.enemiesKilled - 1];
      if (text != null && text.length > 0)
      {
        engine.talk(c, new Array(text), 10, 1000, null, null, true);
      }
    }
    else
    {
      console.log("It hurts!");
      c.respawn();
    }
  };
};

// gravity: the object falls and can jump
var gravity = function(obj)
{
  // console.log("Gravity behaviour enabled.");
  obj.acc = 3;

  obj.fallSpeed = 0;
  obj.jumping = false;

  obj.hasGravity = function()
  {
      return true;
  };

  obj.fall = function()
  {
    if (obj.position.y < window.innerHeight - 100)
    {
      obj.position.y += obj.fallSpeed;
      obj.fallSpeed += obj.acc;
    }
    else
    {
      obj.respawn();
    }
  };

  obj.jump = function(intensity)
  {
      if (!obj.jumping)
      {
        obj.position.y -= 2;
        obj.jumping = true;
        obj.fallSpeed = -intensity;
      }
  };
  return obj;
}

// controllable: the object can be controlled with the keyboard
var controllable = function(obj)
{
  console.log("Controllable behaviour enabled.");
  var speed = 3;
  var items = 0; // collected items

  obj.left = function()
  {
    console.log("engine.me.blocked " + engine.me.blocked);
    console.log("obj.blocked " + obj.blocked);
    // if (!engine.me.blocked) obj.position.x -= speed;
    obj.position.x -= speed;
  };

  obj.right = function()
  {
    // if (!engine.me.blocked) obj.position.x += speed;
    obj.position.x += speed;
  };

  window.addEventListener('keydown', function(event) {
    console.log(event.keyCode + " pressed!");
    switch (event.keyCode) {
      case 37: // Left
        obj.moveLeft = true;
        if (engine.me.status != JUMP_RIGHT && engine.me.status != JUMP_LEFT) engine.me.status = RUNNING_LEFT;
      break;

      case 38: // Up
        // do nothing
      break;

      case 39: // Right
        obj.moveRight = true;
        if (engine.me.status != JUMP_RIGHT && engine.me.status != JUMP_LEFT) engine.me.status = RUNNING_RIGHT;
      break;

      case 40: // Down
        // do nothing
      break;

      case 32: // Space
        event.preventDefault();
        if (obj.hasGravity()) {
          obj.jump(obj.jumpPower);
          if (engine.me.status == NOOP_LEFT) engine.me.status = JUMP_LEFT;
          if (engine.me.status == NOOP_RIGHT) engine.me.status = JUMP_RIGHT;
        }
      break;

      case 70:
        if (obj.text == null)
        {
          engine.talk(obj, ["Text one", "Text two", "And text three!!\nThis is awesome!!"], 200, 5000);
        }
      break;
    }
  }, false);

  window.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
      case 37:
        console.log(event.keyCode + " key up left!");
        obj.moveLeft = false;
        if (engine.me.status != JUMP_RIGHT && engine.me.status != JUMP_LEFT) engine.me.status = STOP_LEFT;
      break;

      case 39:
        console.log(event.keyCode + " key up right!");
        obj.moveRight = false;
        if (engine.me.status != JUMP_RIGHT && engine.me.status != JUMP_LEFT) engine.me.status = STOP_RIGHT;
      break;

      case 71:
        // engine.me.texture = new PIXI.Texture(PIXI.loader.resources['assets/eros1.png'].texture);
        // engine.me.status = NOOP;
      break;
    }
  }, false);
}

// solid: the object cannot be traspased by other objects
var solid = function(obj)
{
  console.log("Solid behaviour enabled.");

  obj.solid = true;
}

// ground: the object cannot be traspased from above
var ground = function(obj)
{
  console.log("Ground behavior enabled");

  obj.ground = true;
}

// mobile: the object moves (and then it can collide with other objects)
var mobile = function(obj)
{
  console.log("Mobile behavior enabled");

  obj.mobile = true;
}

// collectable: the object is collected when touching a character
var collectable = function(obj)
{
  console.log("Collectable behavior enabled");

  obj.isCollectable = true;

  obj.collisionAction = function(c)
  {
    c.items++;
    stage.removeChild(obj);
  };
};

// jump_under: an action is fired when the character jumps under the object (in a Mario Bros. way)
var jump_under = function(obj, action)
{
  console.log("Jump under behavior enabled");

  obj.jump_under = true;

  obj.jump_under_action = action;
};
