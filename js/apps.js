$(document).ready(function(){

  // --------- NEW: Menu link → Cloudinary menu image (always fresh) ----------
  const menu = document.getElementById("menuLink");
  if (menu) {
    menu.href =
      "https://res.cloudinary.com/dksz1iukq/image/upload/roty/menu?cb=" +
      Date.now();
  }
  // ------------------------------------------------------------------------

  // nav list come to screen 
  $('.hamburger-menu').on('click', function(){
      $(this).toggleClass('menu-open');
      $('.nav-list').toggleClass('menu-open');
  });
  
  // remove the nav list and menu when clicked
  $('.nav-list .nav-link').on('click', function(){
    $('.hamburger-menu').removeClass('menu-open');
    $('.nav-list').removeClass('menu-open');
  });

  // sticky menu
  $(window).on('scroll',function() {    
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

$(document).ready(function() {

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
