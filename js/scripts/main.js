var slide_thumbnail = new Swiper(".slide-thumbnail", {
  slidesPerView: 5,
  direction: "vertical",
  spaceBetween: "20",
  watchSlidesProgress: true,
  breakpoints: {
    320: {
      direction: "horizontal",
    },
    991: {
      direction: "vertical",
    },
  },
});

const progresSlide = document.querySelector(".js-progress");
var slide_hero = new Swiper(".slide-principal", {
  effect: "fade",
  thumbs: {
    swiper: slide_thumbnail,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  on: {
    init: function () {
      progresSlide.classList.remove("animate");
      progresSlide.classList.remove("active");
      progresSlide.classList.add("animate");
      progresSlide.classList.add("active");
    },
    slideChangeTransitionStart: function () {
      progresSlide.classList.remove("animate");
      progresSlide.classList.remove("active");
      progresSlide.classList.add("active");
    },
    slideChangeTransitionEnd: function () {
      progresSlide.classList.add("animate");
    },
  },
});

const allFilters = document.querySelectorAll(".js-nav-games li a");
const tabGames = document.querySelectorAll(".tab-games");
allFilters.forEach((filter, index) => {
  filter.addEventListener("click", (event) => {
    event.preventDefault();

    allFilters.forEach((item) => {
      item.classList.remove("active");
    });

    tabGames.forEach((tab) => {
      tab.classList.remove("active");
    });

    tabGames[index].classList.add("active");
    filter.classList.add("active");
  });
});

const btnOpenModal = document.querySelector(".js-open-modal");
const btnCloseModal = document.querySelectorAll(".js-close-modal");
btnOpenModal.addEventListener("click", (event) => {
  event.preventDefault();
  let html = document.documentElement;
  html.classList.add("show-modal");
});
btnCloseModal.forEach((element) => {
  element.addEventListener("click", () => {
    let html = document.documentElement;
    html.classList.remove("show-modal");
  });
});

const btnMenu = document.querySelectorAll(".js-btn-menu");
const dropMenu = document.querySelectorAll(".js-menu");
btnMenu.forEach((btn, index) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();

    dropMenu.forEach((itemMenu, index) => {
      itemMenu.classList.remove("active");
      btnMenu[index].classList.remove("active");

      itemMenu.addEventListener("mouseleave", () => {
        itemMenu.classList.remove("active");
        btnMenu[index].classList.remove("active");
      });
    });

    btn.classList.add("active");
    dropMenu[index].classList.add("active");
  });
});

const closeMobilebtn = document.querySelector(".js-close-mobile");
const closeMobileOverlay = document.querySelector(".js-close-mobileOverlay");
function menuMobile() {
  document.documentElement.classList.toggle("active-mobile-menu");
}
closeMobilebtn.addEventListener("click", menuMobile);
closeMobileOverlay.addEventListener("click", menuMobile);
