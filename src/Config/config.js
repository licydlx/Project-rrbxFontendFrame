module.exports = {
	items: {
		htmlSet: [
			"npro_yongchengmzx",
			"price_cal",
			"nbuy_yongchengmzx",
		],
		loadAjax: {
			npro: {
				type: 'get',
				url: '/mobile/getproductdetails',
				data: {
					"productId": "20180117yongchengmzx"
				}
			},
			ntri: {
				type: 'get',
				url: '/mobile/getproductdetails',
				data: {
					"productId": "20180117yongchengmzx"
				}
			},
			nbuy: {
				type: 'get',
				url: '/mobile/getproductinsureconfig',
				data: {
					"productId": "20180117yongchengmzx"
				}
			}
		},
		htmlBrick: {
			npro: ['npro_header', 'npro_support_plan2', 'npro_elevator', 'npro_footer'],
			ntri: ['trial_prem_trial', 'npro_footer'],
			nbuy: ['nbuy_holder_group', 'nbuy_insured_group','nbuy_added','nbuy_favoree', 'nbuy_supple_info', 'nbuy_clause', 'nbuy_footer']
		}
	}
}