(function(){

	var KoGL = window.KoGL = function(canvas){
		var self = this;
		var gl = self.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    	self.pMatrix = mat4.create();
    	self.models = [];
    	self.shaderProgram;
    	
    	gl.enable(gl.DEPTH_TEST);
    	gl.depthFunc(gl.LEQUAL);
	};

	utils.extend(KoGL.prototype, {

		addModel: function(model){
			var self = this;
			self.models.push(model);
		},

		createModel: function(){
			var self = this;
			return new KoModel(self.gl);
		},

		clearScene: function(){
			var self = this,
				gl = self.gl;

			gl.clearColor(0.0, 0.0, 0.0, 1.0);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		},

		setCamera: function(){
			var self = this,
				gl = self.gl;

			mat4.perspective(45, gl.canvas.width / gl.canvas.height, 0.1, 100.0, self.pMatrix);
			gl.uniformMatrix4fv(self.shaderProgram.uniforms.uPMatrix, false, self.pMatrix);
		},

		drawScene: function(){
			var self = this,
				gl = self.gl;

	  		utils.each(self.models, function(model){
	  			model.draw(self.shaderProgram);
	  		});
		},

		initShaderProgram: function(fssid, vssid){
			var self = this,
				gl = self.gl;

			var shaderProgram = self.shaderProgram = new KoShaderProgram(gl);
			shaderProgram.addFragmentShader(fssid);
			shaderProgram.addVertexShader(vssid);
			shaderProgram.linkProgram();
			shaderProgram.bindShaderVariables(['aVertexPosition', 'aVertexColor'], ['uPMatrix', 'uMVMatrix']);
			shaderProgram.useProgram();
		}

	}, [Array]);

})();