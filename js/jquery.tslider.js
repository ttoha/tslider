(function($){
    $.fn.tslider = function(options){
        var defaults = {
            slide_name: true,   // false - отключит название слайдов на стрелках прокрутки
            autoplay: 3000,     // интервал между прокруткой слайда, 0 - отключит авто прокрутку
            speed: 500          // скорость прокрутки
        }

        var settings = $.extend(defaults, options);

        var ts = this;
        var slide_width;
        var slider_width;

        function apply_resize(){
          slide_width = ts.find('.slider-wrap').outerWidth();
          slider_width = ts.find('.slider .slide').length * slide_width;

          ts.find('.slider').css({"width": + slider_width + "px"});
          ts.find('.slider .slide').css({"width": + slide_width + "px"});

          ts.find('.slider .slide').css({"height": "auto"});
          slide_height = ts.find('.slider').outerHeight();
          ts.find('.slider .slide').css({"height": + slide_height + "px"});
        }

        apply_resize();

        $(window).resize(apply_resize);

        function slide_name(){
            if (settings.slide_name == true){
                var left_text = $(ts).find(".slider .slide").last().find(".slide-name").text();
                var right_text = $(ts).find(".slider .slide").eq(1).find(".slide-name").text();
                ts.find(".slider-left_arrow .text").html(left_text);
                ts.find(".slider-right_arrow .text").html(right_text);
            }
        }

        slide_name();

        $(ts).find(".slider-left_arrow").on('click', function(){
            slider_left();
            return false;
        });
        $(ts).find(".slider-right_arrow").on('click', function(){
            slider_right();
            return false;
        });


        function slider_left(){
            $(ts).find(".slider .slide").eq(-1).clone().prependTo($(ts).find(".slider"));
            $(ts).find(".slider").css({"left":"-" + slide_width + "px"});
            $(ts).find(".slider .slide").eq(-1).remove();
            $(ts).find(".slider").animate({left: "0px"}, settings.speed);

            slide_name();
        }

        function slider_right(){
            $(ts).find(".slider").animate({left:"-" + slide_width + "px"}, settings.speed, function(){
                $(ts).find(".slider .slide").eq(0).clone().appendTo($(ts).find(".slider"));
                $(ts).find(".slider .slide").eq(0).remove();
                $(ts).find(".slider").css({"left":"0"});

                slide_name();
            });
        }

        if (settings.autoplay !== 0){
            auto_play(ts);
        }

        function auto_play(){
            setInterval(function(){
                if (!$(ts).is('.stop'))
                    slider_right();
            }, settings.autoplay)
        }

        $(ts).mouseenter(function(){
            $(this).addClass('stop');
        })

        $(ts).mouseleave(function(){
            $(this).removeClass('stop')
        })
    }

})(jQuery);
