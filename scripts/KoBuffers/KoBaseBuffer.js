(function(){

	var KoBaseBuffer = window.KoBaseBuffer = function(gl, vertices, itemSize, type){
		var self = this;
		self.gl = gl;
		self.vertices = vertices;
		self.type = type;
		self.buffer = gl.createBuffer();
		self.itemSize = itemSize;
		self.numItems = self.vertices.length / itemSize;

		// fill buffer with data
		self
			.bind()
			.fill();
	};

	utils.extend(KoBaseBuffer.prototype, {

		bind: utils.chain(function(){
			var self = this,
				gl = self.gl;

			gl.bindBuffer(self.type, self.buffer);
		})

	}, [Array]);

})();