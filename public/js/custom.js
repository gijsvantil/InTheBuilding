$(document).ready(() =>{
	console.log ("DOM is ready")
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: "https://api.instagram.com/v1/locations/234838958/media/recent?access_token=11956086.26b315a.62ce48fb088d40b98813cfa8831e6d47",
		success: (data) => {
			console.log(data)
			for(i = 0; i < data.data.length; i ++){
				$('.instaphoto').append(("<a href=\"" + data.data[i].link + "\" target=\"_blank\"><img src=\"" + data.data[i].images.thumbnail.url + "\">"))
				}
		}
	});
	$('.ui.accordion').accordion();
	// // $('#helpmeout').click(()=>{
	// // 	$('.postbox').toggle(()=>{
	// // 	})
	// // });
	// $('#').click(()=>{
	// 	$('.postbox').toggle(()=>{
	// 	})
	// });
});