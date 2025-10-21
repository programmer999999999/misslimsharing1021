import UnitTemplate from '../../components/UnitTemplate';

const unitData = {
  id: '6',
  title: 'Luxury Villa',
  description: 'Experience ultimate luxury in this private villa featuring a private pool, spacious living areas, and premium amenities. Perfect for those seeking exclusivity and comfort.',
  location: '303 Palm Grove, Malacca',
  price: 500,
  rating: 4.9,
  reviews: 78,
  guests: 4,
  bedrooms: 2,
  beds: 2,
  baths: 2,
  amenities: ['wifi', 'kitchen', 'tv', 'ac', 'parking', 'pool', 'workspace'],
  cleaningFee: 0,
  images: [
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop'
  ]
};

const Unit6 = () => {
  return <UnitTemplate unit={unitData} />;
};

export default Unit6;
