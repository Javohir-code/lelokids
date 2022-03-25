const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./controllers/db");

dotenv.config({ path: "./config/config.env" });

connectDb();

const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors());
app.use(express.json());

app.use("/api/user", require("./routes/users.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api", require("./routes/product.routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port in a ${process.env.NODE_ENV}`);
});
