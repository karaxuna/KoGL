import { chain } from '../utils';

abstract class KoBaseBuffer {
	gl: WebGLRenderingContext;
	vertices;
	itemSize;
	type;
	buffer;
	numItems;

	constructor(gl, vertices, itemSize, type) {
		this.gl = gl;
		this.vertices = vertices;
		this.type = type;
		this.buffer = gl.createBuffer();
		this.itemSize = itemSize;
		this.numItems = this.vertices.length / itemSize;
	}

	bind = chain(() => {
		this.gl.bindBuffer(this.type, this.buffer);
	})

	abstract fill = () => {
		return this;	
	}
}

export default KoBaseBuffer;
