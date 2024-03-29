<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minecraft player UUID</title>
</head>
<body>
    <input type="text" placeholder="Player's nickname..." id="name"><button onclick="getPlayerData()">Check!</button><br>
    <input type="radio" name="line" checked> Premium<br>
    <input type="radio" name="line" id="offline"> Non-premium<br>
    <input type="checkbox" id="uuid" onchange="placeholderChange()"> Enter UUID instead of player's nickname

    <div id="result"></div>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        function placeholderChange(){
            if(document.getElementById("uuid").checked){
                document.getElementById("name").setAttribute("placeholder","Player's UUID...");
            }else{
                document.getElementById("name").setAttribute("placeholder","Player's nickname...");
            }
        }

        function getPlayerData(){
            var playerData = {}
            if(document.getElementById("name").value!=null){
                if(document.getElementById("uuid").checked){
                    playerData.uuid=document.getElementById("name").value
                }else{
                    playerData.nickname=document.getElementById("name").value
                }
            }
            if(document.getElementById("offline").checked){
                playerData.offline = true;
            }

            $.ajax({
                url: "../mcUUID_to4int.php",
                type: "GET",
                data: playerData,
                success: function (data) {
                    let result = $.parseJSON(data)
                    
                    if(result.error){
                        document.getElementById("result").innerHTML = `<h3>${result.error}</h3>`
                    }else{
                        if(playerData.offline&&!playerData.uuid){
                            result.name = `<span style='font-weight:400'>OfflinePlayer:</span>${result.name.substring(14)}`
                        }
                        document.getElementById("result").innerHTML = `<h2>${result.name}<h2>`
                        document.getElementById("result").innerHTML += `<strong>UUID:</strong> ${result.uuid}<br>`
                        document.getElementById("result").innerHTML += `<strong>4int UUID:</strong> [${result.fourInt}]<br>`
                    }
                }
            })
        }
    </script>
</body>
</html>