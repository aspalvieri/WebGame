const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const User = require("../models/User");
const Character = require("../models/Character");

exports.register = (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ name_lower: req.body.name.toLowerCase() }).then(user => {
    if (user) {
      return res.status(400).json({ name: "Name already exists" });
    } 
    else {
      User.findOne({ email: req.body.email }).then(user =>{
        if (user) {
          return res.status(400).json({ email: "Email already exists" });
        }
        else {
          Character.create(new Character({}))
          .then(char => {
            const newUser = new User({
              name: req.body.name,
              name_lower: req.body.name.toLowerCase(),
              email: req.body.email,
              password: req.body.password,
              character: char.id
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                  User.create(newUser)
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
              });
            });
          })
          .catch(err => console.log(err));
        }
      });
    }
  });
};

exports.login = (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).populate("character").then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload, this data is stored in the token
        const payload = {
          //Change values here to control what user object has on frontend
          id: user.id,
          name: user.name,
          character: user.character
        };
        // Sign token
        jwt.sign(payload, process.env.secret, {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } 
      else {
        return res.status(400).json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
};
