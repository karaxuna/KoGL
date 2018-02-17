import { mat4 } from 'gl-matrix';
import KoShaderProgram from './KoShaderProgram';
import KoModel from './KoModel';
import Mouse from './Mouse';

class KoGL {
	gl: WebGLRenderingContext;
	pMatrix;
	models;
	shaderProgram: KoShaderProgram;
	mouse: Mouse;

	constructor(canvas) {
		this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		this.pMatrix = mat4.create();
		this.models = [];
		this.shaderProgram;
		this.mouse = new Mouse(canvas);

		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);
	}

	addModel = (model) => {
		this.models.push(model);
	}

	createModel = () => {
		return new KoModel(this.gl);
	}

	clearScene = () => {
		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	}

	setCamera = () => {
		mat4.perspective(this.pMatrix, 45, this.gl.canvas.width / this.gl.canvas.height, 0.1, 100.0);
		this.gl.uniformMatrix4fv(this.shaderProgram.uniforms.uPMatrix, false, this.pMatrix);
	}

	drawScene = () => {
		this.models.forEach(model => {
			model.draw(this.shaderProgram);
		});
	}

	initShaderProgram = (fragmentShaderCode, vertexShaderCode) => {
		let shaderProgram = this.shaderProgram = new KoShaderProgram(this.gl);
		shaderProgram.addFragmentShader(fragmentShaderCode);
		shaderProgram.addVertexShader(vertexShaderCode);
		shaderProgram.linkProgram();
		shaderProgram.bindShaderVariables(['aVertexPosition', 'aVertexColor'], ['uPMatrix', 'uMVMatrix']);
		shaderProgram.useProgram();
	}
}

export default KoGL;
