const sliderWrap = document.getElementById('slider-wrap')
const slider = document.getElementById('slider')
const numSlider = slider.children.length

const next = document.getElementById('next')
const prev = document.getElementById('prev')

let direction;
let startX = null;
let i = 0;

slider.addEventListener('transitionend', changeSlide, false)

next.addEventListener('click', nextSlide, false)
prev.addEventListener('click',  prevSlide, false)

slider.addEventListener('mousedown', lock, false)
slider.addEventListener('touchstart', lock, false)

slider.addEventListener('mouseup', swipe, false)
slider.addEventListener('touchend', swipe, false)

function prevSlide () {
  if (direction === -1) {
    direction = 1
    slider.appendChild(slider.firstElementChild)
  }
  sliderWrap.style.justifyContent = 'flex-end'
  slider.style.transform = 'translate(20%)'

}

function nextSlide () {
  direction = -1
  sliderWrap.style.justifyContent = 'flex-start'
  slider.style.transform = 'translate(-20%)'
}

function changeSlide() {
  if (direction === 1) {
    slider.prepend(slider.lastElementChild)
  } else {
    slider.appendChild(slider.firstElementChild)
  }

  slider.style.transition = 'none'
  slider.style.transform = 'translate(0)'
  setTimeout(() => {
    slider.style.transition = 'all 0.5s'
  })
}

function unify (e) {
  return e.changedTouches ? e.changedTouches[0] : e
}

function lock (e) {
  startX = unify(e).clientX
}

function swipe (e) {
  if (startX || startX === 0) {

    let dirx = unify(e).clientX - startX

    let s = Math.sign(dirx)

    if ((i > 0 || s < 0) && (i < numSlider - 1 || s > 0)) {
      nextSlide()
    } else {
      prevSlide()

    }

    startX = null
  }
}