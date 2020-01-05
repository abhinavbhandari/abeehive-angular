export class Circle {
	x: number;
	y: number;
	r: number;
	fill: string;
	stroke: {width: number, color: string};
	context;
	opacity;

	constructor(x, y , r, fill, stroke, context, opacity) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.fill = fill;
		this.stroke = stroke;
		this.context = context;
		this.opacity = opacity;
	}

	draw() {
		this.context.globalAlpha = this.opacity || 1;
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
		if (this.stroke) {
			this.context.strokeStyle = this.stroke.color;
			this.context.lineWidth = this.stroke.width;
			this.context.stroke();
		}
		if (this.fill) {
			this.context.fillStyle = this.fill;
			this.context.fill();
		}
		this.context.closePath();
		this.context.globalAlpha = 1;
	}
}
