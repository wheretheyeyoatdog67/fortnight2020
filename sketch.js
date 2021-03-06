let img;
let cellUIflop = false;
let canvWid = 800;
let canvHeight = 400;
let width = 70;
let height = 400;
let gameClock = 0;
var enemies = [];
let projectile = [];
let special = [];
let specBar = 100;
let round = 1;
var timerValue = 25;
let ramp = false;
let score = 0;
let groundItems = [];
let gunX=16;
let gunY= 0;
let gunW= 8;
let gunH=5;
let inShop = false;
let teleArr = [];
let lastTele = 10;
let fcheck = 200;
let bossSpawn = false;
let bossCount = 1;
let hitArr = [];
let newRound = true;
let newRoundClockOffset = 0;
let movePos = true;
let curRoom = 0;
let doorEntry = false;
let enemyProjArr = [];
let LastQTime = 0;
let shopping = false;
let pauseNextRound = false;
let fullAuto = false;
let fireArr = [];
let fireTimer = [];
let slimeArrAn = [];
let autoAim = false;

function preload() {

  img = loadImage('floor.png');
  slime = loadImage('slime.png');
  heart = loadImage('heart.png');
  market = loadImage('market.png');
  doge = loadImage('doge.jpg');
  song = loadSound('h.mp3');
  songdmg = loadSound('dmg.mp3');
  songdeath = loadSound('death.mp3');
  bgCob = loadImage("cobble.png");
  bgCobOpenDoor = loadImage("doorOpen/cobble4.png");
  winXp = loadImage("backgrounds/winXP.jpeg");
  teleports = loadImage("telport.png");
  energy = loadImage("energy.png");
  fire = loadImage("fire.png");
  fire2 = loadImage("fire2.png");
  fire3 = loadImage("fire3.png");
  proj1=  loadImage("projectile/proj1.png");
  proj2 =  loadImage("projectile/proj2.png");

  proj3 =  loadImage("projectile/proj3.png");
  slime2 = loadImage("slime2.png");

  slimea0 = loadImage("slimeAnimation/slime0.png");
  slimea1 = loadImage("slimeAnimation/slime1.png");
  slimea2 = loadImage("slimeAnimation/slime2.png");
  slimeam1 = loadImage("slimeAnimation/slimem2.png");
  slimeam2 = loadImage("slimeAnimation/slimem3.png");

}



function setup() {
  fireArr = [fire,fire2,fire3];
  slimeArrAn = [slimeam2,slimeam1,slimea0,slimea1,slimea2];
  createCanvas(canvWid, canvHeight);
  player = new player();
  player.lives = 3;
  player.immunity = false;
  gun = new gun(player);
  board = new board();
  devUI();
  song.play();
}

// STEP 2 classify!

function draw() {
clear();
gameClock += 1;
keyDown();

decor();
checkSwap();
store();
textUI();
playerDisp()
enemyCanMove()
noStroke();
moveProjectile();
moveSpecialProjectiles()
groundItemsDisplayandCollision();
store();
if(player.isDead == false){
playerCol();}

PlayerStats()
teleBuffer();
specBarUI();

hearts();
doorEntrySign();
runGameMode();
if(shopping == true){
  displayShopContents();
}


}




function enemyIsHit(i){
    enemies[i].bullCol(projectile)
    enemies[i].specCol(special);
    if (enemies[i].isHit == true){
      enemies[i].onKill();
      enemies.splice(i,1);
    }

}
function moveSpecialProjectiles(){
  for (let i = 0; i < special.length; i ++){
    if (special[i].iterations > 20){
      special.splice(i,1);
    }else{
    special[i].drawPic();
    special[i].iterations += 1;
  }}
}
function runGameMode(){
  if (ramp== true && pauseNextRound == false) rampMode();
}

function PlayerStats(){

  if (player.immunity == true){
    immunity();
  }
  if(!player.isDead){
    moveEnemies(enemies,player);
  }
  else death();
}

function playerCol(){
  player.bullCol(enemyProjArr);
  for (let i = 0;i<enemies.length;i++){

    enemies[i].enemyNum = i;

    if(dist(player.x,player.y,enemies[i].x,enemies[i].y)< enemies[i].diameter/1.7 && player.immunity == false){
      player.lives-=1;
      hitArr.push(gameClock);
      player.immunity = true;
  //console.log(player.immunity);

      }
      if (player.lives <= 0)
      {player.isDead = true;
      song.pause();
      songdeath.play();

  }

  enemyIsHit(i);
  }
  if (hitArr.length > 0){
    if(gameClock-hitArr[0] < 10){
      fill(255,0,0,100);
      rect(0,0,750,400);
    }else hitArr.splice(0,1);


  }
}
function enemyCanMove(){
if (gameClock - newRoundClockOffset > 20){
  newRound = false;
  movePos = true;
}}

function immunity(){
  timeIt()
  if (timerValue == 1){
    player.immunity = false;
    timerValue = 25;
  }
}
function timeIt() {
  if (timerValue > 0) {
    timerValue--;
  }
}
function checkSwap(){
  if (specBar >= 100){specBar = 100;}
  if (cellUIflop == true){
    cellUI();
  }
}
function moveProjectile(){
  for(let i = 0;i<projectile.length;i++){
    projectile[i].move();
    projectile[i].remove();
    if (projectile[i].removeit == true){
      projectile.splice(i,1);
    }
    //console.log(projectile.length)
  }
}
function playerDisp(){
  player.display();
  gun.disp(player);
}
function groundItemsDisplayandCollision(){
  for (let i = 0;i<groundItems.length;i++){
    if (groundItems[i][0] == 1){

    image(heart,groundItems[i][1]-15,groundItems[i][2]-15,30,30);}
    else if (groundItems[i][0] == 2){
    image(teleports,groundItems[i][1]-15,groundItems[i][2]-15,30,30);}
    else if (groundItems[i][0] == 3){
    image(energy,groundItems[i][1]-65,groundItems[i][2]-30,80,45);}
    if(dist(player.x,player.y,groundItems[i][1],groundItems[i][2])<20){
      if (groundItems[i][0]==1){
      player.lives +=1;
      groundItems.splice(i,1)}
      else if (groundItems[i][0]==2){
      player.teleport += 1;
      groundItems.splice(i,1);}
      else if (groundItems[i][0]==3){
      specBar += 25;
      groundItems.splice(i,1);}
    }
  }
}
function teleBuffer(){
  for (let i = 0; i < teleArr.length; i ++){
    if (teleArr[i].iterations > 20){
      teleArr.splice(i,1);}
    else{
    teleArr[i].drawPic();
    teleArr[i].iterations += 1;}
  }
}
