(function(){

	var KoModel = window.KoModel = function(gl){
		var self = this;
		self.gl = gl;
		self.verticesBuffer;
		self.verticesColorBuffer;
		var mvMatrix = self.mvMatrix = mat4.create();
    	mat4.identity(mvMatrix);
	};

	utils.extend(KoModel.prototype, {

		translate: function(to){
			var self = this;
			mat4.translate(self.mvMatrix, to);
		},

		rotate: function(degrees, axis){
			var self = this;
			var radians = utils.toRadians(degrees);
			mat4.rotate(self.mvMatrix, radians, axis);
		},

		initVerticesBuffer: function(vertices, itemSize){
			var self = this;
			self.verticesBuffer = new KoArrayBuffer(self.gl, vertices, itemSize);
		},

		initVerticesIndexBuffer: function(vertices, itemSize){
			var self = this;
			self.verticesIndexBuffer = new KoElementArrayBuffer(self.gl, vertices, itemSize);
		},

		initVerticesColorBuffer: function(vertices, itemSize){
			var self = this;
			self.verticesColorBuffer = new KoArrayBuffer(self.gl, vertices, itemSize);
		},

		draw: function(shaderProgram){
			var self = this,
				gl = self.gl,
				verticesIndexBuffer = self.verticesIndexBuffer;

			shaderProgram.assignShaderAttribute('aVertexColor', self.verticesColorBuffer);
			shaderProgram.assignShaderAttribute('aVertexPosition', self.verticesBuffer);
			shaderProgram.assignShaderUniform('uMVMatrix', self.mvMatrix);

			verticesIndexBuffer.bind();
			verticesIndexBuffer.draw();
		}

	}, [Array]);

})();