var slider_page = 1;
document.addEventListener("DOMContentLoaded", main);
function main(){
	var slider_interval = setInterval(slider_turn_right,5000);
	$("#slider_right").click(function(){
		clearInterval(slider_interval);
		slider_turn_right();
	});
	$("#slider_left").click(function(){
		clearInterval(slider_interval);
		slider_turn_left();
	});
}
function slider_turn_right(){
	console.log("--slider_turn_right start--");
	switch (slider_page){
		case 1:
			slider_page += 1;
			slider_show(2);
			break;
		case 2:
			slider_page += 1;
			slider_show(3);
			break;
		case 3:
			slider_page += 1;
			slider_show(4);
			break;
		case 4:
			slider_page = 1;
			slider_show(1);
			break;
	}
}
function slider_turn_left(){
	console.log("--slider_turn_left start--");
	switch (slider_page){
		case 1:
			slider_page = 4;
			slider_show(4);
			break;
		case 2:
			slider_page -= 1;
			slider_show(1);
			break;
		case 3:
			slider_page -= 1;
			slider_show(2);
			break;
		case 4:
			slider_page -= 1;
			slider_show(3);
			break;
	}
}
function slider_show(page){
	switch (page){
		case 1:
			$("#slider_img_1").attr("src","../image/slider/slider_img_1_1.jpg");
			$("#slider_img_2").attr("src","../image/slider/slider_img_2_1.jpg");
			$("#slider_footer p").text("Лучшая мебель в Челябинске");
			break;
		case 2:
			$("#slider_img_1").attr("src","../image/slider/slider_img_1_2.jpg");
			$("#slider_img_2").attr("src","../image/slider/slider_img_2_2.jpg");
			$("#slider_footer p").text("20 летний опыт производства мебели");
			break;
		case 3:
			$("#slider_img_1").attr("src","../image/slider/slider_img_1_3.jpg");
			$("#slider_img_2").attr("src","../image/slider/slider_img_2_3.jpg");
			$("#slider_footer p").text("Оптовые цены каждому покупателю");
			break;
		case 4:
			$("#slider_img_1").attr("src","../image/slider/slider_img_1_4.jpg");
			$("#slider_img_2").attr("src","../image/slider/slider_img_2_4.jpg");
			$("#slider_footer p").text("Широкий асортимент и доступные цены");
			break;
	}
}