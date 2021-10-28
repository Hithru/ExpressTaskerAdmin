const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");

const adminRouter = require("./routes/admin");

require("dotenv").config();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
