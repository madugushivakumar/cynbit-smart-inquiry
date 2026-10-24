import { randomBytes } from 'crypto';
import { prisma } from '../config/database';
import { CreateInquiryInput } from '../validators/inquiry.validator';

function generateReferenceCode(): string {
  const prefix = 'CBQ';
  const randomPart = randomBytes(4).toString('hex').toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  return `${prefix}-${timestamp}-${randomPart}`;
}

async function generateUniqueReferenceCode(): Promise<string> {
  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    const code = generateReferenceCode();
    const existing = await prisma.inquiry.findUnique({
      where: { referenceCode: code },
    });
    if (!existing) {
      return code;
    }
    attempts++;
  }

  throw new Error('Failed to generate a unique reference code after multiple attempts');
}

export async function createInquiry(input: CreateInquiryInput) {
  const referenceCode = await generateUniqueReferenceCode();
  const { consentGiven, ...rest } = input;

  const inquiry = await prisma.inquiry.create({
    data: {
      ...rest,
      referenceCode,
      consentRecordedAt: new Date(),
    },
    select: {
      referenceCode: true,
      name: true,
      serviceType: true,
      projectTitle: true,
      status: true,
      createdAt: true,
    },
  });

  return inquiry;
}

export async function getInquiryByReference(referenceCode: string) {
  const inquiry = await prisma.inquiry.findUnique({
    where: { referenceCode },
    select: {
      referenceCode: true,
      name: true,
      serviceType: true,
      projectTitle: true,
      status: true,
      createdAt: true,
    },
  });
  return inquiry;
}
