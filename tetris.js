var tetris = {};
var gravity;

//کشیدن پیکسل های جدول اصلی بازی
tetris.drawPlayField = function(){
	for(var row=0;row<20;row++){
		$('#playfield').append('<tr class="'+row+'"></tr>');
		for (var col=0;col<10;col++){
			$('tr.'+row).append('<td id="'+col+'"></td>');
		}
	}
}
//کشیدن پیکسل های جدول نگه داری
tetris.drawHold = function(){
	for(var rowHold=0;rowHold<4;rowHold++){
		$('#hold').append('<tr class="hold'+rowHold+'"></tr>');
		for (var colHold=0;colHold<4;colHold++){
			$('tr.hold'+rowHold).append('<td id="hold'+colHold+'"></td>');
		}
	}
}
//کشیدن پیکسل های جدول مهره بعدی
tetris.drawNext = function(){
	for(var rowNext=0;rowNext<4;rowNext++){
		$('#next').append('<tr class="next'+rowNext+'"></tr>');
		for (var colNext=0;colNext<4;colNext++){
			$('tr.next'+rowNext).append('<td id="next'+colNext+'"></td>');
		}
	}
}

//Variable to store current coordiates
tetris.origin = {row:2,col:5}; //مبدا مختصاتی جدول اصلی
tetris.currentShape = 'L'; //شکل بازی
tetris.NextShape = 'I'; //شکل مهره بعدی
tetris.currentCoor; //مشخصات دقیقتر شکل با زاویه
tetris.pus = true; //بازی متوقف شده یا نه
tetris.speed = 500; //سرعت اصلی بازی
tetris.fastspeed = 1; //سرعت در حالت اسپیس و سرعت بالا
tetris.score = 0; //امتیاز بازی
tetris.plusscore = 10; //واحد اضافه کردن امتیاز 
tetris.hold = ' '; //شکل نگه داری شده



//پر کردن پیکسل های بازی و بعدی و نگه داری شده با شکل مشخص و رنگ مشخص
tetris.fillCells = function(coordinates,fillColor,classname=''){
	for(var i=0;i<coordinates.length;i++){
		var row = coordinates[i].row;
		var col = coordinates[i].col;
		var $coor = $('.'+classname+row).find('#'+classname+col); //classname = '','next','hold'
		$coor.attr('bgcolor',fillColor); //bgcolor='' , 'black'->play , 'red'->next , 'blue'->hold
	}
}

//حرکت
tetris.move = function(direction){
	if(this.pus){return false} 
	this.fillCells(this.currentCoor,'');

	//move origin
	if(direction === 'right'){
		this.origin.col++;
	} else if (direction === 'left'){
		this.origin.col--;
	}

	this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);

	if(this.ifReverse()){
		if(direction === 'right'){
			this.origin.col--;
		} else if (direction === 'left'){
			this.origin.col++;
		}
	}

	this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);

	this.fillCells(this.currentCoor,'black');
}


// چرخش به سمت چپ
tetris.rotate_left = function(){
	if(this.pus){return false}
	var lastShape = this.currentShape;
	this.fillCells(this.currentCoor,'');

	if(this.currentShape === 'L'){
		this.currentShape = 'L90';
	} else if(this.currentShape === 'L90'){
		this.currentShape = 'L180';
	} else if(this.currentShape === 'L180'){
		this.currentShape = 'L270';
	} else if(this.currentShape === 'L270'){
		this.currentShape = 'L';
		
	} else if(this.currentShape === 'J'){
		this.currentShape = 'J90';
	} else if(this.currentShape === 'J90'){
		this.currentShape = 'J180';
	} else if(this.currentShape === 'J180'){
		this.currentShape = 'J270';
	} else if(this.currentShape === 'J270'){
		this.currentShape = 'J';
		
	} else if(this.currentShape === 'I'){
		this.currentShape = 'I90';
	} else if(this.currentShape === 'I90'){
		this.currentShape = 'I';
		
	} else if(this.currentShape === 'S'){
		this.currentShape = 'S90';
	} else if(this.currentShape === 'S90'){
		this.currentShape = 'S';
		
	} else if(this.currentShape === 'Z'){
		this.currentShape = 'Z90';
	} else if(this.currentShape === 'Z90'){
		this.currentShape = 'Z';
		
	} else if(this.currentShape === 'T'){
		this.currentShape = 'T90';
	} else if(this.currentShape === 'T90'){
		this.currentShape = 'T180';
	} else if(this.currentShape === 'T180'){
		this.currentShape = 'T270';
	} else if(this.currentShape === 'T270'){
		this.currentShape = 'T';
	}
	this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);

	for(var i=0;i<this.currentCoor.length;i++){
		if(this.ifReverse()){
			this.currentShape = lastShape;
		}
	}

	this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);
	this.fillCells(this.currentCoor,'black');
}


