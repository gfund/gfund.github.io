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



