document.addEventListener("DOMContentLoaded", () => {
   // Вспомогательнеы функции для блокировки прокрутки
   let bodyLockStatus = true;
   let bodyLockToggle = (delay = 500) => {
      if (document.documentElement.classList.contains('lock')) {
         bodyUnlock(delay);
      } else {
         bodyLock(delay);
      }
   }
   let bodyLock = (delay = 500) => {
      let body = document.querySelector("body");
      if (bodyLockStatus) {
         let lock_padding = document.querySelectorAll("[data-lp]");
         for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
         }
         body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
         document.documentElement.classList.add("lock");
   
         bodyLockStatus = false;
         setTimeout(function () {
            bodyLockStatus = true;
         }, delay);
      }
   }
   let bodyUnlock = (delay = 500) => {
      let body = document.querySelector("body");
      if (bodyLockStatus) {
         let lock_padding = document.querySelectorAll("[data-lp]");
         setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
               const el = lock_padding[index];
               el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            document.documentElement.classList.remove("lock");
         }, delay);
         bodyLockStatus = false;
         setTimeout(function () {
            bodyLockStatus = true;
         }, delay);
      }
   }
   // Кнопка "Добавить детей" в форме
   if (document.querySelector('.child-add')) {
      const button = document.querySelector('.child-add');
      button.addEventListener('click', () => {
         event.preventDefault();
         button.parentElement.insertAdjacentHTML('beforeend', `      
         <div class="_child" style="order: ${button.parentElement.children.length - 1}; margin-top: 7px;">
            <div class="select select_form _select-active" data-id="2"><select name="Количество детей" id="child" class="form" data-id="2" data-speed="150" hidden="">
               <option value="1" selected="">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
               </select>
            <div class="select__body"><button type="button" class="select__title"><span class="select__value"><span class="select__content">1</span></span></button><div class="select__options" hidden=""><button class="select__option" data-value="1" type="button" hidden="">1</button><button class="select__option" data-value="2" type="button">2</button><button class="select__option" data-value="3" type="button">3</button><button class="select__option" data-value="4" type="button">4</button></div></div></div>
            <div class="select select_form _select-active" data-id="3"><select name="Возраст детей" class="form" data-id="3" data-speed="150" hidden="">
               <option value="0-3 лет" selected="">0-3 лет</option>
               <option value="4-7 лет">4-7 лет</option>
               <option value="8-12 лет">8-12 лет</option>
               <option value="13-17 лет">13-17 лет</option>
            </select><div class="select__body"><button type="button" class="select__title"><span class="select__value"><span class="select__content">0-3 лет</span></span></button><div class="select__options" hidden=""><button class="select__option" data-value="0-3 лет" type="button" hidden="">0-3 лет</button><button class="select__option" data-value="4-7 лет" type="button">4-7 лет</button><button class="select__option" data-value="8-12 лет" type="button">8-12 лет</button><button class="select__option" data-value="13-17 лет" type="button">13-17 лет</button></div></div></div>
         </div>
         `);
         button.style.order = button.parentElement.children.length;
      })
   }
   // Меню-бургер
   function menuInit() {
      if (document.querySelector(".icon-menu")) {
         document.addEventListener("click", function (e) {
            if (bodyLockStatus && e.target.closest('.icon-menu')) {
               bodyLockToggle();
               document.documentElement.classList.toggle("menu-open");
            }
         });
      };
   }
   menuInit();
   if (document.querySelector('.form-callback')) {const validation = new JustValidate('.form-callback');
      validation
         .addField('#name', [
            {
               rule: 'minLength',
               value: 2,
               errorMessage: 'Введите не менее 2 символов'
            },
            {
               rule: 'maxLength',
               value: 15,
               errorMessage: 'Введите не более 15 символов'
            },
            {
               rule: 'required',
               value: true,
               errorMessage: 'Введите имя'
            }
         ]) 
         .addField('#phone', [
            {
               rule: 'required',
               value: true,
               errorMessage: 'Телефон обязателен',
            },
         ])
         .addField('#date', [
            {
               rule: 'required',
               value: true,
               errorMessage: 'Введите дату',
            },
         ])
         .onSuccess((event) => {
            console.log('Validation passes and form submitted', event);
            let formData = new FormData(event.target);
            console.log(...formData);
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
               if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                     console.log('Отправлено');
                  }
               }
            }

            xhr.open('POST', 'mail.php', true);
            xhr.send(formData);
            event.target.reset();
      });
   }
})
$(function() {
   $('.hero__slider').slick({
		slidesToShow: 1,
		autoplay: true,
      dots: true,
      arrows: false,
      draggable: true,
      speed: 600,
      dotsClass: 'hero__pagination',
	});
   $('.reviews__slider').slick({
		slidesToShow: 1,
		autoplay: false,
      dots: true,
      arrows: false,
      draggable: true,
      speed: 600,
      dotsClass: 'reviews__pagination',
	});
   $('.tours__slider').slick({
      slidesToShow: 4,
      speed: 600,
      variableWidth: true,
      arrows: false,
      responsive: [
         {
           breakpoint: 1640,
           settings: {
             slidesToShow: 3,
             centerMode: true,
             centerPadding: '50px',
           }
         },
         {
           breakpoint: 992,
           settings: {
             centerMode: false,
             centerPadding: '40px',
             slidesToShow: 2
           }
         },
         {
           breakpoint: 768,
           settings: {
             centerMode: true,
             centerPadding: '40px',
             slidesToShow: 1
           }
         }
       ]
	});
   $('.slider-images__items-thumbs').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		var 
			direction,
			slideCountZeroBased = slick.slideCount - 1;
		if (nextSlide == currentSlide) {
			direction = "same";
	
		} else if (Math.abs(nextSlide - currentSlide) == 1) {
			direction = (nextSlide - currentSlide > 0) ? "right" : "left";
	
		} else {
			direction = (nextSlide - currentSlide > 0) ? "left" : "right";
		}
		if (direction == 'right') {
			$('.slick-cloned[data-slick-index="' + (nextSlide + slideCountZeroBased + 1) + '"]', $('.slider-images__items-thumbs')).addClass('slick-current-clone-animate');
		}
		if (direction == 'left') {
			$('.slick-cloned[data-slick-index="' + (nextSlide - slideCountZeroBased - 1) + '"]', $('.slider-images__items-thumbs')).addClass('slick-current-clone-animate');
		}
	});
	$('.slider-images__items-thumbs').on('afterChange', function () {
		$('.slick-current-clone-animate', $('.slider-images__items-thumbs')).removeClass('slick-current-clone-animate');
		$('.slick-current-clone-animate', $('.slider-images__items-thumbs')).removeClass('slick-current-clone-animate');
	});
	$('.slider-images-main__items:not(.slider-images-main__items_single)').slick({
		slidesToShow: 2,
		asNavFor: '.slider-images-thumbs__items',
		prevArrow: '.slider-images-main__nav_prev',
		nextArrow: '.slider-images-main__nav_next',
		centerMode: true,
		autoplaySpeed: 5000,
		initialSlide: 1,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1
				}
			},
         {
            breakpoint: 640,
            settings: {
               slidesToShow: 1,
               arrows: false,
               centerMode: false,
            }
         }
		]
	});
	$('.slider-images-thumbs__items').slick({
		slidesToShow: 10,
      variableWidth: true,
		asNavFor: '.slider-images-main__items',
		centerMode: true,
		arrows: false,
		focusOnSelect: true,
		initialSlide: 1,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 7
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 6
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 380,
				settings: {
					slidesToShow: 2
				}
			},
		]
	});
	var selector = '.slider-images-main__items .slick-slide:not(.slick-cloned)';
	$().fancybox({
		selector : selector,
		backFocus : false,
		afterShow: function(instance, current) {
			current.opts.$orig.closest(".slick-initialized").slick('slickGoTo', parseInt(current.index), true);
		}
	});
	$(document).on('click', '.slick-cloned', function(e) {
		$(selector)
			.eq(($(this).attr("data-slick-index") || 0) % $(selector).length)
			.trigger("click.fb-start", { $trigger: $(this) });

		return false;
	});
   $('#phone').mask('+7 (000) 000 00 00');
})