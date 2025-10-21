import Link from 'next/link';

const UnitCard = ({ id, title, description, imageUrl, price }) => {
  return (
    <div className="card-container">
      <Link href={`/units/unit${id}`} className="card-link">
        <div className="card">
          <div className="image-container">
            <img src={imageUrl} alt={title} className="card-image" />
          </div>
          <div className="card-content">
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
            <div className="card-footer">
              <div className="price">RM{price} <span>night</span></div>
              <button className="view-details">View Details</button>
            </div>
          </div>
        </div>
      </Link>
      <style jsx>{`
        .card-container {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .card-container:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .image-container {
          position: relative;
          width: 100%;
          padding-top: 66.67%; /* 3:2 aspect ratio */
        }
        .card-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .card-content {
          padding: 1rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .card-title {
          margin: 0 0 0.5rem;
          font-size: 1.25rem;
          color: #2d3748;
        }
        .card-description {
          color: #4a5568;
          margin: 0 0 1rem;
          font-size: 0.875rem;
          flex-grow: 1;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }
        .price {
          font-weight: 600;
          color: #2d3748;
        }
        .price span {
          font-weight: normal;
          font-size: 0.875rem;
          color: #718096;
        }
        .view-details {
          background: #3182ce;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .view-details:hover {
          background: #2c5282;
        }
      `}</style>
    </div>
  );
};

export default UnitCard;
