var week = '今天星期:' + '日一二三四五六'.charAt(new Date().getDay());
console.log(week);

var HW_CM = {};
var $loader = $('.loader');

selector = HW_CM.selector = '.preload';
done = HW_CM.done = function(){$loader.remove();
console.log('preloadImgs finished');};

HW_CM.preloadImgs = function(selector, done) {
    var images = new Array();
    var imgLen, currentIndex = 0;
    imgLen = $(selector).length;
    $(selector).each(function(index, item) {
        images[index] = new Image();
        images[index].addEventListener('load', function() {
            if(typeof($(item).attr('data-bg')) != 'undefined') {
                $(item).css({
                    'background-image': 'url('+images[index].src+')',
                    'background-position': 'center',
                    'background-repeat': 'no-repeat',
                    'background-size': 'cover'
                });
            }else {
                $(item).append('<img src="'+images[index].src+'">');
            }
            if (++currentIndex == imgLen) {
                done();
            }
        });
        images[index].src = $(item).data('source');
    });
}