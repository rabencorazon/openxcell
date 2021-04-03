const { Router } = require("express");

const post = require("../controllers/post");
const validator = require("../validators");
const authenticate = require("../middlewares/authentication");
const { upload } = require("../middlewares/multer");


module.exports = Router()
    /**
    * @typedef Post
    * @property {string} topicId - _id of the topic 
    * @property {string} caption - caption for the post 
    * @property {array} photos - array of images here 
    */

    /**
     * Create Post
     * @route POST /post/create
     * @param {Post.model} data.body.required
     * @group User - User operation
     * @returns {Success} 200 -
     *      Returns added post object
     *
     * @returns {Error}  Error - Unexpected error
     * @security User
     */
    .post('/create', [authenticate, validator.validate, upload.array('photos')], (request, response) => post.create(request, response))

    /**
     * List Post
     * @route GET /post/my-posts
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
    .get('/my-posts', [authenticate, validator.validate], (request, response) => post.list(request, response))

    /**
    * @typedef Comment
    * @property {string} postId - _id of the topic 
    * @property {string} comment - caption for the post 
    */

    /**
     * Add comment to post
     * @route POST /post/add-comment
     * @param {Comment.model} data.body.required
     * @group User - User operation
     * @returns {Success} 200 -
     *      Returns added comment object
     *
     * @returns {Error}  Error - Unexpected error
     * @security User
     */
    .post('/add-comment', [authenticate, validator.validate], (request, response) => post.addComment(request, response))
    .get('/test', (request, response) => response.send("topic end points are working"))