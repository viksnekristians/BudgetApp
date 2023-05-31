const { User } = require("../Models/user");

const register = (req, res) => {
    User.findOne({ username: req.body.username}).then((err, user) => {
        if (err) res.status(500).send('Something broke!')
        if (user) res.status(409).send('User with this username already exists!')
        else {
            const user = new User({firstname: req.body.firstname, lastname: req.body.lastname, username: req.body.username, password: req.body.password});
            user.save().then((user) => {
                res.send(user);
            },
            (err) => {
                res.status(500).send(err)
            });
        }
    });
}

exports.register = register;