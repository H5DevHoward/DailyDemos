// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

(function() {
    loadLetteringJS();
    loadTextileJS();
}());

// Place any jQuery/helper plugins in here.
//lettering.js
function loadLetteringJS() {
    !function(t){function e(e,n,i,r){var a=e.text(),c=a.split(n),s="";c.length&&(t(c).each(function(t,e){s+='<span class="'+i+(t+1)+'" aria-hidden="true">'+e+"</span>"+r}),e.attr("aria-label",a).empty().append(s))}var n={init:function(){return this.each(function(){e(t(this),"","char","")})},words:function(){return this.each(function(){e(t(this)," ","word"," ")})},lines:function(){return this.each(function(){var n="eefec303079ad17405c889e092e105b0";e(t(this).children("br").replaceWith(n).end(),n,"line","")})}};t.fn.lettering=function(e){return e&&n[e]?n[e].apply(this,[].slice.call(arguments,1)):"letters"!==e&&e?(t.error("Method "+e+" does not exist on jQuery.lettering"),this):n.init.apply(this,[].slice.call(arguments,0))}}(jQuery);
}
function loadTextileJS() {
    !function(t){"use strict";function n(n){return/In/.test(n)||t.inArray(n,t.fn.textillate.defaults.inEffects)>=0}function e(n){return/Out/.test(n)||t.inArray(n,t.fn.textillate.defaults.outEffects)>=0}function i(t){return"true"!==t&&"false"!==t?t:"true"===t}function a(n){var e=n.attributes||[],a={};return e.length?(t.each(e,function(t,n){var e=n.nodeName.replace(/delayscale/,"delayScale");/^data-in-*/.test(e)?(a["in"]=a["in"]||{},a["in"][e.replace(/data-in-/,"")]=i(n.nodeValue)):/^data-out-*/.test(e)?(a.out=a.out||{},a.out[e.replace(/data-out-/,"")]=i(n.nodeValue)):/^data-*/.test(e)&&(a[e.replace(/data-/,"")]=i(n.nodeValue))}),a):a}function o(t){for(var n,e,i=t.length;i;n=parseInt(Math.random()*i),e=t[--i],t[i]=t[n],t[n]=e);return t}function s(t,n,e){t.addClass("animated "+n).css("visibility","visible").show(),t.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){t.removeClass("animated "+n),e&&e()})}function l(i,a,l){var r=i.length;return r?(a.shuffle&&(i=o(i)),a.reverse&&(i=i.toArray().reverse()),void t.each(i,function(i,o){function c(){n(a.effect)?u.css("visibility","visible"):e(a.effect)&&u.css("visibility","hidden"),r-=1,!r&&l&&l()}var u=t(o),f=a.sync?a.delay:a.delay*i*a.delayScale;u.text()?setTimeout(function(){s(u,a.effect,c)},f):c()})):void(l&&l())}var r=function(i,o){var s=this,r=t(i);s.init=function(){s.$texts=r.find(o.selector),s.$texts.length||(s.$texts=t('<ul class="texts"><li>'+r.html()+"</li></ul>"),r.html(s.$texts)),s.$texts.hide(),s.$current=t("<span>").html(s.$texts.find(":first-child").html()).prependTo(r),n(o["in"].effect)?s.$current.css("visibility","hidden"):e(o.out.effect)&&s.$current.css("visibility","visible"),s.setOptions(o),s.timeoutRun=null,setTimeout(function(){s.options.autoStart&&s.start()},s.options.initialDelay)},s.setOptions=function(t){s.options=t},s.triggerEvent=function(n){var e=t.Event(n+".tlt");return r.trigger(e,s),e},s["in"]=function(i,o){i=i||0;var r,c=s.$texts.find(":nth-child("+((i||0)+1)+")"),u=t.extend(!0,{},s.options,c.length?a(c[0]):{});c.addClass("current"),s.triggerEvent("inAnimationBegin"),s.$current.html(c.html()).lettering("words"),"char"==s.options.type&&s.$current.find('[class^="word"]').css({display:"inline-block","-webkit-transform":"translate3d(0,0,0)","-moz-transform":"translate3d(0,0,0)","-o-transform":"translate3d(0,0,0)",transform:"translate3d(0,0,0)"}).each(function(){t(this).lettering()}),r=s.$current.find('[class^="'+s.options.type+'"]').css("display","inline-block"),n(u["in"].effect)?r.css("visibility","hidden"):e(u["in"].effect)&&r.css("visibility","visible"),s.currentIndex=i,l(r,u["in"],function(){s.triggerEvent("inAnimationEnd"),u["in"].callback&&u["in"].callback(),o&&o(s)})},s.out=function(n){var e=s.$texts.find(":nth-child("+((s.currentIndex||0)+1)+")"),i=s.$current.find('[class^="'+s.options.type+'"]'),o=t.extend(!0,{},s.options,e.length?a(e[0]):{});s.triggerEvent("outAnimationBegin"),l(i,o.out,function(){e.removeClass("current"),s.triggerEvent("outAnimationEnd"),o.out.callback&&o.out.callback(),n&&n(s)})},s.start=function(t){setTimeout(function(){s.triggerEvent("start"),function n(t){s["in"](t,function(){var e=s.$texts.children().length;t+=1,!s.options.loop&&t>=e?(s.options.callback&&s.options.callback(),s.triggerEvent("end")):(t%=e,s.timeoutRun=setTimeout(function(){s.out(function(){n(t)})},s.options.minDisplayTime))})}(t||0)},s.options.initialDelay)},s.stop=function(){s.timeoutRun&&(clearInterval(s.timeoutRun),s.timeoutRun=null)},s.init()};t.fn.textillate=function(n,e){return this.each(function(){var i=t(this),o=i.data("textillate"),s=t.extend(!0,{},t.fn.textillate.defaults,a(this),"object"==typeof n&&n);o?"string"==typeof n?o[n].apply(o,[].concat(e)):o.setOptions.call(o,s):i.data("textillate",o=new r(this,s))})},t.fn.textillate.defaults={selector:".texts",loop:!1,minDisplayTime:2e3,initialDelay:0,"in":{effect:"fadeInLeftBig",delayScale:1.5,delay:50,sync:!1,reverse:!1,shuffle:!1,callback:function(){}},out:{effect:"hinge",delayScale:1.5,delay:50,sync:!1,reverse:!1,shuffle:!1,callback:function(){}},autoStart:!0,inEffects:[],outEffects:["hinge"],callback:function(){},type:"char"}}(jQuery);
}