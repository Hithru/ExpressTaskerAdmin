const router = require("express").Router();
const { Admin } = require("../models/admin.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");

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
  const email = req.body.email;
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

module.exports = router;
