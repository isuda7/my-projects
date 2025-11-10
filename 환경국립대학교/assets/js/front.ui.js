var HankyongUi = (function (hankyong, $) {
  // 해당 페이지에 element가 있는지 체크
  var _checkEl = function (el) {
    return el.length > 0;
  };
  var scrollbarWidth = window.innerWidth - $("body").width();

  // 초기화
  hankyong.init = function () {
    hankyong.front.navigation();
    hankyong.front.modal.closeBtn();

    if (_checkEl($('.main'))) {
      hankyong.front.main();
    }
    if (_checkEl($('.tab__select'))) {
      hankyong.front.tabToggle();
    }
    if (_checkEl($('.breadcrumbs'))) {
      hankyong.front.breadcrumbs();
    }
    if (_checkEl($('.faq'))) {
      hankyong.front.accordion();
    }
    if (_checkEl($('.btn__attached-file'))) {
      hankyong.front.addAttachedFile();
    }
    if (_checkEl($('.screen__btn-list'))) {
      hankyong.front.screenModule();
    }
    if (_checkEl($('.pdf-viewer'))) {
      hankyong.front.pdfNav()
    }
    if (_checkEl($('#modal-notice'))) {
      hankyong.front.noticeModal();
    }
    hankyong.front.scrollTop();
  };

  // 스크립트 작성
  hankyong.front = {
    scrollTop: function () {
      if (window.matchMedia("(max-width: 768px)").matches) {
        $(window).scroll(function () {
          topBtn();
        });
        topBtn();
      }

      $(window).resize(function () {
        if (window.matchMedia("(max-width: 768px)").matches) {
          topBtn();
        }
      });

      function topBtn() {
        if ($(window).scrollTop() > 0) {
          $('.scroll-top').show();
        } else {
          $('.scroll-top').hide();
        }
      }
      $(document).on('click', '.scroll-top', function () {
        $('html, body').stop().animate({scrollTop : 0});
      })
    },
    navigation: function () {
      function fixHeader() {
        var header = $('#header');
        var scrollTop = $(window).scrollTop();

        if(scrollTop === 0){
          header.removeClass("is-fixed");
          return false;
        }

        header.addClass("is-fixed");
      }

      function toggleAllMenu() {
        var header = $('#header');

        if(header.hasClass("is-expand")){
          hideAllMenu();
        } else {
          showAllMenu();
        }

        $(document).on('click', function (e) {
          if(!header.has(e.target).length){
            hideAllMenu();
          }
        });
      }

      function showAllMenu() {
        var header = $('#header');

        header.addClass("is-expand");
        $('.btn-ico__allmenu').addClass("btn-ico__allmenu--is-active");

        if ($('.btn-ico__notice').hasClass('is-active')) {
          $('.btn-ico__notice').removeClass("is-active");
          $('#modal-notice').closest('.modal').removeClass('modal--is-active');
          $('body').removeClass("is-fixed");
          $('#header').removeClass("is-ofs");
        }

        if (window.matchMedia("(max-width: 1280px)").matches) {
          resizeWindow();
          return;
        }
      }

      function hideAllMenu() {
        var header = $('#header');

        header.removeClass("is-expand");
        $('.btn-ico__allmenu').removeClass("btn-ico__allmenu--is-active");

        if (!$('.btn-ico__notice').hasClass('is-active') && $('body').hasClass('is-fixed')) {
          return $('body').removeClass('is-fixed');
        }
      }

      function resizeWindow() {
        var navItem = $(".nav__item");
        $('body').addClass('is-fixed');
        if (navItem.hasClass("nav__item--is-active")) {
          $('.nav__item--is-active').find('.nav__depth').stop().slideDown(300);
          return;
        }
        navItem.eq(0).addClass("nav__item--is-active").find('.nav__depth').stop().slideDown(300);
      }

      $(document).on('click', '#header .btn-ico__allmenu', toggleAllMenu);

      $(document).on('click', '.btn-ico__notice', alarmNotice);
      function alarmNotice () {
        hideAllMenu();

        if ($('.btn-ico__notice').hasClass("is-active")) {
          $('.btn-ico__notice').removeClass("is-active");
          // front.modal.hide('#modal-notice');
          $('#modal-notice').closest('.modal').removeClass('modal--is-active');
          $('body').removeClass("is-fixed");
          $('#header').removeClass("is-ofs");
        } else {
          $('.btn-ico__notice').addClass("is-active");
          // front.modal.show('modal-notice');
          $('#modal-notice').addClass('modal--is-active');
          $('body').addClass("is-fixed");
          $('#header').addClass("is-ofs");
        }
      }

      if (window.matchMedia("(max-width: 1280px)").matches) {
        $(document).on('click', '.nav__item', function () {
          $('.nav__item').removeClass('nav__item--is-active').find('.nav__depth').stop().slideUp();
          $(this).addClass('nav__item--is-active').find('.nav__depth').stop().slideDown(300);
        });
      };

      $(window).scroll(function () {
        fixHeader();
      });

      $(window).resize(function(){
        if ($('#header').hasClass('is-expand')) {
          if (window.matchMedia("(max-width: 1280px)").matches) {
            return resizeWindow();
          }
          $('body').removeClass('is-fixed');
          $('.nav__item').removeClass("nav__item--is-active").find('.nav__depth').removeAttr("style");
        }

        if (window.matchMedia("(max-width: 1280px)").matches) return;
        $('.nav__item').removeClass("nav__item--is-active").find('.nav__depth').removeAttr("style");
      });
    },
    breadcrumbs: function () {
      var title = $('.visual .visual__title').text();
      var subTitle = $('.screen-modulate .sub-page__title').text();
      var navIdx = $('.breadcrumbs').attr('data-nav-idx');
      var navDepth1 = $('.nav .nav__1st').clone();
      var nav = $('.nav .nav__item').eq(navIdx - 1);
      var navDepth2 = nav.find('.nav__2nd').clone();

      if (navIdx === "0") {
        $('.breadcrumbs .inner').append('<div class="breadcrumbs__dep1"><div class="list__dep1"></div></div>');
        $('.breadcrumbs__dep1').prepend('<button type="button" class="title__dep1">' + title + '</button>');
        $('.breadcrumbs__dep1 .list__dep1').append(navDepth1);
      } else {
        $('.breadcrumbs .inner').append('<div class="breadcrumbs__dep1"><div class="list__dep1"></div></div><div class="breadcrumbs__dep2"><div class="list__dep2"></div></div>');
        $('.breadcrumbs__dep1').prepend('<button type="button" class="title__dep1">' + title + '</button>');
        $('.breadcrumbs__dep1 .list__dep1').append(navDepth1);
        $('.breadcrumbs__dep2').prepend('<button type="button" class="title__dep2">' + subTitle + '</button>');
        $('.breadcrumbs__dep2 .list__dep2').append(navDepth2);
      }

      $(document).on('click', '.title__dep1', function (e) {
        dropDownToggle(e.target);
      });

      $(document).on('click', '.title__dep2', function (e) {
        dropDownToggle(e.target);
      });

      function dropDownToggle(obj) {
        var toggleItem = $(obj);
        if (toggleItem.hasClass("is-active")) {
          toggleItem.removeClass("is-active").siblings("div").slideUp();
        } else {
          toggleItem.addClass("is-active").siblings("div").slideDown();
        }
        $(document).on('click', function(e){
          if(e.target != obj) {
            toggleItem.removeClass("is-active").siblings("div").slideUp();
          }
        });
      }
    },
    screenModule: function () {
      var nowZoom = 100;
      $(document).on('click', '.zoom', function (e) {
        $(this).hasClass('m') ? (nowZoom -= 10) : (nowZoom += 10);
        document.body.style.zoom = nowZoom + '%';
      });
      $(document).on('click', '.refresh', function (e) {
        location.reload();
      });
      $(document).on('click', '.print', function (e) {
        window.print();
      });
    },
    pdfNav: function () {
      $(document).on('click', '.pdf-viewer__aside', function (e) {
        $('.selected').removeClass('selected');
        $(e.target.parentNode).stop().toggleClass('selected');
      });
    },
    noticeModal: function () {
      var popNoticePc = new Swiper('.pop-notice__swiper.pc', {
        spaceBetween: 0,
        navigation: {
          nextEl: '.pop-notice__swiper.pc .swiper-button-next',
          prevEl: '.pop-notice__swiper.pc .swiper-button-prev',
        },
        pagination: {
          el: '.pop-notice__swiper.pc .swiper-pagination',
          clickable: true,
        },
        on: {
          init: function () {
            if ($('.pop-notice__swiper.pc .swiper-slide').length <= 1) {
              $('.pop-notice__swiper.pc .swiper-wrapper').addClass('is-animate')
            }
          },
        }
      });

      var popNoticeMobile = new Swiper('.pop-notice__swiper.mobile', {
        spaceBetween: 0,
        navigation: {
          nextEl: '.pop-notice__swiper.mobile .swiper-button-next',
          prevEl: '.pop-notice__swiper.mobile .swiper-button-prev',
        },
        pagination: {
          el: '.pop-notice__swiper.mobile .swiper-pagination',
          clickable: true,
        },
        on: {
          init: function () {
            if ($('.pop-notice__swiper.mobile .swiper-slide').length <= 1) {
              $('.pop-notice__swiper.mobile .swiper-wrapper').addClass('is-animate')
            }
          },
        }
      });
    },
    modal: {
      show: function (clickBtn) {
        $('#' + clickBtn).addClass('modal--is-active');
        $('body').addClass("is-fixed");
        front.modal.scrollBar();
      },
      hide: function (closeBtn) {
        $(closeBtn).closest('.modal').removeClass('modal--is-active');
        $('body').removeClass("is-fixed");
        front.modal.scrollBar();
      },
      closeBtn: function () {
        $(document).on('click', '.modal .modal__close', function () {
          front.modal.hide(this);
        })
      },
      scrollBar: function () {
        var scrollLeft = $(window).scrollLeft();
        if ($(".modal.modal--is-active").length > 0) {
          if(scrollLeft < 1){
            $('body').css({paddingRight: scrollbarWidth+"px"});
            $('#header').css({width: 'calc(100% - '+ scrollbarWidth +'px)'});
          }
        }else{
          $('body').removeAttr('style');
          $('#header').removeAttr('style');
        }
      }
    },
    tabToggle: function () {
      $(document).on('click', '.tab__select', function (e) {
        dropDownToggle(e.target)
      });
      $(document).on('click', '.tab__item', function (e) {
        dropDownToggle(e.target);
      });

      function dropDownToggle(obj) {
        var toggleItem = $(obj).siblings('.tab__list');

        if (toggleItem.hasClass('tab__list--is-active')) {
          toggleItem.removeClass('tab__list--is-active').stop().slideUp(100);
        } else {
          toggleItem.addClass('tab__list--is-active').stop().slideDown(100);
        }

        $(document).on('click', function(e){
          if(e.target != obj) {
            toggleItem.removeClass("tab__list--is-active").stop().slideUp(100);
          }
        });
      }

      $(window).resize(function(){
        if (window.matchMedia("(max-width: 1024px)").matches) return;
        $('.tab__list').removeClass('tab__list--is-active').removeAttr("style");
      });
    },
    accordion: function () {
      $('.faq__item').eq(0).addClass("faq__item--is-active").find('.faq__desc').stop().slideDown();
      $(document).on('click', '.faq__title__question', function(e){
        if ($(e.target).hasClass('faq__item--is-active')) {
          return;
        }
        $('.faq__item').removeClass("faq__item--is-active").find('.faq__desc').stop().slideUp();
        $(e.target).parents('.faq__item').addClass("faq__item--is-active").find('.faq__desc').stop().slideDown();
      });
    },
    addAttachedFile: function () {
      $(document).on("click", ".btn__close", function(e){
        e.preventDefault();
        $(this).parents(".attached-file").find("input[type='file']").val('');
        $(this).parents('.attached-file').find('.attached-file__item').remove();
      });

      $(document).on("click", ".btn__attached-file", function(e){
        e.preventDefault();
        $(this).parents(".attached-file__inp").find("input[type='file']").trigger("click");
        console.log($(this).parents(".attached-file").find("input[type='file']").val())
      });

      $(document).on('change', '.attached-file__inp input[type="file"]', function() {
        var fileName = $(this).val().split('\\').reverse()[0];
        var fileItem = '<div class="attached-file__item"><span>'+fileName+'</span><button class="btn__close">삭제</button></div>';

        $(this).parents('.attached-file').find('.attached-file__list').html(fileItem);
      });
    },
    main: function () {
      // Visual
      var mainVisual = new Swiper (".main-visual", {
        autoplay: {
          delay: 4000,
          disableOnInteraction:false,
        },
        loop:true,
        pagination: {
          el: '.main-visual__controls .swiper-pagination',
          clickable: true,
        },
      });

      $('.main-visual .swiper-auto-play').on('click', function (e) {
        if ($(e.currentTarget).hasClass("is-pause")) {
          $(e.currentTarget).removeClass("is-pause");
          mainVisual.autoplay.start();
        } else {
          $(e.currentTarget).addClass("is-pause");
          mainVisual.autoplay.stop();
        }
      });

      // Issue
      var issuePc = new Swiper('.issue__swiper.pc', {
        spaceBetween: 0,
        pagination: {
          el: '.issue__swiper.pc .swiper-pagination',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.issue__swiper.pc .swiper-button-next',
          prevEl: '.issue__swiper.pc .swiper-button-prev',
        },
        on: {
          init: function () {
            if ($('.issue__swiper.pc .swiper-slide').length <= 1) {
              $('.issue__swiper.pc .swiper-wrapper').addClass('is-animate')
            }
          },
        }
      });
      var issueMobile = new Swiper('.issue__swiper.mobile', {
        slidesPerView: 1.5,
        slidesPerColumn: 0,
        slidesPerGroup: 1,
        spaceBetween: 10,
        pagination: {
          el: '.issue__swiper.mobile .swiper-pagination',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.issue__swiper.mobile .swiper-button-next',
          prevEl: '.issue__swiper.mobile .swiper-button-prev',
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            slidesPerColumn: 0,
            slidesPerGroup: 1,
            spaceBetween: 20,
          },
        }
      });

      $('.notice__tab .notice__tab__item').eq(0).addClass('is-active');

      $('.notice__contents > .notice__panel').eq(0).show();

      $(document).on('click', '.notice__tab__item a', function () {
        var idx = $(this).parent().index();

        $(this).parents('ul').find('li').removeClass('is-active');
        $(this).parent().addClass('is-active');
        $(this).closest('.notice').find('.notice__contents > .notice__panel').eq(idx).show().siblings().hide();
        //return false;
      });

      var youtubeSwiper = new Swiper('.yt-sec__swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        hashNavigation: {
          watchState: true,
        },
        navigation: {
          nextEl: '.yt-sec__swiper .swiper-button-next',
          prevEl: '.yt-sec__swiper .swiper-button-prev',
        },
      });

      var snsSwiper = new Swiper('.sns-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: '.sns-swiper .swiper-pagination',
          clickable: true,
        },
      });
    }
  }

  hankyong.addEventListener('load', function () {
    hankyong.init();
  });

  return hankyong;
})(window, jQuery);
