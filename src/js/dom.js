HTMLElement.prototype = {
	constructor: HTMLElement,
	addClass: function (className) {
		this.className = this.className + ' ' + className;
	},
	removeClass: function(className) {
		this.className = className.replace( 
					new RegExp("(\\s|^)" + cName + "(\\s|$)" ), "");					
	}	
}