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
