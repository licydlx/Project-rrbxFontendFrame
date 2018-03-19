import insuredTemplate from './insuredTemplate.js';	
class addInsured {
	constructor(bindDom, title, template, func) {
		this.bindDom = bindDom;
		this.title = title;
		this.templateName = template;
		this.view = insuredTemplate[template];
		this.func = func;
	}

	init() {
		$(".insuredBox").on('click', '[remove]', function(event) {
			event.preventDefault();
			$(this).closest('.test').remove();
		});

		console.log("init");
	}

	create() {
		$('#addInsured').before(this.view());
	}

}

export default addInsured;