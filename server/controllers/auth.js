const User = require("../models/Users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* REGISTER USER */
module.exports.register = async (req, res) => {
    try{
        const{
            username,
            password,
        } = req.body;

        const oldUser = await User.findOne({username});
        
        // check old user
        if (oldUser){
          return res.status(409).send("User already exist")
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: passwordHash,
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err){
        res.status(500).json({message: err.message});
    }
}


/* LOGGING IN */
module.exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({username: username });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',});
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
