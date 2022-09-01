const { User } = require("../Models/user");

const login = (req, res) => {
    User.findOne({ username: req.body.username, password: req.body.password }, function (err, user) {
        if (err) res.status(500).send('Something broke!')
        res.json(user);
      });
}

const register = (req, res) => {
    User.findOne({ username: req.body.username}, function (err, user) {
        if (err) res.status(500).send('Something broke!')
        if (user) res.status(409).send('User with this username already exists!')
        else {
            const user = new User({firstname: req.body.firstname, lastname: req.body.lastname, username: req.body.username, password: req.body.password});
            user.save(function (err) {
            if (err) res.status(500).send('Something broke!')
            });
            res.send(user);
        }
    });
}

exports.login = login;
exports.register = register;