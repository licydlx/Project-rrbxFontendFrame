var e_nbuy_popups = function(title, text, button) {
	var html = "";
	if (text) {
		html += '<div class="popups" style="height:108px">';
	} else {
		html += '<div class="popups" style="height:72px;">';
	};
	if (title) {
		html += '<div class="title">' + title + '</div>';
	};
	if (text) {
		html += '<div class="text">' + text + '</div>';
	};
	if (button) {
		html += '<a class="button">' + button + '</a>';
	};
	html += '</div>';

	$("body").append(html);
};
export default e_nbuy_popups;