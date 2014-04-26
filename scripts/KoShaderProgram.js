(function(){

	var KoShaderProgram = window.KoShaderProgram = function(gl){
		var self = this;
		self.gl = gl;
		self.attributes = {};
		self.uniforms = {};
		self.program = gl.createProgram();
		self.fragmentShader;
		self.vertexShader;
	};

	utils.extend(KoShaderProgram.prototype, {

		addFragmentShader: function(seid){
			var self = this,
				gl = self.gl;

			var fragmentShader = self.fragmentShader = new KoShader(gl, gl.FRAGMENT_SHADER);
			fragmentShader.compile(seid);
			gl.attachShader(self.program, fragmentShader.shader);
		},

		addVertexShader: function(seid){
			var self = this,
				gl = self.gl;

			var vertexShader = self.vertexShader = new KoShader(gl, gl.VERTEX_SHADER);
			vertexShader.compile(seid);
			gl.attachShader(self.program, vertexShader.shader);
		},

		linkProgram: function(){
			var self = this,
				gl = self.gl;

			gl.linkProgram(self.program);
		},

		bindShaderVariables : function(attributes, uniforms){
			var self = this,
				gl = self.gl;

			utils.each(attributes, function(attribute){
				self.bindShaderAttribute(attribute);
			});

			utils.each(uniforms, function(uniform){
				self.bindShaderUniform(uniform);
			});
		},

		useProgram: function(attributes, uniforms){
			var self = this,
				gl = self.gl;

			gl.useProgram(self.program);
		},

		bindShaderAttribute: function(name){
			var self = this,
				gl = self.gl,
				attributes = self.attributes[name] = gl.getAttribLocation(self.program, name);

			gl.enableVertexAttribArray(attributes);
		},

		bindShaderUniform: function(name){
			var self = this,
				gl = self.gl,
				uniforms = self.uniforms[name] = gl.getUniformLocation(self.program, name);
		}

	}, [Array]);

})();