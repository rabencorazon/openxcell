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

function authentication({ }) {

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
        let bytes = CryptoJS.AES.decrypt(cipherText, encryptionKey);
        let decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return resolve(decrypted);
    } catch (err) {
        console.log("000000 ", err);
        return reject(err);
    }
});

module.exports = { successObj, errorObj, authentication, encrypt, decrypt };