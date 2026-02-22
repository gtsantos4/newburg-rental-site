// =============================================================================
// PROPERTY CONFIGURATION
// All property-specific data lives here. Edit this file to customize your site.
// =============================================================================

export const PROPERTY_CONFIG = {
  name: 'Newburg Heights Suites',
  tagline: 'Fully Furnished Rooms · Minutes from UVA',
  address: '2026 Newburg Heights Rd, Charlottesville, VA 22903',
  email: '[REPLACE: your@email.com]',
  phone: '[REPLACE: (555) 123-4567]',
  coordinates: {
    lat: parseFloat(process.env.NEXT_PUBLIC_MAP_LAT || '37.981038801930474'),
    lng: parseFloat(process.env.NEXT_PUBLIC_MAP_LNG || '-78.539607619858'),
  },
  description: `[REPLACE: Welcome to our beautifully maintained property, offering fully furnished private rooms in a shared home. Located in a quiet residential neighborhood just minutes from major hospitals and downtown, our property is perfect for travel nurses, relocating professionals, and anyone looking for comfortable, hassle-free housing.

The home features a spacious shared kitchen, in-unit laundry, off-street parking, and a private backyard. Each room is thoughtfully furnished with a queen bed, desk, dresser, and closet. All utilities, high-speed WiFi, and basic supplies are included in the rent — just bring your suitcase.]`,
  sharedAmenities: [
    { icon: 'Wifi', label: 'High-Speed WiFi' },
    { icon: 'UtensilsCrossed', label: 'Full Kitchen' },
    { icon: 'WashingMachine', label: 'In-Unit Laundry' },
    { icon: 'Car', label: 'Off-Street Parking' },
    { icon: 'Snowflake', label: 'Central A/C & Heat' },
    { icon: 'Tv', label: 'Smart TV in Common Area' },
    // [REPLACE: Add or remove amenities as needed]
  ],
  nearbyPlaces: [
    {
      name: 'UVA Hospital',
      address: '1215 Lee St, Charlottesville, VA 22908',
      distance: '5 miles',
      type: 'hospital',
      lat: 38.0343,
      lng: -78.5029,
    },
    {
      name: 'Martha Jefferson Hospital',
      address: '500 Martha Jefferson Dr, Charlottesville, VA 22911',
      distance: '8 miles',
      type: 'hospital',
      lat: 38.071,
      lng: -78.4471,
    },
    {
      name: '5th Street Station',
      address: '149 5th Street Station Pkwy, Charlottesville, VA 22902',
      distance: '2 miles',
      type: 'grocery',
      lat: 38.0128,
      lng: -78.4938,
    },
    {
      name: 'Downtown Charlottesville',
      address: 'Downtown Mall, Charlottesville, VA 22902',
      distance: '4 miles',
      type: 'entertainment',
      lat: 38.0296,
      lng: -78.4789,
    },
  ],
};

export const UNITS_DATA = [
  {
    id: 'unit-a',
    name: 'The Pinnacle Suite',
    bedrooms: 1,
    bathrooms: 1,
    sqft: '360',
    price: '$1,500',
    includes: 'All utilities, WiFi, furnished',
    availability: 'available', // 'available' | 'coming-soon' | 'occupied'
    availableDate: null, // set date string for 'coming-soon', e.g. '2026-04-01'
    features: [
      'Entire second floor',
      'Sectional sitting area',
      'Queen bed with memory foam mattress',
      'Private staircase with secured entry',
    ],
    images: [
      '/images/unit-a-1.jpg', // [REPLACE: Add your actual image files]
      '/images/unit-a-2.jpg',
    ],
  },
  {
    id: 'unit-b',
    name: 'The Sunrise Suite',
    bedrooms: 1,
    bathrooms: 1,
    sqft: '336',
    price: '$1,400',
    includes: 'All utilities, WiFi, furnished',
    availability: 'coming-soon',
    availableDate: '2026-06-01',
    features: [
      'Private entry',
      'Walk-in closet',
      'Double vanity',
      'Private patio',
    ],
    images: [
      '/images/unit-b-1.jpg',
      '/images/unit-b-2.jpg',
    ],
  },
  {
    id: 'unit-c',
    name: 'The Sunset Suite',
    bedrooms: 1,
    bathrooms: 1,
    sqft: '240',
    price: '$1,200',
    includes: 'All utilities, WiFi, furnished',
    availability: 'coming-soon',
    availableDate: '2026-06-01',
    features: [
      'Private access to back patio',
      'Double door closet',
      'Full bed with memory foam mattress and extra storage',
      'Bathtub shower',
    ],
    images: [
      '/images/unit-c-1.jpg',
    ],
  },
];

