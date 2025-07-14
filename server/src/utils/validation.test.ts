import UserValidation, { ValidationError } from './validation';
import { Role } from '../Database/models/user';

// Test cases for email validation
console.log('=== Email Validation Tests ===');
const emailTests = [
  { email: 'test@example.com', expected: true },
  { email: 'user.name@domain.co.uk', expected: true },
  { email: 'invalid-email', expected: false },
  { email: '@domain.com', expected: false },
  { email: 'test@', expected: false },
  { email: '', expected: false },
  { email: 'test@domain', expected: false },
  { email: 'test..test@domain.com', expected: false }
];

emailTests.forEach(test => {
  const result = UserValidation.validateEmail(test.email);
  console.log(`${test.email} -> ${result.success} (expected: ${test.expected})`);
  if (!result.success) {
    console.log(`  Error: ${result.error}`);
  }
});

// Test cases for phone number validation
console.log('\n=== Phone Number Validation Tests ===');
const phoneTests = [
  { phone: '+1234567890', expected: true },
  { phone: '1234567890', expected: true },
  { phone: '+1 234 567 890', expected: true },
  { phone: '123-456-7890', expected: false },
  { phone: 'abc123', expected: false },
  { phone: '', expected: false },
  { phone: '+', expected: false },
  { phone: '123', expected: false }
];

phoneTests.forEach(test => {
  const result = UserValidation.validatePhoneNumber(test.phone);
  console.log(`${test.phone} -> ${result.success} (expected: ${test.expected})`);
  if (!result.success) {
    console.log(`  Error: ${result.error}`);
  }
});

// Test cases for password validation
console.log('\n=== Password Validation Tests ===');
const passwordTests = [
  { password: 'Password123', expected: true },
  { password: 'MyPass123', expected: true },
  { password: 'password123', expected: false }, // no uppercase
  { password: 'PASSWORD123', expected: false }, // no lowercase
  { password: 'Password', expected: false }, // no number
  { password: 'Pass1', expected: false }, // too short
  { password: '', expected: false },
  { password: 'Pass@word123', expected: true }
];

passwordTests.forEach(test => {
  const result = UserValidation.validatePassword(test.password);
  console.log(`${test.password} -> ${result.success} (expected: ${test.expected})`);
  if (!result.success) {
    console.log(`  Error: ${result.error}`);
  }
});

// Test cases for name validation
console.log('\n=== Name Validation Tests ===');
const nameTests = [
  { name: 'John', expected: true },
  { name: 'Mary Jane', expected: true },
  { name: 'A', expected: false }, // too short
  { name: 'John123', expected: false }, // contains numbers
  { name: 'John@Doe', expected: false }, // contains special characters
  { name: '', expected: false },
  { name: 'A'.repeat(51), expected: false } // too long
];

nameTests.forEach(test => {
  const firstNameResult = UserValidation.validateFirstName(test.name);
  const lastNameResult = UserValidation.validateLastName(test.name);
  console.log(`${test.name} -> First: ${firstNameResult.success}, Last: ${lastNameResult.success} (expected: ${test.expected})`);
  if (!firstNameResult.success) {
    console.log(`  First Name Error: ${firstNameResult.error}`);
  }
  if (!lastNameResult.success) {
    console.log(`  Last Name Error: ${lastNameResult.error}`);
  }
});

// Test cases for role validation
console.log('\n=== Role Validation Tests ===');
const roleTests = [
  { role: 'ADMIN', expected: true },
  { role: 'CONTRACTOR', expected: true },
  { role: 'CLIENT', expected: true },
  { role: 'COMPANY', expected: true },
  { role: 'USER', expected: false },
  { role: 'admin', expected: false }, // case sensitive
  { role: '', expected: false }
];

roleTests.forEach(test => {
  const result = UserValidation.validateRole(test.role);
  console.log(`${test.role} -> ${result.success} (expected: ${test.expected})`);
  if (!result.success) {
    console.log(`  Error: ${result.error}`);
  }
});

// Test cases for comprehensive user data validation
console.log('\n=== Comprehensive User Data Validation Tests ===');

const userDataTests = [
  {
    name: 'Valid user data',
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      password: 'Password123',
      role: 'CONTRACTOR'
    },
    expectedValid: true
  },
  {
    name: 'Invalid email',
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      phoneNumber: '+1234567890',
      password: 'Password123',
      role: 'CONTRACTOR'
    },
    expectedValid: false
  },
  {
    name: 'Weak password',
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      password: 'password',
      role: 'CONTRACTOR'
    },
    expectedValid: false
  },
  {
    name: 'Invalid role',
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      password: 'Password123',
      role: 'INVALID_ROLE'
    },
    expectedValid: false
  }
];

userDataTests.forEach(test => {
  const result = UserValidation.validateUserData(test.data);
  console.log(`${test.name}: ${result.isValid} (expected: ${test.expectedValid})`);
  if (!result.isValid) {
    console.log(`  Errors: ${result.errors.join(', ')}`);
  }
});

// Test cases for user update validation
console.log('\n=== User Update Validation Tests ===');
const userUpdateTests = [
  {
    name: 'Valid partial update',
    data: {
      firstName: 'Jane',
      email: 'jane.doe@example.com'
    },
    expectedValid: true
  },
  {
    name: 'Empty update',
    data: {},
    expectedValid: false
  },
  {
    name: 'Invalid email in update',
    data: {
      email: 'invalid-email'
    },
    expectedValid: false
  }
];

userUpdateTests.forEach(test => {
  const result = UserValidation.validateUserUpdate(test.data);
  console.log(`${test.name}: ${result.isValid} (expected: ${test.expectedValid})`);
  if (!result.isValid) {
    console.log(`  Errors: ${result.errors.join(', ')}`);
  }
});

// Test cases for user login validation
console.log('\n=== User Login Validation Tests ===');
const userLoginTests = [
  {
    name: 'Valid login',
    data: {
      email: 'john.doe@example.com',
      password: 'Password123'
    },
    expectedValid: true
  },
  {
    name: 'Missing email',
    data: {
      password: 'Password123'
    },
    expectedValid: false
  },
  {
    name: 'Invalid email format',
    data: {
      email: 'invalid-email',
      password: 'Password123'
    },
    expectedValid: false
  }
];

userLoginTests.forEach(test => {
  const result = UserValidation.validateUserLogin(test.data);
  console.log(`${test.name}: ${result.isValid} (expected: ${test.expectedValid})`);
  if (!result.isValid) {
    console.log(`  Errors: ${result.errors.join(', ')}`);
  }
});

// Test cases for data sanitization
console.log('\n=== Data Sanitization Tests ===');
const sanitizationTests = [
  {
    name: 'Trim whitespace and lowercase email',
    input: {
      firstName: '  John  ',
      lastName: '  Doe  ',
      email: '  JOHN.DOE@EXAMPLE.COM  ',
      phoneNumber: '  +1234567890  '
    }
  },
  {
    name: 'Mixed case email',
    input: {
      email: 'User.Name@DOMAIN.COM'
    }
  }
];

sanitizationTests.forEach(test => {
  const result = UserValidation.sanitizeUserData(test.input);
  console.log(`${test.name}:`);
  console.log(`  Input: ${JSON.stringify(test.input)}`);
  console.log(`  Output: ${JSON.stringify(result)}`);
});

console.log('\n=== Validation Tests Complete ==='); 