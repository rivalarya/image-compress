//ketika user melakukan drag and drop
const effect = {
    start: () => {
        document.querySelector('input[type=file]').setAttribute('disabled', true);
        document.querySelector('.choice-file p').textContent = 'Processing...';
        document.querySelector('.lds-dual-ring').style.display = 'inline-block';
    },
    dragEnter: () => {
        document.querySelector('.input-file').style.opacity = 0.6;
        document.querySelector('.input-file').style.boxShadow = '0 0 8px 1px rgb(99, 0, 0)';
    },
    onDragLeave: () => {
        document.querySelector('.input-file').style.opacity = 1;
        document.querySelector('.input-file').style.boxShadow = '0 0 2px rgb(99, 0, 0);';
    },
    finish: () => {
        setTimeout(() => {          
        document.querySelector('input[type=file]').removeAttribute('disabled');
        document.querySelector('.choice-file').innerHTML = `<span class="lds-dual-ring" style="display: none; margin:auto;"></span><p> Click on this area to choose <span> or drag and drop </span>your image <span>here</span></p>`; // diambil dari main.js
        }, 1000);
    }
}

export {effect};