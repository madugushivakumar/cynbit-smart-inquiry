import { Request, Response, NextFunction } from 'express';
import { createInquirySchema } from '../validators/inquiry.validator';
import { createInquiry, getInquiryByReference } from '../services/inquiry.service';
import { ZodError } from 'zod';

export async function healthCheck(_req: Request, res: Response): Promise<void> {
  res.status(200).json({
    status: 'ok',
    service: 'cynbit-smart-inquiry-api',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
}

export async function postInquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = createInquirySchema.parse(req.body);
    const inquiry = await createInquiry(validatedData);

    res.status(201).json({
      success: true,
      data: inquiry,
      message: 'Inquiry submitted successfully',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const issues = error.issues || (error as any).errors || [];
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: issues.map((e: any) => ({
          field: Array.isArray(e.path) ? e.path.join('.') : '',
          message: e.message,
        })),
      });
      return;
    }
    next(error);
  }
}

export async function getInquiryConfirmation(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const rawRef = req.params.referenceCode;
    const referenceCode = Array.isArray(rawRef) ? rawRef[0] : rawRef;

    if (!referenceCode || typeof referenceCode !== 'string' || !/^CBQ-[A-Z0-9]{4}-[A-F0-9]{8}$/.test(referenceCode)) {
      res.status(400).json({
        success: false,
        message: 'Invalid reference code format',
      });
      return;
    }

    const inquiry = await getInquiryByReference(referenceCode);

    if (!inquiry) {
      res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
}
