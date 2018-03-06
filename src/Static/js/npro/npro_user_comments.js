import {
	formatTimeStamp
} from '../depend/common.js';
const e_npro_user_comments = function() {
	$(".comment-list").find(".cli-date").each(function(index, value) {
		let that = $(value),
			date = formatTimeStamp(that.text());
		that.text(date.day);
	});
};
export default e_npro_user_comments;