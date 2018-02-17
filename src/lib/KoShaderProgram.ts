import KoShader from './KoShader';

class KoShaderProgram {
	gl: WebGLRenderingContext;
	attributes;
	uniforms;
	program;
	fragmentShader;
	vertexShader;

	constructor(gl) {
		this.gl = gl;
		this.attributes = {};
		this.uniforms = {};
		this.program = gl.createProgram();
		this.fragmentShader;
		this.vertexShader;
	}

	addFragmentShader = code => {
		this.fragmentShader = new KoShader(this.gl, this.gl.FRAGMENT_SHADER, code);
		this.fragmentShader.compile();
		this.gl.attachShader(this.program, this.fragmentShader.shader);
	}

	addVertexShader = code => {
		this.vertexShader = new KoShader(this.gl, this.gl.VERTEX_SHADER, code);
		this.vertexShader.compile();
		this.gl.attachShader(this.program, this.vertexShader.shader);
	}

	linkProgram = () => {
		this.gl.linkProgram(this.program);
	}

	bindShaderVariables = (attributes, uniforms) => {
		attributes.forEach(attribute => {
			this.bindShaderAttribute(attribute);
		});

		uniforms.forEach(uniform => {
			this.bindShaderUniform(uniform);
		});
	}

	assignShaderAttribute = (name, buffer) => {
		var self = this,
			gl = self.gl,
			attributes = self.attributes;

		var attrLocation = attributes[name];
		buffer.bind();
		gl.vertexAttribPointer(attrLocation, buffer.itemSize, gl.FLOAT, false, 0, 0);
	}

	assignShaderUniform = (name, matrix) => {
		var self = this,
			gl = self.gl;

		gl.uniformMatrix4fv(self.uniforms[name], false, matrix);
	}

	useProgram = () => {
		var self = this,
			gl = self.gl;

		gl.useProgram(self.program);
	}

	bindShaderAttribute = (name) => {
		var self = this,
			gl = self.gl,
			attributes = self.attributes[name] = gl.getAttribLocation(self.program, name);

		gl.enableVertexAttribArray(attributes);
	}

	bindShaderUniform = (name) => {
		var self = this,
			gl = self.gl,
			uniforms = self.uniforms[name] = gl.getUniformLocation(self.program, name);
	}
}

export default KoShaderProgram;
