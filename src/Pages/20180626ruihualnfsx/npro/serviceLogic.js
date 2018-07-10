import Modal from '../../../Static/Depend/Modal/Modal.js';
const serviceLogic = function(servicePars) {
	console.log("serviceLogic");

	$('#container').on('click', '#service', function(event) {
		event.preventDefault();
		/* Act on the event */
		new Modal('consultService',null).init();
	});

}
export default serviceLogic;