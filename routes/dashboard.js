const router = require("express").Router();
const { CustomerComplaint } = require("../models/customerComplaint.model");
const {
  ServiceProviderComplaint,
} = require("../models/serviceProviderComplaint.model");
const { Order } = require("../models/order.model");
const { ServiceProvider } = require("../models/serviceprovider.model");
const SkillVerification = require("../models/skillVerification.model");

//Getting all the information for dashboard
router.post("/info", async (req, res) => {
  const num_orders = await Order.countDocuments();
  const num_complete_orders = await Order.countDocuments({ status: "Closed" });

  const num_serviceProviders = await ServiceProvider.countDocuments();
  const num_verified_serviceProviders = await ServiceProvider.countDocuments({
    isVerified: true,
  });

  const num_verification = await SkillVerification.countDocuments();
  const num_pending_verification = await SkillVerification.countDocuments({
    isSolved: false,
  });

  const customer_complaint = await CustomerComplaint.countDocuments();
  const pending_customer = await CustomerComplaint.countDocuments({
    isSolved: false,
  });

  const service_complaint = await ServiceProviderComplaint.countDocuments();
  const pending_service = await ServiceProviderComplaint.countDocuments({
    isSolved: false,
  });

  const num_complaints = customer_complaint + service_complaint;
  const num_pending_complaint = pending_customer + pending_service;

  const info = {
    num_orders: num_orders,
    num_complete_orders: num_complete_orders,
    num_serviceProviders: num_serviceProviders,
    num_verified_serviceProviders: num_verified_serviceProviders,
    num_verification: num_verification,
    num_pending_verification: num_pending_verification,
    num_complaints: num_complaints,
    num_pending_complaint: num_pending_complaint,
  };
  res.send(info);
});

module.exports = router;
