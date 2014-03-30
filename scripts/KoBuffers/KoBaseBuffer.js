(function(){

	var KoBaseBuffer = window.KoBaseBuffer = function(gl, vertices, itemSize, type){
		var self = this;
		self.gl = gl;
		self.vertices = vertices;
		self.type = type;
		self.buffer = gl.createBuffer();
		self.itemSize = itemSize;
		self.numItems = self.vertices.length / itemSize;
	};

	utils.extend(KoBaseBuffer.prototype, {

		bind: utils.chain(function(){
			var self = this,
				gl = self.gl;

			gl.bindBuffer(self.type, self.buffer);
		}),

		init: utils.chain(function(){
			var self = this,
				gl = self.gl;

			self.bind();
			gl.bufferData(self.type, new Float32Array(self.vertices), gl.STATIC_DRAW);
		})

	}, [Array]);

})();