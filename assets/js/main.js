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

		$sidebar_a
			.addClass('scrolly')
			.on('click', function() {
				var $this = $(this);

				// 외부 링크 중단
				if ($this.attr('href').charAt(0) != '#')
					return;

				// 모든 링크 비활성화
				$sidebar_a.removeClass('active');

				// 링크 활성화 *및* 잠금 (Scrollex가 이 섹션으로 스크롤하는 동안 다른 링크를 활성화하지 않도록)
				$this
					.addClass('active')
					.addClass('active-locked');
			})
			.each(function() {
				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// 이 링크에 해당하는 섹션이 없을 때 중단
				if ($section.length < 1)
					return;

				// Scrollex
				$section.scrollex({
					mode: 'middle',
					top: '-20vh',
					bottom: '-20vh',
					initialize: function() {
						// 섹션 비활성화
						$section.addClass('inactive');
					},
					enter: function() {
						// 섹션 활성화
						$section.removeClass('inactive');

						// 링크 없을 시 모든 링크를 비활성화하고 이 섹션의 링크를 활성화
						if ($sidebar_a.filter('.active-locked').length == 0) {
							$sidebar_a.removeClass('active');
							$this.addClass('active');
						}
						// 이 섹션의 링크가 잠겨 있다면 잠금 해제
						else if ($this.hasClass('active-locked'))
							$this.removeClass('active-locked');
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

})(jQuery);