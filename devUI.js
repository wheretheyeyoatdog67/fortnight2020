let controlAct = false;
function devUI(){

  button = createButton('CellUI');
  button.position(140, 380);
  button.mousePressed(cellUIflopper);
  slider = createSlider(0, 100, 0);
  slider.position(460, 382);
  slider.style('width', '80px');
  slidergz = createSlider(0, 5, 0);
  slidergz.position(300, 382);
  slidergz.style('width', '80px');

  sliderbz = createSlider(0, 5, 0);
  sliderbz.position(380, 382);
  sliderbz.style('width', '80px');

  button2 = createButton('SpawnEnemies');
  button2.position(190, 380);
  button2.mousePressed(spawnEnemies);
  button4 = createButton('START');
  button4.position(30, 380);
  button4.mousePressed(rampModeTog);
  button3 = createButton('Restart');
  button3.position(85, 380);
  button3.mousePressed(restart);
  buttonhelp = createButton('Controls');
  buttonhelp.position(660, 380);
  buttonhelp.mousePressed(controls);
  buttonPNR = createButton('Pause/Resume');
  buttonPNR.position(550, 380);
  buttonPNR.mousePressed(pauseNextRoundF);



  // buttonb = createButton('BUY');
  // buttonb.position(33, 85);


}
function pauseNextRoundF(){

  if (pauseNextRound == true){
    pauseNextRound = false;
  }else pauseNextRound = true;
}
function controls(){
  if (controlAct == false){
    controlAct = true;
  }else controlAct = false;
}
function rampModeTog(){
  if (ramp == true)ramp = false;
  else {ramp = true;
}
}
function rampMode(){
  if (enemies.length == 0){
    //if (round <= 10){
    spawnEnemies();}
  //}
}

function cellUIflopper(){
  if (cellUIflop == true){
    cellUIflop = false;
  }else cellUIflop = true;
}

function cellUI(){
  stroke(255);
  for (let i = 0; i < 10; i++) {
      line(0, i*25, 250, i*25);
    for (let j = 0; j < 10; j++) {
      line(j*25,0,j*25,250);
    }
  }
  noStroke();
}
function specBarUI(){
  strokeWeight(3);
  stroke(120,0,255);
  fill(107,107,107);
  rect(717 ,25,20,250);
  fill(255,0,255- 1*specBar);
  rect(717 ,25,20,2.5*specBar);
  strokeWeight(1);
  noStroke();
}
function death(){
  enemyProjArr = [];
  textSize(40);
  stroke(255);
  noStroke();
  let c = color(100, 100, 100, 102);
  fill(c);
  rect(0,0,750,400);
  fill(255,0,0);
  stroke(0,0,0);
  text("YOU DIED", 275, 200);
  fullAuto = false;
  enemies = [];
  song.pause();
  noFill();
  noStroke();
}

function restart(){
  if (player.isDead == true){
  player.isDead = false;
  enemies = [];
  round = 1;
  specBar = 100;
  player.lives = 3;
  song.play();
  score = 0;
  player.teleport = 3;
  bossCount = 1;
  hitArr = [];
}

}

function hearts(){
  imageMode(CENTER);
  for (let i = 0; i < player.lives;i++){
  image(heart, 725-i*20, 15, 20,20);
  }
  for (let i = 0; i < player.teleport;i++){
    fill(255);
    strokeWeight(2);
    stroke(255,0,0);
    rect(692-i*20, 28, 15,15)
    image(teleports, 700-i*20, 35, 15,15);
  }
  imageMode(CORNER);
}

function store(){
  image(market,620,100,70,70);

  if(dist(player.x,player.y,650,150)< 20){
    //displayShopContents();
    stroke(120,70,70);
    fill(0,70,0);
    rect(635,125,30,30);
    fill(255);
    textSize(20);
    text("Q",642,145)
    inShop = true;
  }
  else {inShop = false
  shopping= false;};

}

function displayShopContents(){
  fill(90,90,90);
  stroke(120,70,70);
  rect(250,120,260,200);
  fill(165,42,42);

  text("Le Me : S h o P P E", 290,145);
  line(290,150,467,150);
  fill(255);
  stroke(255,255,0);
  strokeWeight(1);
  text("Gun DMG: 650 Points", 255,175);
  text("Full Auto: 1000 Points", 255,200);
}

function biggunbuy(){
  gunW += 5;
  gunH += 5;
  //console.log("buy");
}

function textUI(){

  // textSize(12);
  // text(mouseX-player.x, 260, 230);
  fill(0);
  // text(mouseY-player.y, 260, 240);
  strokeWeight(3);
  stroke(126);
  textSize(30);
  stroke(255,0,0);
  text("Round:", 40, 55);
  text(round-1,150, 55)
  stroke(126);
  fill(0);
  textSize(20);
  text("Score:", 40,80);
  stroke(255,0,0);
  text(score, 120,80);
  strokeWeight(1);


  if(controlAct == true){
    fill(107,107,107);
    stroke(120,0,10)
    rect(200,100,300,200);
    textSize(20);
    text("-Start by pressing start \n-Wasd to move \n-Click to Shoot\n-Space to use spec Bar\n-E to teleport\n-Once dead click restart\n-CLICK CONTROLS TO LEAVE\n   MENU",210,120);
  }

}

function doorEntrySign(){
  if(dist(player.x,player.y,260,50)< 60){
    stroke(120,70,70);
    fill(0,70,0);
    rect(224,40,30,30);
    fill(255);
    textSize(20);
    text("Q",230,60)
    doorEntry = true;
  }else doorEntry = false;
}
