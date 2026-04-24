window.addEventListener("load", function () {
  initSwiper(); //메인 페이지 스와이퍼 스크립트 실행
  initDetails(); //디테일 페이지 스크립트 실행
  initLinks();
  initProducts();
  initDetailsPage();
  initShopPage();
  initDibs();

  //-----------------------//
  // 공통 스크립트 //
  //-----------------------//
  // 변수 선언
  const header = document.querySelector(".header");
  const gnb = document.querySelector(".gnb-wrap");
  var depth1 = document.querySelectorAll(".depth1 a");
  var depth2 = document.querySelectorAll(".depth2-wrap");
  const overlay = document.querySelector(".wrapper-overlay");
  const moOpen = document.querySelector(".mo-menu-btn");
  const moClose = document.querySelector(".mo-close-btn");
  const moMenu = document.querySelector(".mo-menu-wrap");
  const topBtn = document.querySelector(".fixed-top");

  // 스크롤 시 탑바 숨기기
  document.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      topBtn.classList.add("active");
      header.classList.add("active");
    } else {
      topBtn.classList.remove("active");
      header.classList.remove("active");
    }
  });

  //로그인, 검색 팝업
  const loginPop = $(".login-pop");
  const userBtn = $(".fa-user");
  const searchPop = $(".search-pop");
  const searchBtn = $(".search-btn");
  const closeBtn = $(".search-close");

  loginPop.click(function (e) {
    if ($(e.target).closest(".login").length) return;
    loginPop.removeClass("active");
  });

  userBtn.click(function () {
    moMenu.classList.remove("active");
    loginPop.addClass("active");
  });

  searchBtn.click(function () {
    searchPop.addClass("active");
  });

  closeBtn.click(function () {
    searchPop.removeClass("active");
  });

  // 서브메뉴
  depth1.forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      var data = el.dataset.category;
      depth2.forEach(function (d) {
        d.classList.remove("active");
      });

      document
        .querySelector('.depth2-wrap[data-category="' + data + '"]')
        .classList.add("active");

      gnb.classList.add("active");
      overlay.classList.add("active");
    });
  });
  gnb.addEventListener("mouseleave", function () {
    depth2.forEach(function (d) {
      d.classList.remove("active");
      gnb.classList.remove("active");
      overlay.classList.remove("active");
    });
  });

  // 모바일 메뉴
  moOpen.addEventListener("click", function () {
    moMenu.classList.add("active");
  });
  moClose.addEventListener("click", function () {
    moMenu.classList.remove("active");
  });

  //좋아요 버튼 토글
  function initDibs() {
    const dibs = document.querySelectorAll(".dibs");

    dibs.forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.stopPropagation();
        this.classList.toggle("active");

        const num = document.querySelector(".dibs-value");
        if (!num) return;
        let value = Number(num.innerText);
        let isActive = this.classList.contains("active");

        num.innerText = isActive ? value + 1 : value - 1;
      });
    });
  }

  //카테고리 클릭
  function initLinks() {
    const links = document.querySelectorAll(".depth1");

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        console.log("A");
        e.preventDefault();
        console.log("B");
        const title = link.querySelector("a").textContent;

        const data = { title };
        localStorage.setItem("linkData", JSON.stringify(data));

        location.href = "shop.html";
      });
    });
  }

  // ---------------- 상품 클릭
  function initProducts() {
    const products = document.querySelectorAll(".item-data");

    products.forEach((product) => {
      product.addEventListener("click", (e) => {
        if (e.target.closest(".dibs")) return;
        const img1 = product.querySelector(".main-img img").src;
        const img2 = product.querySelector(".hover-img img").src;
        const name = product.querySelector("h5").textContent;
        const desc = product.querySelector("p").textContent;
        const price = product.querySelector(".price").textContent;
        const sale = product.querySelector(".sale")?.textContent || "";
        const per = product.querySelector(".per")?.textContent || "";

        const data = {
          img1,
          img2,
          name,
          desc,
          price,
          sale,
          per,
        };

        localStorage.setItem("productData", JSON.stringify(data));

        location.href = "details.html";
      });
    });
  }

  // ---------------- 상세페이지
  function initDetailsPage() {
    if (!location.pathname.includes("details.html")) return;

    const data = JSON.parse(localStorage.getItem("productData"));
    if (!data) return;

    document.querySelector(".detail-img1 img").src = data.img1;
    document.querySelector(".detail-img2 img").src = data.img2;

    document.querySelector("#product-name").textContent = data.name;
    document.querySelector("#product-desc").textContent = data.desc;
    document.querySelector("#product-price").textContent = data.price;

    const saleEl = document.querySelector("#sale");
    const perEl = document.querySelector("#per");

    if (saleEl) saleEl.textContent = data.sale;
    if (perEl) perEl.textContent = data.per;
  }

  // ---------------- 쇼핑페이지
  function initShopPage() {
    if (!location.pathname.includes("shop.html")) return;

    const link = JSON.parse(localStorage.getItem("linkData"));
    if (!link) return;

    document.querySelector(".section-title h2").textContent = link.title;
  }

  //-----------------------//
  // 메인페이지 스크립트 //
  //-----------------------//

  function initSwiper() {
    const el = document.querySelector(".mySwiper");
    console.log(el);
    if (!el) return;

    //Top-Bar Swiper
    const topSwiper = new Swiper(".topSwiper", {
      loop: true,

      slidesPerView: 1, // 한 화면에 보여질 슬라이드 개수
      spaceBetween: 10, // 슬라이드 사이 여백(px)
      // 자동 슬라이드
      speed: 1200,
      centeredSlides: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },

      navigation: {
        nextEl: ".top-swiper-button-next",
        prevEl: ".top-swiper-button-prev",
        clickable: true,
      },
    });

    // PROMOTION SECTION SWIPER
    const swiper = new Swiper(".mySwiper", {
      loop: true,

      slidesPerView: 1.2, // 한 화면에 보여질 슬라이드 개수
      spaceBetween: 10, // 슬라이드 사이 여백(px)
      // 자동 슬라이드
      speed: 1200,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        clickable: true,
      },
    });

    // PRODUCT SWIPER
    const swiper2 = new Swiper(".productSwiper", {
      loop: true,

      spaceBetween: 10, // 슬라이드 사이 여백(px)
      // 자동 슬라이드
      speed: 1200,
      centeredSlides: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },

      breakpoints: {
        0: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          slidesPerGroup: 2,
          spaceBetween: 20,
        },
        1025: {
          slidesPerView: 6,
          slidesPerGroup: 2,
          spaceBetween: 30,
        },
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        clickable: true,
      },
    });

    // PROMOTION, EXPLORE SECTION 클릭시 SHOP 이동
    const expLink = $(".exp-item");
    const proLink = $(".promotion .swiper-slide");

    expLink.click(function () {
      location.href = "shop.html";
    });
    proLink.click(function () {
      location.href = "shop.html";
    });
  }

  //-----------------------//
  //프로덕트 페이지 스크립트//
  //-----------------------//
  function initDetails() {
    const el = document.querySelector(".details-wrapper");
    console.log(el);
    if (!el) return;

    const sizeBtn = document.querySelectorAll(".size-item");
    const colorBox = document.querySelector(".color-con");

    //Size Btn 클릭 시 active
    sizeBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const isActive = btn.classList.contains("active");
        sizeBtn.forEach((el) => el.classList.remove("active"));
        if (!isActive) {
          btn.classList.add("active");
        }
      });
    });

    //컬러 박스 드래그
    let isClick = false;
    let startX;
    let scrollLeft;

    document.querySelectorAll(".color-con img").forEach((img) => {
      img.addEventListener("dragstart", (e) => e.preventDefault());
    });

    colorBox.addEventListener("mousedown", function (e) {
      isClick = true;
      colorBox.classList.add("dragging");

      startX = e.pageX - colorBox.offsetLeft;
      scrollLeft = colorBox.scrollLeft;
    });
    colorBox.addEventListener("mouseleave", function (e) {
      isClick = false;
      colorBox.classList.remove("dragging");
    });
    colorBox.addEventListener("mouseup", function (e) {
      isClick = false;
      colorBox.classList.remove("dragging");
    });
    colorBox.addEventListener("mousemove", function (e) {
      if (!isClick) return;
      e.preventDefault(); //텍스트 선택 방지

      const x = e.pageX - colorBox.offsetLeft;
      const walk = (x - startX) * 1.5;

      colorBox.scrollLeft = scrollLeft - walk;
    });

    //수량 스크립트
    const input = document.querySelector("#value");
    const minus = document.querySelector(".minus-btn");
    const plus = document.querySelector(".plus-btn");
    input.addEventListener("wheel", (e) => e.preventDefault());

    minus.addEventListener("click", () => {
      let value = Number(input.value);
      if (value <= 1) return;
      input.value = value - 1;
    });
    plus.addEventListener("click", () => {
      let value = Number(input.value);
      input.value = value + 1;
    });
  }
});
