document.addEventListener("DOMContentLoaded", main);
function main(){
	fillInformationOfOrder();
	//This listener for change total prise by click radio on deliveryMethod
	$("#deliveryMethod input").change(function(){
		if($(this).attr("value")=="true"){
			console.log("Checked delivery.");
			var total = (Number($("#total").text()))+500;
			$("#total").text(total);
		}else{
			console.log("Checked pickup.");
			var total = (Number($("#total").text()))-500;
			$("#total").text(total);
		}
	})
}
//This function get information obaut custom basket and fill table on order/index.html
function fillInformationOfOrder(){
	console.log("fillInformationOfOrder start...");
	var sizeBasket = $.cookie("sizeBasket");
	console.log("Size basket = "+sizeBasket);
	var forSend = "<input type='text' name='idProductsForOrder' value='";
	for(i=1;i<=sizeBasket;i++){
		forSend += $.cookie("basket"+i)+";";
		$.ajax({
			url:"../get_server.php",
			dataType:"json",
			method:"GET",
			data:{
				get_products:"",
				ORDER_BY:"id",
				ORDER_BY_EXP:"DESC",
				WHERE:"WHERE id="+$.cookie("basket"+i),
			},
			success:function(data){
				console.log("ajax_get_products is success..");
				console.log(data);
				var trOfOrder = "<tr><td align='left'>"+get_name_sub_catalog(data[0][3])+"</td>";
				trOfOrder += "<td align='left'>"+data[0][1]+"</td><td><span class='minus' id='minus"+data[0][0]+"'>-</span>";
				trOfOrder += "<span id='amount"+data[0][0]+"'>1</span><span class='minus' id='plus"+data[0][0]+"'>+</span></td>";
				trOfOrder += "<td>"+data[0][4]+"</td><td><i class='fa fa-trash-o trash' aria-hidden='true'></i></td></tr>";
			    $("#informationAboutOrder").append(trOfOrder);
				var summPrice = (Number($("#summPrice").text()))+Number(data[0][4]);
				$("#summPrice").text(summPrice);
				$("#total").text(summPrice);
			},
			error:function(){
				alert("При загрузке данных произошла ошибка!");
			}
		});
	}
	forSend += "'>";
	$("#forSend").html(forSend);
}