import UnitTemplate from '../../components/UnitTemplate';

const unitData = {
  id: '3',
  title: '2-Bedroom Family Suite',
  description: 'Ideal for families or small groups, this spacious suite features two comfortable bedrooms, a living area, and a fully equipped kitchen. Enjoy the convenience of in-unit laundry and a dining area.',
  location: '789 River View, Malacca',
  price: 250,
  rating: 4.7,
  reviews: 156,
  guests: 4,
  bedrooms: 2,
  beds: 2,
  baths: 1,
  amenities: ['wifi', 'kitchen', 'tv', 'ac', 'parking', 'washer'],
  cleaningFee: 0,
  images: [
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200&auto=format&fit=crop',
  ]
};

const Unit3 = () => {
  return <UnitTemplate unit={unitData} />;
};

export default Unit3;
