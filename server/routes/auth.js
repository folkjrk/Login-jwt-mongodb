const express = require("express");
const { register, login } = require("../controllers/auth.js");

const router = express.Router();

// Define register route
router.post("/register", register);

// router.post("/register", (req, res) => {
//     res.send("register user");
// });


// Define login route
router.post("/login", login);


module.exports = router;