//چرخش به سمت راست
tetris.rotate_right = function(){
	if(this.pus){return false}
	var lastShape = this.currentShape;
	this.fillCells(this.currentCoor,'');

	if(this.currentShape === 'L'){
		this.currentShape = 'L270';
	} else if(this.currentShape === 'L270'){
		this.currentShape = 'L180';
	} else if(this.currentShape === 'L180'){
		this.currentShape = 'L90';
	} else if(this.currentShape === 'L90'){
		this.currentShape = 'L';
		
	} else if(this.currentShape === 'J'){
		this.currentShape = 'J270';
	} else if(this.currentShape === 'J270'){
		this.currentShape = 'J180';
	} else if(this.currentShape === 'J180'){
		this.currentShape = 'J90';
	} else if(this.currentShape === 'J90'){
		this.currentShape = 'J';
		
	} else if(this.currentShape === 'I'){
		this.currentShape = 'I90';
	} else if(this.currentShape === 'I90'){
		this.currentShape = 'I';
		
	} else if(this.currentShape === 'S'){
		this.currentShape = 'S90';
	} else if(this.currentShape === 'S90'){
		this.currentShape = 'S';
		
	} else if(this.currentShape === 'Z'){
		this.currentShape = 'Z90';
	} else if(this.currentShape === 'Z90'){
		this.currentShape = 'Z';
		
	} else if(this.currentShape === 'T'){
		this.currentShape = 'T270';
	} else if(this.currentShape === 'T270'){
		this.currentShape = 'T180';
	} else if(this.currentShape === 'T180'){
		this.currentShape = 'T90';
	} else if(this.currentShape === 'T90'){
		this.currentShape = 'T';
	}
	
	

	this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);

	for(var i=0;i<this.currentCoor.length;i++){
		if(this.ifReverse()){
			this.currentShape = lastShape;
		}
	}

	this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);
	this.fillCells(this.currentCoor,'black');
}


//تعریف کامل مشخصات شکل به همراه زاویه
tetris.shapeToCoor = function(shape,origin){
	if(shape === 'L'){
		return [{row:origin.row-1,col:origin.col},{row:origin.row-2,col:origin.col},{row:origin.row,col:origin.col},{row:origin.row,col:origin.col+1}]
	} else if(shape === 'J'){ 
		return [{row:origin.row-1,col:origin.col},{row:origin.row-2,col:origin.col},{row:origin.row,col:origin.col},{row:origin.row,col:origin.col-1}]
	} else if(shape === 'I'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row-2,col:origin.col},{row:origin.row+1,col:origin.col}]
	} else if(shape === 'O'){
		return [{row:origin.row-1,col:origin.col},{row:origin.row-2,col:origin.col},{row:origin.row-2,col:origin.col+1},{row:origin.row-1,col:origin.col+1}]
	} else if(shape === 'S'){
		return [{row:origin.row-1,col:origin.col},{row:origin.row-2,col:origin.col},{row:origin.row-1,col:origin.col-1},{row:origin.row-2,col:origin.col+1}]
	} else if(shape === 'T'){
		return [{row:origin.row-1,col:origin.col},{row:origin.row-2,col:origin.col},{row:origin.row-1,col:origin.col-1},{row:origin.row-1,col:origin.col+1}]
	} else if(shape === 'Z'){
		return [{row:origin.row-1,col:origin.col},{row:origin.row-2,col:origin.col},{row:origin.row-2,col:origin.col-1},{row:origin.row-1,col:origin.col+1}]
	} else if(shape === 'L90'){
  	return [{row:origin.row,col:origin.col},{row:origin.row,col:origin.col+1},{row:origin.row,col:origin.col-1},{row:origin.row+1,col:origin.col-1}];
  } else if(shape === 'L180'){
  	return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row+1,col:origin.col},{row:origin.row-1,col:origin.col-1}];
  } else if(shape === 'L270'){
  	return [{row:origin.row,col:origin.col},{row:origin.row,col:origin.col+1},{row:origin.row,col:origin.col-1},{row:origin.row-1,col:origin.col+1}];
  } else if(shape === 'J90'){ 
		return [{row:origin.row,col:origin.col},{row:origin.row,col:origin.col-1},{row:origin.row,col:origin.col+1},{row:origin.row-1,col:origin.col-1}]
	} else if(shape === 'J180'){ 
		return [{row:origin.row-1,col:origin.col},{row:origin.row-2,col:origin.col},{row:origin.row,col:origin.col},{row:origin.row-2,col:origin.col+1}]
	} else if(shape === 'J270'){ 
		return [{row:origin.row-1,col:origin.col},{row:origin.row-1,col:origin.col-1},{row:origin.row-1,col:origin.col+1},{row:origin.row,col:origin.col+1}]
	} else if(shape === 'I90'){
		return [{row:origin.row-1,col:origin.col},{row:origin.row-1,col:origin.col-1},{row:origin.row-1,col:origin.col+1},{row:origin.row-1,col:origin.col+2}]
	} else if(shape === 'S90'){
		return [{row:origin.row-1,col:origin.col},{row:origin.row-2,col:origin.col},{row:origin.row-2,col:origin.col-1},{row:origin.row-3,col:origin.col-1}]
	} else if(shape === 'Z90'){
		return [{row:origin.row-1,col:origin.col},{row:origin.row-2,col:origin.col},{row:origin.row-2,col:origin.col+1},{row:origin.row-3,col:origin.col+1}]
	} else if(shape === 'T90'){
		return [{row:origin.row-1,col:origin.col},{row:origin.row-2,col:origin.col},{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col+1}]
	} else if(shape === 'T180'){
		return [{row:origin.row-1,col:origin.col},{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col-1},{row:origin.row-1,col:origin.col+1}]
	} else if(shape === 'T270'){
		return [{row:origin.row-1,col:origin.col},{row:origin.row-2,col:origin.col},{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col-1}]
	} 
}

