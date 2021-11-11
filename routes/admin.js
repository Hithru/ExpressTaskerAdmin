const router = require("express").Router();
const { Admin } = require("../models/admin.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");

//Admin Register
router.post("/signup", async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log("validation pass");

  let admin = await Admin.findOne({ email: req.body.email });

  if (admin) return res.status(400).send("User already registered.");
  console.log("user exist pass");

  const username = req.body.username;
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  admin = new Admin({
    username,
    email,
    password,
  });

  console.log(admin);
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  await admin.save();

  const token = admin.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .status(200)
    .send("well Done");
});

// Admin Login
router.post("/login", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let admin = await Admin.findOne({ email: req.body.email.toLowerCase() });
  if (!admin) return res.status(400).send("Invalid email or password.");
  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");
  const token = admin.generateAuthToken();
  console.log(admin);
  res.send(token);
});

//Getting all the admin list
router.post("/admins", async (req, res) => {
  const admins = await Admin.find().sort("username");

  console.log(admins);
  res.send(admins);
});

module.exports = router;
