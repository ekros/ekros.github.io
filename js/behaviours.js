// behaviours

var gravity = function(obj)
{
  console.log("Gravity behaviour enabled.");
  obj.acc = 1;
  obj.speed = 0;
  obj.jumping = false;

  obj.fall = function()
  {
    if (obj.position.y < window.innerHeight - 50)
    {
      obj.position.y += obj.speed;
      obj.speed += obj.acc;
    }
    else
    {
      obj.speed = 0;
      obj.jumping = false;
      obj.position.y = window.innerHeight - 50;
      obj.jump();
    }
  }

  obj.jump = function()
  {
      if (!obj.jumping)
      {
        obj.position.y -= 2;
        obj.jumping = true;
        obj.speed = -20;
      }
  }
}
