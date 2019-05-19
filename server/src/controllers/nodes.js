const db = require('../connections/sqlite')

const readNodes = (req, res)  => {
  if (req.params.id) {
    // TO-DO parse int on id
    return db.all(`SELECT id, public, private FROM nodes WHERE id IS '${req.params.id}';`, (err, node) => {
      if (err) return res.status(400).json({ err })
      if (!node) return res.status(401).json({ error: 'Not found' });
      return res.status(200).json({ node })
    })
  }
  return db.all(`SELECT id, public, private FROM nodes;`, (err, nodes) => {
    if (err) return res.status(400).json({ err })
    if (!nodes) return res.status(401).json({ error: 'No nodes' });
    return res.status(200).json({ nodes })
  })
}

const createNodes = (req, res) => {
  console.log('create')
  const nodes = req.body.nodes
  // must use old function notation
  const stmt = db.prepare("INSERT INTO nodes(public, private) VALUES (?, ?)");
  nodes.map((a) => {
    return stmt.run([a.public, a.private]);
  })
  stmt.finalize((err) => {
    if (err) return res.status(400).json({ err })
    else return res.status(200).json({ nodes })
  });
}

const updateNode = (req, res)  => {
	res.status(200).json('Unimplemented nodes endpoint')
}

const deleteNode = (req, res)  => {
	res.status(200).json('Unimplemented nodes endpoint')
}

module.exports = {
  readNodes,
  createNodes,
  updateNode,
  deleteNode
}