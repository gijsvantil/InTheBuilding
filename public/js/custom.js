$(document).ready(() =>{
	console.log ("DOM is ready")
	$('#helpmeout').click(()=>{
		$('.postbox').show(()=>{
			console.log ('TADAA')
		})
	});
});