const { User } = require("../models/user");

const { helperUtils, sendMail } = require("../utils");

const winston = require("winston");
const jwt = require("jsonwebtoken");

async function register(request, response) {
    const payload = request.body;

    let existingUser = await User.findOne({ email: payload.email });

    if (existingUser) return response.send(helperUtils.errorObj({ message: "user already exists!" }));

    const user = await User.create(payload);

    sendMail({
        recipents: user.email,
        contents: {
            subject: "Registration Successful!",
            type: "text",
            content: `Dear ${user.fname}, your registration was successful!`
        }
    })

    let accessToken = await getAccessToken({ userId: user._id });

    /* Spreading was giving more data then needed like createdAt and all */
    // let { password, ...result } = user.toObject();

    let result = {
        email: user.email,
        fname: user.fname,
        lname: user.lname
    };

    return response.header('x-auth-token', accessToken).send(helperUtils.successObj({ message: "User registered successfully!", result }));
}

async function login(request, response) {
    const payload = request.body;

    const user = await User.findOne({ email: payload.email });

    if (!user) return response.send(helperUtils.errorObj({ message: "user doesn't exists!" }));

    let authenticUser = await user.comparePassword(payload.password);

    if (!authenticUser) return response.send(helperUtils.errorObj({ message: "password is incorrect!" }));

    let accessToken = await getAccessToken({ userId: user._id });

    let result = {
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        accessToken
    };

    return response.header('x-auth-token', accessToken).send(helperUtils.successObj({ message: "User login successful!", result }));
}

const getAccessToken = (data) => new Promise(async (resolve, reject) => {
    const { jwt_secret: jwtKey } = process.env;

    let token = await jwt.sign(data, jwtKey, { expiresIn: '24h' });
    let encryptedToken = await helperUtils.encrypt({ data: token });
    console.log("encrypted token : ", encryptedToken)

    resolve(encryptedToken);
});

module.exports = {
    register,
    login
}