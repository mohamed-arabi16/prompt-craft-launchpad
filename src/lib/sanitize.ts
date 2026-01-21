import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * Uses DOMPurify to remove potentially harmful tags and attributes
 *
 * @param dirty - The HTML string to sanitize
 * @param config - Optional DOMPurify configuration
 * @returns Sanitized HTML string safe for rendering
 */
export const sanitizeHTML = (
  dirty: string,
  config?: DOMPurify.Config
): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ...config,
  });
};

/**
 * Sanitizes plain text by removing HTML tags
 * Useful for content that should never contain HTML
 *
 * @param text - The text to sanitize
 * @returns Plain text without HTML tags
 */
export const sanitizeText = (text: string): string => {
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

/**
 * Validates and sanitizes user input for database storage
 * Removes scripts and potentially dangerous content
 *
 * @param input - User input to sanitize
 * @returns Sanitized input safe for storage
 */
export const sanitizeUserInput = (input: string): string => {
  return sanitizeText(input.trim());
};

export default DOMPurify;
