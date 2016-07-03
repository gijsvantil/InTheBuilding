$(document).ready(() =>{
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