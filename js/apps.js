// ------------------------------
// Detect FB / Instagram / Messenger in-app browser
// ------------------------------
(function () {
  const ua = navigator.userAgent || "";
  const isInApp =
    ua.includes("FBAN") ||
    ua.includes("FBAV") ||
    ua.includes("Instagram");

  if (isInApp) {
    document.documentElement.classList.add("inapp-browser");
  }
})();

$(document).ready(function () {

  // --------- NEW: Menu link → Cloudinary menu image (always fresh) ----------
  const menu = document.getElementById("menuLink");
  if (menu) {
    menu.href =
      "https://res.cloudinary.com/dksz1iukq/image/upload/roty/menu?cb=" +
      Date.now();
  }
  // ------------------------------------------------------------------------

  // -------------------- FAQ RENDER (auto) --------------------
  const faqs = [
    {
      q: "What is the order cut-off timing for same day delivery?",
      a: "Orders placed before 1:30 PM will be eligible for same day delivery. Any orders after cut-off time will be delivered the next day.",
      open: true
    },
    {
      q: "Am I locked in once I sign up?",
      a: "No, there are no lock-ins. Order for the days you need.",
      open: false
    },
    {
      q: "What days do you deliver?",
      a: "We do free home deliveries on all 7 days.",
      open: false
    },
    {
      q: "What time do you deliver?",
      a: "We do deliveries between 3 PM - 7 PM.",
      open: false
    },
    {
      q: "What areas do you deliver to?",
      a: `
        We deliver across Melbourne’s south-east suburbs, including Springvale, Oakleigh, Clayton, 
        Dandenong, Narre Warren, Cranbourne, Clyde and Glen Waverley.  
        A full list of our service areas is below:

        <ul style="list-style: initial;margin-left: 3rem;">
          <li>Springvale</li>
          <li>Oakleigh East</li>
          <li>Oakleigh</li>
          <li>Notting Hill</li>
          <li>Noble Park North</li>
          <li>Noble Park</li>
          <li>Narre Warren South</li>
          <li>Narre Warren North</li>
          <li>Narre Warren East</li>
          <li>Narre Warren</li>
          <li>Mulgrave</li>
          <li>Mount Waverley</li>
          <li>Malvern East</li>
          <li>Lyndhurst</li>
          <li>Lynbrook</li>
          <li>Knoxfield</li>
          <li>Keysborough</li>
          <li>Huntingdale</li>
          <li>Hampton Park</li>
          <li>Hallam</li>
          <li>Glen Waverley</li>
          <li>Endeavour Hills</li>
          <li>Doveton</li>
          <li>Dandenong South</li>
          <li>Dandenong North</li>
          <li>Dandenong</li>
          <li>Cranbourne West</li>
          <li>Cranbourne North</li>
          <li>Cranbourne East</li>
          <li>Cranbourne</li>
          <li>Clyde North</li>
          <li>Clyde</li>
          <li>Clayton South</li>
          <li>Clayton</li>
          <li>Clarinda</li>
          <li>Chadstone</li>
          <li>Berwick</li>
        </ul>
      `,
      open: false
    }
  ];

  function renderFAQs() {
    const acc = document.getElementById("homeAccordion");
    if (!acc) return; // only runs on pages that have the FAQ section

    acc.innerHTML = faqs.map((item, i) => {
      const id = `faq${i + 1}`;
      const btnClass = item.open ? "accordion-button" : "accordion-button collapsed";
      const collapseClass = item.open ? "accordion-collapse collapse show" : "accordion-collapse collapse";

      return `
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="${btnClass}" data-bs-toggle="collapse" data-bs-target="#${id}">
              ${item.q}
            </button>
          </h2>
          <div id="${id}" class="${collapseClass}" data-bs-parent="#homeAccordion">
            <div class="accordion-body">${item.a}</div>
          </div>
        </div>
      `;
    }).join("");
  }

  renderFAQs();
  // ------------------------------------------------------------

  // nav list come to screen
  $('.hamburger-menu').on('click', function () {
    $(this).toggleClass('menu-open');
    $('.nav-list').toggleClass('menu-open');
  });

  // remove the nav list and menu when clicked
  $('.nav-list .nav-link').on('click', function () {
    $('.hamburger-menu').removeClass('menu-open');
    $('.nav-list').removeClass('menu-open');
  });

  // sticky menu
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 1) {
      $(".sticky").removeClass("scroll-header");
    } else {
      $(".sticky").addClass("scroll-header");
    }
  });

  // AOS PAGE ANIMATION ACTIVATION
  AOS.init({
    easing: 'ease',
    duration: 1800,
    once: true
  });

});

// owl carousel code
jQuery(document).ready(function ($) {
  $('.testimonial-carousel').owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    navText: ['<span>&larr;</span>', '<span>&rarr;</span>'],
    responsive: {
      0: { items: 1 },
      601: { items: 2 },
      1000: { items: 2 }
    }
  });
});

$(document).ready(function () {

  $('.image-popup-vertical-fit').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  $('.image-popup-fit-width').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    image: {
      verticalFit: false
    }
  });

  $('.image-popup-no-margins').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300
    }
  });

});
