<?php
    $val = htmlentities($_POST['val'], ENT_QUOTES);
    $conn = new mysqli('localhost','root','','ideas');
    if($conn->query("INSERT INTO `ideas`(`idea`) VALUES ('".$val."')")){
        echo json_encode(true);
    }else{
        echo json_encode(false);
    }
    $conn->close();    
    exit;