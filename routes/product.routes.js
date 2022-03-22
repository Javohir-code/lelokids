require("dotenv").config();

const express = require("express");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid").v4;
const path = require("path");

const router = express.Router();

const {
  addProduct,
  productList,
  getProduct,
} = require("../controllers/product.controllers");

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  apiVersion: "2006-03-01",
  accessKeyId,
  secretAccessKey,
});
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

router.route("/admin/add-product").post(upload.array("photos"), addProduct);
router.route("/products/:id").get(productList);
router.route("/product/:id").get(getProduct);

module.exports = router;
