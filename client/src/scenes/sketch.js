
export default function (p) {
  let edges = [];
  //let nodes = [];

  p.setup = function() {
    console.log(p.props)
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(200)
  }

  p.draw = function() {
  	if (p.props.links.length !== edges.length) {
  	  console.log(p.props.links)
      edges = p.props.links
      p.props.nodes.map((n) => {
        p.fill(255)
        p.stroke(255)
        p.circle(n.x, n.y, 20)
        p.fill(0)
        p.text(n.public, n.x, n.y);
        return true
      })
      edges.map(e => {
        p.stroke(0)
        p.line(e.source.x, e.source.y, e.target.x, e.target.y)
        return true
      })


  	}
  }
}