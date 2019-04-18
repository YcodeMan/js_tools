
module.exports = (function () {

	function Accordion(options) {
		this.opts = this.setConfig(options);
	}
	Accordion.prototype = {
		constructor: Accordion,
		init: function () {

		},
		setConfig: function(config) {
			var defaultConfig = {
				count: 5,
				curIndex: 1,
				changMethod: 'default'
			}
		},
		setNode: function (num) {
			
		}
	}


return win.accordion = function (options) {
	var optinons = optinons || {};
	new Accordion(options).init();
}

})(window, document);