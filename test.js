const crypto = require("crypto-js");
const encryptionKey = "catacalysm";

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

encrypt({ data: "something" })
    .then((cipherText) => decrypt({ cipherText }))
    .then((normalText) => console.log(normalText))
