// behaviours

// game character
var character = function(obj)
{
  console.log("Character behavior enabled.");
  obj.isCharacter = true;
  obj.jumpPower = 18;
  obj.respawn = function()
  {
    obj.fallSpeed = 0;
    obj.jumping = 0;
    obj.position.x = engine.level.charSpawnPos.x;
    obj.position.y = engine.level.charSpawnPos.y;
  };
};

// enemy
var enemy = function(obj)
{
  console.log("Enemy behavior enabled.");
  obj.isEnemy = true;
  obj.speed = 1;

  // action when a character collision is detected
  obj.collisionAction = function(c)
  {
    if (c.position.y < obj.position.y && c.fallSpeed > 0)
    {
      console.log("killed!");
      c.jump(c.jumpPower/2);
      obj.position.y = 2000;
      engine.level.enemiesKilled++;
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
  obj.acc = 1;

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
  var speed = 5;
  var items = 0; // collected items

  obj.left = function()
  {
    // if (!obj.isBlocked) obj.position.x -= speed;
    obj.position.x -= speed;
  };

  obj.right = function()
  {
    // if (!obj.isBlocked) obj.position.x += speed;
    obj.position.x += speed;
  };

  window.addEventListener('keydown', function(event) {
    console.log(event.keyCode + " pressed!");
    switch (event.keyCode) {
      case 37: // Left
        obj.moveLeft = true;
      break;

      case 38: // Up
        // do nothing
      break;

      case 39: // Right
        obj.moveRight = true;
      break;

      case 40: // Down
        // do nothing
      break;

      case 32: // Space
        if (obj.hasGravity()) {
          obj.jump(obj.jumpPower);
        }
      break;

      case 70:
        if (obj.text == null)
        {
          engine.talk(obj, "Wellcome!\nLet's move!", 200);
        }
        else
        {
          engine.talk(obj, null);
        }
      break;
    }
  }, false);

  window.addEventListener('keyup', function(event) {
    console.log(event.keyCode + " key up!");
    switch (event.keyCode) {
      case 37:
        obj.moveLeft = false;
      break;

      case 39:
        obj.moveRight = false;
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
