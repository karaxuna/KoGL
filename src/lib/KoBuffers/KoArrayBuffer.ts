import KoBaseBuffer from './KoBaseBuffer';
import { chain } from '../utils';

class KoArrayBuffer extends KoBaseBuffer {
	constructor(gl, vertices, itemSize) {
		super(gl, vertices, itemSize, gl.ARRAY_BUFFER);
	}

	draw = chain(() => {
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.numItems);
	})

	fill = chain(() => {
		this.gl.bufferData(this.type, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
	})
}

export default KoArrayBuffer;
