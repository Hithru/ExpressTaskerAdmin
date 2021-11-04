const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");

const adminRouter = require("./routes/admin");
const customerComplaintRouter = require("./routes/customer");
const serviceProviderComplaintRouter = require("./routes/serviceProvider");

require("dotenv").config();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  const uri = process.env.ATLAS_URI;
  mongoose.connect(uri, { useNewUrlParser: true });
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("express-tasker-admin/build"));
  app.get("/*", function (req, res) {
    res.sendFile(
      path.join(__dirname, "./express-tasker-admin/build/index.html")
    );
  });
}

app.use("/admin", adminRouter);
app.use("/customer", customerComplaintRouter);
app.use("/serviceProvider", serviceProviderComplaintRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
