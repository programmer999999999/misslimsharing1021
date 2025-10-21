import UnitTemplate from '../../components/UnitTemplate';

const unitData = {
  id: '5',
  title: 'Penthouse Suite',
  description: 'Luxurious penthouse with breathtaking views of the city skyline. Features a king-sized bedroom, modern open-plan living area, fully equipped kitchen, and a spacious balcony.',
  location: '202 Skyline Tower, Malacca',
  price: 400,
  rating: 4.9,
  reviews: 112,
  guests: 2,
  bedrooms: 1,
  beds: 1,
  baths: 2,
  amenities: ['wifi', 'kitchen', 'tv', 'ac', 'parking', 'workspace', 'pool'],
  cleaningFee: 0,
  images: [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop'
  ]
};

const Unit5 = () => {
  return <UnitTemplate unit={unitData} />;
};

export default Unit5;
