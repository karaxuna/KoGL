declare let module: any;
import KoGL from '@lib/KoGL';
import data from './models/suzanne';

if (module.hot) {
    module.hot.accept(() => {
        window.location.reload();
    });
}

var canvas = document.getElementById('glcanvas');
var koGL = new KoGL(canvas);

let fragmentShaderCode = `
    varying lowp vec4 vColor;
            
    void main(void) {
        gl_FragColor = vColor;
    }
`;

let vertexShaderCode = `
    attribute vec3 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    varying lowp vec4 vColor;

    void main(void) {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        vColor = aVertexColor;
    }
`;

koGL.initShaderProgram(fragmentShaderCode, vertexShaderCode);
koGL.setCamera();

let suzanne = koGL.createModel();
suzanne.initVerticesBuffer(data.vertices, 3);
suzanne.initVerticesColorBuffer(data.colors, 4);
suzanne.initVerticesIndexBuffer(data.indices, 3);

koGL.addModel(suzanne);
suzanne.translate([0.0, 0.0, -6.0]);

var mouse = {
    x: null,
    y: null,
    down: false
};

canvas.addEventListener('mousedown', function () {
    mouse.down = true;
});

canvas.addEventListener('mouseup', function () {
    mouse.down = false;
});

canvas.addEventListener('mousemove', function (e: any) {
    var x = mouse.x = e.pageX - this.offsetLeft;
    var y = mouse.y = e.pageY - this.offsetTop;

    var movement = {
        x: e.movementX,
        y: e.movementY
    };

    if (mouse.down) {
        suzanne.rotate(movement.x, [0, 1, 0]);
        suzanne.rotate(movement.y, [1, 0, 0]);
    }
});

canvas.addEventListener('mousewheel', function (e) {
    suzanne.translate([0.0, 0.0, e.deltaY / 100]);
});

(function animate() {
    requestAnimationFrame(animate);

    koGL.clearScene();
    koGL.drawScene();

    if (!mouse.down) {
        suzanne.rotate(1, [0, 1, 0]);
        suzanne.rotate(1, [1, 0, 0]);
    }
})();
