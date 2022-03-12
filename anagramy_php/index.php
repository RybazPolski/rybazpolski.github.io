<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wyszukiwarka anagramów</title>
</head>
<body>
    <form action="./index.php" method="get">
        <input type="text" name="key" placeholder="Słowo do sprawdzenia" 
        <?php
            if(isset($_GET['key'])&&!empty($_GET['key'])){echo 'value="'.$_GET['key'].'"';}
        ?>
        ><br>
        <input type="submit" value="Znajdź anagramy"> <label>Anagramy niepełne</label><input type="checkbox" name="notfull" value="1" <?php
        if(isset($_GET['notfull'])){echo "checked";}
        ?>>
    </form><br>
    <?php

        function consistsOf($stuff,$construction){
            $arr1 = $stuff;
            $arr2 = $construction;
            foreach ($arr2 as $el) {
                if($target = array_search($el,$arr1)){
                    unset($arr1[$target]);
                }else{
                    return false;
                }
            }
            return true;
        }

        if(isset($_GET['key'])&&!empty($_GET['key'])){
            
            $key=$_GET['key'];
            echo "<h3>Anagramy dla $key:</h3><ul>";
            
            $length = strlen($key);
            
            $pattern = str_split(strtolower($key));
            sort($pattern);
            $pattern=implode("",$pattern);

            $q = "SELECT `odmiana` FROM `odmiany` WHERE LENGTH(`odmiana`)=$length UNION (SELECT `baza` FROM `bazy` WHERE LENGTH(`baza`)=$length)";

            if(isset($_GET['notfull'])){
                $q = "SELECT `odmiana` FROM `odmiany` WHERE LENGTH(`odmiana`)<=$length UNION (SELECT `baza` FROM `bazy` WHERE LENGTH(`baza`)<=$length) ORDER BY LENGTH(`odmiana`) DESC, `odmiana` ASC";
            }

            $conn = mysqli_connect("localhost","root","","sjp");
            $res = mysqli_query($conn,$q);
            $found = false;
            while($rec=mysqli_fetch_row($res)){
                $splitted = str_split(strtolower($rec[0]));
                sort($splitted);
                $sorted = implode("",$splitted);
                if(($sorted==$pattern&&strtolower($rec[0])!=strtolower($key))||(consistsOf(str_split(strtolower($key)),str_split(strtolower($rec[0])))&&isset($_GET['notfull']))){
                    if(strlen($rec[0])==$length){
                        echo "<li><span style='text-decoration:underline;'>".$rec[0]."</span><sub style='color:gray;'> ".strlen($rec[0])."</sub></li>";
                    }else{
                        echo "<li>".$rec[0]."<sub style='color:gray;'> ".strlen($rec[0])."</sub></li>";
                    }
                    $found=true;
                }
            }
            echo "</ul>";
            if(!$found){
                echo "Nie znaleziono.";
            }
            
        }
    
    ?>
</body>
</html>