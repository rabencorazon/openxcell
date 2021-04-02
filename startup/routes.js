const express = require("express");

const user = require("../routes/user");

module.exports = (app) => new Promise((resolve, reject) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/user', user);
    resolve();
})