//نگه داشتن یک مهره
tetris.holdFun = function(){
	
	tetris.origin = {row:2,col:5};
	var originHold = {row:2,col:1};
	
	tetris.fillCells(this.currentCoor,'');//پاک کردن خونه های داخل جدول اصلی
	if(this.hold != ' '){ //پاک کردن خونه های هلد
		var holdCurrentShape = tetris.shapeToCoor(tetris.hold,originHold)
		tetris.fillCells(holdCurrentShape,'','hold');
		//tetris.fillCellsHold(holdCurrentShape,'');
	}
	
	if(this.hold === ' '){ //جای گذاری شکل در صورتی که هلد خالی باشد
		this.hold = this.currentShape.substr(0,1);
		this.currentCoor = tetris.spawn();
	}else{ // جا به جایی هلد و شکل اصلی
		var temp = this.currentShape.substr(0,1);
		this.currentShape = this.hold;
		this.hold = temp;
		//کشیدن شکل بعد از جا به جایی
		tetris.currentCoor = tetris.shapeToCoor(tetris.currentShape,tetris.origin);
		tetris.fillCells(tetris.currentCoor,'black');
	}
	//کشیدن هلد برای نگه داری
	holdCurrentShape = tetris.shapeToCoor(tetris.hold,originHold)
	tetris.fillCells(holdCurrentShape,'blue','hold');
	//tetris.fillCellsHold(holdCurrentShape,'black');
}

//سریع انداختن به وسیله اسپیس
tetris.dropfast = function(){
	var reverse = false;
	this.fillCells(this.currentCoor,'');
	clearInterval(gravity);
	this.score += 3;
	gravity = setInterval(function(){ tetris.drop(); },this.fastspeed);
	this.plusscore = 15;
	this.fillCells(this.currentCoor,'black');

	if(reverse){
		this.fillCells(this.currentCoor,'BLACK');
		this.emptyFullRow();
		this.currentCoor = this.spawn();
	}
	
}

//توقف بازی
tetris.pause = function(){
	if(this.pus){
		$("#gamepuse").fadeOut();
		gravity = setInterval(function(){ tetris.drop(); },this.speed);
		this.plusscore = 10;
		$("#playfield").removeClass("pus");
	}else{
		$("#gamepuse").fadeIn();
		clearInterval(gravity);
		$("#playfield").addClass("pus");
	}
	this.pus = !this.pus;
	
}

