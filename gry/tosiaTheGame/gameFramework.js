var gf = {};

gf.imagesToPreload = [];

gf.addImage = function(url){
	if($.inArray(url, gf.imagesToPreload) < 0){
		gf.imagesToPreload.push();
	}
	gf.imagesToPreload.push(url);
}

gf.startPreloading = function(endCallback, progressCallBack){
	var images = [];
	var total = gf.imagesToPreload.length;
	for(var i=0; i<total; i++){
		var image = new Image();
		images.push(image);
		image.src = this.imagesToPreload[i];
	}
	var preloadingPoller = setInterval(function(){
		var counter = 0;
		var total = gf.imagesToPreload.length;
		for(var i=0;i<total;i++){
			if(images[i].complete){
				counter++
			}
			if(counter>=total){
				if(progressCallBack){
					progressCallBack((counter/total)*100);
				}
				clearInterval(preloadingPoller);
				endCallback();
			} else {
				if(progressCallBack){
					progressCallBack((counter/total)*100);
				}
			}
		}
	}, 100);
}




gf.setFrame = function(divId, anim) {
    $("#"+divId)
        .css("backgroundPosition",""+anim.curFrame*anim.width+"px 0px");
}

gf.animation = function(options){
    var defVals = {
        url: false,
        width: 64,
        numOfFrames: 1,
        curFrame: 0,
        rate: 30
    };
    $.extend(this, defVals, options);
	if(this.url){
		gf.addImage(this.url);
	}

}

gf.animHandles = []

gf.setAnim = function(divId, anim, loop){
    if(gf.animHandles[divId]){
        clearInterval(gf.animHandles[divId]);
    }
    if(anim.url){
        $('#'+divId).css("background-image", "url('"+anim.url+"')");
    }
    if(anim.numOfFrames){
        gf.animHandles[divId] = setInterval(function(){
            anim.curFrame++; 
            if(!loop&&anim.curFrame==anim.numOfFrames){
                clearInterval(gf.animHandles[divId]);
                gf.animHandles[divId] = false;
            } else {
                anim.curFrame %= anim.numOfFrames;
                gf.setFrame(divId, anim)
            }
        }, anim.rate)
    }
}

gf.addSprite = function(parentId, divId, options) {
    var options = $.extend({
        x: 0,
        y: 0,
        width: 64,
        height: 64
    }, options);
    $("#"+parentId).append("<div id='"+divId+"' style='position: absolute; left:"+options.x+"px; top:"+options.y+"px; width:"+options.width+"px; height:"+options.height+"px'></div>")
}

gf.x = function(divId, pos){
    if(pos){
        $("#" + divId).css("left", pos+"px");
    }else{
        return parseInt($("#"+divId).css("left"));
    }
}

gf.y = function(divId, pos){
    if(pos){
        $("#" + divId).css("top", pos+"px");
    }else{
        return parseInt($("#"+divId).css("top"));
    }
}
