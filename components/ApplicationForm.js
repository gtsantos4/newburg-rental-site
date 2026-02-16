'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import {
  UNITS_DATA,
  VALID_UNIT_IDS,
  VALID_LEASE_LENGTHS,
  VALID_INCOME_RANGES,
} from '@/lib/config';

function FormField({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClasses =
  'w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors';
const inputErrorClasses =
  'w-full px-4 py-2.5 border border-red-500 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors';

const initialFormState = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  unit_preference: '',
  move_in_date: '',
  lease_length: '',
  employer: '',
  monthly_income: '',
  current_address: '',
  landlord_name: '',
  landlord_phone: '',
  emergency_contact_name: '',
  emergency_contact_phone: '',
  additional_notes: '',
};

export default function ApplicationForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Pre-select unit from URL param
  useEffect(() => {
    const unit = searchParams.get('unit');
    if (unit && VALID_UNIT_IDS.includes(unit)) {
      setForm((prev) => ({ ...prev, unit_preference: unit }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, form[name]);
  };

  const validateField = (name, value) => {
    let error = null;

    switch (name) {
      case 'first_name':
        if (!value.trim()) error = 'First name is required';
        else if (value.length > 100) error = 'Must be 100 characters or less';
        break;
      case 'last_name':
        if (!value.trim()) error = 'Last name is required';
        else if (value.length > 100) error = 'Must be 100 characters or less';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = 'Please enter a valid email';
        break;
      case 'phone':
        if (!value.trim()) error = 'Phone number is required';
        else if (!/^[0-9()+\-.\s]{7,20}$/.test(value))
          error = 'Please enter a valid phone number';
        break;
      case 'move_in_date':
        if (value) {
          const date = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (date < today) error = 'Move-in date must be today or later';
        }
        break;
    }

    setErrors((prev) => {
      const next = { ...prev };
      if (error) next[name] = error;
      else delete next[name];
      return next;
    });

    return error;
  };

  const validateAll = () => {
    const newErrors = {};
    const required = ['first_name', 'last_name', 'email', 'phone'];
    required.forEach((field) => {
      const err = validateField(field, form[field]);
      if (err) newErrors[field] = err;
    });

    // Validate move_in_date if provided
    if (form.move_in_date) {
      const err = validateField('move_in_date', form.move_in_date);
      if (err) newErrors.move_in_date = err;
    }

    setErrors(newErrors);
    setTouched(
      Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateAll()) return;

    setSubmitting(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setSubmitError('Too many requests. Please try again later.');
        } else if (data.details) {
          setErrors(data.details);
        } else {
          setSubmitError(data.error || 'Something went wrong. Please try again.');
        }
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError('Unable to submit. Check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Application Received!
          </h2>
          <p className="text-gray-600 mb-6">
            We&apos;ll review your application and get back to you at{' '}
            <strong>{form.email}</strong> within 24-48 hours.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-navy font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Property Info
          </a>
        </div>
      </div>
    );
  }

  const unitOptions = UNITS_DATA.map((u) => ({
    value: u.id,
    label: `${u.name} — ${u.price}/mo`,
    disabled: u.availability === 'occupied',
  }));

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} noValidate>
        {/* Submit Error Banner */}
        {submitError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{submitError}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          {/* Section 1: Personal Information */}
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <FormField
              label="First Name"
              required
              error={touched.first_name && errors.first_name}
            >
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Jane"
                className={
                  touched.first_name && errors.first_name
                    ? inputErrorClasses
                    : inputClasses
                }
              />
            </FormField>
            <FormField
              label="Last Name"
              required
              error={touched.last_name && errors.last_name}
            >
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Smith"
                className={
                  touched.last_name && errors.last_name
                    ? inputErrorClasses
                    : inputClasses
                }
              />
            </FormField>
            <FormField
              label="Email"
              required
              error={touched.email && errors.email}
            >
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="jane@example.com"
                className={
                  touched.email && errors.email
                    ? inputErrorClasses
                    : inputClasses
                }
              />
            </FormField>
            <FormField
              label="Phone"
              required
              error={touched.phone && errors.phone}
            >
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="(555) 123-4567"
                className={
                  touched.phone && errors.phone
                    ? inputErrorClasses
                    : inputClasses
                }
              />
            </FormField>
          </div>

          {/* Section 2: Unit & Move-In Preferences */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Unit &amp; Move-In Preferences
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-2">
              <FormField label="Unit Preference">
                <select
                  name="unit_preference"
                  value={form.unit_preference}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="">No Preference</option>
                  {unitOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                      {opt.label}
                      {opt.disabled ? ' (Occupied)' : ''}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField
                label="Desired Move-In Date"
                error={touched.move_in_date && errors.move_in_date}
              >
                <input
                  type="date"
                  name="move_in_date"
                  value={form.move_in_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    touched.move_in_date && errors.move_in_date
                      ? inputErrorClasses
                      : inputClasses
                  }
                />
              </FormField>
            </div>
            <div className="mt-4">
              <FormField label="Lease Length Preference">
                <select
                  name="lease_length"
                  value={form.lease_length}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="">Select...</option>
                  {VALID_LEASE_LENGTHS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>
          </div>

          {/* Section 3: Employment & Income */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Employment &amp; Income
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Employer Name">
                <input
                  type="text"
                  name="employer"
                  value={form.employer}
                  onChange={handleChange}
                  placeholder="City General Hospital"
                  className={inputClasses}
                />
              </FormField>
              <FormField label="Monthly Income Range">
                <select
                  name="monthly_income"
                  value={form.monthly_income}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="">Select...</option>
                  {VALID_INCOME_RANGES.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>
          </div>

          {/* Section 4: Current Housing */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Current Housing
            </h3>
            <div className="space-y-4">
              <FormField label="Current Address">
                <textarea
                  name="current_address"
                  value={form.current_address}
                  onChange={handleChange}
                  rows={2}
                  placeholder="123 Current St, City, ST 12345"
                  className={inputClasses}
                />
              </FormField>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Current Landlord Name">
                  <input
                    type="text"
                    name="landlord_name"
                    value={form.landlord_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={inputClasses}
                  />
                </FormField>
                <FormField label="Current Landlord Phone">
                  <input
                    type="tel"
                    name="landlord_phone"
                    value={form.landlord_phone}
                    onChange={handleChange}
                    placeholder="(555) 987-6543"
                    className={inputClasses}
                  />
                </FormField>
              </div>
            </div>
          </div>

          {/* Section 5: Emergency Contact */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Emergency Contact
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Emergency Contact Name">
                <input
                  type="text"
                  name="emergency_contact_name"
                  value={form.emergency_contact_name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className={inputClasses}
                />
              </FormField>
              <FormField label="Emergency Contact Phone">
                <input
                  type="tel"
                  name="emergency_contact_phone"
                  value={form.emergency_contact_phone}
                  onChange={handleChange}
                  placeholder="(555) 555-5555"
                  className={inputClasses}
                />
              </FormField>
            </div>
          </div>

          {/* Section 6: Additional Notes */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Information
            </h3>
            <FormField label="Anything else you'd like us to know?">
              <textarea
                name="additional_notes"
                value={form.additional_notes}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about your situation, move-in timeline, questions, etc."
                className={inputClasses}
              />
            </FormField>
          </div>

          {/* Submit */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-accent text-white py-3 rounded-lg text-lg font-semibold hover:bg-accent-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
