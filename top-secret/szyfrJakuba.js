var alfabetPolski = ["a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "ń", "o", "ó", "p", "r", "s", "ś", "t", "u", "w", "y", "z", "ź", "ż"]

var input
var n
var i
var szyfr
var deszyfr
function klik(){
    szyfr = ""
    deszyfr = ""
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
        
        
        if(n==0){
            deszyfr = deszyfr + "ż"
        }else{
            deszyfr = deszyfr + alfabetPolski[n-1]
        }
    }
    console.log("Szyfred: "+szyfr)
    console.log("Deszyfred: "+deszyfr)
    document.getElementById("szyfr").innerText = "Zaszyfrowane: " + szyfr
    document.getElementById("deszyfr").innerText = "Rozszyfrowane: " + deszyfr

}
