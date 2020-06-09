class board{
  constructor(){
    this.mat = [width/25][height/25];
  }
}

function decor(){
  if(curRoom == 0){
  if (round-1 < 10){
    image(bgCob, 0,0, 750, 400);
  }
  else image(bgCobOpenDoor, 0,0, 750, 400);
} else if (curRoom == 1){
  image(winXp, 0,0, 750, 400);
}

}
