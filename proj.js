class proj{
  constructor(playerx,playery,mouseX,mouseY){
    this.x = playerx;
    this.y = playery;
    this.desX = mouseX;
    this.desY = mouseY;
    this.rot = atan2((this.desY-this.y)/2,(this.desX-this.x)/2);
    this.it= 0;
    this.rect;
    this.removeit = false;
    this.offset = 25
    this.projLoc = [200,200];
  }
  //for translate/rotate push pops.... use 0,0 origin once tranlate to player loc
  move(){
    push();
    translate(this.x,this.y);
    rotate(this.rot);
    //dist(this.x+50,this.y,this.desX,this.desY)
    rect(this.offset+this.it,0,15,4);

    pop();
    this.projLoc[0] = this.x +( this.offset + this.it)*cos(this.rot);
    this.projLoc[1] = this.y + (this.offset + this.it)*sin(this.rot);
    if (this.projLoc[0] < 0 || this.projLoc[0] > 250 || this.projLoc[1] < 0 || this.projLoc[1] > 250) this.removeit = true;
}

  remove(){
    this.it += 10;
  }

}

class specialProj{
  constructor(playerx,playery){
    this.x = playerx;
    this.y = playery;
    this.iterations = 0;
  }
  drawPic(){
  noFill();
  stroke(255);
  ellipse(this.x,this.y, 20+this.iterations,20+this.iterations);
  noStroke();
  }
}
