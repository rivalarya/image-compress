import Swal from 'sweetalert2';

function alertSweet(icon, title, text, footer) {
    Swal.fire({
        icon,
        title,
        text,
        footer,
        timer: 3500
    })
}

function kembalikanBerupaByte(size) {

    let b, c, lengthFileSize;
    lengthFileSize = size.toString().split('');
    if (lengthFileSize.length > 6) { // untuk MegaByte
        b = size.toString().split('');
        b.splice(b.length - 6, 6);
        c = b.join('');
        return c + ' MB';
    } else if (lengthFileSize.length > 3) { // untuk KiloByte
        b = size.toString().split('');
        b.splice(b.length - 3, 3);
        c = b.join('');
        return c + ' KB';
    } else { // untuk Byte
        b = size.toString();
        return b + ' Byte';
    }
}

function details(sizeBefore, sizeAfter, percentCompress) {

    let result = {};

    result.beforeCompress = kembalikanBerupaByte(sizeBefore);
    result.afterCompress = kembalikanBerupaByte(sizeAfter);

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
        .catch(e => alertSweet('error', 'Failed', e));
}

function handleErrorFromCompressImage(err_code) {
    switch (err_code) {
        case 400:
        case 401:
        case 402:
        case 404:
            alertSweet('error', 'Failed', 'Cannot compress image from the url, Please check the url.');
            break;

        case 403:
            alertSweet('error', 'Failed', 'Forbidden file format. Just support JPG, PNG, GIF, TIF and BMP files.');
            break;

        case 502:
            alertSweet('error', 'Failed', 'image provided too large, must be below 5MB.');
            break;

        default:
            alertSweet('error', 'Failed', 'Cannot compress, please try again later.');
            break;
    }
}

export {
    alertSweet,
    details,
    downloadCompressedImage,
    handleErrorFromCompressImage
};