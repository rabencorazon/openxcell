const nodemailer = require("nodemailer");

const { mailuser: user, mailpass: pass, mailhost: service } = process.env

const transporter = nodemailer.createTransport({
    service,
    auth: { user, pass }
});

module.exports = (recipents, contents) => new Promise((resolve, reject) => {
    transporter.sendMail({
        from: "rabencorazon@gmail.com",
        to: "rajatmishra18110@gmail.com",
        subject: "test",
        text: "this is just a testing"
        // subject: contents.subject,
        // [contents.type]: contents.content
    })
        .then(resolve)
        .catch(reject);
});