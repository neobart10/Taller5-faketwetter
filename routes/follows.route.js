var express = require('express');
var router = express.Router();
const followsController = require ('../controllers/follows.controller');
/**
 * GET Route to find user by id
 */
router.get('/:idFollow', followsController.findAllFollowers);
/**
 * POST Route to create user
 */
router.post ('/', followsController.createFollows);

/**
 * TASK:
 * ADD THE MISSING ROUTES ______________________________________________________
 */

// Export router
module.exports = router;

