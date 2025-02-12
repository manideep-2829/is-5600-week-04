const fs = require('fs').promises
const path = require('path')
const express = require('express')

// Set the port
const port = process.env.PORT || 3000

// Boot the app
const app = express()

// Register the public directory

const api = require('./api')// Register the public directory
app.use(express.static(__dirname + '/public'));
// register the routes
app.get('/products', listProducts)
app.get('/', handleRoot);
app.get('/products', api.listProducts)
app.get('/', api.handleRoot);
app.get('/products/:id', api.getProduct)

app.delete('delete/:id',api.deleteProduct)
app.put('update/:id',api.updateProduct)
// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))

const middleware = require('./middleware')

// Register our upcoming middleware
app.use(middleware.cors)
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.post('/products',api.createProduct)
app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}
/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  const productsFile = path.join(__dirname, 'data/full-products.json')
  try {
    const data = await fs.readFile(productsFile)
    res.json(JSON.parse(data))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
