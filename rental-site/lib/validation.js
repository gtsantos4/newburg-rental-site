import { VALID_UNIT_IDS, VALID_LEASE_LENGTHS, VALID_INCOME_RANGES } from './config';

// Sanitize a string input: trim whitespace, strip HTML tags
export function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/[<>]/g, '') // strip angle brackets
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Validate email format
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone format (digits, hyphens, parens, spaces, plus)
export function isValidPhone(phone) {
  const phoneRegex = /^[0-9()+\-.\s]{7,20}$/;
  return phoneRegex.test(phone);
}

// Validate a date string and check if it's today or later
export function isValidFutureDate(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

// Validate the full application payload
// Returns { valid: boolean, errors: { field: message } }
export function validateApplication(data) {
  const errors = {};

  // Required: first_name
  if (!data.first_name || sanitizeInput(data.first_name).length === 0) {
    errors.first_name = 'First name is required';
  } else if (data.first_name.length > 100) {
    errors.first_name = 'First name must be 100 characters or less';
  }

  // Required: last_name
  if (!data.last_name || sanitizeInput(data.last_name).length === 0) {
    errors.last_name = 'Last name is required';
  } else if (data.last_name.length > 100) {
    errors.last_name = 'Last name must be 100 characters or less';
  }

  // Required: email
  if (!data.email || sanitizeInput(data.email).length === 0) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  } else if (data.email.length > 255) {
    errors.email = 'Email must be 255 characters or less';
  }

  // Required: phone
  if (!data.phone || sanitizeInput(data.phone).length === 0) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Optional: unit_preference — must be valid if provided
  if (data.unit_preference && data.unit_preference !== '') {
    if (!VALID_UNIT_IDS.includes(data.unit_preference)) {
      errors.unit_preference = 'Please select a valid unit';
    }
  }

  // Optional: move_in_date — must be future if provided
  if (data.move_in_date && data.move_in_date !== '') {
    if (!isValidFutureDate(data.move_in_date)) {
      errors.move_in_date = 'Move-in date must be today or later';
    }
  }

  // Optional: lease_length — must be from allowed list
  if (data.lease_length && data.lease_length !== '') {
    if (!VALID_LEASE_LENGTHS.includes(data.lease_length)) {
      errors.lease_length = 'Please select a valid lease length';
    }
  }

  // Optional: employer — max 200 chars
  if (data.employer && data.employer.length > 200) {
    errors.employer = 'Employer name must be 200 characters or less';
  }

  // Optional: monthly_income — must be from allowed list
  if (data.monthly_income && data.monthly_income !== '') {
    if (!VALID_INCOME_RANGES.includes(data.monthly_income)) {
      errors.monthly_income = 'Please select a valid income range';
    }
  }

  // Optional: current_address — max 500 chars
  if (data.current_address && data.current_address.length > 500) {
    errors.current_address = 'Address must be 500 characters or less';
  }

  // Optional: landlord_name — max 200 chars
  if (data.landlord_name && data.landlord_name.length > 200) {
    errors.landlord_name = 'Landlord name must be 200 characters or less';
  }

  // Optional: landlord_phone — valid format if provided
  if (data.landlord_phone && data.landlord_phone !== '') {
    if (!isValidPhone(data.landlord_phone)) {
      errors.landlord_phone = 'Please enter a valid phone number';
    }
  }

  // Optional: emergency_contact_name — max 200 chars
  if (data.emergency_contact_name && data.emergency_contact_name.length > 200) {
    errors.emergency_contact_name = 'Name must be 200 characters or less';
  }

  // Optional: emergency_contact_phone — valid format if provided
  if (data.emergency_contact_phone && data.emergency_contact_phone !== '') {
    if (!isValidPhone(data.emergency_contact_phone)) {
      errors.emergency_contact_phone = 'Please enter a valid phone number';
    }
  }

  // Optional: additional_notes — max 2000 chars
  if (data.additional_notes && data.additional_notes.length > 2000) {
    errors.additional_notes = 'Notes must be 2000 characters or less';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// Sanitize all fields in an application payload
export function sanitizeApplication(data) {
  return {
    first_name: sanitizeInput(data.first_name || ''),
    last_name: sanitizeInput(data.last_name || ''),
    email: (data.email || '').trim().toLowerCase(),
    phone: sanitizeInput(data.phone || ''),
    unit_preference: data.unit_preference || null,
    move_in_date: data.move_in_date || null,
    lease_length: data.lease_length || null,
    employer: sanitizeInput(data.employer || ''),
    monthly_income: data.monthly_income || null,
    current_address: sanitizeInput(data.current_address || ''),
    landlord_name: sanitizeInput(data.landlord_name || ''),
    landlord_phone: sanitizeInput(data.landlord_phone || ''),
    emergency_contact_name: sanitizeInput(data.emergency_contact_name || ''),
    emergency_contact_phone: sanitizeInput(data.emergency_contact_phone || ''),
    additional_notes: sanitizeInput(data.additional_notes || ''),
  };
}
