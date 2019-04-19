module.exports = Element.prototype.addClass
			   = HTMLElement.prototype.addClass = addClass;
function addClass(cName) {
	this.className = this.className + ' ' + cName;
}
function removeClass(cName) {
	this.className = this.className.replace( 
					new RegExp("(\\s|^)" + cName + "(\\s|$)" ), "");					
	
}