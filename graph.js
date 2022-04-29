import * as svg from './more.js'

export const frame = svg.frame


export function node(...p) {
	return svg.circleWithLetter(...p)
}

export function edge(...p) {
	return svg.line(...p) + svg.lineBubbles(...p)
}


export class Graph extends svg.SVG {
	nodes = []
	edges = []
	get children() { return [...this.edges, ...this.nodes] }

	node(...p) {
		this.nodes.push(node(...p))
	}
	edge(...p) {
		this.edges.push(edge(...p))
	}
}




// trigonometry helper
export const deg2rad = deg => (deg * Math.PI) / 180.0;
export const circlePoint = (c, r, deg) => ({
	x: c.x + r * Math.cos(deg2rad(deg - 90)),
	y: c.y + r * Math.sin(deg2rad(deg - 90)),
	// c: String.fromCharCode(65 + i)
})
export const circlePoints = (c, r, count) =>
	Array(count).fill(1).map((x, i) => circlePoint(c, r, 360 / count * i))






