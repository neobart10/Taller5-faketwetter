var express = require('express');
var router = express.Router();
const postController = require ('../controllers/post.controller');
/**
 * GET Route to list all posts
 */
router.get('/', postController.findAllPosts);
/**
 * GET Route to find post by id
 */
router.get('/:idUser', postController.findOnePost);
/**
 * GET Route to find post by idUser
 */
router.get('/user/:idUser', postController.findAllPostsByIdUser);
/**
 * POST Route to create post
 */
router.post ('/', postController.createPost);
/**
 * PUT Route to update an user by id
 */
router.put ('/:idPost',postController.updateUser);
/**
 * DELETE Route to delete an post by idPost
 */
router.delete ('/:idPost',postController.deletePostByIdPost);
/**
 * DELETE Route to delete an user by username
 */
router.delete ('/user/:idUser',postController.deletePostByIdUser);
/**
 * DELETE Route to delete all users
 */
router.delete ('/',postController.deleteAllPost);


/**
 * TASK:
 * ADD THE MISSING ROUTES ______________________________________________________
 */

// Export router
module.exports = router;

