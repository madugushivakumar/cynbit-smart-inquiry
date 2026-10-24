import { Router } from 'express';
import { healthCheck, postInquiry, getInquiryConfirmation } from '../controllers/inquiry.controller';

const router = Router();

router.get('/health', healthCheck);
router.post('/inquiries', postInquiry);
router.get('/inquiries/:referenceCode', getInquiryConfirmation);

export default router;
