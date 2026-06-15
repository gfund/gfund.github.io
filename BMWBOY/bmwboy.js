var current_game=null; // current game holder


//controls


btn_ids = ["btn-a", "btn-b", "btn-start", "btn-select", "btn-up", "btn-down", "btn-left", "btn-right"]
for(let i=0; i<btn_ids.length; i++){
    console.log(btn_ids[i], document.getElementById(btn_ids[i]));
}
for(let i=0; i<btn_ids.length; i++){
    let btn = document.getElementById(btn_ids[i]);
    btn.addEventListener("touchstart", function(e){
        console.log("pressed "+btn_ids[i]);
      
        if(current_game!=null){
             e.preventDefault();
            current_game.controller.press(btn_ids[i]);
        }
    });

}
function scaleButtons() {
  const consoleImg = document.getElementById('console-img');
  const consoleContainer = document.getElementById('console');
  
  // Get the actual rendered width of the console image
  const scale = consoleImg.offsetWidth / 400; // 400 = your original console width in pixels
  
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

window.addEventListener('resize', scaleButtons);
scaleButtons();


