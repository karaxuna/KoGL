(function(){

	var KoElementArrayBuffer = window.KoElementArrayBuffer = function(gl, vertices){
		var self = this;
		KoBaseBuffer.call(self, gl, vertices, gl.ELEMENT_ARRAY_BUFFER);
	};

	utils.extend(KoElementArrayBuffer.prototype = Object.create(KoBaseBuffer.prototype), {

		

	}, [Array]);

})();