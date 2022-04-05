const express = require("express");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid").v4;
const path = require("path");
const auth = require("../middleware/auth");

const router = express.Router();

const {
  addProduct,
  productList,
  getProduct,
  getAllProducts,
  deleteProduct,
  bestSelling,
} = require("../controllers/product.controllers");

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({ apiVersion: "2006-03-01" });
// Needs AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "lelokids",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuid()}${ext}`);
    },
  }),
});

router
  .route("/admin/add-product")
  .post(auth, upload.array("photos"), addProduct);
router.route("/products/:id").get(productList);
router.route("/product/:id").get(getProduct);
router.route("/all-products").get(getAllProducts);
router.route("/admin/delete-product/:id").delete(auth, deleteProduct);
router.route("/best-selling").get(bestSelling);

module.exports = router;
