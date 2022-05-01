<?php
    $val = htmlentities($_POST['val'], ENT_QUOTES);
    $conn = new mysqli('localhost','root','','ideas');
    $conn->set_charset('utf8');
    $res = $conn->query("SELECT * FROM `ideas` WHERE `id`='$val'");
    if($res->num_rows==1){
        $conn->query('UPDATE `ideas` SET `state`="shown" WHERE `id`="'.$val.'"');
        echo json_encode(true);
        $conn->close();
        exit;
    }
    echo json_encode(false);
    $conn->close();
    exit;