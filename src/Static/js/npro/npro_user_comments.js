import {
	formatTimeStamp
} from '../depend/common.js';
const e_npro_user_comments = function() {
	$("#container").on("click", "#uc-trigger", function(event) {
		event.preventDefault();
		let that = $(this).prev();
		that.hasClass('active') ? that.removeClass("active") : that.addClass("active");
	});

	$(".comment-list").find(".cli-date").each(function(index, value) {
		let that = $(value),
			date = formatTimeStamp(that.text());
		that.text(date.day);
	});
};
export default e_npro_user_comments;