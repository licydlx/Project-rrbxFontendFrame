module.exports = {
	items: {
		productId: "20180118kaixinbaodjx",
		htmlSet: [
			"npro_kaixinbaodjx",
			"price_cal",
			"nbuy_kaixinbaodjx",
		],
		loadAjax: {
			npro: {
				type: 'get',
				url: '/mobile/getproductdetails',
				data: {
					"productId": "20180118kaixinbaodjx"
				}
			},
			ntri: {
				type: 'get',
				url: '/mobile/getproductdetails',
				data: {
					"productId": "20180118kaixinbaodjx"
				}
			},
			nbuy: {
				type: 'get',
				url: '/mobile/getproductinsureconfig',
				data: {
					"productId": "20180118kaixinbaodjx"
				}
			}
		},
		htmlBrick: {
			npro: ['npro_header', 'npro_support_plan', 'npro_elevator', 'npro_footer'],
			ntri: ['trial_prem_trial', 'npro_footer'],
			nbuy: ['nbuy_holder', 'nbuy_favoree', 'nbuy_supple_info', 'nbuy_clause', 'nbuy_footer']
		},

		nproEvent:{
			'npro_support_plan':'three'
		}
	}
}