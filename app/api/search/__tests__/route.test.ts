import { POST, GET } from '../route';
import { NextRequest } from 'next/server';

// Mock fetch
global.fetch = jest.fn();

describe('/api/search Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockReset();
  });

  describe('GET /api/search', () => {
    it('should return health check response', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.status).toBe('ok');
      expect(data.message).toBe('JobRadar Search API is running');
    });
  });

  describe('POST /api/search', () => {
    const validRequest = {
      apiKey: 'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      cxId: '1234567890abc',
      query: 'React Developer',
      startIndex: 1,
      dateRestrict: 'd1',
    };

    it('should validate required parameters', async () => {
      const request = new NextRequest('http://localhost/api/search', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Missing Parameters');
    });

    it('should validate startIndex range', async () => {
      const request = new NextRequest('http://localhost/api/search', {
        method: 'POST',
        body: JSON.stringify({ ...validRequest, startIndex: 100 }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid Parameters');
    });

    it('should call Google API with correct parameters', async () => {
      const mockGoogleResponse = {
        items: [],
        searchInformation: {
          totalResults: '0',
          searchTime: 0.1,
          formattedSearchTime: '0.10',
          formattedTotalResults: '0',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockGoogleResponse,
      });

      const request = new NextRequest('http://localhost/api/search', {
        method: 'POST',
        body: JSON.stringify(validRequest),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://www.googleapis.com/customsearch/v1'),
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        })
      );
    });

    it('should handle Google API errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => ({
          error: {
            message: 'API key invalid',
          },
        }),
      });

      const request = new NextRequest('http://localhost/api/search', {
        method: 'POST',
        body: JSON.stringify(validRequest),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.error).toBe('Google API Error');
    });

    it('should handle 400 errors with helpful messages', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          error: {
            message: 'Invalid API key',
          },
        }),
      });

      const request = new NextRequest('http://localhost/api/search', {
        method: 'POST',
        body: JSON.stringify(validRequest),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.details).toContain('Invalid API key');
    });

    it('should handle 429 rate limit errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: async () => ({
          error: {
            message: 'Rate limit exceeded',
          },
        }),
      });

      const request = new NextRequest('http://localhost/api/search', {
        method: 'POST',
        body: JSON.stringify(validRequest),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.details).toContain('daily quota');
    });

    it('should handle timeout errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        Object.assign(new Error('Timeout'), { name: 'TimeoutError' })
      );

      const request = new NextRequest('http://localhost/api/search', {
        method: 'POST',
        body: JSON.stringify(validRequest),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(408);
      expect(data.error).toBe('Request Timeout');
    });

    it('should handle unexpected errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const request = new NextRequest('http://localhost/api/search', {
        method: 'POST',
        body: JSON.stringify(validRequest),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Internal Server Error');
    });

    it('should set appropriate cache headers', async () => {
      const mockGoogleResponse = {
        items: [],
        searchInformation: { totalResults: '0' },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockGoogleResponse,
      });

      const request = new NextRequest('http://localhost/api/search', {
        method: 'POST',
        body: JSON.stringify(validRequest),
      });

      const response = await POST(request);

      expect(response.headers.get('Cache-Control')).toContain('stale-while-revalidate');
    });
  });
});
