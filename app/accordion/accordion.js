const dom = require('../dom/dom.js');

module.exports = (function (win, doc) {

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
			return this;
		},
		setConfig: function(config) {
			var defaultConfig = {
				count: 5,
				curIndex: 3,
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
				headerH = this.panel_headers[0].css('height'),
				css = Element.prototype.css;
				css.call(this.panel_bodys, {
					height: (containerH - headerH * this.count) + 'px',
					lineHeight: (containerH - headerH * this.count) + 'px'
				});
				
			switch (this.changMethod) {
				case 'default':
				css.call(this.panel_bodys, {display:'none'});
				css.call(this.panel_bodys[len-1],{display: 'block'});
			}
		},
		datainit: function () {
			
			var index = (this.opts.curIndex > this.count 
						? this.count : this.opts.curIndex) - 1,
				css = Element.prototype.css;
			switch (this.changMethod) {
				case 'default':
					css(this.panel_bodys, {display: 'none'});
					this.panel_bodys[index].css({display: 'block'})
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
		}
	}


 win.accordion = function (options) {
	var optinons = optinons || {};
	return new Accordion(options).init();
}
return win.accordion;

})(window, document);