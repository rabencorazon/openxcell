const crypto = require("crypto-js");
const { encryption_key: encryptionKey } = process.env;

function successObj({ message = "", result = {} } = {}) {
    return {
        success: true,
        message, result
    }
}

function errorObj({ message = "", error = {} } = {}) {
    return {
        success: false,
        message, error
    }
}

const encrypt = ({ data }) => new Promise((resolve, reject) => {
    try {
        let encryptData = crypto.AES.encrypt(data, encryptionKey).toString();
        return resolve(encryptData);
    } catch (err) {
        return reject(err);
    }
});

const decrypt = ({ cipherText }) => new Promise((resolve, reject) => {
    try {
        console.log("cipher : ", cipherText, "ecn : ", encryptionKey)
        let bytes = crypto.AES.decrypt(cipherText, encryptionKey);
        let decrypted = bytes.toString(crypto.enc.Utf8);
        console.log("yooo : ", decrypted)
        return resolve(decrypted);
    } catch (err) {
        console.log("000000 ", err);
        return reject(err);
    }
});

module.exports = { successObj, errorObj, encrypt, decrypt };