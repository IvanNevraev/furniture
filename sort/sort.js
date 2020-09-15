document.addEventListener("DOMContentLoaded", main);
function main(){
	$("#sort_catalog").text(get_name_catalog($_GET("catalog")));
	$("#sort_sub_catalog").text(get_name_sub_catalog($_GET("sub_catalog")));
	get_products("WHERE catalog LIKE '%"+$_GET("catalog")+";%' and sub_catalog like '"+$_GET("sub_catalog")+"%'");
}
function get_products(WHERE){
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
			var sort_table_tr = "";
			var i = 0;
			for(let key in data){
				//console.log(data[key][0]+"=>"+data[key][1]);
				if(i%2==0){
					sort_table_tr += "<tr><td><a href='/product/index.html?id="+data[key][0]+"&catalog="+$_GET("catalog")+"&sub_catalog="+$_GET("sub_catalog")+"'>";
					sort_table_tr += "<p class='product_image'><img src='../image/products/"+data[key][0]+"/main.jpg'></p>";
					sort_table_tr += "<p class='product_name'>"+data[key][1]+"</p>";
					sort_table_tr += "<p class='product_price'>"+data[key][4]+" <i class=\"fa fa-rub\" aria-hidden=\"true\"></i></p>";
					sort_table_tr += "</a></td>";
				}else{
					sort_table_tr += "<td><a href='/product/index.html?id="+data[key][0]+"&catalog="+$_GET("catalog")+"&sub_catalog="+$_GET("sub_catalog")+"'>";
					sort_table_tr += "<p class='product_image'><img src='../image/products/"+data[key][0]+"/main.jpg'></p>";
					sort_table_tr += "<p class='product_name'>"+data[key][1]+"</p>";
					sort_table_tr += "<p class='product_price'>"+data[key][4]+" <i class=\"fa fa-rub\" aria-hidden=\"true\"></i></p>";
					sort_table_tr += "</a></td></tr>";
				}
				i++;
			}
			if(i%2==1){
				sort_table_tr += "<td></td></tr>";
			}
			$("#sort_table").append(sort_table_tr); 
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
function get_name_sub_catalog(id_sub_catalog){
	var name_sub_catalog = "Подкаталог неизвестен";
	switch (id_sub_catalog){
		case ("1"):
			name_sub_catalog = "Кухонные гарнитуры";
			break;
		case ("2"):
			name_sub_catalog = "Столы";
			break;
		case ("3"):
			name_sub_catalog = "Стулья";
			break;
		case ("4"):
			name_sub_catalog = "Подвесные шкафы";
			break;
		case ("5"):
			name_sub_catalog = "Напольные шкафы";
			break;
		case ("6"):
			name_sub_catalog = "Кровати";
			break;
		case ("7"):
			name_sub_catalog = "Комоды";
			break;
		case ("8"):
			name_sub_catalog = "Туалетные столики";
			break;
		case ("9"):
			name_sub_catalog = "Прикроватные тумбы";
			break;
		case ("10"):
			name_sub_catalog = "Шкафы";
			break;
		case ("11"):
			name_sub_catalog = "Полки и стелажи";
			break;
		case ("12"):
			name_sub_catalog = "Пеналы";
			break;
		case ("13"):
			name_sub_catalog = "Журнальные столики";
			break;
		case ("14"):
			name_sub_catalog = "TV тумбы";
			break;
		case ("15"):
			name_sub_catalog = "Прихожие";
			break;
		case ("16"):
			name_sub_catalog = "Обувницы";
			break;
		case ("17"):
			name_sub_catalog = "Комплект";
			break;
		case ("18"):
			name_sub_catalog = "Зеркала";
			break;
		case ("19"):
			name_sub_catalog = "Тумбы";
			break;
		case ("20"):
			name_sub_catalog = "Тумбы";
			break;
		case ("21"):
			name_sub_catalog = "Стенки и горки";
			break;
		case ("101"):
			name_sub_catalog = "Купе";
			break;
		case ("102"):
			name_sub_catalog = "Распашные";
			break;
	}
	return name_sub_catalog;
}