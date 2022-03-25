const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./controllers/db");

dotenv.config({ path: "./config/config.env" });

connectDb();

const app = express();

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "PUT", "DELETE"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
app.use(express.json());

app.use("/api/user", require("./routes/users.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api", require("./routes/product.routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port in a ${process.env.NODE_ENV}`);
});
