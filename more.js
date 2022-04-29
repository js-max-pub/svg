export * from './base.js'

import * as svg from './base.js'

export function circleWithLetter(p, circle = {}, letter = {}, options = {}) {
	// console.log('letter', text)
	let font_size = circle.radius * 2 - 2
	return svg.group([
		svg.circle(p, {
			radius: circle.radius ?? 10,
			color: circle.color ?? 'gray',
			...circle
		}),
		svg.text(p, {
			font_size,
			color: letter.color ?? 'white',
			text: letter.text ?? 'X',
			class: letter.class ?? 'center',
			...letter
		})
	], options)
}

// other helper functions
// export const uppercaseLetter = x => typeof x == 'string' ? x.toUpperCase()[0] : String.fromCharCode(65 + x)
export const ABC = x => String.fromCharCode(65 + x)




export function lineLength(p1, p2) {
	return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** 0.5
}

export function lineFragment(p1, p2, distance = 10) {
	let len = lineLength(p1, p2)
	// console.log('line-length', len)
	return { x: (p2.x - p1.x) / len * distance, y: (p2.y - p1.y) / len * distance }
}

export function pointOnLine(p1, p2, distance = 10) {
	let fragment = lineFragment(p1, p2, distance)
	// console.log('fragment', fragment)
	return { x: p1.x + fragment.x, y: p1.y + fragment.y }
}

export function lineBubbles(p1, p2, x = {}) {
	// console.log('line weight', weight)
	// return line(p1, p2, { stroke: x.color ?? 'gray' })
	return circleWithLetter(pointOnLine(p1, p2, x.distance), x, x)
		+ circleWithLetter(pointOnLine(p2, p1, x.distance), x, x)
}

export function lineWithBubbles(p1, p2, line = {}, bubble = {}) {
	return svg.group([svg.line(p1, p2, line), lineBubbles(p1, p2, bubble)])
}



// trigonometry
export const deg2rad = deg => (deg * Math.PI) / 180.0;
export const pointOnCircle = (c, r, deg) => ({
	x: c.x + r * Math.cos(deg2rad(deg - 90)),
	y: c.y + r * Math.sin(deg2rad(deg - 90)),
})
export const pointsOnCircle = (c, r, count) => Array(count).fill(1).map((x, i) => pointOnCircle(c, r, 360 / count * i))




function polarToCartesian(centerX, centerY, radius, angleInDegrees) { // == pointOnCircle
	var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

	return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians))
	};
}

function describeArc(x, y, radius, startAngle, endAngle, o = {}) {

	var start = polarToCartesian(x, y, radius, endAngle);
	var end = polarToCartesian(x, y, radius, startAngle);

	var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

	var d = [
		"M", start.x, start.y,
		"A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
		"L", start.x, start.y,
		"Z"
	].join(" ");

	return d;
}
export function arc(...p) {
	return svg.node('path', {
		d: describeArc(...p)
	})
}