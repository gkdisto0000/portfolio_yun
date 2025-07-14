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

            $('.gnb nav ul li').find('a').removeClass('active');

            if (['sec07', 'sec08', 'sec05', 'sec04', 'sec03'].includes(anchorLink)) {
                $('.gnbWrap').addClass('black');
                if (anchorLink === 'sec07') {
                    $('.gnb nav ul li').eq(1).find('a').addClass('active');
                } else if (['sec05', 'sec04', 'sec03'].includes(anchorLink)) {
                    $('.gnb nav ul li').eq(2).find('a').addClass('active');
                } else if (anchorLink === 'sec08') {
                     $('.gnb nav ul li').eq(3).find('a').addClass('active');
                }
            } else if (['sec01', 'sec02'].includes(anchorLink)) {
                $('.gnbWrap').removeClass('black');
                if (anchorLink === 'sec02') {
                    $('.gnb nav ul li').eq(0).find('a').addClass('active');
                }
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

    // 팝업 ajax 동적 로딩 개선: popUp.html 미리 로드 및 이미지 로드 후 팝업 표시
    var popUpHtmlLoaded = false;
    var popUpHtmlLoading = false;
    var popUpHtmlLoadCallbacks = [];

    // 1. 최초 1회 popUp.html 미리 불러와서 body에 추가(숨김)
    function preloadPopUpHtml(callback) {
        if (popUpHtmlLoaded) {
            if (callback) callback();
            return;
        }
        if (popUpHtmlLoading) {
            if (callback) popUpHtmlLoadCallbacks.push(callback);
            return;
        }
        popUpHtmlLoading = true;
        if (callback) popUpHtmlLoadCallbacks.push(callback);
        $.get('popUp.html')
            .done(function(data) {
                var $popupContent = $(data).css('display', 'none');
                $('body').append($popupContent);
                $popupContent.show(); // 필요시 display: none 해제
                popUpHtmlLoaded = true;
                popUpHtmlLoading = false;
                // 콜백 실행
                popUpHtmlLoadCallbacks.forEach(function(cb) { cb(); });
                popUpHtmlLoadCallbacks = [];
            });
    }
    // 페이지 로드시 미리 popUp.html 불러오기
    preloadPopUpHtml();

    // 팝업 내부 이미지가 모두 로드된 후 show
    function showPopupWithImages(popupNum) {
        var $popup = $('.popUpContent .arcodianWrap-popup[data-popup="' + popupNum + '"]');
        if ($popup.length) {
            $('.popUpContent .arcodianWrap-popup').removeClass('show');
            $('body').addClass('popup-open');
            // 이미지가 모두 로드될 때까지 대기
            var $imgs = $popup.find('img');
            var total = $imgs.length, loaded = 0;
            if (total === 0) {
                $popup.addClass('show');
                initPopupSwiper($popup);
                return;
            }
            $imgs.each(function() {
                if (this.complete) {
                    loaded++;
                    if (loaded === total) {
                        $popup.addClass('show');
                        initPopupSwiper($popup);
                    }
                } else {
                    $(this).one('load error', function() {
                        loaded++;
                        if (loaded === total) {
                            $popup.addClass('show');
                            initPopupSwiper($popup);
                        }
                    });
                }
            });
        } else {
            alert('팝업 내용을 찾을 수 없습니다.');
        }
    }

    // 팝업 열기 이벤트
    $(document).on('click', '.listCnt[data-popup]', function(e) {
        e.preventDefault();
        var popupNum = $(this).data('popup');
        preloadPopUpHtml(function() {
            showPopupWithImages(popupNum);
        });
    });

    // 팝업 닫기 이벤트(기존과 동일)
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