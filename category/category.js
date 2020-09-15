
document.addEventListener("DOMContentLoaded", main);
function main(){
	show_category();
	$("#menu_catalog li, #catalog a").click(function(){
		setTimeout(function(){
			$("#main_div>div").css("display","none");
			$("#catalog").css("display","none");
			show_category();
		},200);
	});
	$("#li_catalog").click(function(){
		$("#main_div>div").css("display","none");
		$("#main_div h3").text("Каталог");
		$("#catalog").css("display","block");
	});
}
function show_category(){
	switch (document.location.hash){
		case "#kitchen":
			$("#main_div h3").text("Для кухни");
			$("#for_kitchen").css("display","block");
			break;
		case "#batroom":
			$("#main_div h3").text("Для спальни");
			$("#for_batroom").css("display","block");
			break;
		case "#hall":
			$("#main_div h3").text("Для гостиной");
			$("#for_hall").css("display","block");
			break;
		case "#hallway":
			$("#main_div h3").text("Для прихожей");
			$("#for_hallway").css("display","block");
			break;
		case "#playroom":
			$("#main_div h3").text("Для детской");
			$("#for_playroom").css("display","block");
			break;
		case "#bathroom":
			$("#main_div h3").text("Для ванной");
			$("#for_bathroom").css("display","block");
			break;
		case "#office":
			$("#main_div h3").text("Для офиса");
			$("#for_office").css("display","block");
			break;
		case "#closet":
			$("#main_div h3").text("Шкафы");
			$("#for_closet").css("display","block");
			break;
		default:
			$("#main_div h3").text("Каталог");
			$("#catalog").css("display","block");
	}
}