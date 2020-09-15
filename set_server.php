<?php
date_default_timezone_set("Asia/Yekaterinburg"); //Установка часового пояса для функции даты
//-----------Получаем подключаемся к MySQL------------------------------------------
$confXML = simplexml_load_file("conf.xml")or exit("Неудалось открыть файл conf.xml");
$userName = $confXML->userName;//Логин для подключения к MySQL
$password = $confXML->password;//Пароль для подключения к MySQL
$adres = $confXML->adres;//Адрес для подключения к MySQL
$dbName = $confXML->dbName;//Имя азы данных
//Подклчаемся к серверу к базе данных my_bd и получаем его дискриптор в переменную link
$link=mysqli_connect($adres,$userName,$password,$dbName);
//Если подключение установлено,то... если нет, закрываем его.
if($link){
    mysqli_query($link,"SET NAMES utf8");
    //echo "Соединение с сервером установлено";
}else{
    mysqli_close($link);
    exit ("Сервер не доступен");
}
//--------Добавляем цвет в colors-----------
if(isset($_POST["color_name"])){
	$sql = "SELECT MAX(id) FROM colors";
	$result = mysqli_query($link,$sql);
	$new_id = (int)mysqli_fetch_assoc($result)["MAX(id)"]+1;
	if(isset($_FILES) && $_FILES['color_file']['error'] == 0){ // Проверяем, загрузил ли пользователь файл
		$destiation_dir = dirname(__FILE__) .'/image/colors/'.$new_id.'.jpg'; // Директория для размещения файла
		move_uploaded_file($_FILES['color_file']['tmp_name'], $destiation_dir ); // Перемещаем файл в желаемую директорию
		echo 'File Uploaded<br>'; // Оповещаем пользователя об успешной загрузке файла
		$check_file = true;
	}else{
		echo 'No File Uploaded'; // Оповещаем пользователя о том, что файл не был загружен
		$check_file = false;
	}
	$sql = "INSERT INTO colors (name) VALUES ('".$_POST["color_name"]."');";
	if(mysqli_query($link,$sql)){
		echo "Color is added";
		$check_sql = true;
	}else{
		echo "Ошибка при добавлении данных into colors!";
		$check_sql = false;
	}
	if($check_file && $check_sql){
		header('Location: /admin/index.html?set_server_color=OK');
	}else{
		header('Location: /admin/index.html?set_server_color=ERROR');
	}
}unset($_POST["color_name"]);
//-------------------------------------------
//-----------Добовляем позицию в product-------
if(isset($_POST["product_name"])){
	$sql = "SELECT MAX(id) FROM products;";
	$result = mysqli_query($link,$sql);
	$new_id = (int)mysqli_fetch_assoc($result)["MAX(id)"]+1;
	if(isset($_FILES) && $_FILES['product_file']['error'][0] == 0){ // Проверяем, загрузил ли пользователь файл
		mkdir(dirname(__FILE__) .'/image/products/'.$new_id,0777,true);
		foreach ($_FILES["product_file"]["name"] as $key => $value){
			$destiation_dir = dirname(__FILE__) .'/image/products/'.$new_id.'/'.$_FILES['product_file']['name'][$key]; // Директория для размещения файла
			move_uploaded_file($_FILES['product_file']['tmp_name'][$key], $destiation_dir );
		}
		echo 'File Uploaded<br>'; // Оповещаем пользователя об успешной загрузке файла
		$check_file = true;
	}else{
		echo 'No File Uploaded'; // Оповещаем пользователя о том, что файл не был загружен
		$check_file = false;
	}
	$catalog = "";
	for($i=1;$i<9;$i++){
		if(isset($_POST["product_catalog_".$i])){
			$catalog .= $i.";";
		}
	}
	$product_colors = "";
	for($i=1;$i<20;$i++){
		if(isset($_POST["product_color_".$i."_1"])){
			$product_colors .= $_POST["product_color_".$i."_1"];
			if(isset($_POST["product_color_".$i."_2"])){
				$product_colors .= "+".$_POST["product_color_".$i."_2"].";";
			}else{
				$product_colors .= ";";
			}
		}
	}
	
	if($_POST["product_discont"]){
		$product_discont = $_POST["product_discont"];
	}else{
		$product_discont = "NULL";
	}
	$sql = "INSERT INTO products (name, catalog, sub_catalog, price, discont, colors, size, description) VALUES ('".$_POST["product_name"]."', '".$catalog."', ".$_POST["product_sub_catalog"].", ".$_POST["product_price"].", ".$product_discont.", '".$product_colors."', '".$_POST["product_size"]."', '".$_POST["product_description"]."' );";
	if(mysqli_query($link,$sql)){
		echo "Product is added";
		$check_sql = true;
	}else{
		echo "Ошибка при добавлении данных into Product!";
		$check_sql = false;
	}
	if($check_file && $check_sql){
		header('Location: /admin/index.html?set_server_product=OK');
	}else{
		header('Location: /admin/index.html?set_server_product=ERROR');
	}
}unset($_POST["product_name"]);
//---------------------------------------------
?>