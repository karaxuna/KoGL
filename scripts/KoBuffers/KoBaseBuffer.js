(function(){

	var KoBaseBuffer = window.KoBaseBuffer = function(gl, vertices, type){
		var self = this;
		self.gl = gl;
		self.vertices = vertices;
		self.type = type;
		self.buffer = gl.createBuffer();
	};

	utils.extend(KoBaseBuffer.prototype, {

		bind: function(){
			var self = this,
				gl = self.gl;

			gl.bindBuffer(gl.ARRAY_BUFFER, self.buffer);
		},

		init: function(){
			var self = this,
				gl = self.gl;

			self.bind();
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(self.vertices), gl.STATIC_DRAW);
		},

		draw: function(){
			var self = this,
				gl = self.gl;

			gl.drawArrays(gl.TRIANGLE_STRIP, 0, self.numItems);
		}

	}, [Array]);

})();