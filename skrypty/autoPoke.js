function autoPoke(clickId){
	console.log(
		setInterval(function(){

			if(document.getElementById(clickId).innerHTML == 'Odpowiedz na zaczepkę'){
					document.getElementById(clickId).click();
				console.log("Klik!");
			}else{
				console.log("Klikn't");
			};
		},1000)
	)
}