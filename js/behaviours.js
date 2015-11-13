// behaviours

// gravity: the object falls and can jump
var gravity = function(obj)
{
  console.log("Gravity behaviour enabled.");
  obj.acc = 1;
  obj.speed = 0;
  obj.jumping = false;

  obj.hasGravity = function()
  {
      return true;
  };

  obj.fall = function()
  {
    if (obj.position.y < window.innerHeight - 80)
    {
      obj.position.y += obj.speed;
      obj.speed += obj.acc;
    }
    else
    {
      obj.speed = 0;
      obj.jumping = false;
      obj.position.y = window.innerHeight - 80;
      // obj.jump();
    }
  };

  obj.jump = function()
  {
      if (!obj.jumping)
      {
        obj.position.y -= 2;
        obj.jumping = true;
        obj.speed = -20;
      }
  };
}

// controllable: the object can be controlled with the keyboard
var controllable = function(obj)
{
  console.log("Controllable behaviour enabled.");
  var speed = 5;

  window.addEventListener('keydown', function(event) {
    console.log(event.keyCode + " pressed!");
    switch (event.keyCode) {
      case 37: // Left
        obj.position.x -= speed;
      break;

      case 38: // Up
        // do nothing
      break;

      case 39: // Right
        obj.position.x += speed;
      break;

      case 40: // Down
        // do nothing
      break;

      case 32: // Space
        if (obj.hasGravity()) {
          obj.jump();
        }
      break;
    }
  }, false);

}

// solid: the object cannot be traspased by other objects
var solid = function(obj)
{
  console.log("Solid behaviour enabled.");

}
