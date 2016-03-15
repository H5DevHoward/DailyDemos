$(function(){
	var box = $('.box');
	var box1 = $('.box1');
	var box2 = $('.box2');
	var box3 = $('.box3');
	var box4 = $('.box4');
	var box5 = $('.box5');
	var box6 = $('.box6');
	var box7 = $('.box7');
	var box8 = $('.box8');
	var box9 = $('.box9');
	var box10 = $('.box10');
	var box11 = $('.box11');
	var box12 = $('.box12');

	var i = 0, j = 1;
	var interval;

	var stepWidth = box1.width() + 50;
	var stepHeight = box1.height() + 38;

	interval = setInterval(stepByStep, 3000);

	$('.watch-container .box').on('mouseenter',function(){
			TweenMax.to($(this), 0.1, {
				scale: 1.1
			});
	}).on('mouseleave',function(){
			TweenMax.to($(this), 0.1, {
				scale: 1
			});
	});

	function stepByStep(){
		TweenMax.fromTo(box1, 1, {
		x: -stepWidth*i
		}, {
			x: -stepWidth*j
		});

		TweenMax.fromTo(box2, 1, {
		x: -stepWidth*i
		}, {
			x: -stepWidth*j
		});

		TweenMax.fromTo(box3, 1, {
		x: -stepWidth*i
		}, {
			x: -stepWidth*j
		});

		TweenMax.fromTo(box4, 1, {
		x: -stepWidth*i
		}, {
			x: -stepWidth*j
		});

		TweenMax.fromTo(box5, 1, {
		x: -stepWidth*i
		}, {
			x: -stepWidth*j
		});

		TweenMax.fromTo(box6, 1, {
		x: -stepWidth*i
		}, {
			x: -stepWidth*j
		});

		TweenMax.fromTo(box7, 1, {
		x: -stepWidth*i
		}, {
			x: -stepWidth*j
		});

		TweenMax.fromTo(box8, 1, {
		x: -stepWidth*i
		}, {
			x: -stepWidth*j
		});

		TweenMax.fromTo(box9, 1, {
		x: -stepWidth*i
		}, {
			x: -stepWidth*j
		});

		TweenMax.fromTo(box10, 1, {
		x: -stepWidth*i
		}, {
			x: -stepWidth*j
		});

		TweenMax.fromTo(box11, 1, {
		x: -stepWidth*i
		}, {
			x: -stepWidth*j
		});

		TweenMax.fromTo(box12, 1, {
		x: -stepWidth*i
		}, {
			x: -stepWidth*j
		});

		++i;
		++j;
		if(j == 7){
			clearInterval(interval);
			i = 0;
			j = 1;
			interval = setInterval(stepByStep, 3000);
		}
	}
})
