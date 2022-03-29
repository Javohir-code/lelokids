const Product = require("../models/Product");
const Category = require("../models/Category");

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
      salePrice: req.body.salePrice,
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

// @desc Product List By Category
// @route GET api/products/:id
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

// @desc Get Product
// @route GET api/product/:id
// @access Public
exports.getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(400).send("Unable to return a product", error);
  }
};

// @desc Get All Products
// @route GET api/all-products
// @access Public
exports.getAllProducts = async (req, res, next) => {
  try {
    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);
    const category = req.query.category;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const limit = req.query.page ? parseInt(req.query.limit) : 0;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await Product.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    
    if (category) {
      const categories = await Category.find({});
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].name == category) {
          results.products = await Product.find({
            categoryId: categories[i]._id,
          })
            .limit(limit)
            .skip(startIndex)
            .exec();
        }
      }
    } else {
      results.products = await Product.find()
        .limit(limit)
        .skip(startIndex)
        .exec();
    }

    if(from || to) {
      
    }

    return res.status(200).send(results);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
