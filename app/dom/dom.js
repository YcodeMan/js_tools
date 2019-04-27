
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
			animate: valueDesc(animate)
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
function hasClass(className) {
	var reg = new RegExp("(\\s|^)" + className +"(\\s|$)");
	if (reg.test(this.className)) {
		return true;
	}
	return false;
}
function css(attr, val) {
	for (var i = 0, len = this.length; i < len; i++) {
		if (val == undefined) {
			if (typeof attr === 'object') {
				for (var key in attr) {
					this.css(key, attr[key]);
				}
			} else if (typeof attr === 'string') {
				return getComputedStyle(this[i])[attr];
			}
		} else {
			this[i].style[attr] = val;
		}
	}
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
//t是走过的时间、d是总时间、c是总路程(灵活的有可能是opacity的变化的值)、b是元素的初始位置
function linear(t, b, c, d) {
    return c / d * t + b;
}
function animate(target, duration, callback) {
	var change = {},
		begin = {},
		k = null,
		timer = null,
		time = 0,
		_this = this
		item = null;

	for (key in target) {
		begin[key] = this.css(key);
		change[key] = target[key] - begin[key];
	}
	timer = setInterval(function () {
		time += 10;
		if (time >= duration) {
			clearInterval(timer);
			timer = null;
			_this.css(target);
			typeof callback === 'function' ? callback() : null;
		}
		if (item in target) {
			var current = linear(time, begin[item], change[item], duration);
			_this.css(item , current);
		}
	})
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
