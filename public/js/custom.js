$(document).ready(() =>{
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: "https://api.instagram.com/v1/locations/234838958/media/recent?access_token=11956086.26b315a.62ce48fb088d40b98813cfa8831e6d47",
		success: (data) => {
			console.log(data)
			for(i = 0; i < data.data.length; i ++){
				console.log(data.data[i].link)
				$('.instaphoto').append(("<a href=\"" + data.data[i].link + "\" target=\"_blank\"><img src=\"" + data.data[i].images.thumbnail.url + "\">"))
				}
			console.log("WOWZERS")
			console.log(data.data.length)
		}
	});

	$('.my-heading-class').on('click', function() {
		$(this).next('.my-content-class').slideToggle();
	});
	$('.ui.accordion').accordion();
	console.log ("DOM is ready")
	$('#helpmeout').click(()=>{
		$('.postbox').toggle(()=>{
		})
	});
	$('.hello').click((e)=>{
		console.log('click')
		$(this).next('.comment').toggle(()=>{

		})
	})
});