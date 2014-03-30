(function(){

	var KoModel = window.KoModel = function(gl){
		var self = this;
		self.gl = gl;
		self.verticesBuffer;
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

		initVerticesBuffer: function(vertices, itemSize, numItems){
			var self = this;
			self.verticesBuffer = new KoArrayBuffer(self.gl, vertices, itemSize, numItems);
		},

		draw: function(shaderProgram){
			var self = this,
				gl = self.gl;

			var buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(self.verticesBuffer.vertices), gl.STATIC_DRAW);

			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.vertexAttribPointer(shaderProgram.attributes.aVertexPosition, self.verticesBuffer.itemSize, gl.FLOAT, false, 0, 0);
			gl.uniformMatrix4fv(shaderProgram.uniforms.uMVMatrix, false, self.mvMatrix);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, self.verticesBuffer.numItems);
		}

	}, [Array]);

})();