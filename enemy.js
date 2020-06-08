class enemy{
  constructor(){
    this.ran = random(-1,1);
    if (this.ran >= 0){
    this.x = random(0,750);
    this.y = random(120,130);}
    else {
    this.x = random(0,750);
    this.y = random(390,400);}
    this.vx = 0;
    this.vy = 0;
    this.diameter = 10;
    this.followParam = 0;
    this.enemyNum;
    this.isHit = false;
    this.specialHit = false;
    this.iter = 0;
    this.mult = -1;
    this.randMut = random(1,1.2);
    this.health = 100;
    this.isBoss = false;
    this.offset = 0;



  }
  display(){
    imageMode(CENTER);
    image(slime, this.x, this.y, this.diameter*this.randMut,this.diameter*this.randMut);
    if (this.isBoss == false){
    fill(255,0,0)
    rect(this.x-10,this.y+10,20,5);
    fill(0,255,0);
    rect(this.x-10,this.y+10,20*this.health/100,5);}
    else {
      fill(255,0,0)
      rect(this.x-100,this.y+this.diameter/2,200,5);
      fill(0,255,0);
      rect(this.x-100,this.y+this.diameter/2,this.health/10,5);
    }
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

    if (this.vx >= 4){
      this.vx = 4;
    }
    if (this.vx <= -4){
      this.vx = -4;
    }
    if (this.vy >= 4){
      this.vy = 4;
    }
    if (this.vy <= -4){
      this.vy = -4;
    }
    }

    move(){
      if (this.specialHit == true){
        // this.vx = this.vx*(20);
        // this.vy = this.vy*(20);
        // this.specialHit = false;
        // this.x += this.vx;
        // this.y += this.vy;
        this.health -= 10;
        //this.isHit = true;

      }

      if (this.health <= 0){
        this.isHit = true;
        score += 50;
      }
      this.x += this.vx;
      this.y += this.vy;

    }

    wallCol(){
      if (this.x < 25) this.x = 25;
      if (this.x >725) this.x = 725;
      if (this.y < 100)  this.y = 100;
      if (this.y > 375) this.y =375;


    }
    ballCol(enemyArr){
      for (let i = 0; i<enemyArr.length; i++) {
        if (i != this.enemyNum){
          if (dist(this.x,this.y,enemyArr[i].x,enemyArr[i].y) < 10+slidergz.value()){
            this.vx*=random(-5,5);
            this.vy*=random(-5,5);
            //enemyArr[i].vx*=;
            //enemyArr[i].vy*=0;
          }
        }
      }
    }
    bullCol(projetile){
      let mul = slidergz.value();
      for(let i = 0;i<projetile.length;i++){
      let lX = projectile[i].projLoc[0]
      let qY = projectile[i].projLoc[1]

      if (dist(this.x,this.y,lX,qY) < this.diameter-10*this.offset){
        console.log(cos(projectile.rot));
        this.x = this.x + slidergz.value()*5*cos(projectile[i].rot);
        this.y = this.y + slidergz.value()*5*sin(projectile[i].rot);
        this.health -= 35 + mul*5;
        projetile[i].removeit = true;
        //this.isHit = true;
        specBar += 3;

      }
    }
  }
  onKill(){
    let l = (random(0,10));
    if(l>=6 && l< 7){
      groundItems.push([1,this.x,this.y]);
    }else if(l>=9 && l< 10){
        groundItems.push([2,this.x,this.y]);
    }
    else if(l>=5 && l<6){
        groundItems.push([3,this.x,this.y]);
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
  let m = round - 1;
  if (m%5 == 0){
      for (let i = 0;i<bossCount;i++){
      enemyMob = new enemy();
      enemyMob.enemyNum = 0;
      enemyMob.diameter = 100;
      enemyMob.health = 2000;
      enemyMob.isBoss = true;
      enemyMob.offset = 1;
      enemies.push(enemyMob);
    }
    bossCount += 1;
    }

  else {
  for (var i = 0; i < val; i ++){
    enemyMob = new enemy();
    enemyMob.enemyNum = i;
    enemyMob.diameter=20;
    enemies.push(enemyMob);
  }}
}
