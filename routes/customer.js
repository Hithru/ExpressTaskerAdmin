const router = require("express").Router();
const { CustomerComplaint } = require("../models/customerComplaint.model");

//Getting all the complaints
router.post("/complaints", async (req, res) => {
  const customerComplaints = await CustomerComplaint.find().sort("isSolved");
  console.log(customerComplaints);
  res.send(customerComplaints);
});

//Mark a specific complaint as resolve
router.post("/resolve", async (req, res) => {
  console.log(req.body.complaint_id);
  const complaint = await CustomerComplaint.findByIdAndUpdate(
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
