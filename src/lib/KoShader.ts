import { chain } from './utils';

class KoShader {
	gl: WebGLRenderingContext;
	type;
	code;
	shader: WebGLShader;

	constructor(gl, type, code) {
		this.gl = gl;
		this.type = type;
		this.code = code;
		this.shader = this.gl.createShader(this.type);
	}

	compile = chain(() => {
		this.gl.shaderSource(this.shader, this.code);
		this.gl.compileShader(this.shader);
	})
}

export default KoShader;
