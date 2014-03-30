(function(){

	var KoArrayBuffer = window.KoArrayBuffer = function(gl, vertices, itemSize){
		var self = this;
		KoBaseBuffer.call(self, gl, vertices, itemSize, gl.ARRAY_BUFFER);
	};

	utils.extend(KoArrayBuffer.prototype = Object.create(KoBaseBuffer.prototype), {

		draw: function(){
			var self = this,
				gl = self.gl;

			gl.drawArrays(gl.TRIANGLE_STRIP, 0, self.numItems);
		}

	}, [Array]);

})();