let img;
let cellUIflop = false;
let canvWid = 500;
let canvHeight = 250;
let width = 250;
let height = 250;
let gameClock = 0;
var enemies = [];
let projectile = [];
let special = [];
let specBar = 100;
let round = 1;
var timerValue = 10;
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
function preload() {
  img = loadImage('floor.png');
  slime = loadImage('slime.png');
  heart = loadImage('heart.png');
  market = loadImage('market.png');
  doge = loadImage('doge.jpg');
  song = loadSound('h.mp3');
  songdmg = loadSound('dmg.mp3');
  songdeath = loadSound('death.mp3');

}



function setup() {
  createCanvas(canvWid, canvHeight);
  player = new player();
  player.lives = 3;
  player.immunity = false;
  gun = new gun(player);
  board = new board();
  devUI();
  
}

// STEP 2 classify!

function draw() {
image(doge, 250,0,250,250);
gameClock += 1;
if (specBar >= 100){
  specBar = 100;
}

//background(120,120,255);

keyDown();
grass();

if (cellUIflop == true){
  cellUI();
}
store();
player.display();
gun.disp(player)
if(!player.isDead){

  moveEnemies(enemies,player);

}
else death();

textSize(12);
text(mouseX-player.x, 260, 230);
fill(0, 102, 153);
text(mouseY-player.y, 260, 240);
stroke(126);
text("Round:", 290, 100);
text(round-1,330, 100)
stroke(126);
fill(0);
textSize(20);
text("Score:", 5,245);
stroke(255,0,0);
text(score, 80,245);

//line(player.x,player.y, mouseX,mouseY);
noStroke();
for(let i = 0;i<projectile.length;i++){
  projectile[i].move();
  projectile[i].remove();
  if (projectile[i].removeit == true){
    projectile.splice(i,1);
  }
  //console.log(projectile.length)
}
for (let i = 0;i<enemies.length;i++){
  enemies[i].bullCol(projectile)
  enemies[i].specCol(special);
  if (enemies[i].isHit == true){
    enemies[i].onKill();
    enemies.splice(i,1);
  }
}
for (let i = 0;i<groundItems.length;i++){
  ellipse(groundItems[i][1],groundItems[i][2],20,20);
  if(dist(player.x,player.y,groundItems[i][1],groundItems[i][2])<20){
    player.lives +=1;
    groundItems.splice(i,1);
  }
}
for (let i = 0;i<enemies.length;i++){
  enemies[i].enemyNum = i;
  if(dist(player.x,player.y,enemies[i].x,enemies[i].y)< 10 && player.immunity == false){
    player.lives-=1;
    player.immunity = true;
//console.log(player.immunity);
    if (player.lives == 0)
    {player.isDead = true;
    song.pause();
    songdeath.play();

    }

}


}
//console.log(player.immunity);
if (player.immunity == true){
  immunity();
}
for (let i = 0; i < special.length; i ++){
  if (special[i].iterations > 20){
    special.splice(i,1);
  }else{
  special[i].drawPic();
  special[i].iterations += 1;
}}

for (let i = 0; i < teleArr.length; i ++){
  if (teleArr[i].iterations > 10){
    teleArr.splice(i,1);
  }else{
  teleArr[i].drawPic();
  teleArr[i].iterations += 1;
}
}

specBarUI();
hearts();

if (ramp== true) rampMode();
}
function immunity(){
  timeIt()
  if (timerValue == 1){
    player.immunity = false;
    timerValue = 10;
  }
}
function timeIt() {
  if (timerValue > 0) {
    timerValue--;
  }
}



class gun{
  constructor(player){
  this.x = player.x;
  this.y = player.y;
  }
  move(player){
    this.x = player.x;
    this.y = player.y;

  }
  disp(player){
    push();
    //s
    this.move(player);
    rectMode(CENTER);
    angleMode(RADIANS);
    let rotFact  = atan2((mouseY-player.y)/2,(mouseX-player.x)/2);
    translate (player.x,player.y);
    //console.log(rotFact*180/PI);

    rotate(rotFact);
    stroke(255);
    rect(gunX,gunY,gunW,gunH);
    noStroke();
    pop();
  }





}

class player{
  constructor(){
    this.x = 12.5;
    this.y = 12.5;
    this.lives;
    this.diameter = 20;
    this.isDead = false;
    this.immunity = false;

  }
  display(){
    fill(0,0,255);
    stroke(255);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.diameter ,this.diameter);
    noStroke();
  }
  move(xMov,yMov){
    this.x += xMov;
    this.y += yMov;
  }


}

function mouseClicked() {
  projectile.push(new proj(player.x, player.y,mouseX,mouseY));
}
