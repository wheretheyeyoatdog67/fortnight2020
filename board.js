class board{
  constructor(){
    this.mat = [width/25][height/25];
  }
}

function decor(){
  if (round-1 < 10){
    image(bgCob, 0,0, 750, 400);
  }
  else image(bgCobOpenDoor, 0,0, 750, 400);


}
