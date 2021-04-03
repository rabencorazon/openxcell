const { Router } = require("express");

const user = require("../controllers/user");

module.exports = Router()
    /**
    * @typedef User
    * @property {string} email - email of user 
    * @property {string} fname - first name of user
    * @property {string} lname - last name of user
    * @property {string} password - password of user
    */

    /**
     * User Registration
     * @route POST /user/register
     * @param {User.model} data.body.required - user object here
     * @group User - User operation
     * @returns {Success} 200 -
     *      Returns added user object
     *
     * @returns {Error}  Error - Unexpected error
     */
    .post('/register', (request, response) => user.register(request, response))

    /**
    * @typedef Login
    * @property {string} email - email of user 
    * @property {string} password - password of user
    */

    /**
     * User Registration
     * @route POST /user/register
     * @param {Login.model} data.body.required - user object here
     * @group User - User operation
     * @returns {Success} 200 -
     *      Returns added user object
     *
     * @returns {Error}  Error - Unexpected error
     */
    .post('/login', (request, response) => user.login(request, response))
    .get('/test', (request, response) => response.send("user end points are working"))