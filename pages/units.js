import Head from 'next/head';
import UnitCard from '../components/UnitCard';

export default function Units() {
  const units = [
    {
      id: '1',
      title: 'Cozy Studio',
      description: 'A compact yet comfortable stay ideal for solo travelers or short getaways.',
      imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop',
      price: 800,
      rating: 4.8,
      reviews: 124
    },
    {
      id: '2',
      title: '1-Bedroom Suite',
      description: 'Perfect for couples with a spacious bedroom and living area.',
      imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&auto=format&fit=crop',
      price: 180,
      rating: 4.9,
      reviews: 98
    },
    {
      id: '3',
      title: '2-Bedroom Family Suite',
      description: 'Ideal for families or small groups with two comfortable bedrooms.',
      imageUrl: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200&auto=format&fit=crop',
      price: 250,
      rating: 4.7,
      reviews: 156
    },
    {
      id: '4',
      title: '3-Bedroom Deluxe',
      description: 'Spacious accommodation for larger groups featuring a living room and full kitchen.',
      imageUrl: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1200&auto=format&fit=crop',
      price: 350,
      rating: 4.9,
      reviews: 87
    },
    {
      id: '5',
      title: 'Penthouse Suite',
      description: 'Luxury living with panoramic views and premium amenities.',
      imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop',
      price: 400,
      rating: 4.9,
      reviews: 112
    },
    {
      id: '6',
      title: 'Luxury Villa',
      description: 'Private villa with pool, perfect for those seeking exclusivity and comfort.',
      imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop',
      price: 500,
      rating: 4.9,
      reviews: 78
    },
    {
      id: '7',
      title: 'Beachfront Bungalow',
      description: 'Steps away from the beach with direct access and ocean views.',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
      price: 280,
      rating: 4.8,
      reviews: 145
    },
    {
      id: '8',
      title: 'Garden View Loft',
      description: 'Charming loft with stunning garden views and modern amenities.',
      imageUrl: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1200&auto=format&fit=crop',
      price: 160,
      rating: 4.8,
      reviews: 92
    },
    {
      id: '9',
      title: 'Executive Apartment',
      description: 'Modern and sophisticated apartment designed for business travelers and executives.',
      imageUrl: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=1200&auto=format&fit=crop',
      price: 220,
      rating: 4.7,
      reviews: 134
    }
  ];

  return (
    <div className="container">
      <Head>
        <title>Our Units - Your Stay Awaits</title>
        <meta name="description" content="Browse our selection of beautiful vacation rentals" />
      </Head>

      <main>
        <h1>Our Units</h1>
        <div className="units-grid">
          {units.map((unit) => (
            <UnitCard
              key={unit.id}
              id={unit.id}
              title={unit.title}
              description={unit.description}
              imageUrl={unit.imageUrl}
              price={unit.price}
            />
          ))}
        </div>
      </main>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }
        
        h1 {
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #2d3748;
        }
        
        .units-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          padding: 1rem 0;
        }
        
        @media (max-width: 768px) {
          .units-grid {
            grid-template-columns: 1fr;
          }
        }
        }
        
        .card-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .card-link {
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.2s ease;
        }
        
        .card {
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .image-container {
          position: relative;
          width: 100%;
          padding-top: 66.67%; /* 3:2 aspect ratio */
          overflow: hidden;
        }
        
        .card-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .card:hover .card-image {
          transform: scale(1.03);
        }
        
        .card-content {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        
        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 0.75rem 0;
          color: #2d3748;
          line-height: 1.3;
        }
        
        .card-description {
          color: #4a5568;
          font-size: 0.95rem;
          line-height: 1.5;
          margin: 0 0 1.25rem 0;
          flex-grow: 1;
        }
        
        .card-actions {
          margin-top: auto;
          padding-top: 0.75rem;
        }
        
        .view-details {
          display: block;
          width: 100%;
          background: #3182ce;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.6rem 1rem;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.2s;
          text-align: center;
        }
        
        .view-details:hover {
          background: #2c5282;
          transform: translateY(-1px);
        }
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          width: 100%;
          margin-top: auto;
          transition: background-color 0.2s;
        }
        
        .view-details:hover {
          background: #e31c5f;
        }
        
        @media (max-width: 1024px) {
          .cards {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.25rem;
          }
          
          .page-header {
            padding: 2.5rem 0;
          }
          
          h1 {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 0 1.25rem;
          }
          
          .page-header {
            padding: 2rem 0;
          }
          
          h1 {
            font-size: 1.8rem;
          }
          
          .cards {
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          }
        }
        
        @media (max-width: 640px) {
          .cards {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            max-width: 500px;
            margin: 0 auto;
          }
          
          .page-header {
            padding: 1.75rem 0;
            text-align: center;
          }
          
          .page-header p {
            font-size: 1rem;
            margin: 0 auto;
          }
          
          h1 {
            font-size: 1.6rem;
            margin-bottom: 0.75rem;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 1rem;
          }
          
          h1 {
            font-size: 1.75rem;
          }
          
          h1 {
            font-size: 1.5rem;
          }
          
          .card-title {
            font-size: 1.2rem;
          }
          
          .card-description {
            font-size: 0.9rem;
          }
          
          .view-details {
            padding: 0.6rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
