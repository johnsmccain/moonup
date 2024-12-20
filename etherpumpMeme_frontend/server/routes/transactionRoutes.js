import express from 'express';
import { getTransactions, getTransactionStats } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/', getTransactions);
router.get('/stats', getTransactionStats);

export default router;