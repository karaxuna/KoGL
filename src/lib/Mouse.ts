class Mouse {
    down: boolean;
    position: { x: number, y: number };
    container: HTMLElement;
    movement: { x: number, y: number };

    constructor(container) {
        this.container = container;
        this.down = false;
        this.position = { x: null, y: null };
        this.movement = { x: 0, y: 0 };
    }

    handleMouseMove = e => {
        this.position.x = e.clientX - this.container.offsetLeft + document.body.scrollLeft;
        this.position.y = e.clientY - this.container.offsetTop + document.body.scrollTop;
    }

    handleMouseDown = e => {
        this.down = true;
    }

    handleMouseUp = e => {
        this.down = false;
    }

    bind() {
        this.container.addEventListener('mousemove', this.handleMouseMove);
        this.container.addEventListener('mousedown', this.handleMouseDown);
        this.container.addEventListener('mouseup', this.handleMouseUp);
    }

    unbind() {
        this.container.removeEventListener('mousemove', this.handleMouseMove);
        this.container.removeEventListener('mousedown', this.handleMouseDown);
        this.container.removeEventListener('mouseup', this.handleMouseUp);
    }
}

export default Mouse;
