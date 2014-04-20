(function(){

	var KoElementArrayBuffer = window.KoElementArrayBuffer = function(gl, vertices, itemSize){
		var self = this;
		KoBaseBuffer.call(self, gl, vertices, itemSize, gl.ELEMENT_ARRAY_BUFFER);
	};

	utils.extend(KoElementArrayBuffer.prototype = Object.create(KoBaseBuffer.prototype), {

		draw: utils.chain(function(){
			var self = this,
				gl = self.gl;

			gl.drawElements(gl.TRIANGLES, self.vertices.length, gl.UNSIGNED_SHORT, 0);
		}),

		fill: utils.chain(function(){
			var self = this,
				gl = self.gl;

			gl.bufferData(self.type, new Uint16Array(self.vertices), gl.STATIC_DRAW);
		})

	}, [Array]);

})();