
var cssUnit = /px|em|rem|vh|vw|ex$/,
	cssToHump = /\-([a-z])/g,
	posotion = /left|top|right|bottom|height|width|lineHeight$/,
	valueDesc = function (value) {
		return {
			value: value,
			writable: true,
			configurable: true,
			enumerable: false
		}
	};
function place(match, $1) {
	return $1.toUpperCase();
}
Object.defineProperties(Element.prototype, {
			addClass: valueDesc(addClass),
			removeClass: valueDesc(removeClass),
			hasClass: valueDesc(hasClass),
			css: valueDesc(css),
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
			this[i].className = this[i].className.replace( 
					new RegExp("(\\s|^)" + className + "(\\s|$)" ), "");	
		}
	} else {
		this.className = this.className.replace( 
					new RegExp("(\\s|^)" + className + "(\\s|$)" ), "");
	}
	
	return this;					
}
function css(attr, value) {
	var len = this.length || 0;
	if (len > 0) {
		for(var i = 0; i < len; i++) {
			this[i].css(attr, value);
		}
	} else {

		if (type(attr) === 'object') {
			for (var key in attr) {
				
				this.style[key.replace(cssToHump, place)] = addCssUnit(key, attr[key]);
			}
		} else if (typeof attr === 'string' && !value) {

			return  removeCssUnit(getComputedStyle(this, null)[attr.replace(cssToHump, place)]);
		} else if (typeof attr === 'string' && value) {
			this.style[attr.replace(cssToHump, place)] = addCssUnit(attr, value);
		}
	}
	return this;
}
function removeCssUnit(value) {
	if (cssUnit.test(value)) {
		return parseInt(value);
	}
	return value;
}
function addCssUnit(key, value) {
	if (posotion.test(key)) {
		return cssUnit.test(value) ? value : value + 'px';
	}
	return value;
}
function hasClass(className) {
	var reg = new RegExp("(\\s|^)" + className +"(\\s|$)");
	if (reg.test(this.className)) {
		return true;
	}
	return false;
}
Object.defineProperty(Object.prototype, 'type', valueDesc(type));
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
