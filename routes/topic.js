const { Router } = require("express");

const topic = require("../controllers/topic");

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
     */
    .post('/create', (request, response) => topic.create(request, response))

    /**
     * Topic Deletion
     * @route DELETE /topic/{topicId}
     * @param {string} topicId.path.required - _id of topic
     * @group User - User operation
     * @returns {Success} 200 -
     *      Returns added user object
     *
     * @returns {Error}  Error - Unexpected error
     */
    .post('/:topicId', (request, response) => topic.del(request, response))
    .get('/test', (request, response) => response.send("topic end points are working"))