const { helperUtils } = require("../utils");
const jwt = require("jsonwebtoken");

module.exports = async function (request, response, next) {
    try {
        let { error, authorised } = await verifyAccessToken(request.headers["x-auth-token"]);

        if (!authorised || error) return response.send(helperUtils.errorObj({ message: "user authorisation failed!" }));

        request.user = authorised;
        next();
    } catch (checkTokenError) {
        console.log("error : ", checkTokenError.stack)
        return response.send(helperUtils.errorObj({ message: "authorisation error!", error: checkTokenError }));
    }
}

const verifyAccessToken = (token) => new Promise(async (resolve, reject) => {
    const { jwt_secret: jwtKey } = process.env;

    let decryptedToken = await helperUtils.decrypt({ cipherText: token });

    try {
        let payload = await jwt.verify(decryptedToken, jwtKey);
        resolve({ authorised: payload });
    } catch (error) {
        resolve({ error })
    }
});