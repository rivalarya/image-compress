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

function details(sizeBefore, sizeAfter, percentCompress) {
    
    let b, c, lengthFileSizeBefore, lengthFileSizeAfter;
    let result = {};
    
    if (percentCompress !== 0 || percentCompress !== undefined) {
        
        lengthFileSizeBefore = sizeBefore.toString().split('');
        if (lengthFileSizeBefore.length > 6) { // untuk MegaByte
            b = sizeBefore.toString().split('');
            b.splice(b.length - 6, 6);
            c = b.join('');
            result.beforeCompress = c + ' MB';
        } else if (lengthFileSizeBefore.length > 3) { // untuk KiloByte
            b = sizeBefore.toString().split('');
            b.splice(b.length - 3, 3);
            c = b.join('');
            result.beforeCompress = c + ' KB';
        } else { // untuk Byte
            b = sizeBefore.toString();
            result.beforeCompress = b + ' Byte';
        }
    
        lengthFileSizeAfter = sizeAfter.toString().split('');
        if (lengthFileSizeAfter.length > 6) { // untuk MegaByte
            b = sizeAfter.toString().split('');
            b.splice(b.length - 6, 6);
            c = b.join('');
            result.afterCompress = c + ' MB';
        } else if (lengthFileSizeAfter.length > 3) { // untuk KiloByte
            b = sizeAfter.toString().split('');
            b.splice(b.length - 3, 3);
            c = b.join('');
            result.afterCompress = c + ' KB';
        } else { // untuk Byte
            b = sizeAfter.toString();
            result.afterCompress = b + ' Byte';
        }

        const options = {
            series: [percentCompress],
            chart: {
                height: 250,
                type: 'radialBar'
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 225,
                    hollow: {
                        margin: 0,
                        size: '50%',
                        background: '#fff',
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: 'front',
                        dropShadow: {
                            enabled: true,
                            top: 3,
                            left: 0,
                            blur: 4,
                            opacity: 0.24
                        }
                    },
                    track: {
                        background: '#fff',
                        strokeWidth: '60%',
                        margin: 0, // margin is in pixels
                        dropShadow: {
                            enabled: true,
                            top: -4,
                            left: 0,
                            blur: 4,
                            opacity: 0.45
                        }
                    },

                    dataLabels: {
                        show: true,
                        name: {
                            offsetY: -10,
                            show: true,
                            color: '#888',
                            fontSize: '17px'
                        },
                        value: {
                            formatter: function (val) {
                                return parseInt(val) + '%';
                            },
                            color: '#111',
                            fontSize: '26px',
                            show: true,
                        }
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    gradientToColors: ['#00ff2a'],
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100]
                }
            },
            stroke: {
                lineCap: 'round'
            },
            labels: ['Save Disk'],
        };
    
        result.percent = options; 
    }

    return result;
}

function downloadCompressedImage(link, filename) {
    fetch(link)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        })
        .catch(console.error);
}

function handleErrorFromCompressImage(err_code) {
    switch (err_code) {
        case 400:
        case 401:
        case 402:
        case 404:
            alert('Cannot compress image from the url, Please check the url.');
            break;
    
        case 403:
            alert('Forbidden file format. Just support JPG, PNG, GIF, TIF and BMP files.');
            break;
        
        case 502:
            alert('image provided too large, must be below 5MB.');
            break;
    
        default:
            alert('Cannot compress, please try again later.');
            break;
    }
}

export {
    clickButton,
    details,
    downloadCompressedImage,
    handleErrorFromCompressImage
};