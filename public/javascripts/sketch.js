// class Ball{

//   constructor(){
//  this.location = createVector(0,0);
//  this.velocity = createVector(0.1,2);
//   }
  
//  move(){
//   this.location.add(this.velocity);
//    //console.log(this.location.x,this.location.y);
// }
 
//   disp(x,y,z){
//   ellipse(x,y,20,20)
//   }
  
// }





let x,y,z,target,ball;
function setup() {
createCanvas(400, 400);
target = {x: random(0,100), y: random(0,100), r: 40};
  ellipse(target.x,target.y,target.r,target.r);
ball = {x: 80, y: 80, r: 20};

  
}



function drawCustom(x,y,z) {
  background(220);
  ellipse(target.x,target.y,target.r,target.r);
  text("x "+x,10,10);
  text("y "+y,10,30);
  text("z "+z,10,50);  
  x= map(x,-10,10,200,0);
  y= map(y,-10,10,0,400);
  
  ball.x=x;
  ball.y=y;
  if(Circle.intersect(target, ball)){
    console.log("Intersect")
   navigator.vibrate([500]);
  }
  ellipse(x,y,20,20);
  
}

window.ondevicemotion = function(event) {
  
 x = event.accelerationIncludingGravity.x;  
 y = event.accelerationIncludingGravity.y;  
 z = event.accelerationIncludingGravity.z; 
drawCustom(x,y,z);
}


