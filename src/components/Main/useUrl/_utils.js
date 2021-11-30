// ketika tombol di klik
const clickButton = {
    start: (e) => {// param e adalah element button di tag form
        e.target[1].firstChild.nodeValue = 'processing...';
        e.target[1].style.cursor = 'wait';
        e.target[1].style.opacity = '0.7';
        e.target[1].setAttribute("disabled", true);
    },
    finish: (e) => {
        e.target[1].firstChild.nodeValue = 'Compress Now';
        e.target[1].style.cursor = 'pointer';
        e.target[1].style.opacity = '1';
        e.target[1].removeAttribute("disabled");
    }
}

export {
    clickButton
};