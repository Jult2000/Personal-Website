(function($) {
  "use strict";

  // ── Navbar scroll shadow ──────────────────────────────────
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 10) {
      $('.js-sticky-header').addClass('scrolled');
    } else {
      $('.js-sticky-header').removeClass('scrolled');
    }
  });

  // ── Mobile menu ───────────────────────────────────────────
  // Clone nav links into mobile menu body (only once)
  var $mobileBody = $('.site-mobile-menu-body');
  if ($mobileBody.length && $mobileBody.children().length === 0) {
    $('.js-clone-nav').each(function() {
      var $clone = $(this).clone();
      $clone.attr('class', 'site-nav-wrap');
      $clone.removeAttr('id');
      $mobileBody.append($clone);
    });
  }

  function closeMenu() {
    $('body').removeClass('offcanvas-menu');
  }

  function openMenu() {
    $('body').addClass('offcanvas-menu');
  }

  // Toggle on hamburger / close icon click
  $(document).on('click', '.js-menu-toggle', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if ($('body').hasClass('offcanvas-menu')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on any link inside mobile menu
  $(document).on('click', '.site-mobile-menu-body a', function() {
    closeMenu();
  });

  // Close clicking outside the menu panel
  $(document).on('click', function(e) {
    if ($('body').hasClass('offcanvas-menu')) {
      if (!$(e.target).closest('.site-mobile-menu').length &&
          !$(e.target).closest('.js-menu-toggle').length) {
        closeMenu();
      }
    }
  });

  // ── Smooth scroll ─────────────────────────────────────────
  $(document).on('click', 'a[href^="#"]', function(e) {
    var target = $(this).attr('href');
    if (target.length > 1 && $(target).length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $(target).offset().top - 70
      }, 600, 'swing');
    }
  });

  // ── AOS init ──────────────────────────────────────────────
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, easing: 'ease-in-out', once: true, offset: 80 });
  }

})(jQuery);
