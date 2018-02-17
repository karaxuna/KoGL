import { mat4 } from 'gl-matrix';
import KoShaderProgram from './KoShaderProgram';
import KoModel from './KoModel';

class KoGL {
	gl: WebGLRenderingContext;
	pMatrix;
	models;
	shaderProgram: KoShaderProgram;

	constructor(canvas) {
		this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		this.pMatrix = mat4.create();
		this.models = [];
		this.shaderProgram;

		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);
	}

	addModel = (model) => {
		var self = this;
		self.models.push(model);
	}

	createModel = () => {
		var self = this;
		return new KoModel(self.gl);
	}

	clearScene = () => {
		var self = this,
			gl = self.gl;

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}

	setCamera = () => {
		var self = this,
			gl = self.gl;

		mat4.perspective(self.pMatrix, 45, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
		gl.uniformMatrix4fv(self.shaderProgram.uniforms.uPMatrix, false, self.pMatrix);
	}

	drawScene = () => {
		var self = this,
			gl = self.gl;

		self.models.forEach(function (model) {
			model.draw(self.shaderProgram);
		});
	}

	initShaderProgram = (fragmentShaderCode, vertexShaderCode) => {
		var self = this,
			gl = self.gl;

		var shaderProgram = self.shaderProgram = new KoShaderProgram(gl);
		shaderProgram.addFragmentShader(fragmentShaderCode);
		shaderProgram.addVertexShader(vertexShaderCode);
		shaderProgram.linkProgram();
		shaderProgram.bindShaderVariables(['aVertexPosition', 'aVertexColor'], ['uPMatrix', 'uMVMatrix']);
		shaderProgram.useProgram();
	}
}

export default KoGL;
