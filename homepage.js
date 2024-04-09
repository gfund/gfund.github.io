const backgrounds = [
  "https://i.pinimg.com/originals/2f/87/34/2f87344e9be33d21c5da0b02a409e9b6.jpg",
  "https://i.etsystatic.com/6797489/r/il/b94794/695374348/il_1080xN.695374348_eqgf.jpg",
  "https://jakepetersonphoto.com/wp-content/uploads/2021/02/LCMTHC2854.jpg",
]; // backgrounds to flip through

const curr_img_index = 0; //store current image index

function change_background() {
  //get the current background and start fading it out

  //borrowed from https://stackoverflow.com/questions/29017379/how-to-make-fadeout-effect-with-pure-javascript
  var fadeEffect = setInterval(function () {
    if (!fadeTarget.style.opacity) {
      fadeTarget.style.opacity = 1;
    }
    if (fadeTarget.style.opacity > 0) {
      fadeTarget.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
    }
  }, 200);

  //the picture is now faded out
  if (curr_img_index <= backgrounds.length) {
    //flip over if at end of array
    curr_img_index++; //increment the current image index by 1
  } else {
    curr_img_index = 0; //restart
  }
}
