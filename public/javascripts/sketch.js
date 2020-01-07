let x,y,z,target,ball;
function setup() {
createCanvas(windowWidth, windowHeight);
target = {x: random(50,windowWidth-50), y: random(50,windowHeight-50), r: 100};
ellipse(target.x,target.y,target.r,target.r);
ball = {x: windowWidth/2, y:windowHeight/2, r: 50};
}


function draw() {
  background(220);
  ellipse(target.x,target.y,target.r,target.r);
  text("x "+x,10,10);
  text("y "+y,10,30);
  text("z "+z,10,50);  
  x= map(x,-10,10,windowWidth,0);
  y= map(y,-10,10,0,windowHeight);
  ellipse(x,y,ball.r,ball.r);
  ball.x=x+target.x/2;
  ball.y=y+target.y/2;
  if(Circle.intersect(target, ball)){
    console.log("Intersect")
   navigator.vibrate([100]);
  }
  
  
}

window.ondevicemotion = function(event) {
  
 x = event.accelerationIncludingGravity.x;  
 y = event.accelerationIncludingGravity.y;  
 z = event.accelerationIncludingGravity.z; 

}


