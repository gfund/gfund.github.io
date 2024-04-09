const backgrounds = [
  "https://i.pinimg.com/originals/2f/87/34/2f87344e9be33d21c5da0b02a409e9b6.jpg",
  "https://i.etsystatic.com/6797489/r/il/b94794/695374348/il_1080xN.695374348_eqgf.jpg",
  "https://jakepetersonphoto.com/wp-content/uploads/2021/02/LCMTHC2854.jpg",
]; // backgrounds to flip through

let curr_img_index = 0; // store current image index

function change_background() {
  console.log("Change Back"); // Log a message to the console for debugging

  const fadeTarget = document.body; // Define fadeTarget as the body element

  // borrowed from https://stackoverflow.com/questions/29017379/how-to-make-fadeout-effect-with-pure-javascript
  const fadeEffect = setInterval(function () {
    if (!fadeTarget.style.opacity) {
      fadeTarget.style.opacity = 1;
    }
    if (parseFloat(fadeTarget.style.opacity) > 0) {
      fadeTarget.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
    }
  }, 200);

  // Increment the current image index
  curr_img_index++;

  // If at the end of the array, restart from the beginning
  if (curr_img_index >= backgrounds.length) {
    curr_img_index = 0;
  }

  // Set the new background image
  fadeTarget.style.backgroundImage =
    "url('" + backgrounds[curr_img_index] + "')";
}

// Call the change_background function every 2 seconds
setInterval(change_background, 2000);
