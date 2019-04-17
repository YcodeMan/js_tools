
module.exports = (function () {

	function Accordion(options) {
		this.opts = this.setConfig(options);
	}
	Accordion.prototype = {
		constructor: Accordion,
		init: function () {

		},
		setConfig: function(config) {
			var defaultCnfig = {
				
			}
		}
	}


return win.accordion = function (options) {
	var optinons = optinons || {};
	new Accordion(options).init();
}

})(window, document);