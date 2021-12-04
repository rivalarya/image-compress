<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

define('WEBSERVICE', 'http://api.resmush.it/ws.php?img=');
$s = $_REQUEST['url'];
$o = WEBSERVICE . $s;

$curlSession = curl_init();
curl_setopt($curlSession, CURLOPT_URL, $o);
curl_setopt($curlSession, CURLOPT_BINARYTRANSFER, true);
curl_setopt($curlSession, CURLOPT_RETURNTRANSFER, true);

$jsonData = json_decode(curl_exec($curlSession));
curl_close($curlSession);

echo json_encode($jsonData);