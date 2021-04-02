const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => new Promise((resolve, reject) => {
    let connection_url = `mongodb://${process.env.dbuser}:${process.env.dbpswd}@${process.env.dbhost}:${process.env.dbport}/${process.env.dbname}`;

    mongoose
        .connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(async () => {
            winston.info(`Connected to ${connection_url} ...`);

            mongoose.set('debug', true);

            resolve();
        }).catch(reject);
})