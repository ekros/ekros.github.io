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
    for (i in stage.children)
    {
      for (j in stage.children)
      {
        if (i != j)
        {
          var ci = stage.children[i];
          var cj = stage.children[j];

            if (b.hit(ci, cj, (ci.solid || cj.solid)))
            {
              console.log("colision!!");
              this.cObj.push(ci, cj);
              console.log("collided objects: ");
              console.log(this.cObj);

              // stop fall
              if (ci.solid || cj.solid)
              {
                gravity(ci).stopFall();
                gravity(cj).stopFall();
              }
            }
        }
      }
    }
    return this.cObj;
  }
}