//آروم انداختن با کلید پایین
tetris.drop = function(){
	if(this.pus){return false;}
	var reverse = false;
	
	if(this.checkgameover()){
		clearInterval(gravity);
		$("#playfield").addClass("gameover");
		$("div#score").text("GameOver");
		this.pus = true;
		return false;
	}
	
	$("div#score span").text(this.score);
	this.fillCells(this.currentCoor,'');
	this.origin.row++;
	for(var i=0;i<this.currentCoor.length;i++){
		this.currentCoor[i].row++;
		if(this.ifReverse()){
			reverse = true;
		}
	}

	if(reverse){
		for(var i=0;i<this.currentCoor.length;i++){
			this.currentCoor[i].row--;
		}
		this.origin.row--;
	}

	this.fillCells(this.currentCoor,'black');

	if(reverse){
		this.fillCells(this.currentCoor,'BLACK');
		this.emptyFullRow();
		this.currentCoor = this.spawn();
		clearInterval(gravity);
		gravity = setInterval(function(){ tetris.drop(); },this.speed);
		this.plusscore = 10;
	}

}

// انتخاب شکل جدید به صورت تصادفی
tetris.spawn = function(){
	var random = Math.floor(Math.random()*7);
	var shapeArray = ['L','J','I','O','S','T','Z'];
	var originNext = {row:2,col:1};
	this.fillCells(this.shapeToCoor(this.NextShape,originNext),'','next');
	this.currentShape = this.NextShape;
	this.NextShape = shapeArray[random];
	this.fillCells(this.shapeToCoor(this.NextShape,originNext),'red','next');
	this.origin = {row:2,col:5};
	//this.currentCoor =
		return this.shapeToCoor(this.currentShape,this.origin);
}

//چک کردن باختن
tetris.checkgameover = function(){
	for (var j=0;j<10;j++){
		var $coor = $('.0 #'+j);
		if($coor.attr('bgcolor')=='BLACK'){
			return true;
		}
	}
	return false;
}

//If we need to reverse
tetris.ifReverse = function(){
	for(var i=0;i<this.currentCoor.length;i++){
		var row = this.currentCoor[i].row;
		var col = this.currentCoor[i].col;
		var $coor = $('.'+row).find('#'+col);
		if($coor.length === 0 || $coor.attr('bgcolor') === 'BLACK'){
			return true;
		}
	}
	return false;
}

// بررسی سطر های تکمیل شده و حذف آنها
tetris.emptyFullRow = function(){
	var drops = 0;
	for (var i=21; i>=0;i--){
		var rowIsFull = true;

		for (var j=0;j<10;j++){
			var $coor = $('.'+i).find('#'+j);
			if($coor.attr('bgcolor')!=='BLACK'){
				rowIsFull = false;
			}

			if(drops>0){
				var $newCoor = $('.'+(i+drops)).find('#'+j);
				$newCoor.attr('bgcolor',$coor.attr('bgcolor'));
			}
		}

		if(rowIsFull){
			drops++;
			this.score += this.plusscore;
		}
	}
}

//تابع اصلی بازی
$(document).ready(function(){
	var ar=new Array(32,33,34,35,36,37,38,39,40);

$(document).keydown(function(e) {
     var key = e.which;
      //console.log(key);
      //if(key==35 || key == 36 || key == 37 || key == 39)
      if($.inArray(key,ar) > -1) {
          e.preventDefault();
          return false;
      }
      return true;
});
	tetris.drawPlayField();
	tetris.drawHold();
	tetris.drawNext();
	this.currentCoor = tetris.spawn();
	tetris.currentCoor = tetris.shapeToCoor(tetris.currentShape,tetris.origin);
	tetris.fillCells(tetris.currentCoor,'black');
	$(document).keydown(function(e){
		if(e.keyCode === 39){  //right arrow
			tetris.move('right');
		} else if (e.keyCode === 37){  //left arrow
			tetris.move('left');
		} else if (e.keyCode === 38){  //up arrow
			tetris.rotate_left();
		} else if (e.keyCode === 90){  //z
			tetris.rotate_right();
		} else if (e.keyCode === 40){  //down arrow
			tetris.drop();
		}else if (e.keyCode === 32){  //space
			tetris.dropfast();
		}else if (e.keyCode === 67){  //c
			tetris.holdFun();
		}else if (e.keyCode === 27){  //escape
			tetris.pause();
		}
	});
	tetris.pause();

})
