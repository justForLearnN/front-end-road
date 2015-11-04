define(function(require) {
    var $ = require('jquery'),
        T = require('utils'),
        LazyLoad = require('LazyLoad'),
        J2C = require('JS2CSSKeyframes'),
        Slider = require('TouchSlider');

    $('#menus a').click(function() {
        var url = $(this).attr('href');
        if (/^#\w+/.test(url)) {
            $('html,body').finish().animate({
                scrollTop: Math.max($(url).offset().top - $('#header').height(), 0)
            }, {
                duration: 800
            });
            return false;
        }
    });

    var fold = true;
    $('.mobile-menu').tap(function() {
        console.log(1)
        if (fold) {
            $(this).addClass('menu-open');
            $('#menus').finish().slideDown(400);
        } else {
            $(this).removeClass('menu-open');
            $('#menus').finish().slideUp(400);
        }
        fold = !fold;
    });

    //每个内容块的延迟加载动画
    LazyLoad($('#banner,.section'), -100, function() {
        var aninodes = $(this).addClass('animated').find('[data-animate]');
        aninodes.each(function() {
            $(this).addClass($(this).attr('data-animate'));
        });
    });


    //顾问列表
    var slider = new Slider($('.teacher-list ul')[0], {
        mouse: false,
        direction: 0,
        autoplay: false,
        fullsize: false,
        align: 'left'
    });

    $('.teacher-list .arrow').click(function() {
        var n = Math.round($(this).parent().width() / $(slider.pages[0]).width()),
            index = slider.current;
        if ($(this).hasClass('prev')) {
            index -= 1;
            if (index < 0) {
                index = slider.length - n;
            }
        } else {
            index += 1;
            if (index + n > slider.length) {
                index = 0;
            }
        }
        slider.slide(index);
    });
});
