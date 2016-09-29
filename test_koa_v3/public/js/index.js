function startAd() {
    var week = '今天星期:' + '日一二三四五六'.charAt(new Date().getDay());
    console.log(week);

    var HW_CM = {};

    selector = HW_CM.selector = '.preload';
    done = HW_CM.done = function(){
        console.log('preloadImgs finished');
    };

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



    HW_CM.preloadImgs(selector, done);

    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('hover animated ' + animationName);
            });
        }
    });

    var $welcome = $('.welcome').textillate({
        loop: false,
        initialDelay: 100,
        in: {
            effect: 'fadeInLeft',
            sync: false,
            reverse: false,
            callback: function () {},
        },
        type: 'char',
    });
    $welcome.css('display', 'block');
    $welcome.textillate('in');

    var routHref = [
        '/q1',
        '/q2',
        '/q3',
        '/result'
    ];
    var routIndex = 0;


    function question1(timeout) {
        var timeout_card = [timeout[0].timeout*1000, timeout[1].timeout*1000, timeout[2].timeout*1000];

        $('.card-wrapper').on('mouseenter', '.card', function(){
            var $item = $(this);
            var cardIndex = $item.index();

            if($(this).attr('data-flag') == 'true') return;
            $(this).addClass('hover');
            setTimeout(function(){
                $item.attr('data-flag', 'true')
                $item.removeClass('hover');
            }, timeout_card[cardIndex]);
        });

        $('textarea.yourAnswer').keydown(function(e) {
            if (e.keyCode == '13') {
                $('.wrapper.active .submit').trigger('click');
            }
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
            // rightAudio.src = 'http://wt.sc.chinaz.com/Files/DownLoad/sound1/201505/5824.mp3';
            rightAudio.src = '../media/right.mp3';

            wrongAudio = new Audio();
            // wrongAudio.src = 'http://wt.sc.chinaz.com/files/download/sound1/201307/3328.mp3';
            wrongAudio.src = '../media/wrong.mp3';

            countDownAudio = new Audio();
            // countDownAudio.src = 'http://wt.sc.chinaz.com/Files/DownLoad/sound1/201509/6339.mp3';
            countDownAudio.src = '../media/countDown.mp3';

            victoryAudio = new Audio();
            // victoryAudio.src = 'http://wt.sc.chinaz.com/files/download/sound1/201407/4667.mp3';
            victoryAudio.src = '../media/victory.mp3';
        }


        //register events
        $('.different-wrapper .overlay').on('click', function(){
            TweenMax.staggerFromTo('.lamp-wrapper .lamp' , 0.5, {
                x: '-200%',
            } , {
                x: '0%',
                ease: Quad.easeOut,
                delay: 0.3
            } , 0.05);


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

                        $('.prev,.temp').toggleClass('active').toggleClass('inactive');

                        $('.wrapper.active').html(domWrapper);
                        HW_CM.preloadImgs('.wrapper.active .preload', done);

                        console.log(routIndex);

                        if(routIndex == 4) {
                            TweenMax.to('.submit', .1, {
                                autoAlpha: 0
                            });
                            TweenMax.to('.resultOverlay', .5, {
                                autoAlpha: 1,
                                scaleX: 20,
                                scaleY: 40,
                                delay: 0.1
                            });

                            $('.prev .poster').css('background-color', 'rgba(255, 255, 255, 0.5)');
                            $('.temp .container').addClass('blur');

                            TweenMax.fromTo('.prev', .7, {
                                x: '0%',
                                y: '0%',
                                autoAlpha: 0,
                                zIndex: 2
                            }, {
                                autoAlpha: 1,
                                x: '0%',
                                y: '0%',
                                ease: Cubic.easeInOut,
                                delay: 0.1,
                                onComplete: function(){
                                    $('.nav-wrapper	div').removeClass('active');
                                    $('.nav-wrapper	div').eq(routIndex).addClass('active');
                                }
                            });
                        }else {
                            TweenMax.fromTo('.wrapper.inactive', .7, {
                                x: routIndex == 1 ? '0%' : ('0%'),
                                y: routIndex == 1 ? '0%' : ('0%'),
                                autoAlpha: routIndex == 4 ? 0 : 1,
                                zIndex: 2
                            }, {
                                x: routIndex == 1 ? '0%' : ('-100%'),
                                y: routIndex == 1 ? '-100%' : ('0%'),
                                autoAlpha: 1,
                                ease: Cubic.easeInOut,
                                delay: 0.1
                            });
                            TweenMax.fromTo('.wrapper.active', .7, {
                                x: routIndex == 1 ? '0%' : ('100%'),
                                y: routIndex == 1 ? '100%' : ('0%')
                            }, {
                                x: routIndex == 1 ? '0%' : ('0%'),
                                y: routIndex == 1 ? '0%' : ('0%'),
                                ease: Cubic.easeInOut,
                                zIndex: 1,
                                delay: 0.1,
                                onComplete: function(){
                                    $('.nav-wrapper	div').removeClass('active');
                                    $('.nav-wrapper	div').eq(routIndex).addClass('active');
                                }
                            });
                        }

                        // if(routIndex % 2) {
                        //     $('.prev').removeClass('active')
                        //     $('.temp').html(domWrapper).addClass('active');
                        //     HW_CM.preloadImgs('.temp .preload', done);
                        //
                        //
                        //     TweenMax.fromTo('.prev', .7, {
                        //         x: routIndex == 1 ? '0%' : '0%',
                        //         y: routIndex == 1 ? '0%' : '0%',
                        //     }, {
                        //         x: routIndex == 1 ? '0%' : '-100%',
                        //         y: routIndex == 1 ? '-100%' : '0%',
                        //         ease: Cubic.easeInOut,
                        //         delay: 0.1
                        //     });
                        //     TweenMax.fromTo('.temp', .7, {
                        //         x: routIndex == 1 ? '0%' : '100%',
                        //         y: routIndex == 1 ? '100%' : '0%',
                        //     }, {
                        //         x: routIndex == 1 ? '0%' : '0%',
                        //         y: routIndex == 1 ? '0%' : '0%',
                        //         ease: Cubic.easeInOut,
                        //         delay: 0.1,
                        //         onComplete: function(){
                        //             $('.nav-wrapper	div').removeClass('active');
                        //             $('.nav-wrapper	div').eq(routIndex).addClass('active');
                        //         }
                        //     });
                        // }else {
                        //     $('.temp').removeClass('active');
                        //     $('.prev').html(domWrapper).addClass('active');
                        //     HW_CM.preloadImgs('.prev .preload', done);
                        //
                        //     if(routIndex == 4) {
                        //         // TweenMax.to('.submit', .7, {
                        //         //     right: '0%',
                        //         //     bottom: '0%',
                        //         //     width: '100%',
                        //         //     height: '100%',
                        //         //     ease: Cubic.easeInOut,
                        //         //     delay: 0.1
                        //         // });
                        //         // TweenMax.to(['.submit span', '.submit .arrow-icon'], .7, {
                        //         //     autoAlpha: 0,
                        //         //     display: 'none',
                        //         //     delay: 0.1
                        //         // });
                        //         TweenMax.to('.submit', .1, {
                        //             autoAlpha: 0
                        //         });
                        //         TweenMax.to('.resultOverlay', .5, {
                        //             autoAlpha: 1,
                        //             scaleX: 20,
                        //             scaleY: 40,
                        //             delay: 0.1
                        //         });
                        //
                        //         $('.prev .poster').css('background-color', 'rgba(255, 255, 255, 0.5)');
                        //         $('.temp .container').addClass('blur');
                        //
                        //         TweenMax.fromTo('.prev', .7, {
                        //             x: '0%',
                        //             y: '0%',
                        //             autoAlpha: 0,
                        //             zIndex: 2
                        //         }, {
                        //             autoAlpha: 1,
                        //             x: '0%',
                        //             y: '0%',
                        //             ease: Cubic.easeInOut,
                        //             delay: 0.1,
                        //             onComplete: function(){
                        //                 $('.nav-wrapper	div').removeClass('active');
                        //                 $('.nav-wrapper	div').eq(routIndex).addClass('active');
                        //             }
                        //         });
                        //     }else {
                        //         TweenMax.fromTo('.prev', .7, {
                        //             x: '100%',
                        //             y: '0%',
                        //         }, {
                        //             x: '0%',
                        //             y: '0%',
                        //             ease: Cubic.easeInOut,
                        //             delay: 0.1
                        //         });
                        //         TweenMax.fromTo('.temp', .7, {
                        //             x: '0%',
                        //             y: '0%',
                        //         }, {
                        //             x: '-100%',
                        //             y: '0%',
                        //             ease: Cubic.easeInOut,
                        //             delay: 0.1,
                        //             onComplete: function(){
                        //                 $('.nav-wrapper	div').removeClass('active');
                        //                 $('.nav-wrapper	div').eq(routIndex).addClass('active');
                        //             }
                        //         });
                        //     }
                        // }



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
                                case 4:
                                    var $resultTitle, $result;
                                    $resultTitle = $('.result .title').textillate({
                            			loop: false,
                            			initialDelay: 0,
                            			in: {
                                			effect: 'fadeInLeft',
                                			sync: false,
                                			reverse: false,
                                            shuffle: true,
                                			callback: function () {},
                                		},
                                		type: 'char'
                                	});
                                    $result = $('.result .option').textillate({
                            			loop: false,
                            			initialDelay: 0,
                            			in: {
                                			effect: 'fadeInLeft',
                                			sync: false,
                                			reverse: false,
                                            shuffle: true,
                                			callback: function () {},
                                		},
                                		type: 'char'
                                	});
                                    $('.result').css('display', 'block');
                                    $resultTitle.textillate('in');
                                    $result.textillate('in');
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
                            // console.log(routIndex);
                            switch(routIndex) {
                                case 1:
                                    var q1Answer = $('textarea').val().replace(/ /g, '');
                                    if(q1Answer.length < 1) return;
                                    answers.push(q1Answer);
                                    // console.log(answers);
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
                                    // var q3Answer = [].slice.call($('.target.product .active')).length;
                                    answers.push(0);
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
                                console.log('successed');
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

    var $cta = $('.cta');
    $cta.on('click', function(){
        loadNextPage();
    });
}
