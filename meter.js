var fps = {
  startTime: 0,
  frameNumber: 0
};

var getFPS = function()
{
  fps.frameNumber++;
  var d = new Date().getTime();
  currentTime = ( d - fps.startTime ) / 1000;
  result = Math.floor( ( fps.frameNumber / currentTime ) );
  if( currentTime > 1 ){
    fps.startTime = new Date().getTime();
    fps.frameNumber = 0;
  }
  return result;
};
