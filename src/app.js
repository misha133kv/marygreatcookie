// Accordion

class ItcAccordion {
	constructor(target, config) {
		this._el = typeof target === 'string' ? document.querySelector(target) : target;
		const defaultConfig = {
			alwaysOpen: true
		};
		this._config = Object.assign(defaultConfig, config);
		this.addEventListener();
	}
	addEventListener() {
		this._el.addEventListener('click', (e) => {
			const elHeader = e.target.closest('.accordion__header');
			if (!elHeader) {
				return;
			}
			if (!this._config.alwaysOpen) {
				const elOpenItem = this._el.querySelector('.accordion__item-show');
				if (elOpenItem) {
					elOpenItem !== elHeader.parentElement ? elOpenItem.classList.toggle('accordion__item_show') : null;
				}
			}
			elHeader.parentElement.classList.toggle('accordion__item-show');
		});
	}
}
new ItcAccordion(document.querySelector('.accordion'), {
	alwaysOpen: false
});

new ItcAccordion(document.querySelector('.accordion2'), {
	alwaysOpen: false
});

// Magnifer

$(function () {
	$('.minimized').click(function (event) {
		var i_path = $(this).attr('src');
		$('body').append('<div id="overlay"></div><div id="magnify"><img src="' + i_path + '"><div id="close-popup"><i></i></div></div>');
		$('#magnify').css({
			left: ($(document).width() - $('#magnify').outerWidth()) / 2,
			// top: ($(document).height() - $('#magnify').outerHeight())/2 upd: 24.10.2016
			top: ($(window).height() - $('#magnify').outerHeight()) / 2
		});
		$('#overlay, #magnify').fadeIn('fast');
	});

	$('body').on('click', '#close-popup, #overlay', function (event) {
		event.preventDefault();
		$('#overlay, #magnify').fadeOut('fast', function () {
			$('#close-popup, #magnify, #overlay').remove();
		});
	});
});

// Autoplay

$(function () {
	var $video = $('.video');
	var $window = $(window);

	$window.scroll(function () {
		if ($video.is(":in-viewport")) {
			$video[0].play();
		} else {
			$video[0].pause();
		}
	});
});

$(function () {
	var $video = $('.video2');
	var $window = $(window);

	$window.scroll(function () {
		if ($video.is(":in-viewport")) {
			$video[0].play();
		} else {
			$video[0].pause();
		}
	});
});

// Slider

$(document).ready(function () {
	$('.slider').slick({
		dots: true,
		adaptiveHeight: false,
		slidesToShow: 1,
		speed: 700,
		easing: 'ease',
		infinite: true,
		initialSlide: 0,
		autoplay: true,
		autoplaySpeed: 2500,
		pauseOnFocus: true,
		draggable: true,
		swipe: true,


	});
});


/* Mobile
=========================== */

let isMobile = {
	Android: function () { return navigator.userAgent.match(/Android/i); },
	BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
	iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
	Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
	Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
	any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); },
};

let body = document.querySelector('body');
if (isMobile.any()) {
	body.classList.add('touch');
	let arrow = document.querySelectorAll('.arrow');
	for (i = 0; i < arrow.length; i++) {
		let thisLink = arrow[i].previousElementSibling;
		let subMenu = arrow[i].nextElementSibling;
		let thisArrow = arrow[i];

		thisLink.classList.add('parent');
		arrow[i].addEventListener('click', function () {
			subMenu.classList.toggle('open');
			thisArrow.classList.toggle('active');
		});
	}
} else {
	body.classList.add('mouse');
};

/* Menu nav toggle 
=========================== */
$(".burger").on("click", function (event) {
	event.preventDefault();

	$(this).toggleClass("active");
	$(".menu__body").toggleClass("active");
	$("body").toggleClass("lock");
});

/* Telegramm API
=========================== */

const TOKEN = "5775183225:AAGUPuyf5PHRfSa5Zoux-zz5_KWIx1vHAPo";
const CHAT_ID = "-1001759583869";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

document.getElementById('tg').addEventListener('submit', function (e) {
	e.preventDefault();

	let message = `<b>Заявка с сайта</b>\n`;
	let chbox = document.getElementById('checkbox');
	message += `<b>Отправитель </b> ${this.name.value}\n`;
	message += `<b>Телефон </b> ${this.phone.value}\n`;
	if (chbox.checked) {
		message += `<b>Требуется доставка.</b>\n`;
	}
	message += `<b>Дата ожидаемого получения </b> ${this.datetime.value}\n`;
	message += `<b>Текст заказа </b> ${this.text.value}`;

	axios.post(URI_API, {
		chat_id: CHAT_ID,
		parse_mode: 'html',
		text: message,
	})
		.then((res) => {
			this.name.value = "";
			this.phone.value = "";
			this.checkbox.value = "false";
			this.datetime.value = "";
			this.text.value = "";
		})
		.catch((err) => {
			console.warn(err);
		})
		.finally(() => {
			console.log('Конец');
		})
})

/* Checkbox
==============*/

$('#checkbox').click(function () {

	if ($(this).is(':checked')) {
		$('#text').show(100);
	} else {
		$('#text').hide(100);
	}
});

/* submit Button 
==============*/

$(".alert").on("click", function () {
	swal({
		title: "Вы отправили ваш заказ!",
		text: "Свяжусь с Вами ближайшее время.",
		icon: "success",
		button: "Отлично!",
	});
});

/* Smoth scroll
===================

const menuLinks = document.querySelectorAll('[data-scroll]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});



	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.scroll && document.querySelector(menuLink.dataset.scroll)) {
			const scrollBlock = document.querySelector(menuLink.dataset.scroll);
			const scrollBlockvalue = scrollBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			window.scrollTo({
				top: scrollBlockvalue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}
*/

$(function () {

	let header = $("#header"),
		introH = $("#intro").innerHeight(),

		scrollOffset = $(window).scrollTop();
	console.log(scrollOffset);
	console.log(introH);

	checkScroll(scrollOffset);

	$(window).on("scroll", function () {
		scrollOffset = $(this).scrollTop();

		checkScroll(scrollOffset);
	});

	function checkScroll(scrollOffset) {
		if (scrollOffset >= introH - header.innerHeight() - 100) {
			header.addClass("fixed");
		} else {
			header.removeClass("fixed");
		}
	}


	$("[data-scroll]").on("click", function (event) {
		event.preventDefault();

		let $this = $(this),
			blockId = $this.data('scroll'),
			blockOffset = $(blockId).offset().top;

		//$("#nav a").removeClass("active");
		//$this.addClass("active");

		$("html, body").animate({
			scrollTop: blockOffset - header.innerHeight() - 20
		}, 500);
	});

});


