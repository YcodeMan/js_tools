const dom = require('../dom/dom.js');

module.exports = (function (win, doc) {
	var css = Element.prototype.css,
		removeClass = Element.prototype.removeClass,
		addClass = Element.prototype.addClass;
		animate = Element.prototype.animate;
	function Accordion(options) {
		this.opts = this.setConfig(options);
		this.changMethod = this.opts.changMethod;
		this.count = this.opts.count;
		this.container = null;
		this.panels = [];
		this.panel_headers = [];
		this.panel_bodys = [];
	}
	Accordion.prototype = {
		constructor: Accordion,
		init: function () {
			this.setNode(this.count);
			this.setData();
			this.setHeadContent([
					'1',
					'2'
				]);
			this.setBodyContent();
			this.datainit();
			this.setIndex(this.panel_headers);
			this.on();
			
			return this;
		},
		setConfig: function(config) {
			var defaultConfig = {
				count: 5,
				curIndex: 3,
				mouse: 'click',
				changMethod: 'default'
			}
			for (var i in config) {
				if (config.hasOwnPrototype(i)) {
					defaultConfig[i] = config[i];
				}
			}
			return defaultConfig;
		},
		setData: function () {
			var count = this.count;
				len = this.panel_bodys.length,
				containerH = this.container.css('height'),
				headerH = this.panel_headers[0].css('height');
				
				css.call(this.panel_bodys, {
					'height': (containerH - headerH * this.count),
					'line-height': (containerH - headerH * this.count) 
				});
				
			switch (this.changMethod) {
				case 'default':
				css.call(this.panel_bodys, {display:'none'});
				css.call(this.panel_bodys[len-1],{display: 'block'});
			}
		},
		datainit: function () {
			
			var index = (this.opts.curIndex > this.count 
						? this.count : this.opts.curIndex) - 1;
				this.panel_headers[index].addClass('current');
			switch (this.changMethod) {
				case 'default':
					css.call(this.panel_bodys, {display: 'none'});
					this.panel_bodys[index].css({display: 'block'})
			} 
		},
		changeData: function (index) {
			var index = index;
				
			removeClass.call(this.panel_headers, 'current');	
			this.panel_headers[index].addClass('current');
			switch (this.changMethod) {
				case 'default':
					/*css.call(this.panel_bodys, {display: 'none'});
					this.panel_bodys[index].css({display: 'block'});
					break;*/
				case 'animate':
					css.call(this.panel_bodys, {'display': 'none'});
					this.panel_bodys[index].css({'display': 'block'});
					this.panel_bodys[index].animate({'height': 150});
			}
		},
		on: function() {
			
				
			if ( this.opts.mouse === 'click') {
				var _this = this;
				this.container.addEventListener('click', function(event) {
					var e = event || window.event,
						target = e.target || e.srcElement;
					if (target.hasClass('panel-header')) {
						_this.changeData(target.index);
					}
				})
			}
		},
		setNode: function (num) {
			var count = num,
				i = 0,
				panel = null,
				panel_header = null,
				panel_body = null,
				accordion = doc.createElement('div');
				accordion.addClass('accordion');
				this.container = accordion;
			for (; i < count; i++) {
				panel =	doc.createElement('div');
				panel_header = doc.createElement('div');
				panel_body = doc.createElement('div');
				// 添加类名
				panel.addClass('panel');
				panel_header.addClass('panel-header');
				panel_body.addClass('panel-body');

				panel.appendChild(panel_header);
				panel.appendChild(panel_body);
				accordion.appendChild(panel);

				this.panels.push(panel);
				this.panel_headers.push(panel_header);
				this.panel_bodys.push(panel_body);
			}
			doc.body.appendChild(accordion);
		},
		setHeadContent (textArr) {
			var elems = this.panel_headers,	
			defaultText = [
				'nav1',
				'nav2',
				'nav3',
				'nav4',
				'nav5'
			];
			this.setContent(elems, defaultText, textArr);
			return this;
		},
		setBodyContent: function (contArr) {
			var elems = this.panel_bodys;
			defaultConfig = [
				'cont1',
				'cont2',
				'cont3',
				'cont4',
				'cont5'
			];
			this.setContent(elems, defaultConfig, contArr);
			return this;
		},
		setContent: function (elems, defaultConfig, config) {
			var elems = elems
				elemsLen = elems.length,
				config = config || [];
				var arrlen = defaultConfig.length

			if (elemsLen > arrlen) {
				var diffLen = elemsLen - arrlen;
				for (var i = 0; i < diffLen; i++) {
					defaultConfig[defaultConfig.length] = "nav" + (defaultConfig.length + 1);
				}
			}
			if (type(config) === 'array' && !config.length == 0) {
				for (var j = 0,textArrLen = config.length; j < textArrLen; j++) {
					defaultConfig[j] = config[j];
				}
			}
			
			for (var m = 0; m < elemsLen; m++) {
				elems[m].innerHTML = defaultConfig[m];
			}
			return this;
		},
		setIndex: function (elems) {
			var i = 0;
				len = elems.length;
			for (;i < len; i++) {
				elems[i].index = i;
			}
			return this;
		}

	}


 win.accordion = function (options) {
	var optinons = optinons || {};
	return new Accordion(options).init();
}
return win.accordion;

})(window, document);