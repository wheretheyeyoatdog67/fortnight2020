let fireIt = 0;
let fireAnDir = 1;

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
    if (gameClock - fireTimer > 20){
      fireIt = fireIt+1*fireAnDir;
      if(fireIt==2 || fireIt == 0){
        fireAnDir*=(-1);
      }

      fireTimer = gameClock;
    }
    image(fireArr[fireIt],-50,-60, 100,70);

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
  bullCol(enemyProjArr){

    for(let i = 0;i<enemyProjArr.length;i++){
    let lX = enemyProjArr[i].projLoc[0]
    let qY = enemyProjArr[i].projLoc[1]
    //console.log(dist(this.x,this.y,lX,qY));
    if (dist(this.x,this.y,lX,qY) < 4){
      //console.log(cos(projectile.rot));
      this.x = this.x + slidergz.value()*5*cos(enemyProjArr[i].rot);
      this.y = this.y + slidergz.value()*5*sin(enemyProjArr[i].rot);
      this.lives -= 1;
      enemyProjArr[i].removeit = true;

    }
  }
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
    rect(gunX,gunY,gunW,gunH);
    noStroke();
    pop();}
}
