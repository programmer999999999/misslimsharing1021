import UnitTemplate from '../../components/UnitTemplate';

const unitData = {
  id: '9',
  title: 'Executive Apartment',
  description: 'Modern and sophisticated apartment designed for business travelers and executives. Features a dedicated workspace, high-speed internet, and premium amenities for a productive stay.',
  location: '606 Business District, Malacca',
  price: 220,
  rating: 4.7,
  reviews: 134,
  guests: 2,
  bedrooms: 1,
  beds: 1,
  baths: 1,
  amenities: ['wifi', 'kitchen', 'tv', 'ac', 'parking', 'workspace', 'washer'],
  cleaningFee: 0,
  images: [
    'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=1200&auto=format&fit=crop'
  ]
};

const Unit9 = () => {
  return <UnitTemplate unit={unitData} />;
};

export default Unit9;
