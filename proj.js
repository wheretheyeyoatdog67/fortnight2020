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
    if (this.it == 0){
      this.recoil();
    }
    push();
    translate(this.x,this.y);
    rotate(this.rot);
    //dist(this.x+50,this.y,this.desX,this.desY)
    strokeWeight(2);
    stroke(90,80,80);
    fill(0,0,200);
    //image(teleports,this.offset+this.it,0,25+slidergz.value(),15+slidergz.value())
    ellipse(this.offset+this.it,0,15+slidergz.value(),4+slidergz.value());

    pop();
    this.projLoc[0] = this.x +( this.offset + this.it)*cos(this.rot);
    this.projLoc[1] = this.y + (this.offset + this.it)*sin(this.rot);
    if (this.projLoc[0] < 0 || this.projLoc[0] > 750 || this.projLoc[1] < 0 || this.projLoc[1] > 400) this.removeit = true;
}

  remove(){
    this.it += 10+2*sliderbz.value();
  }
  recoil(){
    {
      let mul = slidergz.value();

      player.x += mul*2*-cos(this.rot);
      player.y += mul*2*-sin(this.rot);
    }
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

class tele{
  constructor(playerx,playery,mx,my){
    this.x = playerx;
    this.y = playery;
    this.teleX = mx;
    this.teleY = my;
    this.iterations=0;
  }
  drawPic(){
  noFill();
  stroke(255,0,this.iterations*2.5);
  ellipse(this.x,this.y, 30+this.iterations,30+this.iterations);
  ellipse(this.x,this.y, 20+this.iterations,20+this.iterations);
  ellipse(this.x,this.y, 10+this.iterations,10+this.iterations);

  ellipse(this.teleX,this.teleY, 40+this.iterations,40+this.iterations);
  ellipse(this.teleX,this.teleY, 30+this.iterations,30+this.iterations);
  ellipse(this.teleX,this.teleY, 20+this.iterations,20+this.iterations);
  ellipse(this.teleX,this.teleY, 10+this.iterations,10+this.iterations);
  strokeWeight(3);
  line(this.x,this.y,this.teleX,this.teleY);
  noStroke();
  }
}
