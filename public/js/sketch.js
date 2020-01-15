var x, y, z;
var xpos, ypos;
var speed = 5;

function setup() 
{
    if ('vibrate' in navigator) {
   // Shake that device!
} else {
   // Not supported
}
   
  // set canvas size
  createCanvas(windowWidth, windowHeight);
  // default values
  xpos = 200;
  ypos = 200;
  x = 0;
  y = 0;
}

function draw() 
{
  // set background color to white
  background(0);

  // add/subract xpos and ypos
  xpos = xpos - speed*x;
  ypos = ypos + speed*y;

  // wrap ellipse if over bounds
  if(xpos > windowWidth) { xpos = 0; }
  if(xpos < 0) { xpos = windowWidth; }
  if(ypos > windowHeight) { ypos = 0; }
  if(ypos < 0) { ypos = windowHeight; }

  // draw ellipse
  fill(255, 0, 0);
  ellipse(xpos, ypos, 25, 25);

  // display variables
  
  fill(255);
  noStroke();
  text("x: " + x, 25, 25);
  text("y: " + y, 25, 50);
  text("z: " + z, 25, 75); 
}

// accelerometer Data
window.addEventListener('devicemotion', function(e) 
{
  // get accelerometer values
  x = parseInt(e.accelerationIncludingGravity.x);
  y = parseInt(e.accelerationIncludingGravity.y);
  z = parseInt(e.accelerationIncludingGravity.z); 
});