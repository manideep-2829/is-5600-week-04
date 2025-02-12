const path = require('path')

 /**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
function handleRoot (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

const Products = require('./products')

/**
 * Get a single product
 * @param {object} req
 * @param {object} res
 */
async function getProduct (req, res, next) {
    // Add CORS headers
    //res.setHeader('Access-Control-Allow-Origin', '*')
  
    const { id } = req.params
  
    const product = await Products.get(id)
    if (!product) {
      return next()
    }
    
    return res.json(product)
  }

// ...

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts (req, res) {
    
    const { offset = 0, limit = 25, tag } = req.query
  // Pass the limit and offset to the Products service
  res.json(await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  }))
    
}

const autoCatch = require('./lib/auto-catch')

// Update the module exports
module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
});

/**
 * Create a new product
 * @param {object} req
 * @param {object} res
 */
async function createProduct (req, res) {
  
  console.log('request body:', req.body)
  res.json(req.body)
}

///app.delete('/products/:id',api.deleteProduct)
//app.put('/products/:id',api.updateProduct)

/**
 * Update Products
 * @param {object} req
 * @param {object} res
 */
async function updateProduct(req,res)
{
  //res.status(200).send('Update Success');
  console.log('request body:', req.body)
  res.json(req.body)
  
  //console.log('200 Update Success',req.body)
  //res.json(req.body)
}

/**
 * Delete Products
 * @param {object} req
 * @param {object} res
 */
async function deleteProduct(req,res)
{
  console.log('202 - delete success',req.body)
  res.json(req.body)

}