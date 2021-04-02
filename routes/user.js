const { Router } = require("express");

const user = require("../controllers/users");

module.exports = Router()
    /**
    * @typedef User
    * @property {string} email - email of user 
    * @property {string} name - name of user
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
    .get('/test', (request, response) => user.test(request, response))