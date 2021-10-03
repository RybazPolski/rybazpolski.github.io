var player = 1
var symbol = "kolko.png"

function endGame(){

    function disable(element) {
        element.style.pointerEvents="none";
    }
    
    document.querySelectorAll("td").forEach(disable);
    if(player=1){
        player=2
    }else{
        player=1
    }
}

function vertCheck(x){

    var a = document.getElementById(x+",1").innerHTML
    var b = document.getElementById(x+",2").innerHTML
    var c = document.getElementById(x+",3").innerHTML


    if(a==b&&a==c&&a!=""){
        document.getElementById(x+",1").style.backgroundColor="red"
        document.getElementById(x+",2").style.backgroundColor="red"
        document.getElementById(x+",3").style.backgroundColor="red"
        endGame()
    }


}

function horCheck(y){
    
    var a = document.getElementById("1,"+y).innerHTML
    var b = document.getElementById("2,"+y).innerHTML
    var c = document.getElementById("3,"+y).innerHTML

    if(a==b&&a==c&&a!=""){
        document.getElementById("1,"+y).style.backgroundColor="red"
        document.getElementById("2,"+y).style.backgroundColor="red"
        document.getElementById("3,"+y).style.backgroundColor="red"
        endGame()
    }
}

function diagCheck(){
    if(
        document.getElementById("1,1").innerHTML==document.getElementById("2,2").innerHTML
        &&
        document.getElementById("2,2").innerHTML==document.getElementById("3,3").innerHTML
        &&
        document.getElementById("2,2").innerHTML!=""
    ){
        document.getElementById("1,1").style.backgroundColor="red"
        document.getElementById("2,2").style.backgroundColor="red"
        document.getElementById("3,3").style.backgroundColor="red"
        endGame()
    }


    if(
        document.getElementById("1,3").innerHTML==document.getElementById("2,2").innerHTML
        &&
        document.getElementById("2,2").innerHTML==document.getElementById("3,1").innerHTML
        &&
        document.getElementById("2,2").innerHTML!=""
    ){
        document.getElementById("1,3").style.backgroundColor="red"
        document.getElementById("2,2").style.backgroundColor="red"
        document.getElementById("3,1").style.backgroundColor="red"
        endGame()
    }
}

function tdClick(xy){
    if(document.getElementById(xy)){
                
        document.getElementById(xy).innerHTML="<img src='"+symbol+"'>"
        document.getElementById(xy).style.pointerEvents = "none"


        
    
            vertCheck(1)
            vertCheck(2)
            vertCheck(3)

            horCheck(1)
            horCheck(2)
            horCheck(3)

            diagCheck()
        
            switch(player){
                case 1:
                    symbol = 'krzyzyk.png'
                    player = 2
                    document.body.style.backgroundColor = "lightgreen"
                    document.getElementById("table").style.border = "5px solid lightgreen"
                break;
            
                case 2:
                    symbol = 'kolko.png'
                    player = 1
                    document.body.style.backgroundColor = "lightskyblue"
                    document.getElementById("table").style.border = "5px solid lightskyblue"
                break;
            
                default:
                    symbol = 'kolko.png'
                    player = 1
                break;
            }
    }
}