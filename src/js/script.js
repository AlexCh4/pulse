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
});