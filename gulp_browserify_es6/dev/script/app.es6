import Platform from './utils/platform';

function init() {
    if (Platform.isIE) {
        setTimeout(() => {
            image.removeAttribute('width', '');
            image.removeAttribute('height', '');
        }, 10);
    }
}

window.addEventListener('load', init, false);
