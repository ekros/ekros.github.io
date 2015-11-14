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
    console.log(stage.children);
  },
  check: function()
  {
    var colisionedObjects = [];
    for (i in stage.children)
    {
      for (j in stage.children)
      {
        if (i != j)
        {
          var ci = stage.children[i];
          var cj = stage.children[j];
          if (ci.position.x > cj.position.x - 50 && ci.position.x < cj.position.x + 50 && ci.position.y > cj.position.y - 50 && ci.position.y < cj.position.y + 50)
          {
            if (this.colision == false)
            {
              console.log("colision!!");
              this.colision = true;
              this.cObj.push(ci, cj);
              console.log("colisioned objects: ");
              console.log(this.cObj);
              ci.tint = 0x00FF00;
              cj.tint = 0x00FF00;

              if (ci.solid)
              {
                cj.blocked = true;
                cj.moveLeft = false;
                cj.moveRight = false;
              }
              if (cj.solid)
              {
                ci.blocked = true;
                ci.moveLeft = false;
                ci.moveRight = false;
              }
            }
          }
        }
      }
    }
  }
}
