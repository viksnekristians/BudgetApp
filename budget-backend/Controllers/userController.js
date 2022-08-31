const { User } = require("../Models/user");

const login = (req, res) => {
    User.findOne({ username: req.body.username, password: req.body.password }, function (err, user) {
        if (err) res.status(500).send('Something broke!')
        res.json(user);
      });
}

exports.login = login;