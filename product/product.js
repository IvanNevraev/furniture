document.addEventListener("DOMContentLoaded", main);
function main(){
	$("#product_catalog").text(get_name_catalog($_GET("catalog")));
	$("#product_sub_catalog").text(get_name_sub_catalog($_GET("sub_catalog")));
	get_product("WHERE id="+$_GET("id"));
	var idProduct = $_GET("id");
	$("#product_buy_one_click").click(function(){
		addInBasket(idProduct);
		document.location.href = "/order/index.html";
	});
}
function get_product(WHERE){
	$.ajax({
		url:"../get_server.php",
		dataType:"json",
		method:"GET",
		data:{
			get_products:"",
			ORDER_BY:"id",
			ORDER_BY_EXP:"DESC",
			WHERE:WHERE,
		},
		success:function(data){
			console.log("ajax_get_products is success..");
			console.log(data);
			$("title").text(data[0][1]+"|Мебельщик");
			$("#product_name").text(data[0][1]);
			$("#product_price").text(data[0][4]);
			if(data[0][5]!=null){
				console.log("There is discont!");
				$("#product_discont").css("display","inline");
				$("#product_discont").html("  Скидка: -"+data[0][5]+" <i class='fa fa-rub' aria-hidden='true'></i>");
			}
			$("#product_main_img").attr("src","../image/products/"+data[0][0]+"/main.jpg");
			let product_img = new Array();
			let i = 1;
			while(i<10){
				product_img[i] = document.createElement('img');
				product_img[i].src = "../image/products/"+data[0][0]+"/"+i+".jpg";
				product_img[i].classList.add("product_slider_mini_img");
				product_img[i].id = "product_slider_mini_img_"+i;
				$("#product_slider").append(product_img[i]);
				$(product_img[i]).click(function(){
						//console.log(this.src);
						let src_mini_img = $("#product_main_img").attr("src");
						$("#product_main_img").attr("src",this.src);
						this.src = src_mini_img;
						console.log(src_mini_img);
					});
				product_img[i].onerror = function(){
					$(this).remove();
				}
				i++;
			}
			//Add variable colors of the product
			var idColors = [];
			var svgPattern = "<svg style='position:fixed; top:-200px;'><defs>";
			var svgColors = "";
			(data[0][6].split(";")).forEach(function(item, i, arr){
				//console.log(item);
				if(item.indexOf("+")!=-1){
					//console.log("+ YES");
					(item.split("+")).forEach(function(item, i, arr){
						if(idColors.indexOf(item)==-1){
							svgPattern += "<pattern id='img"+item+"' width='100%' height='100%'><image xlink:href='../image/colors/"+item+".jpg' /></pattern>";
							idColors.push(item);
						}
						if(i==0){
							svgColors += "<svg width=25px height=50px><circle class='circ' cx='25' cy='25' r='20' fill='url(#img"+item+")'/></svg>";
						}else{
							svgColors += "<svg width=25px height=50px><circle class='circ' cx='0' cy='25' r='20' fill='url(#img"+item+")'/></svg>";
						}
					});																												
					
				}else{
					//console.log("+ NONE");
					if(item.length!=0&&idColors.indexOf(item)==-1){
						svgPattern += "<pattern id='img"+item+"' width='100%' height='100%'><image xlink:href='../image/colors/"+item+".jpg' /></pattern>";
						idColors.push(item);
					}
					if(item.length!=0){
						svgColors += "<svg width=50px height=50px><circle class='circ' cx='25' cy='25' r='20' fill='url(#img"+item+")'/></svg>";
					}
				}
			});
			svgPattern += "</defs></svg>";
			$("#product_colors").html(svgPattern+svgColors);
			//Size of the product
			$("#product_size").text("Размер (ШхГхВ): "+data[0][7]);
			$("#product_description").text(data[0][8]);
		},
		error:function(){
			alert("При загрузке данных произошла ошибка!");
		}
	});
}
function $_GET(key) {
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
}
function get_name_catalog(id_catalog){
	var name_catalog = "";
	switch (id_catalog){
		case ("1"):
			name_catalog = "Для кухни";
			break;
		case ("2"):
			name_catalog = "Для спальни";
			break;
		case ("3"):
			name_catalog = "Для гостиной";
			break;
		case ("4"):
			name_catalog = "Для прихожей";
			break;
		case ("5"):
			name_catalog = "Для детской";
			break;
		case ("6"):
			name_catalog = "Для ванной";
			break;
		case ("7"):
			name_catalog = "Для офиса";
			break;
		case ("8"):
			name_catalog = "Шкафы";
			break;
		default:
			name_catalog = "Каталог неизвестен";
	}
	return name_catalog;
}