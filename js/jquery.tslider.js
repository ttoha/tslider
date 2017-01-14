(function($){
    $.fn.tslider = function(options){
        var defaults = {

        }

        var settings = $.extend(defaults, options);

        var slide_width = $(this).find('.slider-wrap').outerWidth();
        var slider_width = $(this).find('.slider .slide').length * slide_width;
        $(this).find('.slider').css({"width": + slider_width + "px"});
        $(this).find('.slider .slide').css({"width": + slide_width + "px"});


        var left_text = $(this).find(".slider .slide").last().find(".slide-name").text();
        var right_text = $(this).find(".slider .slide").eq(1).find(".slide-name").text();
        $(this).find(".slider-left_arrow").html(left_text);
        $(this).find(".slider-right_arrow").html(right_text);


        $(window).resize(function() {
            var slide_width = $(this).find('.slider-wrap').outerWidth();
            var slider_width = $(this).find('.slider .slide').length * slide_width;
            $(this).find('.slider').css({"width": + slider_width + "px"});
            $(this).find('.slider .slide').css({"width": + slide_width + "px"});
        });

        $(".slider-right_arrow").on('click', function(){
            var carusel = $(this).parents(this);
            right_carusel(carusel);
            return false;
        });

        $(".slider-left_arrow").on('click', function(){
            var carusel = $(this).parents(this);
            left_carusel(carusel);
            return false;
        });

        function left_carusel(carusel){
            $(carusel).find(".slider .slide").eq(-1).clone().prependTo($(carusel).find(".slider"));
            $(carusel).find(".slider").css({"left":"-" + slide_width + "px"});
            $(carusel).find(".slider .slide").eq(-1).remove();
            $(carusel).find(".slider").animate({left: "0px"}, 200);

            var left_text = $(carusel).find(".slider .slide").last().find(".slide-name").text();
            var right_text = $(carusel).find(".slider .slide").eq(1).find(".slide-name").text();
            $(carusel).find(".slider-left_arrow").html(left_text);
            $(carusel).find(".slider-right_arrow").html(right_text);
        }

        function right_carusel(carusel){
            $(carusel).find(".slider").animate({left:"-" + slide_width + "px"}, 200, function(){
                $(carusel).find(".slider .slide").eq(0).clone().appendTo($(carusel).find(".slider"));
                $(carusel).find(".slider .slide").eq(0).remove();
                $(carusel).find(".slider").css({"left":"0"});

                var left_text = $(carusel).find(".slider .slide").last().find(".slide-name").text();
                var right_text = $(carusel).find(".slider .slide").eq(1).find(".slide-name").text();
                $(carusel).find(".slider-left_arrow").html(left_text);
                $(carusel).find(".slider-right_arrow").html(right_text);
            });
        }
    }

})(jQuery);
