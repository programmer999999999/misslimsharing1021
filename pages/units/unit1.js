import UnitTemplate from '../../components/UnitTemplate';

const unitData = {
  id: '1',
  title: 'Cozy Studio',
  description: 'A compact yet comfortable stay ideal for solo travelers or short getaways. This studio features a queen-sized bed, a small kitchenette, and a private bathroom. Perfect for those looking for a simple and affordable place to stay.',
  location: 'KL Bird Park (testing only)',
  //lat: 3.143333823271243,   // if some area do not have address, use lat, lng
  //lng: 101.688498486742936, // if some area do not have address, use lat, lng
  mapEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1162.0334474537542!2d101.68758407545671!3d3.1430375788358704!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49c8c1d6ccbb%3A0x8ad65008e031cb85!2sKL%20Bird%20Park!5e0!3m2!1sen!2sus!4v1759738209150!5m2!1sen!2sus',
  price: 800,
  rating: 4.8,
  reviews: 124,
  guests: 2,
  bedrooms: 1,
  beds: 1,
  baths: 1,
  amenities: ['wifi', 'kitchen', 'tv', 'ac', 'parking'],
  cleaningFee: 100,
  images: [
    '/api/drive-image?id=1el-C7BtRWWA4a5LNf9S8JjpdBr2Aevoq',
    '/api/drive-image?id=1G5e_4j4NxyHL0Eu0yJy927KTb6crIGJY',
    '/api/drive-image?id=1wOoeVZQkBqGM-9pGF8IicFLttPPq9NFD',
    '/api/drive-image?id=1T3_x2p6m74LGrthXZrUPG8TaUyDsVUte',
    '/api/drive-image?id=1qXTGvZMcQCxSOVkVB3sa008aSky4Ukfl',
    '/api/drive-image?id=1S7v73urV5iUenVQXrRCrKNdbixZiOR1X',
    '/api/drive-image?id=1PDNvanQP8GIu0jDprsk0zm0NFrERFYOq',
    '/api/drive-image?id=1Li7UbEW0W_ZG3RYgNfTAXuKyD73uOI3d',
    '/api/drive-image?id=1avKAVKjjZgBWCJOzkvQv4bmZ5t-n-iTT',
    '/api/drive-image?id=199sb0mbrW8jHpygAUf83_rGGkkpsoofx',
    '/api/drive-image?id=198WcOeNAnyFpqD6MbDZl6qg6ztnCjVHk',
    '/api/drive-image?id=1x8f0wjFTa5CW4WKpRGf9KwNltpnJJHmw',
    '/api/drive-image?id=15DyjbIR3bLSAxOEs7sAAb2CO_pivsHo0',
    '/api/drive-image?id=1I7H9tHPcOs3evciN8aJIzVC04dW7l6rz',
    '/api/drive-image?id=1nEnrSiv0xiFH_rbwJ5jrxrs9bp_MZ3wO',
    '/api/drive-image?id=1s5eufUN-jJHMIgFhBohQeF0omAM19A4C',
    '/api/drive-image?id=1dJCjL3_odYsPlQAdRhYJESqHV-h__49n',
    '/api/drive-image?id=1Gixc7HiLgz6_Ms6Xa_K-ch_Rzjbr7q5q'
  ]
};

const Unit1 = () => {
  return <UnitTemplate unit={unitData} />;
};

export default Unit1;
