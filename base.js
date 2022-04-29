
// import CSS from './css.js'

// const ROUND = {}// stroke_linecap: "round", stroke_linejoin: "round", }
const WIDTH = 10
export function node(name, attributes = {}, children = []) {
	// console.log('svg node', attributes, children)
	let attr = Object.entries(attributes).filter(x => x[1] !== undefined).map(x => `${x[0].replace('_', '-')}="${x[1]}"`).join(' ')
	return `<${name} ${attr}`
		+ (children.length
			? `>${children.join('')}</${name}>`
			: '/>'
		)
}
export function style(css) { return `<style>${css}</style>` }
export function frame({ width = 100, height = 100, inline = false, ...x } = {}, children = []) {
	// console.log('svg frame', dim, children)
	// children.unshift(style(CSS))
	return node('svg', {
		viewbox: '0 0 ' + width + ' ' + height,
		width: inline ? undefined : width + 'px',
		height: inline ? undefined : height + 'px',
		xmlns: "http://www.w3.org/2000/svg",
		version: "1.1",
	}, children)
}


export function xy2wh(p1, p2) {
	if (p2.width) return p2
	else return { width: Math.abs(p1.x - p2.x), height: Math.abs(p1.y - p2.y) }
}
function dotted(x) {
	if (!x.dotted) return {}
	return { stroke_dasharray: '0 ' + ((x.width ?? WIDTH) * 2) }
}

export function rect(p1, p2, { ...x } = {}) {
	return node('rect', {
		...p1,
		...xy2wh(p1, p2),
		fill: x.color ?? 'gray',
		// ...ROUND,
		...x
	})
}

export function line(p1, p2, x = {}, children = []) {
	// console.log('line', x)
	return node('line', {
		x1: p1.x, y1: p1.y,
		x2: p2.x, y2: p2.y,
		stroke_width: x.width ?? WIDTH,
		stroke: x.color ?? '',
		...dotted(x),
		...x
	}, children)
}
export function lines(points = [], x = {}) {
	// console.log('points', points.slice(1).map((p, i) => [p, i]))
	return group(points.slice(1).map((p, i) => line(points[i], p, x)))
}
let ps = p => p.x + ' ' + p.y

export function polyline(points = [], x = {}) {
	return node('polyline', {
		points: points.map(p => ps(p)).join(' '),
		stroke_width: x.width ?? WIDTH,
		stroke: x.color ?? 'gray',
		fill: 'transparent',
		...dotted(x),
		...x
	})
}

export function path(points = [], { width = WIDTH, color = 'gray', close = true, ...x } = {}) {
	//  <path d="M150 0 L75 200 L225 200 Z" />
	let d = 'M ' + ps(points[0]) + points.slice(1).map(p => 'L ' + ps(p)).join(' ') + (close ? 'Z' : '')
	return node('path', {
		d,
		stroke_width: width,
		stroke: color,
		fill: 'transparent',
		...dotted(x),
		...x
	})
}

export function circle(p, { radius = WIDTH, color = 'gray', ...x } = {}) {
	return node('circle', {
		cx: p.x, cy: p.y,
		r: radius,
		fill: color,
		...x
	})
}
// export const rect = (p, dim, x = {}) => node('rect', { x: p.x, y: p.y, width: dim.w, height: dim.h, stroke: x.color, stroke_linecap: "round", ...x })
// export const line = (p1, p2, x = {}) => node('line', { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, stroke_width: x.w ?? 1, stroke: x.color ?? 'black', stroke_linecap: "round", ...x })
// export const circle = (p = { x: 5, y: 5, r: 5 }, x = {}) => node('circle', { cx: p.x, cy: p.y, r: p.r ?? 5, ...x })
export function text(p, { text = 'text...', color = 'gray', center = false, ...x } = {}) {
	// if (center) x = { ...x, text_anchor: "middle", alignment_baseline: "central" }
	return node('text', {
		...p,
		fill: color,
		class: x.class ?? '',
		// font_family: 'sans-serif',
		...x
	}, [text])
}

export function group(children = [], attributes = {}) {
	return node('g', attributes, children)
}


export class SVG {
	_children = []

	constructor(w = 100, h = 100) {
		this.dim = { w, h }
		this.style(CSS)
	}
	style(p) {
		console.log('add style', p.length)
		this._children.push(`<style>${p}</style>`)
		return this
	}
	child(c) {
		this._children.push(c)
		return this
	}

	get children() { return this._children }

	toString() {
		// console.log('svg to string', this.children)
		return frame(this.dim, this.children)
	}
}





