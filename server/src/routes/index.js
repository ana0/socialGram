const bodyParser = require('body-parser')
const cors = require('cors')
const login = require('../controllers/user')
const authMiddleware = require('../middleware/auth')
const nodes = require('../controllers/nodes')
const edges = require('../controllers/edges')

module.exports = (app) => {
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.get('/', (req, res) => res.status(200).json('Server listening'))

  app.post('/login', login)

  app.get('/nodes', authMiddleware, nodes.readNodes)
  app.get('/nodes/:id', authMiddleware, nodes.readNodes)
  app.post('/nodes', authMiddleware, nodes.createNodes)
  app.put('/nodes/:id', authMiddleware, nodes.updateNode)
  app.delete('/nodes/:id', authMiddleware, nodes.deleteNode)

  app.get('/edges/', edges.readEdges)
  app.post('/edges', edges.createEdges)
  app.put('/edges', (req, res) => res.status(200).json('Edges endpoint'))
  app.delete('/edges', (req, res) => res.status(200).json('Edges endpoint'))
}

