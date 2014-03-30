(function(){

	var KoElementArrayBuffer = window.KoElementArrayBuffer = function(gl, vertices, itemSize){
		var self = this;
		KoBaseBuffer.call(self, gl, vertices, itemSize, gl.ELEMENT_ARRAY_BUFFER);
	};

	utils.extend(KoElementArrayBuffer.prototype = Object.create(KoBaseBuffer.prototype), {

		draw: function(){
			var self = this,
				gl = self.gl;

			gl.drawElements(gl.TRIANGLES, self.numItems, gl.UNSIGNED_SHORT, 0);
		}

	}, [Array]);

})();