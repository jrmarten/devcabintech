import {
    hello,
    tes
} from './scripts/import-example';

import './styles/style.css';
import './styles/style.scss';
import './styles/style.sass';

hello();

// async function run() {
//   const value = await tes();
//   console.log(value)
// }

// run();

// async function lazyLoadExample() {
//   const { lazyLoad } = await import('./scripts/lazy-load-example');
//   lazyLoad().then(res => console.log(res));
// };

// // document.querySelector("#lazy-load").addEventListener('click', lazyLoadExample);

// Variables
let $curve = document.getElementById("curve");
let last_known_scroll_position = 0;
let defaultCurveValue = 350;
let curveRate = 1;
let ticking = false;
let curveValue;

// Handle the functionality
function scrollEvent(scrollPos) {
    if (scrollPos >= 0 && scrollPos < defaultCurveValue) {
        curveValue = defaultCurveValue - parseFloat(scrollPos / curveRate);
        $curve.setAttribute(
            "d",
            "M 800 300 Q 400 " + curveValue + " 0 300 L 0 0 L 800 0 L 800 300 Z"
        );
    }
}

// Scroll Listener
// https://developer.mozilla.org/en-US/docs/Web/Events/scroll
window.addEventListener("scroll", function (e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(function () {
            scrollEvent(last_known_scroll_position);
            ticking = false;
        });
    }

    ticking = true;
});

var menu = document.querySelector('.nav__list');
var burger = document.querySelector('.burger');
var doc = $(document);
var l = $('.scrolly');
var panel = $('.panel');
var vh = $(window).height();

var openMenu = function () {
    burger.classList.toggle('burger--active');
    menu.classList.toggle('nav__list--active');
};

// reveal content of first panel by default
panel.eq(0).find('.panel__content').addClass('panel__content--active');

var scrollFx = function () {
    var ds = doc.scrollTop();
    var of = vh / 4;

    // if the panel is in the viewport, reveal the content, if not, hide it.
    for (var i = 0; i < panel.length; i++) {
        if (panel.eq(i).offset().top < ds + of ) {
            panel
                .eq(i)
                .find('.panel__content')
                .addClass('panel__content--active');
        } else {
            panel
                .eq(i)
                .find('.panel__content')
                .removeClass('panel__content--active')
        }
    }
};

var scrolly = function (e) {
    e.preventDefault();
    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
        'scrollTop': $target.offset().top
    }, 300, 'swing', function () {
        window.location.hash = target;
    });
}

var init = function (e) {
    burger.addEventListener('click', openMenu, false);
    window.addEventListener('scroll', scrollFx, false);
    window.addEventListener('load', scrollFx, false);
    if (e.classList.includes('scroll-down')) {

    } else {
        $('a[href^="#"]').on('click', scrolly);
    }

};

doc.on('ready', init);