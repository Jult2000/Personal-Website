(function($) {
  "use strict";

  // ── Navbar scroll shadow + accent bar ────────────────────
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 10) {
      $('.js-sticky-header').addClass('scrolled');
    } else {
      $('.js-sticky-header').removeClass('scrolled');
    }
    updateActiveLink();
  });

  // ── Active nav link on scroll ─────────────────────────────
  function updateActiveLink() {
    var scrollPos = $(window).scrollTop() + 80;
    $('.site-menu.main-menu li a.nav-link').each(function() {
      var target = $(this).attr('href');
      if (target && target.startsWith('#') && $(target).length) {
        var top    = $(target).offset().top;
        var bottom = top + $(target).outerHeight();
        if (scrollPos >= top && scrollPos < bottom) {
          $('.site-menu.main-menu li a.nav-link').removeClass('active');
          $(this).addClass('active');
        }
      }
    });
  }

  // ── Mobile menu ───────────────────────────────────────────
  var $mobileBody = $('.site-mobile-menu-body');
  if ($mobileBody.length && $mobileBody.children().length === 0) {
    $('.js-clone-nav').each(function() {
      var $clone = $(this).clone();
      $clone.attr('class', 'site-nav-wrap').removeAttr('id');
      $mobileBody.append($clone);
    });
  }

  function closeMenu() { $('body').removeClass('offcanvas-menu'); }
  function openMenu()  { $('body').addClass('offcanvas-menu'); }

  $(document).on('click', '.js-menu-toggle', function(e) {
    e.preventDefault(); e.stopPropagation();
    $('body').hasClass('offcanvas-menu') ? closeMenu() : openMenu();
  });
  $(document).on('click', '.site-mobile-menu-body a', closeMenu);
  $(document).on('click', function(e) {
    if ($('body').hasClass('offcanvas-menu') &&
        !$(e.target).closest('.site-mobile-menu, .js-menu-toggle').length) {
      closeMenu();
    }
  });

  // ── Smooth scroll ─────────────────────────────────────────
  $(document).on('click', 'a.smoothscroll, .site-menu a[href^="#"]', function(e) {
    var target = $(this).attr('href');
    if (target && target.length > 1 && $(target).length) {
      e.preventDefault();
      closeMenu();
      $('html, body').animate({ scrollTop: $(target).offset().top - 68 }, 560, 'swing');
    }
  });

  // ── AOS init ──────────────────────────────────────────────
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 650,
      easing: 'ease-out',
      once: true,
      offset: 60,
      delay: 0
    });
  }

})(jQuery);
