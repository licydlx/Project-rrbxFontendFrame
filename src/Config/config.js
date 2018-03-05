const productObj = {
	id: '2016062000000parentsprotect2',
	npro: 'npro_parentsprotect2',
	price_cal: 'price_cal',
	nbuy: 'nbuy_parentsprotect2'
}

module.exports = {
	items: {
		productId: productObj.id,
		htmlSet: [{
			title: '第二社保-父母保险',
			page: productObj.npro
		}, {
			title: '试算页',
			page: productObj.price_cal
		}, {
			title: '投保页',
			page: productObj.nbuy
		}],
		loadAjax: {
			npro: {
				type: 'get',
				url: '/mobile/getproductdetails',
				data: {
					"productId": productObj.id
				}
			},
			ntri: {
				type: 'get',
				url: '/mobile/getproductdetails',
				data: {
					"productId": productObj.id
				}
			},
			nbuy: {
				type: 'get',
				url: '/mobile/getproductinsureconfig',
				data: {
					"productId": productObj.id
				}
			}
		},
		htmlBrick: {
			npro: ['npro_header', 'npro_support_plan', 'npro_elevator', 'npro_footer'],
			ntri: ['trial_prem_trial', 'npro_footer'],
			nbuy: ['nbuy_holder', 'nbuy_favoree', 'nbuy_supple_info', 'nbuy_clause', 'nbuy_footer']
		},
		nproEvent: {
			'npro_support_plan': 'four'
		}
	}
}