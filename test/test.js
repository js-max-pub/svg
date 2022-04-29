import * as graph from '../graph.js'
import * as svg from '../more.js'
import { XML } from '../../xml/mod.js'
import { SVG } from '../base.js'

// let points = graph.circlePoints({ x: 50, y: 50 }, 40, 5)
// let points = graph.circlePoints({ x: 250, y: 250 }, 220, 5)

// let g = new graph.Graph(500, 500)

// points.map((p, i) => g.node(p, { radius: 30, color: 'gray', text: i }))
// g.edge(points[0], points[1], { width: 10, color: 'red', bubble: { text: '5', radius: 10, distance: 50 } })
// g.edge(points[2], points[4], { width: 10, color: 'blue', bubble: { text: '5', radius: 10, distance: 50 } })
// // console.log('sting', g.toString())
// Deno.writeTextFileSync('graph.svg', g.toString())
// Deno.writeTextFileSync('graph.pretty.svg', XML.parse(g.toString()).toString())

// let s = new svg.SVG(500, 500).style(`.c1{fill:red}`)
// s.child(svg.rect({ x: 100, y: 100 }, { x: 200, y: 200 }, { class: 'c1', stroke: 'green', stroke_width: 10 }))
// s.child(svg.circleWithLetter({ x: 300, y: 300 }, { radius: 20, color: { letter: 'red' } }))
// // s.child(svg.path([{ x: 100, y: 100 }, { x: 300, y: 200 }, { x: 200, y: 300 }], { dotted: true }))
// // s.child(svg.polyline([{ x: 100, y: 100 }, { x: 300, y: 200 }, { x: 200, y: 300 }], { dotted: true }))
// s.child(svg.lines([{ x: 100, y: 100 }, { x: 300, y: 200 }, { x: 200, y: 300 }], { width: 7, dotted: true }))
// Deno.writeTextFileSync('test.svg', s.toString())
// Deno.writeTextFileSync('test.pretty.svg', XML.parse(s.toString()).toString())

let t = svg.frame({ width: 500, height: 500 }, [
	// svg.style(``),
	svg.rect({ x: 100, y: 100 }, { x: 200, y: 200 }, { class: 'c1', stroke: 'green', stroke_width: 10 }),
	svg.lines([{ x: 100, y: 100 }, { x: 300, y: 200 }, { x: 200, y: 300 }], { width: 7, dotted: true })
])
Deno.writeTextFileSync('test2.pretty.svg', XML.parse(t).toString())



let points = graph.circlePoints({ x: 250, y: 250 }, 220, 5)
// points.map((p, i) => g.node(p, { radius: 30, color: 'gray', text: i }))
// g.edge(points[0], points[1], { width: 10, color: 'red', bubble: { text: '5', radius: 10, distance: 50 } })
// g.edge(points[2], points[4], { width: 10, color: 'blue', bubble: { text: '5', radius: 10, distance: 50 } })

t = svg.frame({ width: 500, height: 500 }, [
	svg.lineWithBubbles(points[0], points[1], { width: 5, color: 'red' }, { text: '5', radius: 10, distance: 50 }),
	svg.lineWithBubbles(points[2], points[4], { width: 10, color: 'green' }, { text: '5', radius: 10, distance: 50 }),
	points.map((p, i) => svg.circleWithLetter(p, { radius: 30, color: 'orange' }, { text: svg.ABC(i) })),
])
Deno.writeTextFileSync('graph2.pretty.svg', XML.parse(t).toString())


t = svg.frame({ width: 500, height: 500 }, [
	svg.arc(250, 250, 100, 20, 50),
])
Deno.writeTextFileSync('arc.svg', XML.parse(t).toString())