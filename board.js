class board{
  constructor(){
    this.mat = [width/25][height/25];
  }
}

function grass(){
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      image(img, i*50, j*50, 50, 50);
    }
 }
 
}
