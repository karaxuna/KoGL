(function(){

	var KoArrayBuffer = window.KoArrayBuffer = function(gl, vertices, itemSize, numItems){
		var self = this;
		KoBaseBuffer.call(self, gl, vertices, gl.ARRAY_BUFFER);

		self.itemSize = itemSize;
		self.numItems = numItems;
	};

	utils.extend(KoArrayBuffer.prototype = Object.create(KoBaseBuffer.prototype), {

		

	}, [Array]);

})();