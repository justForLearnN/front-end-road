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
    timer = null;

function ani() {
    // if (box.offsetLeft == 500) {
    //     celFrame(ani);
    // }
    box.style.left = box.offsetLeft + 1 + 'px';
    celFrame(timer);
    if (box.offsetLeft < 500) {
        timer = aniFrame(ani);
    }
}
aniFrame(ani);
