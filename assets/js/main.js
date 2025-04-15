(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// 브레이크포인트
	breakpoints({
		xlarge:   [ '1281px',  '1680px' ],
		large:    [ '981px',   '1280px' ],
		medium:   [ '737px',   '980px'  ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ null,      '480px'  ]
	});

	// 핵: IE 플렉스박스 워크어라운드 활성화
	if (browser.name == 'ie')
		$body.addClass('is-ie');

	// 페이지 로드 시 초기 애니메이션 실행
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// 사이드바
	if ($sidebar.length > 0) {
		var $sidebar_a = $sidebar.find('a');

		// 스크롤 이벤트 핸들러
		// `$(window).on('scroll', function() {
		// 	var currentScroll = $(window).scrollTop() + (window.innerHeight / 2);
		// 	var introSection = $('#intro');
		// 	var oneSection = $('#one');
		// 	var twoSection = $('#two');
		// 	var threeSection = $('#three');
		// 	var fourSection = $('#four');
			
		// 	if ((oneSection.length && currentScroll >= oneSection.offset().top && currentScroll <= oneSection.offset().top + oneSection.outerHeight()) ||
		// 		(threeSection.length && currentScroll >= threeSection.offset().top && currentScroll <= threeSection.offset().top + threeSection.outerHeight())) {
		// 		$('#sidebar nav a').css('color', '#999').removeClass('active');
		// 		var currentSection = currentScroll >= threeSection.offset().top ? '#three' : '#one';
		// 		$('#sidebar nav a[href="' + currentSection + '"]').addClass('active').css('color', '#000');
		// 	} else if (twoSection.length && currentScroll >= twoSection.offset().top && currentScroll <= twoSection.offset().top + twoSection.outerHeight()) {
		// 		$('#sidebar nav a').css('color', '').removeClass('active');
		// 		$('#sidebar nav a[href="#two"]').addClass('active');
		// 	} else if (fourSection.length && currentScroll >= fourSection.offset().top && currentScroll <= fourSection.offset().top + fourSection.outerHeight()) {
		// 		$('#sidebar nav a').css('color', '').removeClass('active');
		// 		$('#sidebar nav a[href="#four"]').addClass('active');
		// 	} else if (introSection.length && currentScroll >= introSection.offset().top && currentScroll <= introSection.offset().top + introSection.outerHeight()) {
		// 		$('#sidebar nav a').css('color', '').removeClass('active');
		// 		$('#sidebar nav a[href="#intro"]').addClass('active');
		// 	} else {
		// 		$('#sidebar nav a').css('color', '').removeClass('active');
		// 	}
		// });`

		$sidebar_a
			.addClass('scrolly')
			.on('click', function() {
				var $this = $(this);

				if ($this.attr('href').charAt(0) != '#')
					return;

				$sidebar_a.removeClass('active');

				$this
					.addClass('active')
					.addClass('active-locked');
			})
			.each(function() {
				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				if ($section.length < 1)
					return;

				// Scrollex
				$section.scrollex({
					mode: 'middle',
					top: '-20vh',
					bottom: '-20vh',
					initialize: function() {
						$section.addClass('inactive');
					},
					enter: function() {
						$section.removeClass('inactive');
						
						if ($sidebar_a.filter('.active-locked').length == 0) {
							$sidebar_a.removeClass('active');
							$this.addClass('active');
						}
						else if ($this.hasClass('active-locked'))
							$this.removeClass('active-locked');
					},
					leave: function() {
						$section.addClass('inactive');
					}
				});
			});
	}

	// 스포트라이트
	$('.spotlights > section')
		.scrollex({
			mode: 'middle',
			top: '-10vh',
			bottom: '-10vh',
			initialize: function() {
				// 섹션 비활성화
				$(this).addClass('inactive');
			},
			enter: function() {
				// 섹션 활성화
				$(this).removeClass('inactive');
			}                                                                                                          
		})
		.each(function() {
			var	$this = $(this),
				$image = $this.find('.image'),
				$img = $image.find('img'),
				x;

			// 이미지 할당
			$image.css('background-image', 'url(' + $img.attr('src') + ')');

			// 배경 위치 설정
			if (x = $img.data('position'))
				$image.css('background-position', x);

			$img.hide();
		});

	// 특징
	$('.features')
		.scrollex({
			mode: 'middle',
			top: '-20vh',
			bottom: '-20vh',
			initialize: function() {
				// 섹션 비활성화
				$(this).addClass('inactive');
			},
			enter: function() {
				// 섹션 활성화
				$(this).removeClass('inactive');
			}
		});

	// one, three 섹션에서 사이드바 색상 변경
	$('section').each(function() {
		var section = $(this);
		var sectionId = '#' + section.attr('id');
		
		section.scrollex({
			mode: 'middle',
			top: '-30%',
			bottom: '-30%',
			enter: function() {
				if (sectionId === '#one' || sectionId === '#three') {
					$('#sidebar nav a').css('color', '#ddd');
					$('#sidebar nav a[href="' + sectionId + '"]').css('color', '#000');
				} else {
					$('#sidebar nav a').css('color', '');
				}
			},
			leave: function(direction) {
				// 현재 보이는 섹션 찾기
				var currentSection = null;
				$('section').each(function() {
					var rect = this.getBoundingClientRect();
					if (rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2) {
						currentSection = '#' + $(this).attr('id');
					}
				});
				
				// 현재 보이는 섹션이 one이나 three면 해당 색상 적용
				if (currentSection === '#one' || currentSection === '#three') {
					$('#sidebar nav a').css('color', '#ddd');
					$('#sidebar nav a[href="' + currentSection + '"]').css('color', '#000');
				} else {
					$('#sidebar nav a').css('color', '');
				}
			}
		});
	});

})(jQuery);