import UnitTemplate from '../../components/UnitTemplate';

const unitData = {
  id: '4',
  title: '3-Bedroom Deluxe',
  description: 'Spacious accommodation for larger groups featuring three comfortable bedrooms, two bathrooms, a living room, and a full kitchen. Perfect for family gatherings or group trips.',
  location: '101 Hillside Avenue, Malacca',
  price: 350,
  rating: 4.9,
  reviews: 87,
  guests: 6,
  bedrooms: 3,
  beds: 3,
  baths: 2,
  amenities: ['wifi', 'kitchen', 'tv', 'ac', 'parking', 'washer', 'workspace'],
  cleaningFee: 0,
  images: [
    'https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1200&auto=format&fit=crop'
  ]
};

const Unit4 = () => {
  return <UnitTemplate unit={unitData} />;
};

export default Unit4;
