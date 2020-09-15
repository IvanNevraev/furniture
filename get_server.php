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
//Получаем цвета ЛДСП хранящиеся на сервере
if(isset($_GET["get_colors"])){
	$sql = "SELECT * FROM colors;";
	if($result = mysqli_query($link,$sql)){
	    echo json_encode(mysqli_fetch_all($result));
	}else{
		echo "ERROR";
	}
}unset($_GET["get_colors"]);
//Получаем продукты хранящиеся в базе
if(isset($_GET["get_products"])){
	if(isset($_GET["WHERE"])){
		$WHERE = $_GET["WHERE"];
	}else{
		$WHERE = "";
	}unset($_["WHERE"]);
	if(isset($_GET["LIMIT"])){
		$LIMIT = "LIMIT ".$_GET["LIMIT"];
	}else{
		$LIMIT = "";
	}unset($_["LIMIT"]);
	$sql = "SELECT * FROM products ".$WHERE." ORDER BY ".$_GET["ORDER_BY"]." ".$_GET["ORDER_BY_EXP"]." ".$LIMIT."";
	if($result = mysqli_query($link,$sql)){
	    echo json_encode(mysqli_fetch_all($result));
	}else{
		echo "ERROR";
	}
}unset($_GET["get_products"]);
?>