const productObj = {
	id: '20180118kaixinbaodjx',
	npro: 'npro_kaixinbaodjx',
	nbuy: 'nbuy_kaixinbaodjx'
}

module.exports = {
	items: {
		productId: productObj.id,
		htmlSet: [
			productObj.npro,
			"price_cal",
			productObj.nbuy,
		],
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
			'npro_support_plan': 'three'
		}
	}
}