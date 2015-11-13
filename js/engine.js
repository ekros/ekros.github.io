// engine: where the magic happens

// collision checking
var engine =
{
  colision: false,
  start: function()
  {
    console.log("Starting game engine...");
    console.log(stage.children);
  },
  check: function()
  {
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
            }
          }
        }
      }
    }
  }
}
