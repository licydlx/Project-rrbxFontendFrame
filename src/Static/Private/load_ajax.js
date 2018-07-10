// ajax promise 异步同步化
// ydlx
// 2018-1-5
class ajax_promise {
	constructor(xhr) {
		xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		this.xhr = xhr;
	}
	send(options) {
		let xhr = this.xhr;
		let opt = {
			_type: options.type || 'get',
			_url: options.url || '',
			_async: options.async || true,
			_dataType: options.dataType || 'json',
			_data: options.data || ''
		};
		opt._type = opt._type.toUpperCase();
		if (opt._type === 'GET' && opt._data) {
			let _args = '';
			if (typeof opt._data === 'string') {
				_args = opt._data;
			} else if (typeof opt._data === 'object') {
				let _arr = new Array();
				for (let _k in opt._data) {
					let _v = opt._data[_k];
					_arr.push(_k + '=' + _v);
				}
				_args = _arr.join('&');
			}
			opt._url += (opt._url.indexOf('?') === -1 ? '?' : '&') + _args;
			opt._data = null;
		}
		return new Promise((resolve, reject) => {
			xhr.open(opt._type, opt._url, opt._async);
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						if (opt._dataType === 'json') {
							const value = JSON.parse(xhr.responseText);
							resolve(value);
						}
					} else {
						reject(new Error(xhr.status || 'Server is fail.'));
					}
				}
			};
			xhr.onerror = () => {
				reject(new Error(xhr.status || 'Server is fail.'));
			}
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(opt._data);
		});
	}
}

export default ajax_promise;