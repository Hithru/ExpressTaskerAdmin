const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const serviceProviderSchema = new Schema(
  {
    username: { type: String, required: true, minlength: 5, maxlength: 50 },
    skills: { type: [String], required: true },
    location: { type: String, required: true },
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 7000,
    },
    review: { type: String, required: true, minlength: 5, maxlength: 50 },
    rating: { type: Number, required: true, min: 0, max: 5 },
    contactNumber: { type: Number, required: true },
    merchantId: { type: String },
    email: { type: String, required: true, minlength: 5, maxlength: 50 },
    password: { type: String, required: true, minlength: 5, maxlength: 1024 },
    isVerified: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const ServiceProvider = mongoose.model(
  "ServiceProvider",
  serviceProviderSchema
);

module.exports.ServiceProvider = ServiceProvider;
