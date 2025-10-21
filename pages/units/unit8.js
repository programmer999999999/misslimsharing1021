import UnitTemplate from '../../components/UnitTemplate';

const unitData = {
  id: '8',
  title: 'Garden View Loft',
  description: 'Charming loft apartment with stunning garden views. Features an open-plan living space, fully equipped kitchen, and a cozy sleeping area. Perfect for a romantic getaway or solo retreat.',
  location: '505 Garden Lane, Malacca',
  price: 160,
  rating: 4.8,
  reviews: 92,
  guests: 2,
  bedrooms: 1,
  beds: 1,
  baths: 1,
  amenities: ['wifi', 'kitchen', 'tv', 'ac', 'parking', 'workspace'],
  cleaningFee: 0,
  images: [
    'https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1200&auto=format&fit=crop'
  ]
};

const Unit8 = () => {
  return <UnitTemplate unit={unitData} />;
};

export default Unit8;
