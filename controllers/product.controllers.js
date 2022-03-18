const Product = require("../models/Product");

// @desc Add Product
// @route POST api/admin/add-product
// @access Private
exports.addProduct = async (req, res, next) => {
  try {
    var images = [];
    var keys = [];
    for (var i = 0; i < req.files.length; i++) {
      images.push(req.files[i].location);
    }

    for (var i = 0; i < images.length; i++) {
      var ext = images[i].lastIndexOf("m/");
      keys.push({ Key: images[i].substr(ext + 2) });
    }

    const product = new Product({
      categoryId: req.body.categoryId,
      subcategoryId: req.body.subcategoryId,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      photos: images,
      keys: keys,
    });
    await product.save();
    return res.status(201).send(product);
  } catch (error) {
    return res.status(400).send("Unable to add new product", error);
  }
};

// @desc Product List
// @route GET api/admin/products/:id
// @access Public
exports.productList = async (req, res, next) => {
  try {
    const id = req.params.id;
    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);
    const result = [];
    const products = await Product.find({ subcategoryId: id });
    if (from || to) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].price >= from && products[i].price <= to) {
          result.push(products[i]);
        }
      }
      return res.status(200).send(result);
    }
    return res.status(200).send(products);
  } catch (error) {
    return res.status(400).send("Unable to return product list", error);
  }
};
