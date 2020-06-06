function keyDown() {
  if (keyIsDown(65)) {
    player.move(-3,0);
  } if (keyIsDown(68)) {
    player.move(3,0);
  }
  if (keyIsDown(83)) {
    player.move(0,3);
  }
  if (keyIsDown(87)) {
    player.move(0,-3);
  }
  if (keyIsDown(32)) {
      if (specBar > 0){
      specBar -= 2;}
      if (specBar > 0){
      special.push(new specialProj(player.x,player.y));
      }
  }
}
function mouseClicked(event) {
  projectile.push(new proj(player.x, player.y,mouseX,mouseY));

}
