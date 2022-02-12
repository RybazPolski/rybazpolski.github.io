var alfabetPolski = ["a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "ń", "o", "ó", "p", "r", "s", "ś", "t", "u", "w", "y", "z", "ź", "ż"]

var input
var n
var i
var szyfr
var deszyfr
var result
var klucz = 1
function szyfruj(){
    szyfr = ""
    input = document.getElementById("input").value
    for(i = 0; i < input.length; i++){
        n = 0
        while(alfabetPolski[n] !== input[i].toLowerCase()&&n<32){
            n++
        }
        
        if(n==32){
            szyfr = szyfr + input[i]
        }else{
            if(alfabetPolski[n+klucz]==undefined){
                if(input[i]==input[i].toUpperCase()){
                    szyfr = szyfr + alfabetPolski[n+klucz-32].toUpperCase()
                }else{
                    szyfr = szyfr + alfabetPolski[n+klucz-32]
                }
            }else{
                if(input[i]==input[i].toUpperCase()){
                    szyfr = szyfr + alfabetPolski[n+klucz].toUpperCase()
                }else{
                    szyfr = szyfr + alfabetPolski[n+klucz]
                }
                
            }
        }
        
    }
    result = szyfr
    // console.log("Szyfred: "+szyfr)
    document.getElementById("akcja").innerText = "Zaszyfrowane: "
    document.getElementById("result").value = szyfr
    document.getElementById("confirm").style.transitionDuration = "0s"
    document.getElementById("confirm").innerText = ""
    document.getElementById("confirm").style.opacity = 1
}


function deszyfruj(){
    deszyfr = ""
    input = document.getElementById("input").value
    for(i = 0; i < input.length; i++){
        n = 0
        while(alfabetPolski[n] !== input[i].toLowerCase()&&n<32){
            n++
        }
        

        if(n==32){
            deszyfr = deszyfr + input[i]
        }else{
            if(alfabetPolski[n-klucz]==undefined){
                if(input[i]==input[i].toUpperCase()){
                    deszyfr = deszyfr + alfabetPolski[32-Math.abs(n-klucz)].toUpperCase()
                }else{
                    deszyfr = deszyfr + alfabetPolski[32-Math.abs(n-klucz)]
                }
            }else{
                if(input[i]==input[i].toUpperCase()){
                    deszyfr = deszyfr + alfabetPolski[n-klucz].toUpperCase()
                }else{
                    deszyfr = deszyfr + alfabetPolski[n-klucz]
                }
            }
        }
    }
    result = deszyfr
    // console.log("Deszyfred: "+deszyfr)
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
function reset(){
    input = null
    n = null
    i = null
    szyfr = null
    deszyfr = null
    result = null
    document.getElementById("input").value = null
    document.getElementById("result").value = null
}
function advanced(){
    
    if(document.getElementById("advanced").style.display == "none"){
        document.getElementById("advanced").style.display = "inline"
        document.getElementById("advancedButton").innerHTML = '&#9650;'
        document.getElementById("advancedButton").style.backgroundColor="white"
    }else{
        document.getElementById("advanced").style.display = "none"
        document.getElementById("advancedButton").innerHTML = '&#9660;'
        document.getElementById("advancedButton").style.backgroundColor="lightgray"

    }
}
function confirmKey(){
    klucz = parseInt(document.getElementById("klucz").value)%32
    // console.log("Nowy klucz: "+ klucz)
}

function changeKey(step){
    document.getElementById("klucz").value = parseInt(document.getElementById("klucz").value)+step
    confirmKey()
}

