import ReactDOM from 'react-dom';
import './stylefile.css';
import '../main.css';
import {
    alertSweet,
    details,
    downloadCompressedImage,
    handleErrorFromCompressImage
} from '../_utilsMain';
import { effect } from './_utils';
import ApexCharts from 'apexcharts';

const API_PATH = 'http://localhost/image-compresser/public/api/index.php';

function compress(e) {

    e.preventDefault();
    effect.start();//ubah tampilan jadi processing...

    async function uploadFile(e) {

        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        await fetch(API_PATH, {
            method: "POST",
            body: formData
        }).then((response) => response.json())
            .then(function (value) {
            
            let link = value.dest; // dest = yg sudah di kompress
            
            if (!value.hasOwnProperty('error')) {
                
                const name = e.target.files[0].name;
                const detail = details(value.src_size, value.dest_size, value.percent);

                ReactDOM.render(
                    <>
                        <div className="details">
                            <article className="detail-compress">
                                <h5>Before Compress</h5>
                                <p className="before-compress">{ detail.beforeCompress }</p>
                            </article>
                            <article className="detail-compress">
                                <div id="percent"></div>
                            </article>
                            <article className="detail-compress">
                                <h5>After Compress</h5>
                                <p className="after-compress">{ detail.afterCompress }</p>
                            </article>
                        </div>
                        <a href={link} className="download" onClick={function (e) {
                            e.preventDefault();
                            downloadCompressedImage(link, 'compressed_' + name);
                        }} >Download Image
                        </a>
                        <a href="/"
                            className="again"
                            onClick = {function (e) {
                            e.preventDefault();
                            ReactDOM.render(<UseFile /> , document.getElementsByTagName('main')[0]);
                        }} >Do it again?
                        </a>
                    </>, document.querySelector('main')
                )
                
                const chart = new ApexCharts(document.querySelector("#percent"), detail.percent);
                chart.render(); //render chart untuk persenan hasil kompress

                return alertSweet('success', 'Success', 'Your file has been compressed!');

            } else {
                handleErrorFromCompressImage(value.error);
                effect.finish(); //kembalikan seperti semula
            }   
        },
        function (error) {
            effect.finish(); //kembalikan seperti semula
            return alertSweet('error', 'Error', `${error}, please try again later.`);
        })
            .catch(err => console.log(err))
    }

    uploadFile(e);
}

function UseFile() {
    
    document.querySelectorAll('.choice-item button')[0].classList.value = 'active'; // ketika diklik tambahkan class active
    document.querySelectorAll('.choice-item button')[1].classList.value = ''; // ketika diklik kosongkan class di url
    
    return (
        <form onChange = {
            compress
        }
        onDragEnter = {
            effect.dragEnter
        }
        onDragLeave = {
            effect.onDragLeave
        } 
        onDrop = {
            effect.start
        } >
            <div className="input-file">
                <div className='choice-file'>
                    <span className="lds-dual-ring" style={{ display: 'none', margin: 'auto' }}></span>
                    <p> Click on this area for choose <span> or drag and drop </span>your image <span>here</span></p>
                </div>
                <input 
                    type="file" 
                    name="file"
                    required
                />
            </div>
        </form>
    )
}

export default UseFile;
