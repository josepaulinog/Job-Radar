/**
 * Input validation and sanitization utilities
 * Provides secure input handling for user-provided data
 */

/**
 * Sanitize text input by removing potentially dangerous characters
 * @param input - Raw user input
 * @param maxLength - Maximum allowed length (default: 500)
 * @returns Sanitized string
 */
export function sanitizeInput(input: string, maxLength: number = 500): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
    .substring(0, maxLength);
}

/**
 * Sanitize keywords for search queries
 * Allows alphanumeric, spaces, and common punctuation
 */
export function sanitizeKeywords(keywords: string): string {
  if (!keywords || typeof keywords !== 'string') {
    return '';
  }

  return keywords
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 200);
}

/**
 * Sanitize exclusions (comma-separated list)
 * @param exclusions - Comma-separated exclusion terms
 * @returns Sanitized string
 */
export function sanitizeExclusions(exclusions: string): string {
  if (!exclusions || typeof exclusions !== 'string') {
    return '';
  }

  return exclusions
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 300);
}

/**
 * Sanitize location input
 */
export function sanitizeLocation(location: string): string {
  if (!location || typeof location !== 'string') {
    return '';
  }

  return location
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 100);
}

/**
 * Validate Google API key format
 * @param apiKey - Google API key
 * @returns true if valid format
 */
export function validateApiKey(apiKey: string): boolean {
  if (!apiKey || typeof apiKey !== 'string') {
    return false;
  }

  const trimmed = apiKey.trim();

  // Google API keys typically start with "AIza" and are 39 characters long
  return trimmed.startsWith('AIza') && trimmed.length >= 35 && trimmed.length <= 45;
}

/**
 * Validate Google Custom Search Engine ID (CX)
 * @param cxId - Search Engine ID
 * @returns true if valid format
 */
export function validateCxId(cxId: string): boolean {
  if (!cxId || typeof cxId !== 'string') {
    return false;
  }

  const trimmed = cxId.trim();

  // CX IDs are alphanumeric with colons, typically around 20-30 characters
  return /^[a-z0-9:]+$/i.test(trimmed) && trimmed.length >= 10 && trimmed.length <= 50;
}

/**
 * Validate date restriction parameter
 */
export function validateDateRestrict(dateRestrict: string): boolean {
  if (!dateRestrict) {
    return true; // Empty is valid (no restriction)
  }
  return ['', 'd1', 'w1', 'm1'].includes(dateRestrict);
}

/**
 * Validate pagination start index
 */
export function validateStartIndex(startIndex: number): boolean {
  return Number.isInteger(startIndex) && startIndex >= 1 && startIndex <= 91;
}

/**
 * Get validation error message
 */
export function getValidationErrorMessage(field: string, value: string): string {
  switch (field) {
    case 'apiKey':
      return 'Invalid API Key format. Google API keys start with "AIza" and are typically 39 characters long.';
    case 'cxId':
      return 'Invalid Search Engine ID (CX) format. CX IDs contain alphanumeric characters and colons.';
    case 'keywords':
      return 'Keywords are required and must be between 1-200 characters.';
    case 'startIndex':
      return 'Start index must be between 1 and 91.';
    default:
      return `Invalid ${field} value.`;
  }
}

/**
 * Validate all search parameters
 */
export interface SearchValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateSearchParams(params: {
  apiKey: string;
  cxId: string;
  keywords: string;
  startIndex?: number;
  dateRestrict?: string;
}): SearchValidationResult {
  const errors: Record<string, string> = {};

  if (!validateApiKey(params.apiKey)) {
    errors.apiKey = getValidationErrorMessage('apiKey', params.apiKey);
  }

  if (!validateCxId(params.cxId)) {
    errors.cxId = getValidationErrorMessage('cxId', params.cxId);
  }

  if (!params.keywords || params.keywords.trim().length === 0) {
    errors.keywords = getValidationErrorMessage('keywords', params.keywords);
  }

  if (params.startIndex !== undefined && !validateStartIndex(params.startIndex)) {
    errors.startIndex = getValidationErrorMessage('startIndex', String(params.startIndex));
  }

  if (params.dateRestrict !== undefined && !validateDateRestrict(params.dateRestrict)) {
    errors.dateRestrict = 'Invalid date restriction. Must be d1, w1, or m1.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
