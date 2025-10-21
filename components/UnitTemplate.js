import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { FaMapMarkerAlt, FaBed, FaBath, FaUsers, FaWifi, FaParking, FaUtensils, FaTv, FaWind, FaSwimmingPool, FaSpa, FaCoffee, FaSnowflake, FaTshirt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const UnitTemplate = ({ unit }) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [booked, setBooked] = useState([]); // [{start:'YYYY-MM-DD', end:'YYYY-MM-DD'}]
  const [month, setMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [selectedStart, setSelectedStart] = useState(null); // Date
  const [selectedEnd, setSelectedEnd] = useState(null); // Date
  const thumbnailsRef = useRef(null);
  const thumbnailRefs = useRef([]);

  // Auto-scroll to active thumbnail
  useEffect(() => {
    if (showAllImages && thumbnailsRef.current && thumbnailRefs.current[currentImageIndex]) {
      const thumbnail = thumbnailRefs.current[currentImageIndex];
      const container = thumbnailsRef.current;
      const containerWidth = container.offsetWidth;
      const containerScrollLeft = container.scrollLeft;
      const thumbnailLeft = thumbnail.offsetLeft;
      const thumbnailWidth = thumbnail.offsetWidth;
      
      // Calculate scroll position
      const scrollTo = thumbnailLeft + (thumbnailWidth / 2) - (containerWidth / 2);
      
      // Smooth scroll to center the active thumbnail
      container.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  }, [currentImageIndex, showAllImages]);

  // Fetch availability for this unit from server API
  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        if (!unit?.id) return;
        const res = await fetch(`/api/availability/${unit.id}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!ignore && data && Array.isArray(data.booked)) {
          setBooked(data.booked);
        }
      } catch (e) {
        // swallow — keep UI functional even if fetch fails
      }
    }
    load();
    return () => { ignore = true; };
  }, [unit?.id]);

  // Removed Google Drive image fetching. Using unit.images only.

  // Helper to get current images length
  const getImagesLength = () => (unit.images ? unit.images.length : 0);
  // Handle next/previous navigation
  const navigateImages = (direction) => {
    setCurrentImageIndex(prev => {
      const len = getImagesLength();
      if (!len) return 0;
      const newIndex = direction === 'next' 
        ? (prev + 1) % len 
        : (prev - 1 + len) % len;
      return newIndex;
    });
  };

  // Calendar helpers
  const formatMonth = (d) => d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  const addMonths = (d, n) => {
    const nd = new Date(d);
    nd.setMonth(nd.getMonth() + n);
    return new Date(nd.getFullYear(), nd.getMonth(), 1);
  };
  const addDays = (d, n) => {
    const nd = new Date(d);
    nd.setDate(nd.getDate() + n);
    return nd;
  };
  const toISODate = (d) => {
    const y = d.getFullYear();
    const m = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${y}-${m}-${day}`;
  };
  const isBooked = (date) => {
    const dayStr = toISODate(date);
    // ranges are [start, end) exclusive end
    return booked.some(r => dayStr >= r.start && dayStr < r.end);
  };
  // Today at midnight for past-date checks (no visual change)
  const todayMidnight = (() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  })();
  const isSameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const daysDiff = (a, b) => Math.round((new Date(b.getFullYear(), b.getMonth(), b.getDate()) - new Date(a.getFullYear(), a.getMonth(), a.getDate())) / (24 * 60 * 60 * 1000));
  const rangeHasBooked = (start, end) => {
    // iterate dates [start, end)
    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
      if (isBooked(d)) return true;
    }
    return false;
  };
  const formatDisplayDate = (d) => d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
  const handleWhatsApp = () => {
    try {
      const phone = '60188726162';
      let text;
      if (selectedStart && selectedEnd) {
        const nights = daysDiff(selectedStart, selectedEnd);
        const from = formatDisplayDate(selectedStart);
        const to = formatDisplayDate(selectedEnd);
        text = `Hi, I'm interested in ${unit.title}. Dates: ${from} to ${to} (${nights} night${nights > 1 ? 's' : ''}). Is it available?`;
      } else if (selectedStart) {
        const from = formatDisplayDate(selectedStart);
        text = `Hi, I'm interested in ${unit.title}. Dates: from ${from}. Is it available?`;
      } else {
        text = `Hi, I'm interested in ${unit.title}. Could you confirm availability?`;
      }
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      if (typeof window !== 'undefined') {
        window.open(url, '_blank');
      }
    } catch (_) {}
  };
  const handleDayClick = (d) => {
    // ignore clicks on booked days
    if (isBooked(d)) return;
    // selection logic
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(new Date(d));
      setSelectedEnd(null);
      return;
    }
    // have start, no end yet
    if (isSameDay(d, selectedStart)) {
      setSelectedStart(null);
      setSelectedEnd(null);
      return;
    }
    // ensure start < end
    const start = selectedStart < d ? selectedStart : d;
    const end = selectedStart < d ? d : selectedStart;
    // prevent selecting through booked days
    const endExclusive = new Date(end);
    endExclusive.setDate(endExclusive.getDate() + 1);
    if (rangeHasBooked(start, endExclusive)) {
      // reset to new start
      setSelectedStart(new Date(d));
      setSelectedEnd(null);
      return;
    }
    // set normalized start/end (checkout is the day after end)
    if (selectedStart < d) {
      setSelectedEnd(new Date(d));
    } else {
      setSelectedStart(new Date(d));
      setSelectedEnd(new Date(selectedStart));
    }
  };
  const monthGrid = (() => {
    const first = new Date(month);
    const firstDay = first.getDay(); // 0=Sun
    const gridStart = addDays(first, -firstDay);
    return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
  })();
  // Month navigation guards: prevent navigating to months earlier than current month
  const currentMonthStart = (() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), 1);
  })();
  const cmpMonth = (a, b) => {
    const ay = a.getFullYear();
    const am = a.getMonth();
    const by = b.getFullYear();
    const bm = b.getMonth();
    return ay === by ? (am - bm) : (ay - by);
  };
  const isPrevDisabled = cmpMonth(month, currentMonthStart) <= 0;

  const amenitiesIcons = {
    wifi: <FaWifi />,
    kitchen: <FaUtensils />,
    tv: <FaTv />,
    ac: <FaSnowflake />,
    parking: <FaParking />,
    pool: <FaSwimmingPool />,
    spa: <FaSpa />,
    workspace: <FaCoffee />,
    washer: <FaTshirt />,
    bath: <FaBath />,
    bed: <FaBed />
  };

  // Build Google Maps embed URL with the following priority:
  // 1) unit.mapEmbedSrc (paste from Google Maps Share > Embed a map)
  // 2) Coordinates (lat/lng)
  // 3) Address string (location)
  const mapSrc = unit?.mapEmbedSrc
    ? unit.mapEmbedSrc
    : (unit && typeof unit.lat === 'number' && typeof unit.lng === 'number')
      ? `https://www.google.com/maps?q=${unit.lat},${unit.lng}&z=15&output=embed`
      : `https://www.google.com/maps?q=${encodeURIComponent(unit.location || '')}&z=15&output=embed`;

  const images = unit.images;
  const hasImages = Array.isArray(images) && images.length > 0;

  return (
    <div className="unit-detail">
      <Head>
        <title>{unit.title} | Our Units</title>
        <meta name="description" content={unit.description} />
      </Head>
      
      <div className="unit-header">
        <h1>{unit.title}</h1>
        <div className="location">
          <FaMapMarkerAlt /> {unit.location}
        </div>
      </div>

      <div className="unit-content">
        <div className="unit-main">
          <div className="image-gallery">
            <div className="main-image">
              <img 
                src={hasImages ? images[0] : '/favicon.svg'} 
                alt={unit.title}
                onClick={() => {
                  if (!hasImages) return;
                  setCurrentImageIndex(0);
                  setShowAllImages(true);
                }}
                style={{ cursor: hasImages ? 'pointer' : 'default' }}
              />
            </div>
            <div className="thumbnail-container">
              {images.slice(1, Math.min(3, images.length)).map((img, index) => (
                <div 
                  key={index} 
                  className="thumbnail"
                  onClick={() => {
                    setCurrentImageIndex(index + 1);
                    setShowAllImages(true);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <img 
                    src={img} 
                    alt={`${unit.title} ${index + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
              {images.length > 4 && (
                <div 
                  className="thumbnail more-thumbnail"
                  onClick={() => setShowAllImages(true)}
                >
                  <img src={images[3]} alt={`${unit.title} 4`} />
                  <div className="more-thumbnail-overlay">
                    <span>+{images.length - 4}</span>
                    <span>more</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Image Modal */}
          {showAllImages && hasImages && (
            <div className="image-modal" onClick={(e) => e.target === e.currentTarget && setShowAllImages(false)}>
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title">Photo Gallery</h3>
                  <button 
                    className="close-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAllImages(false);
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <div className="modal-main-image">
                  <img 
                    src={images[currentImageIndex]} 
                    alt={`${unit.title} ${currentImageIndex + 1}`}
                    onLoad={(e) => e.target.parentNode.classList.remove('loading')}
                    onLoadStart={(e) => e.target.parentNode.classList.add('loading')}
                  />
                  
                  <div className="image-navigation">
                    <button 
                      className="nav-btn prev"
                      onClick={(e) => {
                        e.stopPropagation();
                        const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
                        navigateImages('prev');
                        if (thumbnailRefs.current[prevIndex]) {
                          thumbnailsRef.current.scrollTo({
                            left: thumbnailRefs.current[prevIndex].offsetLeft,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      aria-label="Previous image"
                    >
                      <FaChevronLeft />
                    </button>
                    
                    <span className="image-counter">
                      {currentImageIndex + 1} / {images.length}
                    </span>
                    
                    <button 
                      className="nav-btn next"
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextIndex = (currentImageIndex + 1) % images.length;
                        navigateImages('next');
                        if (thumbnailRefs.current[nextIndex]) {
                          thumbnailsRef.current.scrollTo({
                            left: thumbnailRefs.current[nextIndex].offsetLeft,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      aria-label="Next image"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <div className="modal-thumbnails" ref={thumbnailsRef}>
                    {images.map((img, index) => (
                      <div 
                        key={index} 
                        ref={el => thumbnailRefs.current[index] = el}
                        className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        aria-label={`View image ${index + 1}`}
                      >
                        <img 
                          src={img} 
                          alt=""
                          loading="lazy"
                        />
                        <div className="thumbnail-overlay">
                          <span>{index + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="unit-description">
            <h2>About this place</h2>
            <p>{unit.description}</p>
          </div>

          <div className="unit-amenities">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              {unit.amenities.map((amenity, index) => (
                <div key={index} className="amenity">
                  {amenitiesIcons[amenity] || <FaWifi />}
                  <span>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="booking-card">
          <div className="price-section">
            <div className="price">RM{unit.price} <span className="per-night">/ night</span></div>
            <div className="rating">
              <span className="stars">★ {unit.rating}</span>
              {/* <span className="reviews">({unit.reviews} reviews)</span> */}
            </div>
          </div>
          
          <div className="calendar-placeholder">
            <div className="calendar-header">
              <h3>Availability</h3>
            </div>
            <div className="calendar-content">
              {/* Airbnb iCalendar will be implemented here */}
              <div className="calendar-mockup">
                <div className="month-header">
                  <button
                    className="nav-arrow"
                    onClick={() => !isPrevDisabled && setMonth(m => addMonths(m, -1))}
                    disabled={isPrevDisabled}
                  >
                    ‹
                  </button>
                  <span>{formatMonth(month)}</span>
                  <button className="nav-arrow" onClick={() => setMonth(m => addMonths(m, 1))}>›</button>
                </div>
                <div className="weekdays">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
                    <div key={i} className="weekday">{day}</div>
                  ))}
                </div>
                <div className="days">
                  {monthGrid.map((d, i) => {
                    const inCurrentMonth = d.getMonth() === month.getMonth();
                    const bookedDay = isBooked(d);
                    const pastDay = d < todayMidnight;
                    const inRange = selectedStart && selectedEnd && ((d > selectedStart && d < selectedEnd) || isSameDay(d, selectedStart) || isSameDay(d, selectedEnd));
                    const isStart = selectedStart && isSameDay(d, selectedStart);
                    const isEnd = selectedEnd && isSameDay(d, selectedEnd);
                    const classes = [
                      'day',
                      inCurrentMonth ? '' : 'next-month',
                      bookedDay ? 'booked' : '',
                      pastDay ? 'past' : '',
                      inRange ? 'in-range' : '',
                      isStart || isEnd ? 'selected' : ''
                    ].filter(Boolean).join(' ');
                    return (
                      <div
                        key={i}
                        className={classes}
                        onClick={() => inCurrentMonth && !pastDay && handleDayClick(new Date(d))}
                        title={bookedDay ? 'Booked' : ''}
                      >
                        {d.getDate()}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <button className="check-availability" onClick={handleWhatsApp}>Check Availability</button>
            
            <div className="booking-summary">
              {selectedStart && selectedEnd ? (
                <>
                  <div className="summary-row">
                    <span>RM{unit.price} x {daysDiff(selectedStart, selectedEnd)} night{daysDiff(selectedStart, selectedEnd) > 1 ? 's' : ''}</span>
                    <span>RM{unit.price * daysDiff(selectedStart, selectedEnd)}</span>
                  </div>
                  {typeof unit.cleaningFee !== 'undefined' && (
                    <div className="summary-row">
                      <span>Cleaning fee</span>
                      <span>RM{unit.cleaningFee ?? 0}</span>
                    </div>
                  )}
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>RM{(unit.price * daysDiff(selectedStart, selectedEnd)) + (unit.cleaningFee ?? 0)}</span>
                  </div>
                </>
              ) : (
                <div className="summary-row">
                  <span>Select dates</span>
                </div>
              )}
            </div>
          </div>
      </div>
    </div>

    {/* Location / Google Maps */}
    <div className="unit-map">
      <h2>Location</h2>
      <div className="map-wrapper">
        <iframe
          src={mapSrc}
          title={`Map of ${unit.title}`}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      {unit.location && (
        <p className="map-address">
          <FaMapMarkerAlt /> {unit.location}
        </p>
      )}
    </div>

      <style jsx>{`
        .unit-detail {
          max-width: 1200px;
          margin: 0 auto;
{{ ... }}
          padding: 2rem 1.5rem;
          position: relative;
        }
        
        .image-gallery {
          margin-bottom: 2rem;
        }
        
        .main-image img {
          width: 100%;
          height: 360px;
          object-fit: cover;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        
        .main-image img:hover {
          transform: scale(1.01);
        }
        
        .thumbnail-container {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
          margin: 8px 0 0;
          width: 100%;
          align-items: stretch;
        }
        
        .thumbnail {
          position: relative;
          width: 100%;
          height: 100px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.03);
          border: 1px dashed rgba(0, 0, 0, 0.15);
        }
        
        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        
        .thumbnail:hover img {
          transform: scale(1.05);
        }
        
        .thumbnail:hover {
          background: rgba(0, 0, 0, 0.05);
          border-color: rgba(0, 0, 0, 0.3);
        }
        
        .more-overlay {
          color: #666;
          text-align: center;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          font-weight: 500;
          font-size: 0.8rem;
          padding: 0;
          margin: 0;
        }
        
        .more-overlay span:first-child {
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 1;
          margin: 0;
          padding: 0;
        }
        
        .more-overlay span:last-child {
          font-size: 0.6rem;
          opacity: 0.8;
          margin-top: 2px;
        }
        
        .more-thumbnail {
          position: relative;
          cursor: pointer;
        }
        
        .more-thumbnail-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          border-radius: 8px;
          transition: all 0.2s ease;
          z-index: 1;
        }
        
        .more-thumbnail:hover .more-thumbnail-overlay {
          background: rgba(0, 0, 0, 0.5);
        }
        
        .more-thumbnail-overlay span:first-child {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .more-thumbnail-overlay span:last-child {
          font-size: 0.9rem;
          opacity: 0.9;
        }
        
        /* Modern Image Modal */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .image-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.92);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
          opacity: 0;
          animation: fadeIn 0.3s ease-out forwards;
          will-change: opacity;
        }
        
        .modal-content {
          position: relative;
          width: 100%;
          max-width: 1200px;
          max-height: 90vh;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transform: scale(0.98);
          opacity: 0;
          animation: slideUp 0.3s 0.1s ease-out forwards;
          display: flex;
          flex-direction: column;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: #fff;
          border-bottom: 1px solid #eee;
        }
        
        .modal-title {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
        }
        
        .close-btn {
          background: none;
          border: none;
          font-size: 1.8rem;
          color: #666;
          cursor: pointer;
          padding: 0.5rem;
          line-height: 1;
          transition: color 0.2s, transform 0.2s;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .close-btn:hover {
          color: #000;
          background: rgba(0, 0, 0, 0.05);
          transform: rotate(90deg);
        }
        
        .modal-main-image {
          position: relative;
          height: 60vh;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .modal-main-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        
        .modal-main-image.loading {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
          opacity: 0.8;
        }
        
        .nav-btn:hover {
          opacity: 1;
          transform: translateY(-50%) scale(1.1);
          background: #fff;
        }
        
        .nav-btn:active {
          transform: translateY(-50%) scale(0.95);
        }
        
        .nav-btn svg {
          width: 20px;
          height: 20px;
        }
        
        .prev {
          left: 20px;
        }
        
        .next {
          right: 20px;
        }
        
        .modal-footer {
          padding: 0;
          background: #fff;
          border-top: 1px solid #eee;
          overflow: hidden;
          position: relative;
        }
        
        .modal-footer::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 30px;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
          pointer-events: none;
        }
        
        .modal-thumbnails {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 0.5rem 1rem;
          scrollbar-width: thin;
          scrollbar-color: #ccc transparent;
          scroll-behavior: smooth;
          position: relative;
        }
        
        .modal-thumbnails::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 4px;
          background: #3182ce;
          transform: scaleX(0);
          transform-origin: 0 0;
          transition: transform 0.3s ease;
        }
        
        .modal-thumbnails .thumbnail.active {
          position: relative;
          z-index: 1;
        }
        
        .modal-thumbnails .thumbnail.active::after {
          content: '';
          position: absolute;
          top: -4px;
          left: 0;
          right: 0;
          height: 3px;
          background: #3182ce;
          border-radius: 3px 3px 0 0;
        }
        
        .modal-thumbnails::-webkit-scrollbar {
          height: 4px;
        }
        
        .modal-thumbnails::-webkit-scrollbar-thumb {
          background-color: #aaa;
          border-radius: 2px;
        }
        
        .modal-thumbnails::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }
        
        .modal-thumbnails {
          display: flex;
          gap: 8px;
          padding: 1rem;
          overflow-x: auto;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x mandatory;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          scroll-padding: 0 16px;
        }
        
        .modal-thumbnails .thumbnail {
          flex: 0 0 auto;
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid transparent;
          position: relative;
          background: #f5f5f5;
          scroll-snap-align: start;
        }
        
        .modal-thumbnails .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          aspect-ratio: 1/1;
        }
        
        .modal-thumbnails .thumbnail:hover {
          transform: translateY(-2px);
        }
        
        .modal-thumbnails .thumbnail:hover img {
          transform: scale(1.05);
        }
        
        .modal-thumbnails .thumbnail.active {
          border-color: #3182ce;
          box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
          transform: scale(1.05);
        }
        
        .thumbnail-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1.2rem;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .thumbnail:hover .thumbnail-overlay,
        .thumbnail.active .thumbnail-overlay {
          opacity: 1;
        }
        
        .thumbnail.active .thumbnail-overlay {
          background: rgba(49, 130, 206, 0.7);
        }
        
        .image-counter {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          backdrop-filter: blur(4px);
        }
        
        @media (max-width: 768px) {
          .main-image img {
            height: 240px;
          }
          
          .more-overlay span:first-child {
            font-size: 1rem;
          }
          
          .more-overlay span:last-child {
            font-size: 0.7rem;
          }
          
          .thumbnail {
            height: 80px;
          }
          
          .modal-main-image {
            height: 50vh;
          }
          
          .modal-thumbnails .thumbnail {
            height: 60px;
            min-width: 80px;
          }
        }

        .unit-header {
          margin-bottom: 2rem;
        }

        .unit-header h1 {
          font-size: 2rem;
          margin: 0 0 0.5rem;
          color: #333;
        }

        .location {
          display: flex;
          align-items: center;
          color: #666;
          font-size: 1rem;
        }

        .location svg {
          margin-right: 0.5rem;
        }

        .unit-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          align-items: start;
        }
        
        .booking-card {
          position: sticky;
          top: 2rem;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        }
        
        .price-section {
          margin-bottom: 1.75rem;
          padding: 0 0.5rem;
        }
        
        .price {
          font-size: 1.5rem;
          font-weight: 600;
          color: #222;
        }
        
        .per-night {
          font-size: 1rem;
          font-weight: 400;
          color: #666;
        }
        
        .rating {
          display: flex;
          align-items: center;
          margin-top: 0.5rem;
          font-size: 0.9rem;
        }
        
        .stars {
          color: #222;
          font-weight: 500;
          margin-right: 0.25rem;
        }
        
        .reviews {
          color: #666;
          text-decoration: underline;
        }
        
        .calendar-placeholder {
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          margin: 0 0.5rem;
        }
        
        .calendar-header {
          padding: 1rem;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .calendar-header h3 {
          margin: 0 0 0.25rem;
          font-size: 1rem;
          font-weight: 500;
        }
        
        .calendar-header p {
          margin: 0;
          font-size: 0.875rem;
          color: #666;
        }
        
        .calendar-content {
          padding: 1rem;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
        }
        
        .calendar-mockup {
          width: 100%;
        }
        
        .month-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-weight: 500;
        }
        
        .nav-arrow {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }
        
        .nav-arrow:hover {
          background: #f5f5f5;
        }
        .nav-arrow:disabled,
        .nav-arrow[disabled] {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .nav-arrow:disabled:hover,
        .nav-arrow[disabled]:hover {
          background: transparent;
        }
        
        .weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          font-size: 0.75rem;
          color: #666;
          margin-bottom: 0.5rem;
        }
        
        .days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.25rem;
        }
        
        .day {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 0.875rem;
          cursor: pointer;
        }
        
        .day:hover {
          background: #f5f5f5;
        }
        
        .day.selected {
          background: #000;
          color: white;
        }
        
        .day.next-month {
          color: #ccc;
        }
        .day.booked {
          background: #eee;
          color: #aaa;
          text-decoration: line-through;
          cursor: not-allowed;
        }
        .day.in-range {
          background: #000;
          color: #fff;
        }
        .day.past {
          color: #bbb;
          background: #f7f7f7;
          cursor: not-allowed;
        }
        .day.past {
          background: #f7f7f7;
          color: #bbb;
          cursor: not-allowed;
        }
        
        .check-availability {
          width: calc(100% - 1rem);
          background: #ff5a5f;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 1rem;
          font-size: 1rem;
          font-weight: 500;
          margin: 1rem 0.5rem 0;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .check-availability:hover {
          background: #e04f54;
        }
        
        .booking-summary {
          margin: 1.5rem 0.5rem 0;
          border-top: 1px solid #e0e0e0;
          padding: 1.5rem 0 0;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }
        
        .summary-row.total {
          font-weight: 600;
          margin-top: 1rem;
          padding-top: 0.75rem;
          border-top: 1px solid #e0e0e0;
        }

        .image-gallery {
          margin-bottom: 2rem;
        }

        .main-image img {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .thumbnail-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .thumbnail img:hover {
          opacity: 0.8;
        }

        .unit-description {
          margin-bottom: 2rem;
        }

        .unit-description h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #333;
        }

        .unit-description p {
          color: #555;
          line-height: 1.6;
        }

        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .amenity {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .amenity svg {
          margin-right: 0.5rem;
          color: #3182ce;
        }

        .booking-widget {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 2rem;
        }

        .price {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .price span {
          font-size: 1rem;
          font-weight: 400;
          color: #666;
        }

        .rating {
          margin-bottom: 1.5rem;
          color: #333;
        }

        .booking-dates {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .date-input {
          display: flex;
          flex-direction: column;
        }

        .date-input label {
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
          color: #4a5568;
        }

        .date-input input {
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        .book-now {
          width: 100%;
          padding: 0.75rem;
          background: #3182ce;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .book-now:hover {
          background: #2c5282;
        }

        /* Map section */
        .unit-map {
          margin-top: 2.5rem;
        }

        .unit-map h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #333;
        }

        .map-wrapper {
          width: 100%;
          height: 360px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          border: 1px solid #e0e0e0;
        }

        .map-wrapper iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }

        .map-address {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #555;
          margin-top: 0.75rem;
        }

        .map-address svg {
          color: #3182ce;
        }

        @media (max-width: 768px) {
          .unit-content {
            grid-template-columns: 1fr;
          }

          .booking-widget {
            position: static;
            margin-top: 2rem;
          }

          .main-image img {
            height: 300px;
          }
        }

        @media (max-width: 480px) {
          .amenities-grid {
            grid-template-columns: 1fr;
          }

          .thumbnail-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default UnitTemplate;
