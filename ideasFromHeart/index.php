<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pomysły od serca</title>
    <link rel="icon" href="./heart.png">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        body{
            margin: 0;
            padding: 0;
        }
        #heart{
            width: 90vmin;
            height: 80vmin;
            margin-left: calc(50% - 45vmin);
            margin-top: 5vmin;
            background-image: url(./heart.png);
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
        }
        .frame{
            display: flex;
            position: relative;
            /* border: 1px solid black; */
            flex-flow: wrap;
            width: 30vmin;
            height: 20vmin;
            background-color: rgba(0, 0, 0, 0);
            align-content: flex-end;
            justify-content: center;
            /* padding: 5px; */
            /* background-color: red; */
        }
        #f1{
            left: 9vmin;
            top: -2vmin;
        }
        #f2{
            left: 52vmin;
            top: -22vmin;
        }
        #f3{
            left: 0vmin;
            top: -22vmin;
            align-content: center;
        }
        #f4{
            left: 30vmin;
            top: -42vmin;
            align-content: center;
        }
        #f5{
            left: 60vmin;
            top: -62vmin;
            align-content: center;
        }
        #f6{
            left: 15vmin;
            top: -62vmin;
            align-content: center;
        }
        #f7{
            left: 45vmin;
            top: -82vmin;
            align-content: center;
        }
        #f8{
            left: 30vmin;
            top: -82vmin;
            align-content: flex-start;
        }
        .el{
            display: flex;
            flex: 1 0 auto;
            border: 2px solid #aaaaaa;
            justify-content: center;
            vertical-align: middle;
            margin: 10px;
            height: 5vmin;
            -webkit-user-select: none; /* Safari */        
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* IE10+/Edge */
            user-select: none; /* Standard */
            overflow-wrap: normal;
        }
        .shown{
            background-color: rgb(255, 150, 150);
            color: black;
        }
        .hidden{
            background-color: #cccccc;
            color: #cccccc;
        }
        .add{
            background-image: url(./plus.png);
            height: 10vmin;
            width: 10vmin;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            position: absolute;
            z-index: 100;
            display: inline;
            left: calc(50% + 25vmin);
            top: 85vmin;
        }
        </style>
</head>
<body>
    <span id="hidden" style="display: none;">
        
        <?php
        $conn = new mysqli('localhost','root','','ideas');
        $conn->set_charset('utf8');
        $res = $conn->query("SELECT * FROM `ideas` ORDER BY RAND()");
        while($obj = $res->fetch_object()){
            echo "<div class='el ".$obj->state."' id='".$obj->id."' onclick='reval(this)'>".$obj->idea."</div>";
        }
        ?>
    </span>
    <h1 style="text-align: center; font-size: 7.5vmin">&#10024;NASZE POMYSŁY&#10024;</h1>
    <div id="heart">
        <div class="frame" id="f1"></div>
        <div class="frame" id="f2"></div>
        <div class="frame" id="f3"></div>
        <div class="frame" id="f4"></div>
        <div class="frame" id="f5"></div>
        <div class="frame" id="f6"></div>
        <div class="frame" id="f7"></div>
        <div class="frame" id="f8"></div>
    </div>
    <div class="add" onclick="add()"></div>
    <script>
        var elements = document.getElementById("hidden").children
        var x = elements.length
        for(var i=0; i<x; i++){
            document.getElementById(`f${(i%8)+1}`).appendChild(elements[0])
        }
        
        var reval = (e)=>{
            if(e.classList.contains("hidden")){
                if(confirm("Czy na pewno chcesz odkryć to pole?")){
                    $.ajax({
                        url: "./reval.php",
                        type: "POST",
                        data: {val: e.id},
                        success: function (data){
                            let result = $.parseJSON(data)
                            console.log(result)
                            if(result){
                                e.classList.remove("hidden")
                                e.classList.add("shown")
                            }
                        }
                    })
                }
            }
        }

        var add = ()=>{

            let idea = prompt("Podaj swój pomysł:")
            if(idea==null){
                return;
            }
            while(!confirm("Twój pomysł: "+idea+". Czy chcesz kontynuować?")){
                idea = prompt("Podaj swój pomysł:",idea)
                if(idea==null){
                    return;
                }
            }

            if(idea!=null&&idea.length>0){
                $.ajax({
                    url: "./add.php",
                    type: "POST",
                    data: {val: idea},
                    success: function (data){
                        let result = $.parseJSON(data)
                        console.log(result)
                        if(result){
                            alert("Dodano!")
                            let refresh = document.createElement("a")
                            refresh.setAttribute("href","./")
                            document.body.append(refresh)
                            refresh.click()
                        }else{
                            alert("Coś poszło nie tak...")
                        }
                    }
                })
            }
        }
        
        
        
        
        </script>

</body>
</html>