const backgrounds = [
  "https://i.pinimg.com/originals/2f/87/34/2f87344e9be33d21c5da0b02a409e9b6.jpg",
  "https://i.etsystatic.com/6797489/r/il/b94794/695374348/il_1080xN.695374348_eqgf.jpg",
  "https://jakepetersonphoto.com/wp-content/uploads/2021/02/LCMTHC2854.jpg",
];

let curr_img_index = 0;

function change_background() {
  console.log("Change Background");

  const containerElement = document.getElementById("image");
  const textElement = document.querySelector(".text");

  const fadeOutEffect = setInterval(function () {
    if (!containerElement.style.opacity) {
      containerElement.style.opacity = 1;
      textElement.style.opacity = 1; // Ensure text remains visible during transition
    }
    if (parseFloat(containerElement.style.opacity) > 0) {
      containerElement.style.opacity -= 0.1;
      textElement.style.opacity -= 0.1; // Fade out the text along with the background image
    } else {
      clearInterval(fadeOutEffect);
      containerElement.style.backgroundImage =
        "url('" + backgrounds[curr_img_index] + "')";
      fadeIn(textElement); // Pass the text element to fadeIn function
    }
  }, 200);

  curr_img_index++;
  if (curr_img_index >= backgrounds.length) {
    curr_img_index = 0;
  }
}

function fadeIn(textElement) {
  const containerElement = document.getElementById("image");

  const fadeInEffect = setInterval(function () {
    if (!containerElement.style.opacity) {
      containerElement.style.opacity = 0;
    }
    if (parseFloat(containerElement.style.opacity) < 1) {
      containerElement.style.opacity =
        parseFloat(containerElement.style.opacity) + 0.1;
      textElement.style.opacity = parseFloat(textElement.style.opacity) + 0.1; // Ensure text remains visible during transition
    } else {
      clearInterval(fadeInEffect);
    }
  }, 200);
}

setInterval(change_background, 5000);
