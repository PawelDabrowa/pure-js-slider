{
  const sliders = document.querySelectorAll(".slider");
  // const interval = 2800;
  // const animDuration = 600;

  for (let i = 0; i < sliders.length; ++i) {
    const slider = sliders[i];
    const buttons = slider.querySelector(".buttons-bottom");
    const sliderImgs = slider.querySelectorAll(".slider-img");

    let currImg = 0;
    let prevImg = sliderImgs.length - 1;
    let intrvl;
    let timeout;

    for (let i = 0; i < sliderImgs.length; ++i) {
      const button = document.createElement("div");
      button.classList.add("button");
      buttons.appendChild(button);
      button.addEventListener("click", buttonClick.bind(null, i), false);
    }

    const allbuttons = buttons.querySelectorAll(".button");
    allbuttons[0].classList.add("active-button");

    sliderImgs[0].style.left = "0";
    timeout = setTimeout(() => {
      animateSlider();
      sliderImgs[0].style.left = "";
      intrvl = setInterval(animateSlider, interval);
    }, interval - animDuration);

    /**
     * @param {number} [nextImg]
     * @param {boolean} [right = false]
     */
    function animateSlider(nextImg, right) {
      if (!nextImg)
        nextImg = currImg + 1 < sliderImgs.length ? currImg + 2 : 1;

      --nextImg;
      sliderImgs[prevImg].style.animationName = "";

      if (!right) {
        sliderImgs[nextImg].style.animationName = "leftNext";
        sliderImgs[currImg].style.animationName = "leftCurr";
      } else {
        sliderImgs[nextImg].style.animationName = "rightNext";
        sliderImgs[currImg].style.animationName = "rightCurr";
      }

      prevImg = currImg;
      currImg = nextImg;

      currbutton = allbuttons[currImg];
      currbutton.classList.add("active-button");
      prevbutton = allbuttons[prevImg];
      prevbutton.classList.remove("active-button");
    }

    /**
     * @param {number} num 
     */
    function buttonClick(num) {
      if (num == currImg)
        return false;

      clearTimeout(timeout);
      clearInterval(intrvl);

      if (num > currImg)
        animateSlider(num + 1);
      else
        animateSlider(num + 1, true);

      intrvl = setInterval(animateSlider, interval);
    }
  }
}