


export default function (p) {
  let edges = [];
  let dragging = false;
  let nodes = [];
  let draggedNode = {};

  p.mousePressed = () => {
    nodes.map((n, index) => {
      if (p.mouseX > (n.x - 10) && p.mouseX < (n.x + 10) && p.mouseY > (n.y - 10) && p.mouseY < (n.y + 20)) {
        dragging = true;
        draggedNode = index;
      }
      return n
    })
  }

  p.mouseDragged = () => {
    nodes[draggedNode].x = p.mouseX
    nodes[draggedNode].y = p.mouseY
  }

  p.mouseReleased = () => {
    dragging = false;
  }

  p.setup = () => {
    console.log(p.props)
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(200)
  }

  p.draw = () => {
  	if (p.props.links.length !== edges.length) {
  	  console.log(p.props.links)
      nodes = p.props.nodes.map((n) => {
        p.fill(255)
        p.stroke(255)
        p.circle(n.x, n.y, 20)
        p.fill(0)
        p.text(n.public, n.x, n.y);
        return n
      })
      edges = p.props.links.map(e => {
        p.stroke(0)
        p.line(e.source.x, e.source.y, e.target.x, e.target.y)
        return e
      })
  	}

    if (dragging) {
      p.background(200)
      nodes = p.props.nodes.map((n) => {
        p.fill(255)
        p.stroke(255)
        p.circle(n.x, n.y, 20)
        p.fill(0)
        p.text(n.public, n.x, n.y);
        return n
      })
      edges = p.props.links.map(e => {
        p.stroke(0)
        p.line(e.source.x, e.source.y, e.target.x, e.target.y)
        return e
      })
    }
  }
}