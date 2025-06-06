import express from 'express';
const router = express.Router();
import urlController from '../server/controller/urlController.js';

router.post('/shorten', urlController.shortenUrl);
router.get('/:shortCode', urlController.redirectUrl);

export default router;