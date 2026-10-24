import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

// Mock the database module
vi.mock('../config/database', () => ({
  prisma: {
    inquiry: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    $connect: vi.fn(),
    $disconnect: vi.fn(),
  },
  connectDatabase: vi.fn(),
  disconnectDatabase: vi.fn(),
}));

// Mock inquiry service
vi.mock('../services/inquiry.service', () => ({
  createInquiry: vi.fn(),
  getInquiryByReference: vi.fn(),
}));

import { createInquiry, getInquiryByReference } from '../services/inquiry.service';

const app = createApp();

const validInquiryPayload = {
  name: 'Shiva Kumar',
  email: 'shiva@example.com',
  companyName: 'Test Corp',
  serviceType: 'WEB_APPLICATION',
  projectTitle: 'E-commerce Platform',
  projectDescription: 'Building a modern e-commerce platform with AI recommendations and seamless checkout experience for our retail business.',
  problemStatement: 'Our current system is outdated and cannot handle peak loads during sales events.',
  desiredOutcomes: 'A scalable platform that handles 10x traffic without downtime and increases conversion by 20%.',
  technicalRequirements: 'React frontend, Node.js backend, PostgreSQL database, AWS deployment',
  budgetRange: 'FROM_75K_TO_200K',
  timeline: 'ONE_TO_THREE_MONTHS',
  projectStage: 'REQUIREMENTS_DEFINED',
  consentGiven: true,
};

const mockCreatedInquiry = {
  referenceCode: 'CBQ-AB1C-1234ABCD',
  name: 'Shiva Kumar',
  serviceType: 'WEB_APPLICATION' as any,
  projectTitle: 'E-commerce Platform',
  status: 'NEW' as any,
  createdAt: new Date(),
};

describe('GET /api/health', () => {
  it('should return 200 with service status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('cynbit-smart-inquiry-api');
  });
});

describe('POST /api/inquiries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create inquiry with valid data and return 201', async () => {
    vi.mocked(createInquiry).mockResolvedValueOnce(mockCreatedInquiry);

    const res = await request(app).post('/api/inquiries').send(validInquiryPayload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.referenceCode).toBeDefined();
  });

  it('should return 400 when required fields are missing', async () => {
    const res = await request(app).post('/api/inquiries').send({
      name: 'Shiva',
      // missing required fields
    });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
  });

  it('should return 400 for invalid email', async () => {
    const res = await request(app)
      .post('/api/inquiries')
      .send({ ...validInquiryPayload, email: 'not-an-email' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should return 400 for invalid service type', async () => {
    const res = await request(app)
      .post('/api/inquiries')
      .send({ ...validInquiryPayload, serviceType: 'INVALID_TYPE' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should return 400 when consent is not given', async () => {
    const res = await request(app)
      .post('/api/inquiries')
      .send({ ...validInquiryPayload, consentGiven: false });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should return 400 when projectDescription is too short', async () => {
    const res = await request(app)
      .post('/api/inquiries')
      .send({ ...validInquiryPayload, projectDescription: 'Too short' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should return 400 for invalid budget range', async () => {
    const res = await request(app)
      .post('/api/inquiries')
      .send({ ...validInquiryPayload, budgetRange: 'INVALID_BUDGET' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should handle database errors gracefully', async () => {
    vi.mocked(createInquiry).mockRejectedValueOnce(new Error('DB connection failed'));

    const res = await request(app).post('/api/inquiries').send(validInquiryPayload);

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});

describe('GET /api/inquiries/:referenceCode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return inquiry data for valid reference code', async () => {
    vi.mocked(getInquiryByReference).mockResolvedValueOnce(mockCreatedInquiry);

    const res = await request(app).get('/api/inquiries/CBQ-AB1C-1234ABCD');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('should return 404 for non-existent reference code', async () => {
    vi.mocked(getInquiryByReference).mockResolvedValueOnce(null);

    const res = await request(app).get('/api/inquiries/CBQ-XXXX-99999999');
    expect(res.status).toBe(404);
  });

  it('should return 400 for malformed reference code', async () => {
    const res = await request(app).get('/api/inquiries/invalid-ref');
    expect(res.status).toBe(400);
  });
});
