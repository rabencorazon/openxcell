const { Router } = require("express");

const topic = require("../controllers/topic");
const authenticate = require("../middlewares/authentication");
const validator = require("../validators");

module.exports = Router()
    /**
    * @typedef Topic
    * @property {string} name - email of user 
    */

    /**
     * Create Topic
     * @route POST /topic/create
     * @param {Topic.model} data.body.required
     * @group User - User operation
     * @returns {Success} 200 -
     *      Returns added topic object
     *
     * @returns {Error}  Error - Unexpected error
     * @security User
     */
    .post('/create', [authenticate, validator.validate], (request, response) => topic.create(request, response))

    /**
     * Topic Deletion
     * @route DELETE /topic/{topicId}
     * @param {string} topicId.path.required - _id of topic
     * @group User - User operation
     * @returns {Success} 200 -
     *      Returns added user object
     *
     * @returns {Error}  Error - Unexpected error
     * @security User
     */
    .post('/:topicId', authenticate, (request, response) => topic.del(request, response))

    /**
     * Topic Listing
     * @route GET /topic/my-topics
     * @param {string} q.query.required - search query value here
     * @param {string} n.query.required - no. of entries
     * @param {string} p.query.required - page no.
     * @group User - User operation
     * @returns {object} 200 -
     *      Returns list of clients
     *
     * @returns {Error}  Error - Unexpected error
     * @security User
     */
    .get('/my-topics', [authenticate, validator.validate], (request, response) => topic.list(request, response))
    .get('/test', (request, response) => response.send("topic end points are working"))