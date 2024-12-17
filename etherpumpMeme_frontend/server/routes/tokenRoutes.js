import express from 'express';
import { createToken, getTokens, getTokenByAddress } from '../controllers/tokenController.js';

const router = express.Router();

router.post('/', createToken);
router.get('/', getTokens);
router.get('/:address', getTokenByAddress);

export default router;