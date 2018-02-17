import { mat4, glMatrix } from 'gl-matrix';
import KoArrayBuffer from './KoBuffers/KoArrayBuffer';
import KoElementArrayBuffer from './KoBuffers/KoElementArrayBuffer';

class KoModel {
	gl: WebGLRenderingContext;
	verticesBuffer;
	verticesColorBuffer;
	verticesIndexBuffer;
	mvMatrix;

	constructor(gl) {
		this.gl = gl;
		this.verticesBuffer;
		this.verticesColorBuffer;
		this.mvMatrix = mat4.create();
		mat4.identity(this.mvMatrix);
	}

	translate = (to) => {
		var self = this;
		mat4.translate(self.mvMatrix, self.mvMatrix, to);
	}

	rotate = (degrees, axis) => {
		var self = this;
		var radians = glMatrix.toRadian(degrees);
		mat4.rotate(self.mvMatrix, self.mvMatrix, radians, axis);
	}

	initVerticesBuffer = (vertices, itemSize) => {
		var self = this;
		self.verticesBuffer = new KoArrayBuffer(self.gl, vertices, itemSize).bind().fill();
	}

	initVerticesIndexBuffer = (vertices, itemSize) => {
		var self = this;
		self.verticesIndexBuffer = new KoElementArrayBuffer(self.gl, vertices, itemSize).bind().fill();
	}

	initVerticesColorBuffer = (vertices, itemSize) => {
		var self = this;
		self.verticesColorBuffer = new KoArrayBuffer(self.gl, vertices, itemSize).bind().fill();
	}

	draw = (shaderProgram) => {
		shaderProgram.assignShaderAttribute('aVertexColor', this.verticesColorBuffer);
		shaderProgram.assignShaderAttribute('aVertexPosition', this.verticesBuffer);
		shaderProgram.assignShaderUniform('uMVMatrix', this.mvMatrix);

		this.verticesIndexBuffer.bind();
		this.verticesIndexBuffer.draw();
	}
}

export default KoModel;
