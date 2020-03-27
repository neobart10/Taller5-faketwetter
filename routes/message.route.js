var express = require('express');
var router = express.Router();
const messageController = require ('../controllers/message.controller');
/**
 * GET Route to find user by id
 */
router.get('/:idTransmitter/:idReceiver', messageController.findAllMessagesByIdTransmitterAndIdReceiver);
/**
 * POST Route to create user
 */
router.post ('/', messageController.createMessage);

/**
 * TASK:
 * ADD THE MISSING ROUTES ______________________________________________________
 */

// Export router
module.exports = router;

