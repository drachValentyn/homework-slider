import './style.scss';

function unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e
}

function lock(e) {
    start = unify(e).clientX
}


class MySlider {
    constructor() {
        this.sliderWrap = document.getElementById('slider-wrap');
        this.slider = document.getElementById('slider');
        this.numSlider = this.slider.children.length;
        this.next = document.getElementById('next');
        this.prev = document.getElementById('prev');
        this.direction;
        this.startX = null;
        this.i = 0;
    }

    changeSlide() {
        if (this.direction === 1) {
            this.slider.prepend(this.slider.lastElementChild)
        } else {
            this.slider.appendChild(this.slider.firstElementChild)
        }

        this.slider.style.transition = 'none';
        this.slider.style.transform = 'translate(0)';
        setTimeout(() => {
            this.slider.style.transition = 'all 0.5s'
        })
    }

    prevSlide() {
        if (this.direction === -1) {
            this.direction = 1;
            this.slider.appendChild(this.slider.firstElementChild)
        }
        this.sliderWrap.style.justifyContent = 'flex-end';
        this.slider.style.transform = 'translate(20%)'
    }

    nextSlide() {
        this.direction = -1;
        this.sliderWrap.style.justifyContent = 'flex-start';
        this.slider.style.transform = 'translate(-20%)'
    }

    addListener() {
        this.slider.addEventListener('transitionend', this.changeSlide.bind(this, null, 'slider'));
        this.next.addEventListener('click', this.nextSlide.bind(this, null, 'next'));
        this.prev.addEventListener('click', this.prevSlide.bind(this, null, 'prev'));
    }

}


//---create new slider

const newSlider = new MySlider();

newSlider.addListener();


//---add swipe to slider
let start = newSlider.startX;
let test = newSlider.slider;

function swipe(e) {
    if (start || start === 0) {
        let dirx = unify(e).clientX - start;
        let s = Math.sign(dirx);
        if ((newSlider.i > 0 || s < 0) && (newSlider.i < newSlider.numSlider - 1 || s > 0)) {
            newSlider.nextSlide()
        } else {
            newSlider.prevSlide()
        }
        start = null
    }
}

test.addEventListener('mousedown', lock, false);
test.addEventListener('mouseup', swipe, false);

test.addEventListener('touchstart', lock, false);
test.addEventListener('touchend', swipe, false);
