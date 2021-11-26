import ReactDOM from 'react-dom';

function UseUrl() {
    document.querySelectorAll('.choice-item button')[1].classList.value = 'active'; // ketika diklik tambahkan class active
    document.querySelectorAll('.choice-item button')[0].classList.value = ''; // ketika diklik kosongkan class di upload file

    return ReactDOM.render(
        <p>ini url</p>,
        document.getElementsByTagName('main')[0]
    )
}

export default UseUrl;
