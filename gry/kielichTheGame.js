var lastSelected
const fillPatena = document.querySelector('.fillPatena');
const fillPalka = document.querySelector('.fillPalka');
const fillKielich = document.querySelector('.fillKielich');
const fillPuryfikaterz = document.querySelector('.fillPuryfikaterz');
const empties = document.querySelectorAll('.empty');

        // Fill listeners
        fillPatena.addEventListener('dragstart', dragStart);
        fillPatena.addEventListener('dragend', dragEnd);

        fillPalka.addEventListener('dragstart', dragStart);
        fillPalka.addEventListener('dragend', dragEnd);

        fillKielich.addEventListener('dragstart', dragStart);
        fillKielich.addEventListener('dragend', dragEnd);

        fillPuryfikaterz.addEventListener('dragstart', dragStart);
        fillPuryfikaterz.addEventListener('dragend', dragEnd);

        // Loop through empty boxes and add listeners
        for (const empty of empties) {
        empty.addEventListener('dragover', dragOver);
        empty.addEventListener('dragenter', dragEnter);
        empty.addEventListener('dragleave', dragLeave);
        empty.addEventListener('drop', dragDrop);
        }

        // Drag Functions

        function dragStart() {
        this.className += ' hold';

        switch(this.className){
            case "fillPatena hold":
                lastSelected = "fillPatena"
                break;
            case "fillPalka hold":
                lastSelected = "fillPalka"
                break;
            case "fillKielich hold":
                lastSelected = "fillKielich"
                break;
            case "fillPuryfikaterz hold":
                lastSelected = "fillPuryfikaterz"
                break;
        };

        setTimeout(() => (this.className = 'invisible'), 0);
        
        
    
        }

        function dragEnd() {
        this.className = lastSelected
        }

        function dragOver(e) {
        e.preventDefault();
        }

        function dragEnter(e) {
        e.preventDefault();
        this.className += ' hovered';
        }

        function dragLeave() {
        this.className = 'empty';
        }

        function dragDrop() {
        this.className = 'empty';
        switch(lastSelected){
            case "fillPatena":
                this.append(fillPatena);
                break;
            case "fillPalka":
                this.append(fillPalka);
                break;
            case "fillKielich":
                this.append(fillKielich);
                break;
            case "fillPuryfikaterz":
                this.append(fillPuryfikaterz);
                break;
        }
        }


switch(Math.floor(Math.random()*4)){
    case 0:
        var face = "oMarekSmyk";
        break;
    case 1:
        var face = "oWojciechLaniecki";
        break;
    case 2:
        var face = "oRyszardSum";
        break;
    case 3:
        var face = "oMarekSzrejna";
        break;
}


function win(){
    result = document.getElementById("result")
    document.body.style.pointerEvents = "none"
    result.style.display = "block"
    document.getElementById("blackbg").style.display = "block"
    result.style.pointerEvents == "all"
    result.innerHTML = "<img id='face' style='opacity: 100%;' src='"+face+".png'><div id='winlose' style='background-color:lightgreen;'>Udało Ci się!</div><div id='tryagain' style='background-color:green;'><a href='./kielichTheGame.html'>Spróbuj ponownie!</a>"
}

function lose(){
    result = document.getElementById("result")
    document.body.style.pointerEvents = "none"
    result.style.display = "block"
    document.getElementById("blackbg").style.display = "block"
    result.style.pointerEvents == "all"
    result.innerHTML = "<img id='face' style='opacity: 100%;' src='"+face+"Angry.png'><div id='winlose' style='background-color:red;'>Przegrana...</div><div id='tryagain' style='background-color:orange'><a href='./kielichTheGame.html'>Spróbuj ponownie!</a>"
}


function check(){

    patenaCorrect == document.querySelector("#patenaCorrect")
    palkaCorrect == document.querySelector("#palkaCorrect")
    puryfikaterzCorrect == document.querySelector("#puryfikaterzCorrect")
    kielichCorrect == document.querySelector("#kielichCorrect")
    
    if(
        patenaCorrect.innerHTML == '\n            <div class="fillPatena" draggable="true"> </div>'
        &&
        palkaCorrect.innerHTML == '\n                <div class="fillPalka" draggable="true"> </div>'
        &&
        puryfikaterzCorrect.innerHTML == '\n                <div class="fillPuryfikaterz" draggable="true"> </div>'
        &&
        kielichCorrect.innerHTML == '\n                <div class="fillKielich" draggable="true"> </div>'

    ){
        win()
    }else if(
        patenaCorrect.innerHTML == '\n            <div class="fillPatena" draggable="true"> </div>'
        &&
        palkaCorrect.innerHTML == '\n                <div class="fillPalka" draggable="true"> </div>'
        &&
        kielichCorrect.innerHTML == '\n                <div class="fillKielich" draggable="true"> </div><div class="fillPuryfikaterz" draggable="true"> </div>'
    ){
        win()
    }else{
        lose()
    }
}