class Game {
  audio = new Audio('music.mp3');
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }
  play(){
    this.audio.play();
  }
  pause(){
    this.audio.pause();
  }
}

class Square extends Game {
  constructor(options, canvas) {
    super(canvas);
    this.options = options;
  }
  clear(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  }
  
  moveRight(){
    this.clear();
    this.ctx.beginPath();
    this.options.x+=10;
    this.draw();
    this.ctx.closePath();
  }
  
  moveLeft(){
    this.clear();
    this.ctx.beginPath();
    this.options.x-=10;
    this.draw();
    this.ctx.closePath();
  }
  
  moveDown(){
    this.clear();
    this.ctx.beginPath();
    this.options.y+=10;
    this.draw();
    this.ctx.closePath();
  }
  
  moveUp(){
    this.clear();
    this.ctx.beginPath();
    this.options.y-=10;
    this.draw();
    this.ctx.closePath();
  }
  draw(){
    this.ctx.beginPath();
    let img = new Image();
    img.src = this.options.source;
    img.classList.add('animated');
    img.onload = (ev)=>{
      this.ctx.drawImage(img,this.options.x,this.options.y,this.options.width,this.options.height);
    }
    this.ctx.closePath();
  }
  blur(blurPX){
    this.canvas.style.filter = `blur(${blurPX}px)`;
  }
  cancelBlur(){
    this.canvas.style.filter = `blur(0px)`;
  }
}

let canvas = document.getElementById('canvas');
let game = new Game(canvas);

let square = new Square({
  x: 10,
  y: 10,
  width: 50,
  height: 50,
  source:'./mell.jpg'
}, canvas);

square.draw();
window.onkeydown = (ev)=>{
  ev.preventDefault();
  
  if(ev.key=='w'){
    square.moveUp();
  }
  
  if(ev.key=='s'){
    square.moveDown();
  }
  
  if(ev.key=='a'){
    square.moveLeft();
  }
  
  if(ev.key=='d'){
    square.moveRight();
  }

  if(ev.code=='Space'){
    game.play();
  } 
  
  if(ev.code=='ShiftLeft'){
    game.pause();
  }
  if(ev.key=='e'){
    square.blur(5);
  }
  if(ev.key=='q'){
    square.cancelBlur();
  }
}