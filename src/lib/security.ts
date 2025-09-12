import { z } from 'zod';
import crypto from 'crypto';

// Input validation schemas
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов')
    .regex(/^[a-zA-Zа-яА-ЯёЁ\s\-']+$/, 'Имя содержит недопустимые символы'),
  
  email: z.string()
    .email('Введите корректный email')
    .max(100, 'Email не должен превышать 100 символов')
    .toLowerCase()
    .trim(),
  
  phone: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      // Russian phone number validation
      const phoneRegex = /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
      return phoneRegex.test(val.replace(/\s/g, ''));
    }, 'Введите корректный номер телефона'),
  
  subject: z.enum(['partnership', 'participation', 'media', 'support', 'other', ''])
    .optional(),
  
  message: z.string()
    .min(10, 'Сообщение должно содержать минимум 10 символов')
    .max(1000, 'Сообщение не должно превышать 1000 символов')
    .trim(),
});

export const donationFormSchema = z.object({
  amount: z.number()
    .min(1, 'Минимальная сумма 1 рубль')
    .max(1000000, 'Максимальная сумма 1,000,000 рублей')
    .int('Сумма должна быть целым числом'),
  
  recurring: z.boolean().optional(),
  
  email: z.string()
    .email('Введите корректный email для квитанции')
    .optional(),
});

// Sanitization functions
export function sanitizeHtml(input: string): string {
  // Remove all HTML tags and scripts
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

export function sanitizeInput(input: string): string {
  // Basic sanitization for general text input
  return input
    .replace(/[<>'"]/g, (char) => {
      const entities: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      };
      return entities[char];
    })
    .trim();
}

// CSRF token generation and validation
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  if (!token || !sessionToken) return false;
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(sessionToken)
  );
}

// Rate limiting helper
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);
  
  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }
  
  if (entry.count >= maxRequests) {
    return false;
  }
  
  entry.count++;
  return true;
}

// Clean up old rate limit entries
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetTime < now) {
      rateLimitMap.delete(key);
    }
  }
}, 60000); // Clean up every minute

// IP address validation
export function isValidIP(ip: string): boolean {
  // IPv4
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  // IPv6
  const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

// Session security
export function generateSessionId(): string {
  return crypto.randomBytes(32).toString('base64url');
}

// Encryption helpers for sensitive data
const algorithm = 'aes-256-gcm';
const secretKey = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');

export function encryptData(text: string): { encrypted: string; iv: string; authTag: string } {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex'),
  };
}

export function decryptData(encrypted: string, iv: string, authTag: string): string {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey, 'hex'),
    Buffer.from(iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Password strength validation (for future use)
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 12) {
    errors.push('Пароль должен содержать минимум 12 символов');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Пароль должен содержать хотя бы одну заглавную букву');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Пароль должен содержать хотя бы одну строчную букву');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Пароль должен содержать хотя бы одну цифру');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Пароль должен содержать хотя бы один специальный символ');
  }
  
  // Check for common passwords
  const commonPasswords = ['password', '12345678', 'qwerty', 'abc123', 'password123'];
  if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
    errors.push('Пароль слишком простой');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Security audit logging
export function logSecurityEvent(event: {
  type: 'login_attempt' | 'form_submission' | 'rate_limit' | 'validation_error' | 'csrf_error';
  ip?: string;
  userId?: string;
  details?: any;
}) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    ...event,
  };
  
  // In production, send to logging service
  if (process.env.NODE_ENV === 'production') {
    // Send to logging service (e.g., Sentry, LogRocket, etc.)
    console.log('Security Event:', JSON.stringify(logEntry));
  } else {
    console.log('Security Event:', logEntry);
  }
}

// Content Security Policy helper
export function generateNonce(): string {
  return crypto.randomBytes(16).toString('base64');
}

// GDPR compliance helpers
export interface UserConsent {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
  timestamp: Date;
  ip?: string;
}

export function validateConsent(consent: any): consent is UserConsent {
  return (
    typeof consent === 'object' &&
    typeof consent.analytics === 'boolean' &&
    typeof consent.marketing === 'boolean' &&
    typeof consent.necessary === 'boolean' &&
    consent.timestamp instanceof Date
  );
}

// Data anonymization
export function anonymizeEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '***@***.***';
  
  const anonymizedLocal = local.substring(0, 2) + '***';
  const [domainName, ...domainParts] = domain.split('.');
  const anonymizedDomain = domainName.substring(0, 2) + '***.' + domainParts.join('.');
  
  return `${anonymizedLocal}@${anonymizedDomain}`;
}

export function anonymizePhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10) return '***';
  
  return cleaned.substring(0, 3) + '****' + cleaned.substring(cleaned.length - 2);
}

// Export all validation schemas
export const validationSchemas = {
  contactForm: contactFormSchema,
  donationForm: donationFormSchema,
} as const;