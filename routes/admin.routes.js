const express = require("express");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid").v4;
const path = require("path");

const router = express.Router();

const {
  addCategory,
  addSubCategory,
  categoriesList,
  getSubCategories,
  getUsersList,
  deleteUser,
  deleteCategory,
  deleteSubCategory,
  salePriceStatistics,
  dashboardStatistics,
  confirmOrder,
  getSales,
  updateSale,
  addSale,
  addBanner,
  updateBanner,
  getBanners,
} = require("../controllers/admin.controllers");
const auth = require("../middleware/auth");

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

router.route("/add-category").post(auth, addCategory);
router.route("/sub-category").post(auth, addSubCategory);
router.route("/categories").get(categoriesList);
router.route("/sub-categories/:categoryId").get(getSubCategories);
router.route("/users").get(auth, getUsersList);
router.route("/delete-user/:id").delete(auth, deleteUser);
router.route("/delete-category/:id").delete(auth, deleteCategory);
router.route("/delete-subcategory/:id").delete(auth, deleteSubCategory);
router.route("/sale-price/statistics").get(auth, salePriceStatistics);
router.route("/dashboard").get(auth, dashboardStatistics);
router.route("/order/confirm/:id").put(auth, confirmOrder);
router.route("/sales").get(getSales);
router.route("/update-sale/:id").put(auth, updateSale);
router.route("/add-banner").post(upload.single("photo"), addBanner);
router.route("/update/banner/:id").put(auth, upload.single("photo"), updateBanner);
router.route("/list/banners").get(auth, getBanners);
// router.route("/add-sale").post(addSale);

module.exports = router;
