/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  // Validate that variables exist
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      // We add the show-menu class to the div tag with the nav__menu class
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 200) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
  origin: "top",
  distance: "30px",
  duration: 2000,
  reset: true,
});

sr.reveal(
  `.home__data, .home__img,
            .about__data, .about__img,
            .services__content, .menu__content,
            .app__data, .app__img,
            .contact__data, .contact__button,
            .footer__content`,
  {
    interval: 200,
  }
);

// ROTATE BODY ON SCROLL
// window.onscroll = function() {
//     var theta = document.documentElement.scrollTop / 600 % Math.PI;

// document.getElementById('js-logo').style.transform ='rotate(' + theta + 'rad)';
// }

gsap.set("#spin-man-logo", { xPercent: -50 });

var rotate = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#wrap",
      pin: true,
      scrub: 0.2,
      start: "top top",
      end: "+=10000",
    },
  })
  .to("#spin-man-logo", {
    rotation: 360 * 5,
    duration: 1,
    ease: "none",
  });

// SLIDER GSAP
console.clear();

var slideDelay = 1.5;
var slideDuration = 1;
var slides = document.querySelectorAll(".slide");
var numSlides = slides.length;

TweenLite.set(slides, {
  xPercent: function (i, target) {
    return i * 100;
  },
});

var wrap = wrapPartial(-100, (numSlides - 1) * 100);
var timer = TweenLite.delayedCall(slideDelay, autoPlay).pause();
var proxy = document.createElement("div");
TweenLite.set(proxy, { x: "+=0" });
var transform = proxy._gsTransform;
var slideWidth = 0;
var wrapWidth = 0;
var animation = new TimelineMax({ repeat: -1 });
resize();

var draggable = new Draggable(proxy, {
  trigger: ".slides-container",
  throwProps: true,
  onPressInit: function () {
    animation.pause();
    timer.pause();
    updateProgress();
  },
  onDrag: updateProgress,
  onThrowUpdate: updateProgress,
  onThrowComplete: function () {
    timer.restart(true);
  },
});

window.addEventListener("resize", resize);

function animateSlides(direction) {
  var progress = animation.progress() + direction / numSlides;
  timer.pause();
  animation.pause();
  TweenLite.to(animation, slideDuration, {
    progress: progress,
    overwrite: true,
    modifiers: {
      progress: function (value) {
        return (value < 0 || value === 1 ? 1 : 0) + (value % 1);
      },
    },
    onComplete: function () {
      timer.restart(true);
    },
  });
}

function autoPlay() {
  animation.play();
  TweenLite.fromTo(
    animation,
    1,
    { timeScale: 0 },
    { timeScale: 1, ease: Power1.easeIn }
  );
}

function updateProgress() {
  animation.progress(transform.x / wrapWidth);
}

function resize() {
  var progress = animation.progress();
  slideWidth = slides[0].offsetWidth;
  wrapWidth = slideWidth * numSlides;

  animation
    .progress(0)
    .clear()
    .to(slides, 100, {
      xPercent: "+=" + numSlides * 100,
      ease: Linear.easeNone,
      modifiers: {
        xPercent: wrap,
      },
    })
    .to(proxy, 100, { x: wrapWidth, ease: Linear.easeNone }, 0)
    .progress(progress);
}

function wrapPartial(min, max) {
  var r = max - min;
  return function (value) {
    var v = value - min;
    return ((r + (v % r)) % r) + min;
  };
}

// INTERACTIVE TILES 
