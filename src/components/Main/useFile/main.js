import ReactDOM from 'react-dom';
import './stylefile.css';
import '../main.css';
import {
    API_PATH,
    alertSweet,
    details,
    downloadCompressedImage,
    handleErrorFromCompressImage
} from '../_utilsMain';
import { effect } from './_utils';
import ApexCharts from 'apexcharts';
import firebase from 'firebase/compat';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyCK8W_DNQ5Rm-MT2tliGV-L1eNSFJZiFM4",
    authDomain: "image-compress-cf696.firebaseapp.com",
    projectId: "image-compress-cf696",
    storageBucket: "image-compress-cf696.appspot.com",
    messagingSenderId: "77489611140",
    appId: "1:77489611140:web:2030463a625d3fd2f07dd1",
    measurementId: "G-0CLW7GT0Z4"
};

firebase.initializeApp(firebaseConfig);

function compress(e) {

    e.preventDefault();
    effect.start();//ubah tampilan jadi processing...

   // File or Blob 
    var file = e.target.files[0];
    
    var storageRef = firebase.storage().ref();

    // Create the file metadata
    var metadata = {
        contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
            case firebase.storage.TaskState.RUNNING: // or 'running'
                effect.start(progress);
                console.log('Upload is running');
                break;
            default:
                console.log('default');
                break;
        }
    }, function(error) {

        switch (error.code) {
        case 'storage/unauthorized':
        // User doesn't have permission to access the object
            alertSweet('error', 'Failed', 'doesn\'t have permission to access.');
            break;

        case 'storage/canceled':
        // User canceled the upload
            console.log('canceled the upload');
            break;

        case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
            alertSweet('error', 'Failed', 'Unknown error occurred. Please try again later.');
            break;
        default:
            break;
    }
    }, function() {
    // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            
            storageRef.child('images/' + file.name).getMetadata().then(data => {
                
                const namaFile = data.name;

                async function uploadFile(e) {
                    
                    await fetch(`${API_PATH}?url=${downloadURL}&nama=${namaFile}`).then((response) => response.json())
                        .then(function (value) {
    
                        let link = value.dest; // dest = yg sudah di kompress
    
                        if (!value.hasOwnProperty('error')) {
    
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
                                        downloadCompressedImage(link, 'compressed_' + namaFile);
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
    
                            return alertSweet('success', 'Success', 'Your image has been compressed!');
    
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
            })               

            // console.log('File available at', downloadURL);
                
            })
    });
    
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
