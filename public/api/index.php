<?php
// allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

/* Get the url from query in url */
if(empty($_REQUEST['token'])){
    //jika di url tidak ada query 'token'(berarti yg mengakses lewat url), gunakan query url saja
    $url = $_REQUEST['url'];
}else{
    //jika ada query 'token', gunakan yg dibawah ini
    $url = $_REQUEST['url'] . '&token=' . $_REQUEST['token']; // get url(token terpisah karna karakter &)
}

$file = str_replace("images/", "images%2F", $url); //menggunakan string method str_replace() karena jika url yg diakses adalah 'http://blabla/images/blabla', akan terjadi error. maka saya ganti karakter '/' menjadi '%2F'

$mime = '';
$info = '';
$name = $_REQUEST['nama'];/* Get the name from query in url */

$output = new CURLFile(
    $file,
    $mime,
    $name
);
$data = array(
    "files" => $output,
);

$ch = curl_init();
curl_setopt(
    $ch,
    CURLOPT_URL,
    'http://api.resmush.it/?qlty=90'
);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
$result = curl_exec($ch);
if (curl_errno($ch)) {
    $result = curl_error($ch);
}
curl_close($ch);

echo $result;