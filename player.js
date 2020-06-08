class player{
  constructor(){
    this.x = 125;
    this.y = 125;
    this.lives;
    this.diameter = 20;
    this.isDead = false;
    this.immunity = false;
    this.teleport = 3;

  }
  display(){
    fill(0,0,255);
    stroke(255);
    ellipseMode(CENTER);
    push();
    translate(this.x,this.y);
    rotate(3.14);
    image(teleports,-30,-20, this.diameter*3 ,this.diameter)
    pop();
    ellipse(this.x, this.y, this.diameter ,this.diameter);

    noStroke();



  }
  move(xMov,yMov){
    this.wallCol();
    this.x += xMov;
    this.y += yMov;
  }
  wallCol(){
    if (this.x < 35) this.x = 35;
    if (this.x >725) this.x = 725;
    if (this.y < 100)  this.y = 100;
    if (this.y > 365) this.y =365;
  }


}

class gun{
  constructor(player){
  this.x = player.x;
  this.y = player.y;}
  move(player){
    this.x = player.x;
    this.y = player.y;}
  disp(player){
    push();
    this.move(player);
    rectMode(CENTER);
    angleMode(RADIANS);
    let rotFact  = atan2((mouseY-player.y)/2,(mouseX-player.x)/2);
    translate (player.x,player.y);
    rotate(rotFact);
    stroke(255);
    rect(gunX,gunY,gunW+2*slidergz.value(),gunH+2*slidergz.value());
    noStroke();
    pop();}
}
