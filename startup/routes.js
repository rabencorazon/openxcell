const express = require("express");

const user = require("../routes/user");
const topic = require("../routes/topic");
const post = require("../routes/post");

module.exports = (app) => new Promise((resolve, reject) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/user', user);
    app.use('/api/topic', topic);
    app.use('/api/post', post);
    resolve();
})