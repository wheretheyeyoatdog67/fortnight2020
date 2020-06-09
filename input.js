function keyDown() {
  if (keyIsDown(65)) {
    player.move(-5,0);
  } if (keyIsDown(68)) {
    player.move(5,0);
  }
  if (keyIsDown(83)) {
    player.move(0,5);
  }
  if (keyIsDown(87)) {
    player.move(0,-5);
  }
  if (keyIsDown(32)) {
      if (specBar > 0){
      specBar -= 2;}
      if (specBar > 0){
      special.push(new specialProj(player.x,player.y));

      }
  }
  if (keyIsDown(81)) {
    if (gameClock - LastQTime > 10){
    if(round-1 >= 10 && doorEntry == true && curRoom == 0){
      curRoom = 1;}
    else (curRoom = 0);
    if(inShop == true){
      shopping = true;
    }


    LastQTime = gameClock;
  }

  }
  if (keyIsDown(69)) {
    if(player.teleport > 0){
    if(gameClock - lastTele > 100){
    px = player.x;
    py = player.y;
    player.x = mouseX;
    player.y = mouseY;
    teleArr.push(new tele(px,py,mouseX,mouseY));
    lastTele = gameClock;
  player.teleport -= 1;
}


  }

}


}
function mouseClicked(event) {
  if (shopping == true){
    if(mouseX>256 && mouseX < 470 && mouseY > 160 && mouseY < 180){
      if (score > 650){
        biggunbuy();
        score -= 650;}}
    else if (mouseX>256 && mouseX < 470 && mouseY > 185 && mouseY < 200){
      if (score > 1000){
        fullAuto = true;
        score -= 1000;}}
    }
    
  else if (fullAuto == false) projectile.push(new proj(player.x, player.y,mouseX,mouseY,false));

}
function mousePressed() {
  locked = true;
}
function mouseDragged() {
  if (locked) {
    if (fullAuto == true)
    projectile.push(new proj(player.x, player.y,mouseX,mouseY,false));
  }
}
