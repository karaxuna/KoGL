(function(){

	var KoShader = window.KoShader = function(gl, type){
		var self = this;
		self.gl = gl;
		self.type = type;
	};

	utils.extend(KoShader.prototype, {

		compile: function(seid){
			var self = this,
				gl = self.gl,
				element = self.element = document.getElementById(seid),
				type = self.type,
				content = self.content = utils.readContent(element),
				shader = self.shader = gl.createShader(type);

			gl.shaderSource(shader, content);
			gl.compileShader(shader);
		}

	}, [Array]);

})();