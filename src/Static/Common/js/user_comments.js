import {
	formatTimeStamp
} from '../../Depend/common.js';

import comments from '../../../Component/Common/comments.js';

const user_comments = function(PZ) {
	$(".comment-list").find(".cli-date").each(function(index, value) {
		let that = $(value),
			date = formatTimeStamp(that.text());
		that.text(date.day);
	});

	// 评论组件
	// 逻辑:首次渲染5个,每次点击下拉在渲染5个,点击上拉清除所有(除首次渲染)
	// 作者:ydlx
	// 日期:2018-04-10
	var commentArray = PZ.comment.map(function(x, y) {
		if (x.createTime) x.createTime = formatTimeStamp(x.createTime).day;
		return x;
	});
	var renderTag = 1;

	$(".user-comments").on('click', '.trigger', function(event) {
		event.preventDefault();
		var that = $(this).prev(),
			start = renderTag * 5,
			end = renderTag * 5 + 5,
			renderData = commentArray.filter(function(x, y) {
				return y >= start && y < end;
			});

		if (end >= commentArray.length) {
			$(".comment-list .cl-item:nth-child(5)").nextAll().remove();
			renderTag = 0;
		} else {
			$(".comment-list").append(comments({
				"comment": renderData
			}));
		};
		renderTag++;
		//
		end < commentArray.length ? that.removeClass("active") : that.addClass("active");
	});
};
export default user_comments;