const dom = require('../dom/dom.js');

module.exports = (function (win, doc) {

	function Accordion(options) {
		this.opts = this.setConfig(options);
		this.panels = [];
		this.panel_headers = [];
		this.panel_bodys = [];
	}
	Accordion.prototype = {
		constructor: Accordion,
		init: function () {
			this.setNode(3);
			console.log(this.opts)
		},
		setConfig: function(config) {
			var defaultConfig = {
				count: 5,
				curIndex: 1,
				changMethod: 'default'
			}
			for (var i in config) {
				if (config.hasOwnPrototype(i)) {
					defaultConfig[i] = config[i];
				}
			}
			return defaultConfig;
		},

		setNode: function (num) {
			var count = num ,
				i = 0,
				panel = null,
				panel_header = null,
				panel_body = null,
				accordion = doc.createElement('div');
			for (; i < count; i++) {
				panel =	doc.createElement('div');
				panel_header = doc.createElement('div');
				panel_body = doc.createElement('div');
				// 添加类名
				panel.addClass('panel');
				panel_header.addClass('panel_header');
				panel_body.addClass('panel_body');

				panel.appendChild(panel_header);
				panel.appendChild(panel_body);
				accordion.appendChild(panel);

				this.panels.push(panel);
				this.panel_headers.push(panel_header);
				this.panel_bodys.push(panel_body);
			}
			doc.body.appendChild(accordion);
		}
	}


return win.accordion = function (options) {
	var optinons = optinons || {};
	console.log(123);
	new Accordion(options).init();
}

})(window, document);