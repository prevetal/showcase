WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]
OVERLAY = document.querySelector('.overlay')


document.addEventListener('DOMContentLoaded', function () {
	// Objects slider
	const objectsSliders = [],
		objects = document.querySelectorAll('.objects .swiper')

	objects.forEach((el, i) => {
		el.classList.add('objects_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			scrollbar: {
				el: '.swiper-scrollbar'
			},
			breakpoints: {
				0: {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				480: {
					spaceBetween: 20,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 30,
					slidesPerView: 3
				},
				1280: {
					spaceBetween: 60,
					slidesPerView: 3
				}
			},
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.object')),
				resize: swiper => {
					let objects = swiper.el.querySelectorAll('.object')

					objects.forEach(el => el.style.height = 'auto')

					setHeight(objects)
				}
			}
		}

		objectsSliders.push(new Swiper('.objects_s' + i, options))
	})


	// Clients
	const clientsSliders = [],
		clients = document.querySelectorAll('.clients .swiper')

	clients.forEach((el, i) => {
		el.classList.add('clients_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true
			},
			breakpoints: {
				0: {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				480: {
					spaceBetween: 20,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 30,
					slidesPerView: 3
				},
				1280: {
					spaceBetween: 30,
					slidesPerView: 5
				}
			}
		}

		clientsSliders.push(new Swiper('.clients_s' + i, options))
	})


	// Articles
	const articlesSliders = [],
		articles = document.querySelectorAll('.articles .swiper')

	articles.forEach((el, i) => {
		el.classList.add('articles_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true
			},
			breakpoints: {
				0: {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				480: {
					spaceBetween: 20,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 30,
					slidesPerView: 3
				},
				1280: {
					spaceBetween: 50,
					slidesPerView: 4
				}
			}
		}

		articlesSliders.push(new Swiper('.articles_s' + i, options))
	})


	// Object page
	const objectInfo = document.querySelector('.object_info .swiper')

	if (objectInfo) {
		var objectInfoSlider = new Swiper(objectInfo, {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			spaceBetween: 24,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})
	}

	$('.object_info .images .thumbs .btn').click(function (e) {
		e.preventDefault()

		objectInfoSlider.slideTo($(this).data('slide-index'), 500)
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	// Mob. menu
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').addClass('active')
		$('body').addClass('menu_open')
		$('header').addClass('show')
		$('.overlay').fadeIn(300)
	})

	$('header > .close, .overlay').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').removeClass('active')
		$('body').removeClass('menu_open')
		$('header').removeClass('show')
		$('.overlay').fadeOut(300)
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Custom select
	const selects = document.querySelectorAll('select')

	if (selects) {
		selects.forEach(el => NiceSelect.bind(el, {
			placeholder: el.getAttribute('data-placeholder')
		}))
	}


	if (is_touch_device()) {
		const subMenus = document.querySelectorAll('header .menu .sub_menu')

		// Submenu on the touch screen
		$('header .menu_item > a.sub_link').addClass('touch_link')

		$('header .menu_item > a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Object description
	$('.object_info .description .spoler_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')

		$('.object_info .description .text_block').toggleClass('hide')
	})


	// Tabs
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				activeTabContent = $(activeTab),
				level = $(this).data('level')

			parent.find('.tabs:first .btn').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			activeTabContent = $(locationHash),
			parent = activeTab.closest('.tabs_container'),
			level = activeTab.data('level')

		parent.find('.tabs:first .btn').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})



// Init map
function initMap() {
	ymaps.ready(() => {
		let myMap = new ymaps.Map('map', {
			center: [55.696646, 38.928780],
			zoom: 16,
			controls: []
		})

		// Кастомный маркер
		let myPlacemark = new ymaps.Placemark([55.696646, 38.928780], {}, {
			iconLayout : 'default#image',
			iconImageHref : 'images/ic_map_marker.svg',
			iconImageSize : [39, 47],
			iconImageOffset : [-20, -47],
		})

		myMap.geoObjects.add(myPlacemark)
	})
}