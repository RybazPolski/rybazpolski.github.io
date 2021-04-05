var alfabetPolski = ["a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "ń", "o", "ó", "p", "r", "s", "ś", "t", "u", "w", "y", "z", "ź", "ż"]

var input
var n
var i
var szyfr
var deszyfr
var result
function szyfruj(){
    szyfr = ""
    input = document.getElementById("input").value.toLowerCase()
    for(i = 0; i < input.length; i++){
        n = 0
        while(alfabetPolski[n] !== input[i]){
            n++
        }
        
        if(n==31){
            szyfr = szyfr + "a"
        }else{
            szyfr = szyfr + alfabetPolski[n+1]
        }
        
    }
    result = szyfr
    console.log("Szyfred: "+szyfr)
    document.getElementById("akcja").innerText = "Zaszyfrowane: "
    document.getElementById("result").value = szyfr
    document.getElementById("confirm").style.transitionDuration = "0s"
    document.getElementById("confirm").innerText = ""
    document.getElementById("confirm").style.opacity = 1
}


function deszyfruj(){
    deszyfr = ""
    input = document.getElementById("input").value.toLowerCase()
    for(i = 0; i < input.length; i++){
        n = 0
        while(alfabetPolski[n] !== input[i]){
            n++
        }
        
        if(n==0){
            deszyfr = deszyfr + "ż"
        }else{
            deszyfr = deszyfr + alfabetPolski[n-1]
        }
    }
    result = deszyfr
    console.log("Deszyfred: "+deszyfr)
    document.getElementById("akcja").innerText = "Rozszyfrowane: "
    document.getElementById("result").value = deszyfr
    document.getElementById("confirm").style.transitionDuration = "0s"
    document.getElementById("confirm").innerText = ""
    document.getElementById("confirm").style.opacity = 1
}

function kopiuj() {
    var copyText = document.getElementById("result");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    if(copyText.value!==""){
        document.getElementById("confirm").style.transitionDuration = "2s"
        document.getElementById("confirm").innerHTML = " &#10004 Skopiowano"
        document.getElementById("confirm").style.opacity = 0
    }
  }