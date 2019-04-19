module.exports = Element.prototype.addClass
			   = HTMLDocument.prototype.addClass = addClass;
			   Element.prototype.removeClass 
			   = HTMLDocument.prototype.removeClass = removeClass;

function addClass(cName) {
	var len = this.length || 0;
	if (len > 0) {
		for (var i = 0; i < len; i++) {
			this[i] = this[i].addClass(cName);
		}
	} else {
		this.className = this.className + ' ' + cName;
	}
	return this;
}
function removeClass(cName) {
	var len = this.length || 0;
	if (len > 0) {
		for (var i = 0; i < len; i++) {
			this[i] = this[i].className = this[i].className.replace( 
					new RegExp("(\\s|^)" + cName + "(\\s|$)" ), "");	
		}
	}
	this.className = this.className.replace( 
					new RegExp("(\\s|^)" + cName + "(\\s|$)" ), "");
	return this;					
}