class enemy{
  constructor(){
    this.x = random(12.5,255-12.5);
    this.y = random(150,255-12.5);
    this.vx = 0;
    this.vy = 0;
    this.diameter = 20;
    this.followParam = 0;
    this.enemyNum;
    this.isHit = false;
    this.specialHit = false;
    this.iter = 0;
    this.mult = -1;
    this.health = 100;


  }
  display(){
    imageMode(CENTER);
    image(slime, this.x, this.y, this.diameter ,this.diameter);
    fill(255,0,0)
    rect(this.x-10,this.y+10,20,5);
    fill(0,255,0);
    rect(this.x-10,this.y+10,20*this.health/100,5);
    imageMode(CORNER);

  }
  follow(playerX,playerY){
      if (abs(player.x - this.x) > abs(player.y-this.y)){
        if (player.x - this.x > 0){
          this.vx += 1;
        }
        else this.vx -= 1;
      }
      else {
        if (player.y - this.y > 0 ){
          this.vy += 1;
      }else  {
        this.vy -= 1;
      }
    }

    if (this.vx >= 2){
      this.vx = 2;
    }
    if (this.vx <= -2){
      this.vx = -2;
    }
    if (this.vy >= 2){
      this.vy = 2;
    }
    if (this.vy <= -2){
      this.vy = -2;
    }
    }

    move(){
      if (this.specialHit == true){
        // this.vx = this.vx*(20);
        // this.vy = this.vy*(20);
        // this.specialHit = false;
        // this.x += this.vx;
        // this.y += this.vy;
        this.health -= 50;
        //this.isHit = true;

      }

      if (this.health <= 0){
        this.isHit = true;
      }
      this.x += this.vx;
      this.y += this.vy;

    }

    wallCol(){
      if(this.x < 1 || this.x > 249){

        this.vx*=-1;
        if(this.x<1) this.x =2;
        if (this.x>249) this.x= 248;
      }
      if(this.y <1 || this.y > 249){
        this.vy *=-1;
        if(this.y<1) this.y =2;
        if (this.y>249) this.y = 248;
      }
    }
    ballCol(enemyArr){
      for (let i = 0; i<enemyArr.length; i++) {
        if (i != this.enemyNum){
          if (dist(this.x,this.y,enemyArr[i].x,enemyArr[i].y) < 10){
            this.vx*=random(-5,5);
            this.vy*=random(-5,5);
            //enemyArr[i].vx*=;
            //enemyArr[i].vy*=0;
          }
        }
      }
    }
    bullCol(projetile){
      for(let i = 0;i<projetile.length;i++){
      let lX = projectile[i].projLoc[0]
      let qY = projectile[i].projLoc[1]
      if (dist(this.x,this.y,lX,qY) < 10){
        this.health -= 25;
        //this.isHit = true;
        specBar += 10;

      }
    }
  }
  specCol(special){
    for(let i = 0;i<special.length;i++){
      if ((dist(special[i].x,special[i].y,this.x,this.y))<30){
        this.specialHit = true;
      }
    }
  }

}

function moveEnemies(enemyArr,player){
  for (let i = 0; i<enemyArr.length; i++) {
    enemyArr[i].move();
    enemyArr[i].wallCol();
    enemyArr[i].ballCol(enemyArr);
    enemyArr[i].display();
    enemyArr[i].follow(player.x,player.y,enemyArr);
  }
}





function spawnEnemies(){
  let val = slider.value();
  if (val == 0){
    val = round;
  }
  if (enemies.length == 0) {
    round += 1;
  }
  for (var i = 0; i < val; i ++){
    enemyMob = new enemy();
    enemyMob.enemyNum = i;
    enemies.push(enemyMob);

  }
}
