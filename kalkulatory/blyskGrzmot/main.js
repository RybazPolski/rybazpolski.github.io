var countdown, sec=0, milisec=0 
function blysk() {
    clearInterval(countdown)
    sec=0
    milisec=0
    countdown = setInterval(function(){
        milisec++
        if(milisec>=10){
            sec++
            milisec=0
        }
        document.getElementById("timer").innerHTML = sec+"."+milisec+"s"
    },100)
}
function grzmot(){
    clearInterval(countdown)
    let time = sec + (milisec*0.1)
    let distance = Math.round((340.3*time)/10)/100
    document.getElementById("timer").innerHTML = `Piorun uderzył około ${distance}km stąd.` 
}