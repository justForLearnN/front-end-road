var run = document.querySelector('#run'),
    box = document.querySelector('.box'),
    lastTime = 0,
    aniFrame = window.requestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.msRequestAnimationFrame ||
               function(callback) {
                    var curTime = +new Date,
                        delay = Math.max(1000/60, 1000/60 - (curTime - lastTime));

                    lastTime = curTime + delay;
                    return setTimeout(callback, delay);
               },
    celFrame = window.cancelAnimationFrame ||
               window.webkitCancelAnimationFrame ||
               window.mozCancelAnimationFrame ||
               window.msCancelAnimationFrame ||
               clearTimeout,
    timer = null,
    tag = 0;

var cur = box.offsetLeft,
    speed = -1;

function ani() {
    tag = 1;
    box.style.left = cur + 'px';
    cur += speed;
    celFrame(timer);
    if (cur > 0) {
        timer = aniFrame(ani);
    }
}

function _ani() {
    tag = 0;
    box.style.left = cur + 'px';
    cur -= speed;
    celFrame(timer);
    if (cur < 600) {
        timer = aniFrame(_ani);
    }
}

run.onclick = function() {
    tag == 0 ? ani() : _ani();
}
