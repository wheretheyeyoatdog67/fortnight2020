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
  buttonhelp.position(650, 380);
  buttonhelp.mousePressed(controls);



  // buttonb = createButton('BUY');
  // buttonb.position(33, 85);


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
    spawnEnemies();
  }
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

  textSize(40);
  stroke(255);
  noStroke();
  let c = color(100, 100, 100, 102);
  fill(c);
  rect(0,0,750,400);
  fill(255,0,0);
  stroke(0,0,0);
  text("YOU DIED", 275, 200);
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

  if(dist(player.x,player.y,365,175)< 120){
    //displayShopContents();
    inShop = true;

  }
  else inShop = false;

}

function displayShopContents(){
  fill(70,70,70);
  rect(20,20,200,200);
  fill(90,90,90);
  rect(22,22,196,196);
  fill(165,42,42);
  stroke(255,0,0);
  text("Le Me : S h o P P E", 32,40);
  text("---------------------------", 32,49);
  fill(255);
  stroke(255,255,0);
  text("Big Gun: 2000 Points", 25,70);
}

function biggunbuy(){
  gunW += 10;
  gunH += 10;
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
}
