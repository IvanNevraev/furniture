//This function add new cookie with information about basket custom
function addInBasket(idProduct){
	console.log("addInBasket start for "+idProduct);
	var newSizeBasket = Number($.cookie("sizeBasket"))+1;
	console.log("New size basket = "+newSizeBasket);
	$.cookie('sizeBasket', newSizeBasket, { expires: 30, path: "/" });
	$.cookie('basket'+newSizeBasket, idProduct, { expires: 30, path: "/" });
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