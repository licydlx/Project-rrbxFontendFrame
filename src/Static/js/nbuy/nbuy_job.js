var job = function(a) {
	var job_id = getJson("https://m1.renrenbx.com/rrbxcdn/rrbx/taikangrsyw/jobid.json"),
		job_value = getJson("https://m1.renrenbx.com/rrbxcdn/rrbx/taikangrsyw/jobvalue.json");

	function getJson(url) {
		var obj;
		$.ajax({
			type: "GET",
			url: url,
			dataType: "JSON",
			async: false,
			success: function(data) {
				obj = data;
			},
			error: function(xhr, type) {}
		});
		return obj;
	}
	/* 职业选择 */
	/* ydlx */
	/* 2017-12-25 */

	/* 第一层 */
	var the_first_floor = function() {
		return Object.keys(job_id).map(function(x) {
			return {
				"id": x,
				"value": job_value[x],
				"parentId": "0"
			};
		});
	}

	/* 第二层 */
	var the_second_floor = function() {
		return the_first_floor().map(function(x) {
			return Object.keys(job_id[x.id]).map(function(y) {
				return {
					"id": y,
					"value": job_value[y],
					"parentId": x.id
				};;
			})
		}).reduce(function(a, b) {
			return a.concat(b);
		}, []);
	}

	/* 第三层 */
	var the_three_floor = function() {
		return the_second_floor().map(function(x) {
			return job_id[x.parentId][x.id].map(function(y) {
				return {
					"id": y,
					"value": job_value[y],
					"parentId": x.id
				};
			})
		}).reduce(function(a, b) {
			return a.concat(b);
		}, []);
	}

	var selectContactDom = $('#select_contact');
	var showContactDom = $('#insured_career');
	selectContactDom.bind('click', function() {

		var oneLevelId = showContactDom.attr('data-one-code');
		var twoLevelId = showContactDom.attr('data-two-code');
		var threeLevelId = showContactDom.attr('data-three-code');
		var iosSelect = new IosSelect(3, [the_first_floor(), the_second_floor(), the_three_floor()], {
			title: '职业选择',
			itemHeight: 35,
			relation: [1, 1],
			oneLevelId: oneLevelId,
			twoLevelId: twoLevelId,
			threeLevelId: threeLevelId,
			showAnimate: true,
			callback: function(selectOneObj, selectTwoObj, selectThreeObj) {
				showContactDom.attr('data-one-code', selectOneObj.id);
				showContactDom.attr('data-two-code', selectTwoObj.id);
				showContactDom.attr('data-three-code', selectThreeObj.id);
				/*showContactDom.html(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value);*/
				showContactDom.html(selectThreeObj.value);
			}
		});
	});
};
export default job;