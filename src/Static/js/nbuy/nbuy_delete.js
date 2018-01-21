const e_delete = (par) => {
	$('#container').on('click','.delete',function(){
		$(this).parent().remove();
	});
}
export default e_delete;