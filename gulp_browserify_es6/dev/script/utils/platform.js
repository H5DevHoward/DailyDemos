(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory();
	} else {
		// Browser global
		factory();
	}
}(this, function() {
    //////////
    // Name //
    //////////

    var COMPONENT_NAME = 'Platform';

    ///////////////
    // Component //
    ///////////////

    var ua = window.navigator.userAgent.toLowerCase();
    var html = document.getElementsByTagName('html')[0];

    var Component = {
        isiPad: ua.match(/ipad/i) !== null,
        isNexus7: ua.match(/Nexus 7/gi) !== null,
        isMobile: ua.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i) !== null && ua.match(/Mobile/i) !== null,
        isiPhone: ua.match(/iphone/i) !== null,
        isAndroid: ua.match(/android/i) !== null,
        isS4: ua.match(/(gt\-i95)|(sph\-l720)/i) !== null,
        isS5: ua.match(/sm\-g900/i) !== null,
        isIE: ua.match(/(msie|trident)/i) !==null, // /(msie|trident)/i.test(navigator.userAgent),
        isIE11: ua.match(/Trident\/7\.0/i) !== null,
        isEdge: ua.match(/edge/i) !== null,
        isChrome: ua.match(/Chrome/gi) !== null,
        isFirefox: ua.match(/firefox/gi) !== null,
        hasTouch: ('ontouchstart' in window),
    };

    Component.isAndroidPad = Component.isAndroid && !Component.isMobile;
    Component.isTablet = Component.isiPad || Component.isAndroidPad;
    Component.isDesktop = !(Component.isMobile || Component.isTablet);
    Component.isIOS = Component.isiPad || Component.isiPhone;
    Component.isSafari = Component.isDesktop && (!Component.isIE) && (!Component.isChrome) && (!Component.isFirefox);


    if (Component.isDesktop) html.classList.add('desktop');
    if (Component.isIE) html.classList.add('ie');
    if (!Component.isIE) html.classList.add('not-ie');
    if (Component.isIE11) html.classList.add('ie11');
    if (Component.isEdge) html.classList.add('edge');
    if (!Component.isEdge) html.classList.add('not-edge');
    if (Component.isChrome) html.classList.add('chrome');
    if (Component.isFirefox) html.classList.add('firefox');
    if (Component.isSafari) html.classList.add('safari');

    if (Component.isTablet) html.classList.add('tablet');
    if (Component.isiPad) html.classList.add('ipad');
    if (Component.isAndroidPad) html.classList.add('android-pad');
    if (Component.isNexus7) html.classList.add('nexus7');

    if (Component.isMobile) html.classList.add('mobile');
    if (Component.isiPhone) html.classList.add('iphone');
    if (Component.isS4) html.classList.add('s4');
    if (Component.isS5) html.classList.add('s5');

    if (Component.isIOS) html.classList.add('ios');
    if (Component.isAndroid) html.classList.add('android');

    if (Component.hasTouch) html.classList.add('has-touch');
    if (!Component.hasTouch) html.classList.add('no-touch');


    window[COMPONENT_NAME] = Component;

    return Component;
}));
