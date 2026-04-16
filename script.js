document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    loop: true,

    // 자동 슬라이드
    speed: 1200,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    // 페이지네이션
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      clickable: true,
    },
  });

  let menu = document.querySelectorAll(".menu");
  menu.forEach(function (el) {
    el.onclick = function () {
      menu.forEach(function (e) {
        e.classList.remove("active");
      });
      this.classList.add("active");
    };
  });

  let gnb = document.querySelector(".gnb-wrap");
  let logo = document.querySelector(".logo img");
  let line = document.querySelectorAll(".btn-line");
  let btn = document.querySelector(".mo-menu-btn");
  let topbtn = document.querySelector(".fixed-top-btn");
  let isMenuOpen = false;

  document.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      gnb.classList.add("active");
      topbtn.classList.add("active");
      logo.src = "/img/logo1.png";
      line.forEach(function (el) {
        el.classList.add("toggle");
      });
    } else {
      if (isMenuOpen) return;
      gnb.classList.remove("active");
      topbtn.classList.remove("active");
      logo.src = "/img/logo2.png";
      line.forEach(function (el) {
        el.classList.remove("toggle");
      });
    }
  });

  document.querySelector(".mo-menu-btn").onclick = function () {
    isMenuOpen = !isMenuOpen;

    line.forEach(function (btn) {
      btn.classList.toggle("active");
    });
    document.querySelector(".mo-menu-wrap").classList.toggle("active");

    if (window.scrollY < 10) {
      logo.src = "/img/logo2.png";
    }

    if (window.scrollY > 10) return;
    gnb.classList.toggle("active");
    line.forEach(function (el) {
      el.classList.toggle("toggle");
    });

    if (logo.src == "/img/logo1.png") {
      logo.src = "/img/logo2.png";
    } else {
      logo.src = "/img/logo1.png";
    }
  };
});
