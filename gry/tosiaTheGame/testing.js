    // $('#myGame').css("position","relative").append("<div id='sprite1'></div>");
    // var sprite1 = $('#sprite1');
    // sprite1.css("width", "64px");
    // sprite1.css("position", "absolute");
    // sprite1.css("height", "64px");

    gf.addSprite("myGame", "sprite1");
    gf.addSprite("myGame", "sprite2");

    var firstAnim = new gf.animation({
        url: "./julianLeftRight.png",
        numOfFrames: 4,
        rate: 120
    })

    var secAnim = new gf.animation({
        url: "./stickmanShield.png",
        numOfFrames: 4,
        rate: 240
    })

    gf.setAnim("sprite1",firstAnim, true);
    gf.setAnim("sprite2",secAnim);
    gf.x("sprite2",64)

    var test = function(){
        console.log("Hello World!");
    }
    var precent = function(prec){
        console.log(prec + "% loaded");
    }
    gf.startPreloading(test, precent)
    

    var secondTitle = false 
    setInterval(function(){  
        if(secondTitle){
        document.querySelector('title').innerText = "Tworzymy pierwszą grę"
            secondTitle = false		  
    }else{
        document.querySelector('title').innerText = "Rozdział 2"
            secondTitle = true		  
        }
    }, 4500)