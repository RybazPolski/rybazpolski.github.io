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
        <input type="text" name="key" placeholder="Słowo do sprawdzenia"><br>
        <input type="submit" value="Znajdź anagramy">
    </form><br>
    <?php
        if(isset($_GET['key'])&&!empty($_GET['key'])){

            $key=$_GET['key'];
            echo "<h3>Anagramy dla $key:</h3><ul>";
            
            $length = strlen($key);
            
            $pattern = str_split(strtolower($key));
            sort($pattern);
            $pattern=implode("",$pattern);

            $q = "SELECT `odmiana` FROM `odmiany` WHERE LENGTH(`odmiana`)=$length UNION (SELECT `baza` FROM `bazy` WHERE LENGTH(`baza`)=$length)";

            $conn = mysqli_connect("localhost","root","","sjp");
            $res = mysqli_query($conn,$q);
            $found = false;
            while($rec=mysqli_fetch_row($res)){
                $splitted = str_split(strtolower($rec[0]));
                sort($splitted);
                $sorted = implode("",$splitted);
                if($sorted==$pattern&&strtolower($rec[0])!=strtolower($key)){
                    echo "<li>".$rec[0]."</li>";
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