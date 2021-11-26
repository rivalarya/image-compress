import ReactDOM from 'react-dom';

function UseFile() {    
    document.querySelectorAll('.choice-item button')[0].classList.value = 'active'; // ketika diklik tambahkan class active
    document.querySelectorAll('.choice-item button')[1].classList.value = ''; // ketika diklik kosongkan class di url
    
    return ReactDOM.render(
        <p>ini file</p>,
        document.getElementsByTagName('main')[0]
    )
}

export default UseFile;
