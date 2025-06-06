import express from 'express';
const router = express.Router();
import urlController from '../server/controller/urlController.js';

router.post('/shorten', urlController.shortenUrl);

export default router;