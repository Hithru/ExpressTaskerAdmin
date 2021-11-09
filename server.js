const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");

const adminRouter = require("./routes/admin");
const customerComplaintRouter = require("./routes/customer");
const serviceProviderComplaintRouter = require("./routes/serviceProvider");
const dashboardRouter = require("./routes/dashboard");
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
  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "express-tasker-admin", "build", "index.html")
    );
  });
}

app.use("/admin", adminRouter);
app.use("/customer", customerComplaintRouter);
app.use("/serviceProvider", serviceProviderComplaintRouter);
app.use("/dashboard", dashboardRouter);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
