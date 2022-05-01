<?php
    $val = htmlentities($_POST['val'], ENT_QUOTES);
    $conn = new mysqli('localhost','root','','ideas');
    $conn->set_charset('utf8');
    if($conn->query("INSERT INTO `ideas`(`idea`) VALUES ('".$val."')")){
        echo json_encode(true);
    }else{
        echo json_encode(false);
    }
    $conn->close();    
    exit;