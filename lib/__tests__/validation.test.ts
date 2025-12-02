import {
  sanitizeInput,
  sanitizeKeywords,
  sanitizeExclusions,
  sanitizeLocation,
  validateApiKey,
  validateCxId,
  validateDateRestrict,
  validateStartIndex,
  validateSearchParams,
  getValidationErrorMessage,
} from '../validation';

describe('Validation Utilities', () => {
  describe('sanitizeInput', () => {
    it('should remove HTML tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
    });

    it('should remove javascript: protocol', () => {
      expect(sanitizeInput('javascript:alert("xss")')).toBe('alert("xss")');
    });

    it('should remove event handlers', () => {
      expect(sanitizeInput('hello onclick=alert("xss")')).toBe('hello alert("xss")');
    });

    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello world  ')).toBe('hello world');
    });

    it('should limit length to maxLength', () => {
      const longString = 'a'.repeat(1000);
      expect(sanitizeInput(longString, 100).length).toBe(100);
    });

    it('should return empty string for null/undefined', () => {
      expect(sanitizeInput(null as any)).toBe('');
      expect(sanitizeInput(undefined as any)).toBe('');
    });
  });

  describe('sanitizeKeywords', () => {
    it('should sanitize valid keywords', () => {
      expect(sanitizeKeywords('React Developer')).toBe('React Developer');
    });

    it('should remove HTML tags', () => {
      expect(sanitizeKeywords('<b>React</b> Developer')).toBe('bReact/b Developer');
    });

    it('should limit length to 200', () => {
      const longString = 'a'.repeat(300);
      expect(sanitizeKeywords(longString).length).toBe(200);
    });
  });

  describe('validateApiKey', () => {
    it('should validate correct API key format', () => {
      expect(validateApiKey('AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')).toBe(true);
    });

    it('should reject keys not starting with AIza', () => {
      expect(validateApiKey('invalid-key')).toBe(false);
    });

    it('should reject keys that are too short', () => {
      expect(validateApiKey('AIza123')).toBe(false);
    });

    it('should reject keys that are too long', () => {
      const longKey = 'AIza' + 'x'.repeat(50);
      expect(validateApiKey(longKey)).toBe(false);
    });

    it('should reject null/undefined', () => {
      expect(validateApiKey(null as any)).toBe(false);
      expect(validateApiKey(undefined as any)).toBe(false);
    });
  });

  describe('validateCxId', () => {
    it('should validate correct CX ID format', () => {
      expect(validateCxId('1234567890abcdef:ghi')).toBe(true);
    });

    it('should reject CX with invalid characters', () => {
      expect(validateCxId('invalid@cx#id')).toBe(false);
    });

    it('should reject CX that is too short', () => {
      expect(validateCxId('abc')).toBe(false);
    });

    it('should reject CX that is too long', () => {
      const longCx = 'a'.repeat(100);
      expect(validateCxId(longCx)).toBe(false);
    });

    it('should reject null/undefined', () => {
      expect(validateCxId(null as any)).toBe(false);
      expect(validateCxId(undefined as any)).toBe(false);
    });
  });

  describe('validateDateRestrict', () => {
    it('should validate empty string', () => {
      expect(validateDateRestrict('')).toBe(true);
    });

    it('should validate d1, w1, m1', () => {
      expect(validateDateRestrict('d1')).toBe(true);
      expect(validateDateRestrict('w1')).toBe(true);
      expect(validateDateRestrict('m1')).toBe(true);
    });

    it('should reject invalid values', () => {
      expect(validateDateRestrict('invalid')).toBe(false);
      expect(validateDateRestrict('d2')).toBe(false);
    });
  });

  describe('validateStartIndex', () => {
    it('should validate correct start index', () => {
      expect(validateStartIndex(1)).toBe(true);
      expect(validateStartIndex(50)).toBe(true);
      expect(validateStartIndex(91)).toBe(true);
    });

    it('should reject out of range values', () => {
      expect(validateStartIndex(0)).toBe(false);
      expect(validateStartIndex(92)).toBe(false);
      expect(validateStartIndex(-1)).toBe(false);
    });

    it('should reject non-integers', () => {
      expect(validateStartIndex(1.5)).toBe(false);
      expect(validateStartIndex(NaN)).toBe(false);
    });
  });

  describe('validateSearchParams', () => {
    const validParams = {
      apiKey: 'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      cxId: '1234567890abcdef:ghi',
      keywords: 'React Developer',
      startIndex: 1,
      dateRestrict: 'd1',
    };

    it('should validate correct params', () => {
      const result = validateSearchParams(validParams);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });

    it('should detect invalid API key', () => {
      const result = validateSearchParams({ ...validParams, apiKey: 'invalid' });
      expect(result.isValid).toBe(false);
      expect(result.errors.apiKey).toBeDefined();
    });

    it('should detect invalid CX', () => {
      const result = validateSearchParams({ ...validParams, cxId: 'invalid@cx' });
      expect(result.isValid).toBe(false);
      expect(result.errors.cxId).toBeDefined();
    });

    it('should detect missing keywords', () => {
      const result = validateSearchParams({ ...validParams, keywords: '' });
      expect(result.isValid).toBe(false);
      expect(result.errors.keywords).toBeDefined();
    });

    it('should detect invalid start index', () => {
      const result = validateSearchParams({ ...validParams, startIndex: 100 });
      expect(result.isValid).toBe(false);
      expect(result.errors.startIndex).toBeDefined();
    });
  });

  describe('getValidationErrorMessage', () => {
    it('should return appropriate error messages', () => {
      expect(getValidationErrorMessage('apiKey', '')).toContain('API Key');
      expect(getValidationErrorMessage('cxId', '')).toContain('Search Engine ID');
      expect(getValidationErrorMessage('keywords', '')).toContain('keywords');
      expect(getValidationErrorMessage('startIndex', '')).toContain('Start index');
    });

    it('should return generic message for unknown field', () => {
      expect(getValidationErrorMessage('unknown', '')).toContain('Invalid unknown');
    });
  });
});
