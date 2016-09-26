function startAd() {
    console.log('=== startAd ===');
    HW_CM.preloadImgs(selector, done);

    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('hover animated ' + animationName);
            });
        }
    });

    TweenMax.staggerFromTo('.welcome span' , 0.5 , {
        opacity: 0,
    } , {
        opacity: 1,
        ease: Quad.easeOut,
        delay: 0.5
    } , 0.1);

    var routHref = [
        '/q1',
        '/q2',
        '/q3',
        '/result'
    ];

    var routIndex = 0;
    var $cta = $('.cta');

    function question1(timeout) {
        var timeout_card = [timeout[0].timeout*1000, timeout[1].timeout*1000, timeout[2].timeout*1000];

        $('.card-wrapper').on('mouseenter', '.card', function(){
            // console.log($(this).index(), $(this).attr('data-flag'));

            var $item = $(this);
            var cardIndex = $item.index();


            if($(this).attr('data-flag') == 'true') return;
            $(this).addClass('hover');
            setTimeout(function(){
                $item.attr('data-flag', 'true')
                $item.removeClass('hover');
            }, timeout_card[cardIndex]);
        });
    }


    var countDownAudio,rightAudio,wrongAudio,victoryAudio;
    var countDown20,countDownEnd;
    var flag_q2_end = false;
    function question2() {
        var totleTime = 30000;

        // init audio
        initAudio();
        function initAudio() {
            rightAudio = new Audio();
            rightAudio.src = 'http://wt.sc.chinaz.com/Files/DownLoad/sound1/201505/5824.mp3';

            wrongAudio = new Audio();
            wrongAudio.src = 'http://wt.sc.chinaz.com/files/download/sound1/201307/3328.mp3';

            countDownAudio = new Audio();
            countDownAudio.src = 'http://wt.sc.chinaz.com/Files/DownLoad/sound1/201509/6339.mp3';

            victoryAudio = new Audio();
            victoryAudio.src = 'http://wt.sc.chinaz.com/files/download/sound1/201407/4667.mp3';
        }


        //register events
        $('.different-wrapper .overlay').on('click', function(){
            countDown20 = setTimeout(function(){
                countDownAudio.play();
            }, totleTime-20000);

            countDownEnd = setTimeout(function(){
                alert('BOOM!');
                flag_q2_end = true;
            }, totleTime);

            TweenMax.to(this, .5, {
                autoAlpha: 0,
                display: 'none'
            });
            TweenMax.to('.lamp-wrapper', .5, {
                autoAlpha: 1
            });
        });

        var lampIndex = 0;
        $('.target.product').on('click', '.targetItem', function(){
            if(flag_q2_end) return;

            wrongAudio.pause();
            wrongAudio.currentTime = 0;
            wrongAudio.play();
        }).on('click', '.hotspot', function(){
            if(flag_q2_end || $(this).hasClass('active')) return;

            $(this).addClass('active');
            $('.lamp').eq(lampIndex).addClass('active');

            rightAudio.pause();
            rightAudio.currentTime = 0;
            rightAudio.play();

            if(lampIndex == $.makeArray($('.lamp')).length-1) {
                flag_q2_end = true;
                console.log('victory');

                victoryAudio.play();

                clearTimeout(countDown20);
                clearTimeout(countDownEnd);
                countDownAudio.pause();
                countDownAudio.currentTime = 0;
            }
            ++lampIndex;
        });
    }

    function loadNextPage() {
        $.ajax({
            type: 'POST',
            url: routHref[routIndex],
            dataType: 'json',
            success: function(data){
                ++routIndex;

                fetch('template/template.ejs')
                    .then(function(response) {
                        return response.text();
                    }).then(function(body) {
                        var domWrapper = ejs.render(body, data);

                        if(routIndex % 2) {
                            $('.prev').removeClass('active')
                            $('.temp').html(domWrapper).addClass('active');

                            TweenMax.fromTo('.prev', .7, {
                                x: routIndex == 1 ? '0%' : '0%',
                                y: routIndex == 1 ? '0%' : '0%',
                            }, {
                                x: routIndex == 1 ? '0%' : '-100%',
                                y: routIndex == 1 ? '-100%' : '0%',
                                ease: Cubic.easeInOut,
                                delay: 0.1
                            });
                            TweenMax.fromTo('.temp', .7, {
                                x: routIndex == 1 ? '0%' : '100%',
                                y: routIndex == 1 ? '100%' : '0%',
                            }, {
                                x: routIndex == 1 ? '0%' : '0%',
                                y: routIndex == 1 ? '0%' : '0%',
                                ease: Cubic.easeInOut,
                                delay: 0.1,
                                onComplete: function(){
                                    $('.nav-wrapper	div').removeClass('active');
                                    $('.nav-wrapper	div').eq(routIndex).addClass('active');
                                }
                            });
                            HW_CM.preloadImgs('.temp .preload', done);
                        }else {
                            $('.temp').removeClass('active');
                            $('.prev').html(domWrapper).addClass('active');

                            TweenMax.fromTo('.prev', .7, {
                                x: '100%',
                                y: '0%'
                            }, {
                                x: '0%',
                                y: '0%',
                                ease: Cubic.easeInOut,
                                delay: 0.1
                            });
                            TweenMax.fromTo('.temp', .7, {
                                x: '0%',
                                y: '0%',
                            }, {
                                x: '-100%',
                                y: '0%',
                                ease: Cubic.easeInOut,
                                delay: 0.1,
                                onComplete: function(){
                                    $('.nav-wrapper	div').removeClass('active');
                                    $('.nav-wrapper	div').eq(routIndex).addClass('active');
                                }
                            });
                            HW_CM.preloadImgs('.prev .preload', done);
                        }

                        setTimeout(function(){
                            switch(routIndex) {
                                case 1:
                                    question1(data.QAQ.m);
                                    break;
                                case 2:
                                    question2();
                                    break;
                                case 3:

                                    break;
                                default:
                                    console.log('default');
                            }
                        }, 1000); // delay to register events


                        var $submit = $('.active.wrapper .submit');
                        var answers = [];

                        $submit.on('mouseenter', function(){
                            $submit.addClass('hover');
                        }).on('mouseleave', function(){
                            $submit.removeClass('hover');
                        }).on('click', function(){
                            // console.log(routIndex, $('textarea').val());
                            switch(routIndex) {
                                case 1:
                                    var q1Answer = $('textarea').val().replace(/ /g, '');
                                    if(q1Answer.length < 1) return;
                                    answers.push(q1Answer);
                                    console.log(answers);
                                    break;
                                case 2:
                                    flag_q2_end = true;
                                    clearTimeout(countDown20);
                                    clearTimeout(countDownEnd);

                                    rightAudio.pause();
                                    rightAudio.currentTime = 0;
                                    countDownAudio.pause();
                                    countDownAudio.currentTime = 0;
                                    wrongAudio.pause();
                                    wrongAudio.currentTime = 0;
                                    victoryAudio.pause();
                                    victoryAudio.currentTime = 0;

                                    var q2Answer = [].slice.call($('.target.product .active')).length;
                                    answers.push(q2Answer);
                                    console.log(answers);
                                    break;
                                case 3:

                                    break;
                                default:
                                    console.log('default');
                            }

                            // send answers
                            $.post(
                                '/save', {
                                    answer: answers,
                                    qIndex: routIndex
                                }
                            )
                            .done(function(data) {
                                console.log('successed', data);
                                loadNextPage();
                            })
                            .fail(function() {
                                console.log('failed');
                            });
                        });
                    })
            }
        });
    }

    $cta.on('click', function(){
        loadNextPage();
    });
}
