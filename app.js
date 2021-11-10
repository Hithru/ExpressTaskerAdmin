const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");

const adminRouter = require("./routes/admin");
const customerComplaintRouter = require("./routes/customer");
const serviceProviderComplaintRouter = require("./routes/serviceProvider");
const dashboardRouter = require("./routes/dashboard");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/customer", customerComplaintRouter);
app.use("/serviceProvider", serviceProviderComplaintRouter);
app.use("/dashboard", dashboardRouter);
module.exports = app;
