const {User} = require('../Models/user');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const username = req.body.username;
    const pwd = req.body.password;
    if (!username || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: username });
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = pwd  === foundUser.password;
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        const userData = {
            id: foundUser._id,
            firstname: foundUser.firstname,
            lastname: foundUser.lastname,
            username: foundUser.username
        }
        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization token and user data to user
        res.json({accessToken, user: userData });
       
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };