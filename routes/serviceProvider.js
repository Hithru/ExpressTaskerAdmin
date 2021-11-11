const router = require("express").Router();
const {
  ServiceProviderComplaint,
} = require("../models/serviceProviderComplaint.model");

const { ServiceProvider } = require("../models/serviceprovider.model");
const SkillVerification = require("../models/skillVerification.model");

//Getting all the complaints
router.post("/complaints", async (req, res) => {
  const serviceProviderComplaints = await ServiceProviderComplaint.find().sort(
    "isSolved"
  );
  console.log(serviceProviderComplaints);
  res.send(serviceProviderComplaints);
});

//Getting all the verification Requests
router.post("/requests", async (req, res) => {
  const verificationRequests = await SkillVerification.find().sort("isSolved");
  console.log(verificationRequests);
  res.send(verificationRequests);
});

//Mark a specific complaint as resolve
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

//Marking a verfication request decline
router.post("/decline", async (req, res) => {
  console.log(req.body.request_id);
  const request = await SkillVerification.findByIdAndUpdate(
    req.body.request_id,
    {
      isSolved: true,
    }
  );

  if (!request)
    return res.status(404).send("The Request with the given ID was not found.");

  res.send(request);
});

//Marking a verification request accept
router.post("/accept", async (req, res) => {
  console.log(req.body.request_id);
  const request = await SkillVerification.findByIdAndUpdate(
    req.body.request_id,
    {
      isSolved: true,
      isaccepted: true,
    }
  );
  if (!request)
    return res.status(404).send("The Request with the given ID was not found.");

  const serviceProvider = await ServiceProvider.findByIdAndUpdate(
    request.serviceProviderId,
    {
      isVerified: true,
    }
  );

  if (!serviceProvider)
    return res
      .status(404)
      .send("The serviceProvider with the given ID was not found.");

  res.send(request);
});
module.exports = router;
