function devUI(){
  song.play();
  button = createButton('CellUI');
  button.position(260, 10);
  button.mousePressed(cellUIflopper);
  slider = createSlider(0, 100, 0);
  slider.position(260, 50);
  slider.style('width', '80px');
  button2 = createButton('SpawnEnemies');
  button2.position(260, 30);
  button2.mousePressed(spawnEnemies);
  button4 = createButton('START');
  button4.position(260, 70);
  button4.mousePressed(rampModeTog);
  button3 = createButton('Restart');
  button3.position(312, 10);
  button3.mousePressed(restart);
  // buttonb = createButton('BUY');
  // buttonb.position(33, 85);


}
function rampModeTog(){
  if (ramp == true)ramp = false;
  else {ramp = true;
  song.play();}
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
  stroke(255);
  fill(255- 2.5*specBar,2.5*specBar,0);
  rect(260,90,20,1.3*specBar);
  noStroke();
}
function death(){

  textSize(40);
  stroke(255);

  noStroke();
  let c = color(100, 100, 100, 102);
  fill(c);
  rect(0,0,250,250);
  fill(255,0,0);
  stroke(0,0,0);
  text("YOU DIED", 25, 50);
  song.pause();
  noFill();
  noStroke();

}
function restart(){
  if (player.isDead ==true){
  player.isDead = false;
  enemies = [];
  round = 1;
  specBar = 100;
  player.lives = 3;
  song.play();
  score = 0;}
}
function hearts(){

  imageMode(CENTER);
  for (let i = 0; i < player.lives;i++){
  image(heart, 240-i*20, 10, 20,20);
  }imageMode(CORNER);
}

function store(){
  image(market,320,130,70,70);

  if(dist(player.x,player.y,365,175)< 120){
    displayShopContents();
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
