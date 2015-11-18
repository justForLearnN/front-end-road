;
(function() {
    var config = {
        baseUrl: 'js',
        paths: {
            jquery: 'libs/jquery',
            TouchSlider: 'libs/touchslider/src/touchslider',
            LazyLoad: 'libs/lazyload/src/lazyload',
            JS2CSSKeyframes: 'libs/JS2CSSKeyframes/src/j2ckf',
            CSSKeyframes: 'libs/JS2CSSKeyframes/css3-animation',
            createClass: 'libs/createClass/src/createClass',
            imageReady: 'libs/imageReady/src/imageReady',
            COOKIE: 'libs/COOKIE/src/COOKIE',
            utils: 'modules/utils',
            'core': 'libs/core'
        },
        exclude: ['jquery', 'createClass', 'JS2CSSKeyframes', 'CSSKeyframes', 'utils']
    }

    if (typeof SCRIPT_PATHS == 'object') {
        for (var key in SCRIPT_PATHS) {
            config.paths[key] = SCRIPT_PATHS[key];
        }
    }

    requirejs.config(config);
})();