export const FAQ_DATA = [
  {
    question: 'What are the lease terms?',
    answer: 'We offer flexible lease terms starting at one month.',
  },
  {
    question: 'What is included in the rent?',
    answer: 'Everything you need is included: electricity, water, gas, trash, high-speed WiFi, and all furnishings. You also have access to the shared kitchen (stocked with basic cookware and utensils), in-unit laundry, and off-street parking. Just bring your clothes and personal items.',
  },
  {
    question: 'What are the move-in costs?',
    answer: 'Move-in costs include first month\'s rent and a security deposit equal to one month\'s rent. The security deposit is fully refundable upon move-out, provided the unit is in good condition.',
  },
  {
    question: 'Is parking available?',
    answer: 'Yes! Off-street parking is included at no additional cost. Each tenant can bring one car and park in the driveway.',
  },
  {
    question: 'Are pets allowed?',
    answer: 'We are not currently able to accommodate pets due to existing tenants with allergies. We understand this may be disappointing and appreciate your understanding.',
  },
  {
    question: 'Is there laundry on site?',
    answer: 'Yes, there is an in-unit washer and dryer available to all tenants at no extra cost.',
  },
  {
    question: 'How do I receive mail and packages?',
    answer: 'You\'ll have access to the shared mailbox.',
  },
  {
    question: 'What is the smoking policy?',
    answer: 'This is a strictly non-smoking property — no smoking is permitted anywhere on the property.',
  },
  {
    question: 'What happens if I need to end my lease early?',
    answer: 'We understand that plans change. We ask for 30 days written notice for early termination. Depending on the circumstances and remaining lease term, a portion of the security deposit may be retained. We\'ll work with you to find a fair solution.',
  },
  {
    question: 'How long does the application process take?',
    answer: 'We typically review applications within 24-48 hours. Once approved, we\'ll send you a lease agreement to sign electronically. Move-in can usually be arranged within a few days of approval, depending on unit availability.',
  },
  {
    question: 'Is there a background or credit check?',
    answer: 'We do a basic background check as part of the application review. We don\'t run a hard credit pull — we primarily look at rental history and verify employment/income. Travel nurses and other traveling professionals with strong employment verification are typically approved quickly.',
  },
  {
    question: 'What furnishings are included in each room?',
    answer: 'Each room comes fully furnished with a bed, nightstand, dresser, closet or wardrobe, and curtains. Bed linens, pillows, and towels are provided. The shared kitchen includes all essential cookware, dishes, and utensils.]',
  },
  {
    question: 'How do I contact the property owner?',
    answer: '[REPLACE: You can reach me by email at your@email.com or by phone/text at (555) 123-4567. I typically respond within a few hours during business hours. For urgent maintenance issues, please call or text directly.]',
  },
];

export const HOW_TO_APPLY = {
  steps: [
    {
      number: 1,
      title: 'Browse Available Units',
      description: 'Review the units above and find the one that fits your needs and budget.',
    },
    {
      number: 2,
      title: 'Submit Your Application',
      description: 'Fill out our simple online application with your basic information, employment details, and move-in preferences.',
    },
    {
      number: 3,
      title: 'Complete the Background Check',
      description: 'Follow the link to complete the TransUnion background check.',
    },
    {
      number: 4,
      title: 'Get Approved',
      description: 'We review applications within 24-48 hours and will reach out to you via email or phone.',
    },
  ],
  requirements: [
    'Valid government-issued photo ID',
    'Proof of employment or assignment contract',
    'Contact information for a current or previous landlord',
    'Emergency contact information',
  ],
};

// Allowed values for form dropdowns (must match validation)
export const VALID_UNITS = UNITS_DATA.map((u) => u.name).concat(['No Preference']);
export const VALID_UNIT_IDS = UNITS_DATA.map((u) => u.id).concat(['no-preference']);

export const VALID_LEASE_LENGTHS = [
  'Month-to-month',
  '3 months',
  '6 months',
  '12 months',
];

export const VALID_INCOME_RANGES = [
  'Under $3,000',
  '$3,000 - $5,000',
  '$5,000 - $7,000',
  '$7,000 - $10,000',
  '$10,000+',
];
