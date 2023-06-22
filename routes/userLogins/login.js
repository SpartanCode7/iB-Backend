var express = require('express')
const router = express.Router()
const User = require('../../model/user')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

router.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    try {
      // Validate user input
      if (!(email && password)) {
        throw new Error("All input is required");
      }

      // Validate if user exists in our database
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.JWT_SECRET,
          {
            expiresIn: "2h",
          }
        );

        // save user token
        user.token = token;

        // Send the response
        return res.status(200).json(user);
      }

      // Invalid credentials
      throw new Error("Invalid Credentials");
    } catch (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
