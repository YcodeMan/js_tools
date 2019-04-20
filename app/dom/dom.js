
Object.defineProperties(Element.prototype, {
			addClass: {
				value: addClass,
				writable: false,
				configurable: true,
				enumerable: false

			},
			removerClass: {
				value: removeClass,
				writable: false,
				configurable: true,
				enumerable: false
			},
			css: {
				value: css,
				writable: false,
				configurable: true,
				enumerable: false
			}
		}
)

function addClass(className) {
	var len = this.length || 0;
	if (len > 0) {
		for (var i = 0; i < len; i++) {
			this[i] = this[i].addClass(className);
		}
	} else {
		this.className = this.className + ' ' + className;
	}
	return this;
}
function removeClass(className) {
	var len = this.length || 0;
	if (len > 0) {
		for (var i = 0; i < len; i++) {
			this[i] = this[i].className = this[i].className.replace( 
					new RegExp("(\\s|^)" + className + "(\\s|$)" ), "");	
		}
	}
	this.className = this.className.replace( 
					new RegExp("(\\s|^)" + className + "(\\s|$)" ), "");
	return this;					
}
function css(attr, value) {
	var len = this.length || 0;
	if (len > 0) {
		for(var i = 0; i < len; i++) {
			this[i] = this[i].css(attr, value);
		}
	} else {
		if (type(attr) === 'object') {
			for (var k in attr) {
				this.style[k] = attr[k];
			}
		} else if (typeof attr === 'string' && !value) {
			return  removeCssUnit(getComputedStyle(this, null)[attr]);
		} else if (typeof attr === 'string' && value) {
			this.style[attr] = value;
		}
	}
	return this;
}
function removeCssUnit(value) {
	var reg = /px|em|rem|vh|vw|ex$/;
	if (reg.test(value)) {
		return parseInt(value);
	}
	return value;
}


Object.defineProperty(Object.prototype, 'type',{
	value: type,
	writable: true,
	configurable: true,
	enumerable: false
});
var objType = {
	'[object Boolean]': 'boolean',
	'[object Number]': 'number',
	'[object Function]': 'function',
	'[object Array]': 'array',
	'[object RegExp]': 'regexp',
	'[object String]': 'string',
	'[object Date]': 'date',
	'[object Error]': 'error',
	'[object Symbol]': 'symbol',
	'[object Object': 'object'
};
var objToStr = Object.prototype.toString;
function type(obj) {
	if (obj == null) {
		return obj + '';
	}
	return typeof obj === 'object' || typeof obj === 'function' 
	? objType[objToStr.call(obj)] || 'object' : typeof obj;
}
