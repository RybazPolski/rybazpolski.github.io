if(confirm("Czy chcesz włączyć autozaczepianie wszystkich użytkowników? Aby je później wyłączyć zamknij kartę lub odśwież stronę.")){
    var autoPokeAll = setInterval(function(){

        var zaczepki = document.getElementsByClassName("d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j keod5gw0 nxhoafnm aigsh9s9 fe6kdd0r mau55g9w c8b282yb d3f4x2em iv3no6db jq4qci2q a3bd9o3v lrazzd5p bwm1u5wc");
    
        for(var i=0; i<zaczepki.length; i++){
            if(document.getElementsByClassName("d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j keod5gw0 nxhoafnm aigsh9s9 fe6kdd0r mau55g9w c8b282yb d3f4x2em iv3no6db jq4qci2q a3bd9o3v lrazzd5p bwm1u5wc")[i].children[0].innerHTML == 'Odpowiedz na zaczepkę'){
                    document.getElementsByClassName("d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j keod5gw0 nxhoafnm aigsh9s9 fe6kdd0r mau55g9w c8b282yb d3f4x2em iv3no6db jq4qci2q a3bd9o3v lrazzd5p bwm1u5wc")[i].children[0].click();
            console.log("Klik!");
        }else{
            console.log("Klikn't");
        };
        }
    },1000)    
}