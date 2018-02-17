import KoBaseBuffer from './KoBaseBuffer';
import { chain } from '../utils';

class KoElementArrayBuffer extends KoBaseBuffer {
	constructor(gl, vertices, itemSize) {
		super(gl, vertices, itemSize, gl.ELEMENT_ARRAY_BUFFER);
	}

	draw = chain(() => {
		this.gl.drawElements(this.gl.TRIANGLES, this.vertices.length, this.gl.UNSIGNED_SHORT, 0);
	})

	fill = chain(() => {
		this.gl.bufferData(this.type, new Uint16Array(this.vertices), this.gl.STATIC_DRAW);
	})
}

export default KoElementArrayBuffer;
