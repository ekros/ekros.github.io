// behaviours

// game character
var character = function(obj)
{
  console.log("Character behavior enabled.");
  obj.respawn = function()
  {
    obj.position.x = engine.charSpawnPos.x;
    obj.position.y = engine.charSpawnPos.y;
  };
};

// enemy
var enemy = function(obj)
{
  console.log("Enemy behavior enabled.");
  obj.isEnemy = true;
  obj.speed = 1;
};

// gravity: the object falls and can jump
var gravity = function(obj)
{
  // console.log("Gravity behaviour enabled.");
  obj.acc = 1;

  obj.respawn = function()
  {
    obj.position.x = engine.charSpawnPos.x;
    obj.position.y = engine.charSpawnPos.y;
  };
  obj.speed = 0;
  obj.jumping = false;

  obj.hasGravity = function()
  {
      return true;
  };

  obj.fall = function()
  {
    if (obj.position.y < window.innerHeight - 100)
    {
      obj.position.y += obj.speed;
      obj.speed += obj.acc;
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
        obj.speed = -intensity;
      }
  };
  return obj;
}

// controllable: the object can be controlled with the keyboard
var controllable = function(obj)
{
  console.log("Controllable behaviour enabled.");
  var speed = 5;

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
          obj.jump(20);
        }
      break;

      case 119: // w
        engine.viewportY -= 2;
        console.log("y: " + engine.viewportY);
      break;

      case 115: // s
        engine.viewportY += 2;
        console.log("x: " + engine.viewportY);
      break;

      case 97: // a
        engine.viewportX -= 2;
        console.log("x: " + engine.viewportX);
      break;

      case 100: // d
        engine.viewportX += 2;
        console.log("x: " + engine.viewportX);
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
