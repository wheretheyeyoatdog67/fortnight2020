



class enemy{
  constructor(){
    this.ran = random(-1,1);
    if (this.ran >= 0){
    this.x = random(50,700);
    this.y = random(120,130);}
    else {
    this.x = random(50,700);
    this.y = random(300,360);}
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
    this.canShoot = false;
    this.projLoc = [];
    this.it = 0;
    this.rot;
    this.lastShot = 0;
    this.slimeAnIt = 0;
    this.slimeAnDir = 1;
    this.slimeTimer = 0;

  }
  display(){
    imageMode(CENTER);
    if(newRound == true){
      if(this.canShoot == true){
        image(slime2, this.x, this.y, 1.25*this.diameter*this.randMut,this.diameter*this.randMut);
        movePos = false;
      }else{
      image(slime, this.x, this.y, 1.25*this.diameter*this.randMut,this.diameter*this.randMut);
      movePos = false;}
    }else{
      if(this.canShoot == true){image(slime2, this.x, this.y, 1.25*this.diameter*this.randMut,this.diameter*this.randMut);}
      else{
        if (gameClock - this.slimeTimer > 20){
          this.slimeAnIt = this.slimeAnIt+1*this.slimeAnDir;
          if(this.slimeAnIt==4 || this.slimeAnIt == 0){
            this.slimeAnDir*=(-1);
            console.log(this.slimeAnIt);
          }
          this.slimeTimer = gameClock;}
          image(slimeArrAn[this.slimeAnIt], this.x, this.y, 1.75*this.diameter*this.randMut,1.2*this.diameter*this.randMut);
      }

    if (this.isBoss == false){
    fill(255,0,0)
    rect(this.x-10,this.y+10,20,5);
    fill(0,255,0);
    rect(this.x-10,this.y+10,20*this.health/100,5);}
    else {
      fill(255,0,0)
      rect(this.x-50,this.y+this.diameter/2,100,5);
      fill(0,255,0);
      rect(this.x-50,this.y+this.diameter/2,this.health/20,5);
    }
  }
    imageMode(CORNER);

  }
  follow(playerX,playerY){
    let movement = true;
    if (movePos == true){
      if (this.canShoot == true && dist(this.x,this.y,player.x,player.y) < 100){
        movement = false;
        this.vx = 0;
        this.vy = 0;
      }
      else movement = true
      if (abs(player.x - this.x) > abs(player.y-this.y) && movement == true){
        if (player.x - this.x > 0){
          this.vx += 1;
        }
        else this.vx -= 1;
      }
      else if (movement == true){
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
    }

    move(){
      if (this.specialHit == true){
        // this.vx = this.vx*(20);
        // this.vy = this.vy*(20);
        // this.specialHit = false;
        // this.x += this.vx;
        // this.y += this.vy;
        this.health -= 20;
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
        //console.log(cos(projectile.rot));
        this.x = this.x + slidergz.value()*5*cos(projectile[i].rot);
        this.y = this.y + slidergz.value()*5*sin(projectile[i].rot);
        this.health -= 20 + projectile[i].bigGunMult;
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
    if(special.length == 0) this.specialHit = false;
  }
}
function removeNMoveEnemyShot(){
  for (let i = 0; i < enemyProjArr.length;i++){
    //console.log('Help');
    enemyProjArr[i].move();
    enemyProjArr[i].it += 10;
    if (enemyProjArr[i].removeit == true){

      enemyProjArr.splice(i,1);
    }


  }
}

function moveEnemies(enemyArr,player){
  removeNMoveEnemyShot();
  for (let i = 0; i<enemyArr.length; i++) {
    if (gameClock-enemyArr[i].lastShot > 100 && enemyArr[i].canShoot == true){
      enemyArr[i].lastShot = gameClock;
      enemyProjArr.push(new proj(enemyArr[i].x, enemyArr[i].y,player.x,player.y,true));

    }
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

  if (enemies.length == 0 && player.isDead == false) {
    round += 1;
    newRound = true;
    newRoundClockOffset = gameClock;

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
    let q = random(-1,1);
    if (q>=.5){enemyMob.canShoot = true;}
    enemies.push(enemyMob);
  }}
}
