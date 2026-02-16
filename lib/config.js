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
    lat: parseFloat(process.env.NEXT_PUBLIC_MAP_LAT || '40.7128'),
    lng: parseFloat(process.env.NEXT_PUBLIC_MAP_LNG || '-74.0060'),
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
    { name: 'UVA Hospital', distance: '5 miles', type: 'hospital' },
    { name: 'Martha Jefferson Hospital', distance: '8 miles', type: 'hospital' },
    { name: '5th Street Station', distance: '2 miles', type: 'grocery' },
    { name: 'Downtown Charlottesville', distance: '4 miles', type: 'entertainment' },
    // [REPLACE: Add your actual nearby places]
  ],
};

export const UNITS_DATA = [
  {
    id: 'unit-a',
    name: '[REPLACE: Unit A — The Garden Room]',
    bedrooms: 1,
    bathrooms: 1,
    sqft: '[REPLACE: 180]',
    price: '[REPLACE: $1,200]',
    includes: 'All utilities, WiFi, furnished',
    availability: 'available', // 'available' | 'coming-soon' | 'occupied'
    availableDate: null, // set date string for 'coming-soon', e.g. '2026-04-01'
    features: [
      '[REPLACE: Private entrance]',
      '[REPLACE: En-suite bathroom]',
      '[REPLACE: Queen bed with memory foam mattress]',
      '[REPLACE: Garden view]',
    ],
    images: [
      '/images/unit-a-1.jpg', // [REPLACE: Add your actual image files]
      '/images/unit-a-2.jpg',
    ],
  },
  {
    id: 'unit-b',
    name: '[REPLACE: Unit B — The Corner Suite]',
    bedrooms: 1,
    bathrooms: 1,
    sqft: '[REPLACE: 200]',
    price: '[REPLACE: $1,350]',
    includes: 'All utilities, WiFi, furnished',
    availability: 'available',
    availableDate: null,
    features: [
      '[REPLACE: Corner unit with extra windows]',
      '[REPLACE: Walk-in closet]',
      '[REPLACE: Queen bed with memory foam mattress]',
      '[REPLACE: Desk workspace]',
    ],
    images: [
      '/images/unit-b-1.jpg',
      '/images/unit-b-2.jpg',
    ],
  },
  {
    id: 'unit-c',
    name: '[REPLACE: Unit C — The Cozy Nook]',
    bedrooms: 1,
    bathrooms: 1,
    sqft: '[REPLACE: 160]',
    price: '[REPLACE: $1,100]',
    includes: 'All utilities, WiFi, furnished',
    availability: 'coming-soon',
    availableDate: '2026-04-01',
    features: [
      '[REPLACE: Cozy layout perfect for one]',
      '[REPLACE: Full bed with pillow-top mattress]',
      '[REPLACE: Built-in shelving]',
      '[REPLACE: Shared bathroom (shared with one other unit)]',
    ],
    images: [
      '/images/unit-c-1.jpg',
    ],
  },
  {
    id: 'unit-d',
    name: '[REPLACE: Unit D — The Upstairs Retreat]',
    bedrooms: 1,
    bathrooms: 1,
    sqft: '[REPLACE: 220]',
    price: '[REPLACE: $1,400]',
    includes: 'All utilities, WiFi, furnished',
    availability: 'occupied',
    availableDate: null,
    features: [
      '[REPLACE: Largest unit — second floor]',
      '[REPLACE: Private bathroom]',
      '[REPLACE: King bed]',
      '[REPLACE: Mini fridge and microwave in room]',
    ],
    images: [
      '/images/unit-d-1.jpg',
      '/images/unit-d-2.jpg',
    ],
  },
  // [REPLACE: Add or remove units as needed. Keep the same object shape.]
];

export const FAQ_DATA = [
  {
    question: 'What are the lease terms?',
    answer: '[REPLACE: We offer flexible lease terms starting at one month. Most of our tenants are travel nurses on 13-week assignments, but we welcome stays of any length. Month-to-month, 3-month, 6-month, and 12-month options are available.]',
  },
  {
    question: 'What is included in the rent?',
    answer: '[REPLACE: Everything you need is included: electricity, water, gas, trash, high-speed WiFi, and all furnishings. You also have access to the shared kitchen (stocked with basic cookware and utensils), in-unit laundry, and off-street parking. Just bring your clothes and personal items.]',
  },
  {
    question: 'What are the move-in costs?',
    answer: '[REPLACE: Move-in costs include first month\'s rent and a security deposit equal to one month\'s rent. The security deposit is fully refundable upon move-out, provided the unit is in good condition. No last month\'s rent required upfront.]',
  },
  {
    question: 'Is parking available?',
    answer: '[REPLACE: Yes! Off-street parking is included at no additional cost. Each tenant gets one designated parking spot. Street parking is also available in the neighborhood.]',
  },
  {
    question: 'Are pets allowed?',
    answer: '[REPLACE: We are not currently able to accommodate pets due to existing tenants with allergies. We understand this may be disappointing and appreciate your understanding. Service animals are welcome with proper documentation.]',
  },
  {
    question: 'Can I have guests?',
    answer: '[REPLACE: Absolutely! Overnight guests are welcome for up to 3 consecutive nights. Please be mindful of shared spaces and other tenants. Extended guest stays (4+ nights) should be discussed with the property owner in advance.]',
  },
  {
    question: 'Is there laundry on site?',
    answer: '[REPLACE: Yes, there is an in-unit washer and dryer available to all tenants at no extra cost. Detergent is provided. Please be courteous about leaving laundry in the machines.]',
  },
  {
    question: 'How do I receive mail and packages?',
    answer: '[REPLACE: You\'ll have access to the shared mailbox. Packages can be delivered to the front porch or you can use the property address for Amazon Locker and similar services. We recommend using a package locker for valuable deliveries.]',
  },
  {
    question: 'What is the smoking policy?',
    answer: '[REPLACE: This is a strictly non-smoking property — no smoking inside the house or within 25 feet of any entrance. Smoking is permitted in the designated outdoor area in the backyard.]',
  },
  {
    question: 'Are there quiet hours?',
    answer: '[REPLACE: Yes, quiet hours are from 10 PM to 7 AM. We understand that many of our tenants work night shifts, so we ask everyone to be respectful of different schedules. Headphones are appreciated for late-night TV or music.]',
  },
  {
    question: 'What happens if I need to end my lease early?',
    answer: '[REPLACE: We understand that plans change. We ask for 30 days written notice for early termination. Depending on the circumstances and remaining lease term, a portion of the security deposit may be retained. We\'ll work with you to find a fair solution.]',
  },
  {
    question: 'How long does the application process take?',
    answer: '[REPLACE: We typically review applications within 24-48 hours. Once approved, we\'ll send you a lease agreement to sign electronically. Move-in can usually be arranged within a few days of approval, depending on unit availability.]',
  },
  {
    question: 'Is there a background or credit check?',
    answer: '[REPLACE: We do a basic background check as part of the application review. We don\'t run a hard credit pull — we primarily look at rental history and verify employment/income. Travel nurses and other traveling professionals with strong employment verification are typically approved quickly.]',
  },
  {
    question: 'What furnishings are included in each room?',
    answer: '[REPLACE: Each room comes fully furnished with a bed (queen or king, depending on the unit), nightstand, dresser, desk with chair, closet or wardrobe, bedside lamp, and blackout curtains. Bed linens, pillows, and towels are provided for your first week. The shared kitchen includes all essential cookware, dishes, and utensils.]',
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
