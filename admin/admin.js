var value_colors = 1;
document.addEventListener("DOMContentLoaded", main);
function main (){
	$("#checkbox_catalog input").click(function(){
		$("#add_product input[type='submit']").attr("disabled", !$("#checkbox_catalog input").is(":checked"));
	});
	check_show_notif();
	get_colors();
	get_last_ten_products();
	//Переключатель один или два цвета для продукта
	$("#add_product_list_color input[type='radio']").change(change_radio_color);
	//Обработка кнопки еще один цвета
	$("#add_product_yet_one_color").click(function(){
		value_colors += 1;
		var yet_one = "<li id=\"add_product_list_color_"+value_colors+"\"><input class=\""+value_colors+"_radio_type_color\" name=\"type_color_"+value_colors+"\" type=\"radio\" value=\"single\" checked>Один   <input class=\""+value_colors+"_radio_type_color\" name=\"type_color_"+value_colors+"\" type=\"radio\" value=\"double\">Два<br>";
		yet_one += "Цвет 1 <select class=\"select_product_color color_1\" name=\"product_color_"+value_colors+"_1\"></select><br>";
		yet_one += "Цвет 2 <select class=\"select_product_color color_2\" name=\"product_color_"+value_colors+"_2\" disabled></select></li>";
		$("#add_product_list_color").append(yet_one);
		$("."+value_colors+"_radio_type_color").click(change_radio_color);
		$(".select_product_color").html($(".select_product_color").html());
	});
}
function get_last_ten_products(){
	$.ajax({
		url:"../get_server.php",
		dataType:"json",
		method:"GET",
		data:{
			get_products:"",
			ORDER_BY:"id",
			ORDER_BY_EXP:"DESC",
			LIMIT:"10"
		},
		success:function(data){
			console.log("ajax_get_last_ten_products is success..");
			console.log(data);
			var last_ten_products_tr = "";
			for(let key in data){
				//console.log(data[key][0]+"=>"+data[key][1]);
				last_ten_products_tr += "<tr>";
				last_ten_products_tr += "<td>"+data[key][0]+"</td>";
				last_ten_products_tr += "<td>"+data[key][1]+"</td>";
				last_ten_products_tr += "<td>"+data[key][2]+"</td>";
				last_ten_products_tr += "<td>"+data[key][3]+"</td>";
				last_ten_products_tr += "<td>"+data[key][4]+"</td>";
				last_ten_products_tr += "<td>"+data[key][5]+"</td>";
				last_ten_products_tr += "<td>"+data[key][6]+"</td>";
				last_ten_products_tr += "<td>"+data[key][7]+"</td>";
				last_ten_products_tr += "<td>"+data[key][8]+"</td>";
				last_ten_products_tr += "</tr>";
			}
			$("#last_ten_products table").append(last_ten_products_tr); 
		},
		error:function(){
			alert("При загрузке последних 10 продуктов произошла ошибка!");
		}
	});
}
function $_GET(key) {
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
}
function get_colors (){
	console.log("Start get_colors...");
	$.ajax({
		url:"../get_server.php",
		dataType:"json",
		method:"GET",
		data:{
			get_colors:""
		},
		success:function(data){
			console.log("ajax_get_colors is success..");
			console.log(data);
			var color_iteam = "";
			for(let key in data){
				//console.log(data[key][0]+"=>"+data[key][1]);
				color_iteam += "<option value='"+data[key][0]+"'>"+data[key][1]+"</option>";
			}
			$(".select_product_color").html(color_iteam);
		},
		error:function(){
			alert("При загрузке вариантов ЛДСП произошла ошибка!");
		}
	});
}
function change_radio_color (){
	var number_item = Number.parseInt( $(this).attr("class"), 10 );
		var value_item = $(this).attr("value");
		console.log(number_item+"=>"+value_item);
		if(value_item=="single"){
			$("#add_product_list_color_"+number_item+" .color_2").attr("disabled", true);
		}else if(value_item=="double"){
			$("#add_product_list_color_"+number_item+" .color_2").attr("disabled", false);
		}
}
function check_show_notif(){
	if($_GET("set_server_color")=="OK"){
		$("#add_color_ok").animate({"bottom":"20px"});
		setTimeout(function(){
			$("#add_color_ok").animate({"bottom":"-100px"});
		},2000)
	}else if($_GET("set_server_color")=="ERROR"){
		$("#add_color_error").animate({"bottom":"20px"});
		setTimeout(function(){
			$("#add_color_error").animate({"bottom":"-100px"});
		},2000)
	}
	if($_GET("set_server_product")=="OK"){
		$("#add_product_ok").animate({"bottom":"20px"});
		setTimeout(function(){
			$("#add_product_ok").animate({"bottom":"-100px"});
		},2000)
	}else if($_GET("set_server_product")=="ERROR"){
		$("#add_product_error").animate({"bottom":"20px"});
		setTimeout(function(){
			$("#add_product_error").animate({"bottom":"-100px"});
		},2000)
	}
}