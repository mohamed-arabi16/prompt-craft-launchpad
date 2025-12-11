import { describe, it, expect } from 'vitest';
import { 
  enrollmentSchema, 
  contactSchema, 
  signInSchema, 
  signUpSchema 
} from '@/lib/validations';

describe('Enrollment Schema', () => {
  it('should validate a complete valid enrollment', () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      company: 'Acme Inc',
      aiExperience: 'intermediate' as const,
      goals: 'Learn AI prompting',
    };

    const result = enrollmentSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should validate enrollment without optional fields', () => {
    const minimalData = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@test.com',
      phone: '555-1234',
      aiExperience: 'beginner' as const,
    };

    const result = enrollmentSchema.safeParse(minimalData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const invalidData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'not-an-email',
      phone: '+1234567890',
      aiExperience: 'beginner' as const,
    };

    const result = enrollmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject empty first name', () => {
    const invalidData = {
      firstName: '',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      aiExperience: 'beginner' as const,
    };

    const result = enrollmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject first name with invalid characters', () => {
    const invalidData = {
      firstName: 'John123',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      aiExperience: 'beginner' as const,
    };

    const result = enrollmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject invalid experience level', () => {
    const invalidData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      aiExperience: 'expert',
    };

    const result = enrollmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should trim whitespace from inputs', () => {
    const dataWithWhitespace = {
      firstName: '  John  ',
      lastName: '  Doe  ',
      email: '  john@example.com  ',
      phone: '  +1234567890  ',
      aiExperience: 'beginner' as const,
    };

    const result = enrollmentSchema.safeParse(dataWithWhitespace);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.firstName).toBe('John');
      expect(result.data.lastName).toBe('Doe');
      expect(result.data.email).toBe('john@example.com');
    }
  });

  it('should accept Arabic names', () => {
    const arabicData = {
      firstName: 'محمد',
      lastName: 'أحمد',
      email: 'mohammed@example.com',
      phone: '+966123456789',
      aiExperience: 'advanced' as const,
    };

    const result = enrollmentSchema.safeParse(arabicData);
    expect(result.success).toBe(true);
  });

  it('should enforce max length on first name', () => {
    const invalidData = {
      firstName: 'A'.repeat(51),
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      aiExperience: 'beginner' as const,
    };

    const result = enrollmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe('Contact Schema', () => {
  it('should validate a complete valid contact form', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Question about the course',
      message: 'I would like to know more about the course content.',
    };

    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject empty message', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Question',
      message: '',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should enforce max length on message', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Question',
      message: 'A'.repeat(5001),
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe('Sign In Schema', () => {
  it('should validate valid credentials', () => {
    const validData = {
      email: 'user@example.com',
      password: 'password123',
    };

    const result = signInSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject empty password', () => {
    const invalidData = {
      email: 'user@example.com',
      password: '',
    };

    const result = signInSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe('Sign Up Schema', () => {
  it('should validate valid signup data', () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'SecurePass1',
      confirmPassword: 'SecurePass1',
    };

    const result = signUpSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject password without uppercase', () => {
    const invalidData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password1',
      confirmPassword: 'password1',
    };

    const result = signUpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject password without number', () => {
    const invalidData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'SecurePass',
      confirmPassword: 'SecurePass',
    };

    const result = signUpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject mismatched passwords', () => {
    const invalidData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'SecurePass1',
      confirmPassword: 'DifferentPass1',
    };

    const result = signUpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject short password', () => {
    const invalidData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Pass1',
      confirmPassword: 'Pass1',
    };

    const result = signUpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
