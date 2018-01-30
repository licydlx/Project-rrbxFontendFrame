import nbuy_insured_group from '../../../Moudle/nbuy/nbuy_insured_group.js';

import e_nbuy_rela from '../../../Static/js/nbuy/nbuy_rela.js';
import timePicker from '../../../Static/js/nbuy/timePicker.js';
import e_nbuy_delete from '../../../Static/js/nbuy/nbuy_delete.js';

const e_added = (par) => {
	$('#container').on('click','#added', function() {
		var html = nbuy_insured_group();
		$(this).before(html);

		e_nbuy_rela();
		timePicker();
		e_nbuy_delete(); 
	});
}
export default e_added;