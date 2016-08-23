function startAd() {
    console.log('=== startAd ===');
    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('hover animated ' + animationName);
            });
        }
    });

    var $topic = $('.topic');
    var $rightBox = $('.right-box');
    var $options = $('.choice span');
    var $choice = $('.choice');
    var $submit = $('.submit');
    var $start = $('.start');
    var answers = [];

    var qIndex = parseInt($topic.text().split(':')[1]);


    $start.on('mouseenter', function(){
        $start.addClass('hover');
    }).on('mouseleave', function(){
        $start.removeClass('hover');
    }).on('click', function(){
        location.href = '/q0';
    });

    // $choice.animateCss('fadeInDown');
    $choice.each(function(i, item){
        TweenMax.fromTo('.choice:eq('+i+')', 1, {
            y: '-100%'
        }, {
            y: '0%',
            autoAlpha: 1,
            delay: 0.9+i*0.1
        });
    });

    $rightBox.on('mouseenter', '.choice', function() {
        var $this = $(this);
        $this.addClass('hover').animateCss('pulse');
    }).on('click', 'span', function() {
        var $this = $(this);
        $this.parent('.choice').toggleClass('active');
    });

    $submit.on('mouseenter', function(){
        $submit.addClass('hover');
    }).on('mouseleave', function(){
        $submit.removeClass('hover');
    }).on('click', function(){
        if($('.choice.active').length < 1) return;
        
        $('.choice.active').each(function(i, item){
            var $this = $(item);
            var index = $choice.index(this);
            answers.push(index);
        });

        $.post(
            '/save',
            {
                answer: answers,
                qIndex: qIndex
            }
        )
        .done(function(data) {
            console.log('successed', data);
            // window.open('/q');
            if(qIndex != 2) {
                location.href = '/q'+(qIndex+1);
            }else {
                location.href = '/result';
            }
            // window.open('/q'+(qIndex+1));
        })
        .fail(function() {
            console.log('failed');
        });
    });
}
