<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wyszukiwarka anagramów</title>
    <style>

        body{
            background-image: url(./bg.webp);
            background-size: cover;
            margin: 0;
        }
        .bg{
            background-color: bisque;
            width: 70vw;
            margin: 5vh 10vw;
            min-height: 70vh;
            height: max-content;
            padding: 5vh 5vw;
            border-radius: 5vw;
        }
        .left, .right{
            display: inline-block;
            vertical-align: top;
        }
        .left{
            width: auto;
            padding: 1vw;
            background-color:rgb(225, 185, 123);
            border-radius: 1vw;
        }
        .right{
            width: 40vw;
            border-radius: 1vw;
            margin: 0 3vw;
            margin-right: 0;
            background-color: rgb(255, 250, 240);
            <?php
                if(isset($_GET['key'])&&!empty($_GET['key'])){echo 'padding: 1.5vh 3vw';}else{echo "padding: 0vh 3vw";}
            ?>
        }
        @media (max-width: 1429px) {
            .right{
                margin-top: 5vh;
            }
        }

    </style>
</head>
<body>

    <script>
        function checkCheckbox(id){
            document.getElementById(id).checked = document.getElementById(id).checked?false:true; 
        }
    </script>

    <div class="bg">
    <div class="left">
        <form action="./index.php" method="get">
            <input type="text" name="key" placeholder="Słowo do sprawdzenia" 
            <?php
            if(isset($_GET['key'])&&!empty($_GET['key'])){echo 'value="'.$_GET['key'].'"';}
            ?>
            ><br>
            <input type="submit" value="Znajdź anagramy"> 
            <label style="user-select: none" onclick="checkCheckbox('notfull')">Anagramy niepełne</label><input type="checkbox" name="notfull" id="notfull" value="1" <?php
            if(isset($_GET['notfull'])){echo "checked";}
            ?>><br>
        </form><br><span><a style="color: gray; font-style: italic;" href="https://sjp.pl/slownik/lp.phtml">/*Lista słów pochodzi ze strony sjp.pl*/</a></span><br>
    </div>
    <div class="right"><?php

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
        
        $key=htmlentities($_GET['key'], ENT_QUOTES);
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
        mysqli_set_charset($conn,'utf8');
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
            
            ?></div>    
    </div>
</body>
</html>