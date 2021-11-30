<?php
function generateRandomString($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

/* Get the name of the uploaded file */
$filename = $_FILES['file']['name'];
$uniqFilename = generateRandomString() . '-' . $filename;

/* Choose where to save the uploaded file */
$location = "upload/" . $uniqFilename;

/* Save the uploaded file to the local filesystem */
if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {

    $file = $location;
    $mime = mime_content_type($file);
    $info = pathinfo($file);
    $name = $info['basename'];
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
} else {
    echo 'Failure';
}