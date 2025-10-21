import UnitTemplate from '../../components/UnitTemplate';

const unitData = {
  id: '7',
  title: 'Beachfront Bungalow',
  description: 'Wake up to the sound of waves in this charming beachfront bungalow. Just steps away from the sandy beach, featuring a private patio, modern amenities, and stunning ocean views.',
  location: '404 Coastal Road, Malacca',
  price: 280,
  rating: 4.8,
  reviews: 145,
  guests: 3,
  bedrooms: 1,
  beds: 2,
  baths: 1,
  amenities: ['wifi', 'kitchen', 'tv', 'ac', 'parking', 'workspace'],
  cleaningFee: 0,
  images: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop'
  ]
};

const Unit7 = () => {
  return <UnitTemplate unit={unitData} />;
};

export default Unit7;
