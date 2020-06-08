let img;
let cellUIflop = false;
let canvWid = 800;
let canvHeight = 400;
let width = 500;
let height = 400;
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
let bossSpawn = false;
let bossCount = 1;
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
  teleports = loadImage("telport.png")

}



function setup() {
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
background(70,70,70);
gameClock += 1;
image(doge, 700,0,150,canvHeight);




//background(120,120,255);

keyDown();
grass();
if (specBar >= 100){
  specBar = 100;
}
if (cellUIflop == true){
  cellUI();
}
store();
player.display();
gun.disp(player);
textUI();
noStroke();




if(!player.isDead){
  moveEnemies(enemies,player);
}
else death();



//line(player.x,player.y, mouseX,mouseY);

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
  if (groundItems[i][0] == 1) fill(255,0,0);
  else if (groundItems[i][0] == 2){
  fill(120,0,255);}
  else if (groundItems[i][0] == 3){
  fill(0,0,255);}
  ellipse(groundItems[i][1],groundItems[i][2],20,20);


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
for (let i = 0;i<enemies.length;i++){
  enemies[i].enemyNum = i;

  if(dist(player.x,player.y,enemies[i].x,enemies[i].y)< enemies[i].diameter/1.7 && player.immunity == false){
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
  if (teleArr[i].iterations > 20){
    teleArr.splice(i,1);
  }else{
  teleArr[i].drawPic();
  teleArr[i].iterations += 1;
}
}

specBarUI();
hearts();
if(controlAct == true){
  fill(107,107,107);
  stroke(120,0,10)
  rect(200,100,300,200);
  text("-Start by pressing start \n-Wasd to move \n-Click to Shoot\n-Space to use spec Bar\n-E to teleport\n-Once dead click restart\n-CLICK CONTROLS TO LEAVE\n   MENU",210,120);
}
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
    rect(gunX,gunY,gunW+2*slidergz.value(),gunH+2*slidergz.value());
    noStroke();
    pop();
  }





}



function mouseClicked() {
  projectile.push(new proj(player.x, player.y,mouseX,mouseY));
}
