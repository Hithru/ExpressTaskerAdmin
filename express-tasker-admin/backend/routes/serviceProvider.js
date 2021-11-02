const router = require("express").Router();
const {
  ServiceProviderComplaint,
} = require("../models/serviceProviderComplaint.model");

router.post("/complaints", async (req, res) => {
  const serviceProviderComplaints = await ServiceProviderComplaint.find().sort(
    "isSolved"
  );
  console.log(serviceProviderComplaints);
  res.send(serviceProviderComplaints);
});

router.post("/resolve", async (req, res) => {
  console.log(req.body.complaint_id);
  const complaint = await ServiceProviderComplaint.findByIdAndUpdate(
    req.body.complaint_id,
    {
      isSolved: true,
    }
  );

  if (!complaint)
    return res
      .status(404)
      .send("The complaint with the given ID was not found.");

  res.send(complaint);
});
module.exports = router;
