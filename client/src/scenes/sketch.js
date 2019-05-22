const countConnections= (nodes, edges) => {
  return nodes.map(n => {
    n.count = edges.reduce((count, e) => {
      if (e.toId === n.id || e.fromId === n.id) {
        count += 1
      }
      return count
    }, 0)
    return n
  })
}

const maxConnections = (nodes) => {
  let max;
  const list = [3, 2, 1]
  list.map(l => {
    max = nodes.reduce((m, n) => {
      if (n.count >= max) return m;
      if (n.count > m) return n.count;
      return m;
    }, 0)
    nodes = nodes.map(n => {
      if (n.count === max) { n.max = l }
      else if (n.count < max) { n.max = 0 }
      return n;
    })
    return l
  })
  return nodes
}

export default function (p) {
  let edges = [];
  let dragging = false;
  let nodes = [];
  let draggedNode = {};

  const setFill = (max) => {
    if (max === 3) { p.fill(0, 0, 255) }
    else if (max === 2) { p.fill(255, 0, 0) }
    else if (max === 1) { p.fill(0, 255, 0) }
    else { p.fill(255) }
  }

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
      nodes = countConnections(p.props.nodes, p.props.links)
      nodes = maxConnections(nodes)
      nodes = nodes.map((n) => {
        setFill(n.max)
        p.stroke(255)
        p.circle(n.x, n.y, 20)
        p.fill(0)
        p.text(`${n.public} ${n.count}`, n.x, n.y);
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
      nodes = countConnections(p.props.nodes, p.props.links)
      nodes = maxConnections(nodes)
      nodes = nodes.map((n) => {
        setFill(n.max)
        p.stroke(255)
        p.circle(n.x, n.y, 20)
        p.fill(0)
        p.text(`${n.public} ${n.count}`, n.x, n.y);
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