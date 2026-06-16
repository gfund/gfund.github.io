var current_game=null;
canvas_objects=[];
canvas_height=0;
let settledCanvas, settledCtx;

function calculate_coord(equationX, equationY, index) {
  const x = math.evaluate(equationX, { t: index });
  const y = math.evaluate(equationY, { t: index });
  return { x, y };
}

class DrawingObject{
  constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
  }
}

class StringObject extends DrawingObject{
  constructor(x, y, color, font, text){
    super(x, y, color);
    this.text = text;
    this.font = font;
  }
  draw(ctx){
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }
}

function animation_draw(ctx, object, startx, starty, equationX, equationY, step_time, steps, velocity = 1, onComplete) {
  let i = 0;
  
  function animate() {
    if (i <= steps) {
      const coord = calculate_coord(equationX, equationY, i);

      object.x = startx + coord.x;
      object.y = starty - coord.y;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(settledCanvas, 0, 0);
      object.draw(ctx);

      i += velocity;
      setTimeout(animate, step_time);
    } else {
      settledCtx.drawImage(ctx.canvas, 0, 0);
      if (onComplete) onComplete();
    }
  }

  animate();
}

btn_ids = ["btn-a", "btn-b", "btn-start", "btn-select", "btn-up", "btn-down", "btn-left", "btn-right"];
for(let i = 0; i < btn_ids.length; i++){
    console.log(btn_ids[i], document.getElementById(btn_ids[i]));
}
for(let i = 0; i < btn_ids.length; i++){
    let btn = document.getElementById(btn_ids[i]);
    btn.addEventListener("touchstart", function(e){
        console.log("pressed " + btn_ids[i]);
        if(current_game != null){
             e.preventDefault();
            current_game.controller.press(btn_ids[i]);
        }
    });
}

function scaleButtons() {
  const consoleImg = document.getElementById('console-img');
  const consoleContainer = document.getElementById('console');
  
  const scale = consoleImg.width / 340;
  
  const buttons = [
    { id: 'btn-a', x: 239, y: 307, w: 50, h: 50 },
    { id: 'btn-b', x: 185, y: 340, w: 50, h: 50 },
    { id: 'btn-start', x: 130, y: 400, w: 35, h: 35 },
    { id: 'btn-select', x: 70, y: 400, w: 35, h: 35 },
    { id: 'btn-up', x: 43, y: 326, w: 10, h: 20 },
    { id: 'btn-down', x: 43, y: 370, w: 10, h: 20 },
    { id: 'btn-left', x: 20, y: 348, w: 20, h: 20 },
    { id: 'btn-right', x: 59, y: 348, w: 20, h: 20 }
  ];
  
  buttons.forEach(btn => {
    const el = document.getElementById(btn.id);
    el.style.left = (btn.x * scale) + 'px';
    el.style.top = (btn.y * scale) + 'px';
    el.style.width = (btn.w * scale) + 'px';
    el.style.height = (btn.h * scale) + 'px';
  });
}

function logo_draw(){
  const canvas = document.getElementById('screen');
  const ctx = canvas.getContext('2d');
  
  const letter = new StringObject(0, canvas_height - 100, '#ccc8c0', '120px Arial', 'BMWBOY\u00AE');
  const letter2 = new StringObject(0, canvas_height - 100, '#08241c', '110px Arial', 'Matt Edition');
  
  animation_draw(ctx, letter, 150, canvas_height-700, "0", "-t", 100, 400, 10, () => {
    animation_draw(ctx, letter2, 150, canvas_height-600, "0", "-t", 100, 400, 10);
  });
}

function drawtoScreen(){
  const canvas = document.getElementById('screen');
  const screenArea = document.getElementById('screen-area');

  canvas.width = screenArea.offsetWidth
  canvas.height = screenArea.offsetHeight;
  canvas_height = canvas.height;
  const ctx = canvas.getContext('2d');
 
  settledCanvas = document.createElement('canvas');
  settledCanvas.width = canvas.width;
  settledCanvas.height = canvas.height;
  settledCtx = settledCanvas.getContext('2d');

  const img = new Image();
  img.src = 'bmwboyback.png';
  img.onload = () => {
    settledCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
    logo_draw();
  };
}

drawtoScreen();
window.addEventListener('resize', scaleButtons);
scaleButtons();