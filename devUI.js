function devUI(){
  button = createButton('CellUI');
  button.position(260, 10);
  button.mousePressed(cellUIflopper);
  slider = createSlider(0, 100, 0);
  slider.position(260, 50);
  slider.style('width', '80px');
  button2 = createButton('SpawnEnemies');
  button2.position(260, 30);
  button2.mousePressed(spawnEnemies);
  button4 = createButton('Ramp Mode');
  button4.position(260, 70);
  button4.mousePressed(rampModeTog);
  button3 = createButton('Restart');
  button3.position(312, 10);
  button3.mousePressed(restart);
}
function rampModeTog(){
  if (ramp == true)ramp = false;
  else ramp = true;
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
  fill(255- 2.5*specBar,0,0);
  rect(260,90,20,1.3*specBar);
  noStroke();
}
function death(){

  textSize(40);
  stroke(255);
  fill(255,0,0);
  text("YOU DIED", 25, 50);
  noFill();
  noStroke();

}
function restart(){
  player.isDead = false;
  enemies = [];
  round = 1;
  specBar = 100;
  player.lives = 3;
}
function hearts(){

  imageMode(CENTER);
  for (let i = 0; i < player.lives;i++){
  image(heart, 200+i*20, 10, 20,20);
  }imageMode(CORNER);
}
