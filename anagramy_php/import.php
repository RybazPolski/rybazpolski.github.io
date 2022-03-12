<?php

$plik = fopen("odm.txt","r");
$i=0;

$conn = mysqli_connect("localhost","root","","sjp");

while($line = fgets($plik)){
    $arr = explode(", ",$line);
    
    if(sizeof($arr)>1){
        $q = "INSERT INTO `odmiany`(`baza`,`odmiana`) VALUES ";
        for($i=1; $i<sizeof($arr)-1; $i++){
            $q = $q."('".$arr[0]."','".$arr[$i]."'), ";
        }
        $q = $q."('".$arr[0]."','".$arr[sizeof($arr)-1]."')";
        mysqli_query($conn,$q);
    }
    

    $q = "INSERT INTO `bazy`(`baza`) VALUES ('".$arr[0]."')";
    mysqli_query($conn,$q);
    
}
fclose($plik);
?>

