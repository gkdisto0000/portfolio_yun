$(function() {

    //sec04 목업 슬라이드
    var swiper = new Swiper('.mockUp-slide', {
        slidesPerView : 1,
        autoplay : false,
        centeredSlides: true,
        speed : 300,
        loop : true,
        observer: false,
        observeParents: false,
        loopedSlides: 1,
        
    }); 
    //sec05 목업 슬라이드
    var swiper2 = new Swiper('.mockUp-slide2', {
        slidesPerView : 1,
        autoplay:false,
        //centeredSlides: true,
        speed : 300,
        loop : true,
        observer: false,
        observeParents: false,
        loopedSlides: 1,
    });  
    var swiper2 = new Swiper('.mockUp-slide3', {
        slidesPerView : 1,
        gap : 20,
        autoplay:false,
        centeredSlides: true,
        speed : 300,
        Infinity: true,
        loop : true,
        observer: false,
        observeParents: false,
        loopedSlides: 3,
    });  


    // 풀페이지
    $('.fullpage').fullpage({
        normalScrollElements: '.scroll-active',

        onLeave: function(anchorLink, index){
            jQuery('.section [data-aos]').removeClass("aos-animate");
        },
        onSlideLeave: function(anchorLink, index){
            jQuery('.slide [data-aos]').addClass("aos-animate");
        },

        afterLoad: function(anchorLink, index){
            jQuery('.section.active [data-aos]').addClass("aos-animate");

            if (['sec07', 'sec08', 'sec05', 'sec04', 'sec03'].includes(anchorLink)) {
                $('.gnbWrap').addClass('black');
            } else if (['sec01', 'sec02'].includes(anchorLink)) {
                $('.gnbWrap').removeClass('black');
            }
        },

        anchors: ['sec01','sec02','sec07', 'sec03', 'sec04','sec05', 'sec08'],
    });



    // aos 초기화
	AOS.init({
		duration: 300,
		easing: 'ease',
	});


    // 슬라이드
	var swiperArticle = new Swiper('.art-slideWrap', {
		spaceBetween : 40,
		slidesPerView : 2.95,
		loop : false,
		loopedSlides: 10,
		loopAdditionalSlides: 10,
		centeredSlides :false,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true, 
        },
		 breakpoints: {
            1350: {
                spaceBetween : 20,
                slidesPerView : 1.8,
                centeredSlides :false,
                },

			760: {
			spaceBetween : 20,
			slidesPerView : 1.4,
            centeredSlides :true,
			}
		},
	});


    // sec08 tab 반응형
    var swiperTab = new Swiper('.scroll', {
		slidesPerView : 5,
        autoplay : false,
        breakpoints: {
			445: {
                slidesPerView : 3.5,
			}
		},
	});


    // sec08 tab 작동
	$(".yearTab li").click(function(){
		var tabNum = $(this).data('year');
		$(".yearTab li").removeClass('on');
		$(this).addClass('on');
		$('.listWrap').removeClass('on');
		$('#' + tabNum).addClass('on');

        var list = $('.listWrap.on .scroll-all');
        var listNum = list.children().length;
	});
	$('.yearTab li:nth-child(1)').trigger('click');



    //mo 햄버거 바
    $('.mapBtn').click(function(){
        $(this).toggleClass('active');
    });

    // 팝업 ajax 동적 로딩
    var popUpHtmlCache = null;
    var popUpHtmlLoaded = false;

    function ensurePopUpContentLoaded(callback) {
        if ($('.popUpContent').length > 0) {
            popUpHtmlLoaded = true;
            if (callback) callback();
            return;
        }
        if (popUpHtmlLoaded) {
            if (callback) callback();
            return;
        }
        $.get('popUp.html')
            .done(function(data) {
                $('body').append(data);
                popUpHtmlLoaded = true;
                if (callback) callback();
            });
    }

    function initPopupSwiper($popup) {
        $popup.find('.mockUp-slide3').each(function() {
            if (this.swiper) {
                this.swiper.destroy(true, true);
            }
            new Swiper(this, {
                slidesPerView: 1,
                gap: 20,
                autoplay: false,
                centeredSlides: true,
                speed: 300,
                loop: true,
                observer: false,
                observeParents: false,
                loopedSlides: 3,
            });
        });
    }

    $(document).on('click', '.listCnt[data-popup]', function(e) {
        e.preventDefault();
        var popupNum = $(this).data('popup');
        ensurePopUpContentLoaded(function() {
            var $popup = $('.popUpContent .arcodianWrap-popup[data-popup="' + popupNum + '"]');
            if ($popup.length) {
                $('.popUpContent .arcodianWrap-popup').removeClass('show'); // 모든 팝업 닫기
                $popup.addClass('show'); // 해당 팝업만 열기
                $('body').addClass('popup-open'); // body 스크롤 막기
                // fullPage.js 스크롤 차단
                if (typeof $.fn.fullpage !== 'undefined' && typeof $.fn.fullpage.setAllowScrolling === 'function') {
                    $.fn.fullpage.setAllowScrolling(false);
                    $.fn.fullpage.setKeyboardScrolling(false);
                }
                // 팝업 내부 Swiper 재초기화
                initPopupSwiper($popup);
            } else {
                alert('팝업 내용을 찾을 수 없습니다.');
            }
        });
    });
    $(document).on('click', '.popupClose', function(e) {
        e.preventDefault();
        $(this).closest('.arcodianWrap-popup').removeClass('show');
        // 모든 팝업이 닫혔을 때만 body에서 popup-open 제거
        setTimeout(function() {
            if ($('.popUpContent .arcodianWrap-popup.show').length === 0) {
                $('body').removeClass('popup-open');
                // fullPage.js 스크롤 복원
                if (typeof $.fn.fullpage !== 'undefined' && typeof $.fn.fullpage.setAllowScrolling === 'function') {
                    $.fn.fullpage.setAllowScrolling(true);
                    $.fn.fullpage.setKeyboardScrolling(true);
                }
            }
        }, 10);
    });

}) 
// end