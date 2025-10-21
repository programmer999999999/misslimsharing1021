import UnitTemplate from '../../components/UnitTemplate';

const unitData = {
  id: '2',
  title: '1-Bedroom Suite',
  description: 'Perfect for couples, this suite features a spacious bedroom with a king-sized bed, a living area, and a fully equipped kitchen. Enjoy the comfort of a private balcony with city views.',
  location: '456 Heritage Lane, Malacca',
  price: 180,
  rating: 4.9,
  reviews: 98,
  guests: 2,
  bedrooms: 1,
  beds: 1,
  baths: 1,
  amenities: ['wifi', 'kitchen', 'tv', 'ac', 'parking', 'workspace'],
  cleaningFee: 0,
  images: [
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop'
  ]
};

const Unit2 = () => {
  return <UnitTemplate unit={unitData} />;
};

export default Unit2;
