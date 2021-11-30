import ReactDOM from 'react-dom';
import "./styleurl.css";
import "../main.css";
import {
    alertSweet,
    details,
    downloadCompressedImage,
    handleErrorFromCompressImage
} from '../_utilsMain';
import { clickButton } from './_utils.js';
import ApexCharts from 'apexcharts';

const compress = (e) => {

    const API_PATH = 'http://api.resmush.it/ws.php';

    e.preventDefault();    
    clickButton.start(e); //nonaktifkan button
    
    if (e.target[0].value.search('http') < 0) e.target.lastChild.style.display = 'block'; // jika user memaukan url yg tidak memilik value 'http'

    const quality = 90 //default 92
    
    let compressImage = new Promise(function (myResolve, myReject) {
        let req = new XMLHttpRequest();
        req.open('GET', `${API_PATH}?img=${e.target[0].value}&qlty=${quality}`);
        req.onload = function () {
            if (req.status === 200) {
                myResolve(JSON.parse(req.response));
            } else {
                myReject("Failed. Try again later");
            }
        };
        req.send();
    });
    compressImage.then(
        function (value) {
            let link = value.dest // dest = yg sudah di kompress
            
            if (!value.hasOwnProperty('error')) {
                
                const name = value.src.split('/')  
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
                            downloadCompressedImage(link, 'compressed_' + name[name.length - 1]);
                        }} >Download Image
                        </a>
                        <a href="/"
                            className="again"
                            onClick = {function (e) {
                            e.preventDefault();
                            ReactDOM.render(<UseUrl /> , document.getElementsByTagName('main')[0]);
                        }} >Do it again?
                        </a>
                    </>, document.querySelector('main')
                )
                
                const chart = new ApexCharts(document.querySelector("#percent"), detail.percent);
                chart.render(); //render chart untuk persenan hasil kompress

                clickButton.finish(e); // aktifkan lagi button

                return alertSweet('success', 'Success', 'Your file has been compressed!');
            } else {
                handleErrorFromCompressImage(value.error);
                clickButton.finish(e); // aktifkan lagi button
            }   
        },
        function (error) {
            clickButton.finish(e);
            return alertSweet('error', 'Error', `${error}, please try again later.`);
        }
    );
}

function UseUrl() {
    const button = document.querySelectorAll('.choice-item button')
    if (button.length !== 0) {
        button[1].classList.value = 'active'; // ketika diklik tambahkan class active
        button[0].classList.value = ''; // ketika diklik kosongkan class di upload file        
    }

    return (
       <form onSubmit={compress}>
            <div className="input-url">
                <input 
                    type="url" 
                    id="url"
                    placeholder="Enter Url Here"
                    required
                />
                <button type="submit" >Compress Now</button>
            </div>
            <span style={{display : 'none'}} className="error">*Please enter an URL</span>
        </form>
    )
}

export default UseUrl;