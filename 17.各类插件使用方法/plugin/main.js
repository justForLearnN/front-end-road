;
(function($) {

    var slider = new pageSwitch('wrap', {
        direction: 1,
        transition: 'slide',
        mousewheel: true
    });
    var slides = $(slider.pages);

    slides.eq(0).addClass('animated');

    slider.on('before', function(now, next) {
        if (now != next) {
            slides.eq(next).removeClass('animated');
        }
    });

    slider.on('after', function(now, prev) {
        slides.eq(now).addClass('animated');
        if (now != prev) {
            slides.eq(prev).removeClass('animated');
        }
    });

    //切换专场效果时清楚相关样式
    $('.change-transition select').change(function() {
        slider.setTransition(this.value);
        slides.css({
            opacity: 1,
            transform: 'none'
        });
        $('#wrap').css({
            transform: 'none'
        }).parent().css('perspective', 0);
    });

    //创建动画
    JS2CSSKeyframes.add('breath', {
        from:{
            transform:'translateY(0) scale(1)'
        },
        to:{
            transform:'translateY(10px) scale(1.3)'
        }
    })

})(Zepto);
