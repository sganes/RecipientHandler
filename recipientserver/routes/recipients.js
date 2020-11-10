const express = require('express');
const recipientsController = require('../controllers/recipients');

const router = express.Router();

router.get('/recipients', recipientsController.getRecipients);
router.post('/recipients', recipientsController.postRecipients);
router.post('/recipients/upload', recipientsController.uploadRecipientsFromFile);
router.delete('/recipients', recipientsController.deleteController);

module.exports = router;