const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const Users = require('../users/users-model');

// pull in the secret we'll use to make the JWT
const { jwtSecret } = require('./secrets.js');
// const { unsubscribe } = require('../../api/a');

//register a new user with email, username, & password. then respond to client with addedUser for confirmation
router.post('/register', async (req, res) => {
  try {
    const {
      email,
      username,
      city_and_state_location,
      fav_cooker,
      password,
    } = req.body;

    // Create a salt and then hash password DB
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = {
      email,
      username,
      city_and_state_location,
      fav_cooker,
      password: hash,
    };
    const addedUser = await Users.add(user);
    res.status(201).json(addedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//login a new user with username & password. then respond to client with logged in message and send back a token for client to store in local storage.
router.post('/login', async (req, res) => {
  try {
    const [user] = await Users.findBy({ username: req.body.username });
    const userId = user.id;
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = makeToken(user);
      res.status(200).json({ token, userId });
    } else {
      res.status(401).json({ message: 'You shall not pass!' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//make token that will be used by client to access resticted data from db.
function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '5 hour',
  };
  return jwt.sign(payload, jwtSecret, options);
}

// //test for sanity purpose. can get users to check that the user exists in the db.
// router.get('/users', (req, res, next) => {
//   Users.find()
//     .then((users) => {
//       res.status(200).json(users);
//     })
//     .catch((error) => next(error));
// });
module.exports = router;
