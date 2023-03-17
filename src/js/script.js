$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/leftarrow.png"/></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/rightarrow.png"/></button>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
      });

    const catalogItem1 = document.querySelector('#item1');
    const catalogItem2 = document.querySelector('#item2');
    const catalogItem3 = document.querySelector('#item3');
    const catalogItem4 = document.querySelector('#item4');
    const catalogItem5 = document.querySelector('#item5');
    const catalogItem6 = document.querySelector('#item6');
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
            catalogItem1.removeAttribute('style');
            catalogItem2.removeAttribute('style');
            catalogItem3.removeAttribute('style');
            catalogItem4.removeAttribute('style');
            catalogItem5.removeAttribute('style');
            catalogItem6.removeAttribute('style');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal
    let fadeCondition = false;

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
        $('.pageup').fadeOut();
        fadeCondition = true;
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
        if ($(window).scrollTop() > 2000) {
            $('.pageup').fadeIn('slow');
        }
        fadeCondition = false;
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
            $('.pageup').fadeOut();
            fadeCondition = true;
        });
    });

    function errorForm(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя.",
                phone: {
                    required: "Пожалуйста, введите свой номер телефона.",
                },
                email: {
                    required: "Пожалуйста, введите свою почту.",
                    email: "Введен неккоректный почтовый ящик!"
                }
            }
        });
    };

    errorForm('#consultation-form');
    errorForm('#consultation form');
    errorForm('#order form');

    $('input[name=phone]').mask("8 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
            $('.pageup').fadeOut();
            fadeCondition = true;
        });
        return false;
    });

    //scroll & pageup

    $(window).scroll(function() {
        if (($(this).scrollTop() > 2000) && (fadeCondition == false)) {
                $('.pageup').fadeIn('slow');
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW({
        animateClass: 'animate__animated',
        mobile: false
    }).init();
});