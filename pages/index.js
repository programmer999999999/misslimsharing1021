import Head from 'next/head';
import { useEffect, useState, useRef, useCallback } from 'react';
import Slideshow from '../components/Slideshow';
import reviews from '../data/reviews';

export default function Home() {
  // State to track which card is flipped on mobile
  const [flippedCard, setFlippedCard] = useState(null);
  const cardsRef = useRef([]);

  // Handle card click for mobile
  const handleCardClick = useCallback((index) => {
    // If the card is already flipped, unflip it
    if (flippedCard === index) {
      setFlippedCard(null);
    } else {
      // Otherwise, flip the clicked card
      setFlippedCard(index);
    }
  }, [flippedCard]);

  // Add click handler to document to close card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only run this for mobile devices
      if (window.innerWidth <= 768) {
        // Check if click is outside any flip card
        const isClickInside = event.target.closest('.flip-card');
        if (!isClickInside) {
          setFlippedCard(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <Head>
        {/* Favicon */}
        {/* <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" /> */}
        <link rel="icon" href="/xiaohu.jpeg" type="image/jpeg" />

        {/* Page-specific SEO */}
        <title>Miss Lim Sharing | Lovely Airbnb Stays in Malaysia</title>
        <meta
          name="description"
          content="Comfortable, modern, and thoughtfully designed Airbnb stays across Malaysia. Enjoy bright interiors for a seamless experience."
        />
        <link rel="canonical" href="https://www.misslimsharing.com/" />

        {/* Open Graph – homepage */}
        {/* <meta property="og:title" content="Miss Lim Sharing | Lovely Airbnb Stays in Malaysia" />
        <meta property="og:description" content="Comfortable, modern, and thoughtfully designed Airbnb stays across Malaysia. Enjoy bright interiors, fast Wi-Fi, and self check-in for a seamless experience." />
        <meta property="og:url" content="https://www.misslimsharing.com" />
        <meta property="og:image" content="https://misslimsharing.com/og-image.png" /> */}

        {/* Twitter card – homepage */}
        {/* <meta name="twitter:title" content="Miss Lim Sharing | Lovely Airbnb Stays in Malaysia" />
        <meta name="twitter:description" content="Comfortable, modern, and thoughtfully designed Airbnb stays across Malaysia. Enjoy bright interiors, fast Wi-Fi, and self check-in for a seamless experience." />
        <meta name="twitter:image" content="https://misslimsharing.com/og-image.png" /> */}

        {/* Homepage JSON-LD (WebSite schema) */}
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Miss Lim Sharing",
              "url": "https://www.misslimsharing.com",
              "description": "Comfortable, modern, and thoughtfully designed Airbnb stays across Malaysia. Enjoy bright interiors, fast Wi-Fi, and self check-in for a seamless experience.",
              "image": "https://misslimsharing.com/og-image.png",
              "sameAs": [
                "https://www.facebook.com/misslimsharing",
                "https://www.instagram.com/misslimsharing"
              ]
            })
          }}
        /> */}
      </Head>

      {/* Page Content */}
      <div>
        <section className="hero">
          <Slideshow intervalMs={3000} />
        </section>

        <section className="section">
          <div className="container">
            <h1>Welcome to Miss Lim Sharing</h1>
            <p>Experience the perfect blend of comfort and convenience at Miss Lim Sharing. Our thoughtfully designed spaces are tailored to meet the needs of every traveler, whether you're here for business or leisure. Enjoy modern amenities, prime locations, and personalized service that will make your stay truly memorable. Book now and discover your home away from home.</p>
          </div>
        </section>

        <section className="section features reveal">
          <div className="container">
            <h2>Why Stay With Us</h2>
            <div className="cards">
              <div 
                className={`flip-card ${flippedCard === 0 ? 'flipped' : ''}`}
                onClick={() => window.innerWidth <= 768 && handleCardClick(0)}
                ref={el => cardsRef.current[0] = el}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="feature-card feature-card--locations">
                      <div className="feature-card__content">
                        <h3>Great Locations</h3>
                        <p>Minutes from transport, business hubs, and attractions.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <p>Our properties are strategically located in the most convenient areas, ensuring you're never far from where you need to be. Experience the best of the city right at your doorstep.</p>
                  </div>
                </div>
              </div>
              
              <div 
                className={`flip-card ${flippedCard === 1 ? 'flipped' : ''}`}
                onClick={() => window.innerWidth <= 768 && handleCardClick(1)}
                ref={el => cardsRef.current[1] = el}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="feature-card feature-card--comfort">
                      <div className="feature-card__content">
                        <h3>Modern Comfort</h3>
                        <p>Bright interiors, fast Wi-Fi, and self check-in for a seamless stay.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <p>Enjoy thoughtfully designed spaces with modern amenities. Each property is equipped with high-speed internet, comfortable furnishings, and all the essentials for a perfect stay.</p>
                  </div>
                </div>
              </div>
              
              <div 
                className={`flip-card ${flippedCard === 2 ? 'flipped' : ''}`}
                onClick={() => window.innerWidth <= 768 && handleCardClick(2)}
                ref={el => cardsRef.current[2] = el}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="feature-card feature-card--value">
                      <div className="feature-card__content">
                        <h3>Best Value</h3>
                        <p>Competitive rates, seasonal deals, and discounts for long stays.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <p>We offer exceptional value with competitive pricing and special offers. Book direct for the best rates and enjoy exclusive benefits during your stay with us.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        

        <ReviewsSection />

        <section className="section reveal">
          <div className="container">
            <div className="cta-banner">
              <h2>Your Stay, Made Simple</h2>
              <p>Browse all units and book your next trip in minutes.</p>
              <div className="cta-actions">
                <a href="/units" className="cta-button">Explore Stays</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const ReviewsSection = () => {
  const [activeSet, setActiveSet] = useState(0);
  const reviewsContainerRef = useRef(null);
  const reviewsPerSet = 3;
  const totalSets = Math.ceil(reviews.length / reviewsPerSet);

  const visibleReviews = [];
  for (let i = 0; i < reviews.length; i += reviewsPerSet) {
    const reviewSet = reviews.slice(i, i + reviewsPerSet);
    // If it's the last set with only one review, add empty placeholders
    if (reviewSet.length < reviewsPerSet && reviewSet.length > 0) {
      const placeholders = Array(reviewsPerSet - reviewSet.length).fill(null);
      visibleReviews.push([...reviewSet, ...placeholders]);
    } else {
      visibleReviews.push(reviewSet);
    }
  }

  const scrollToSet = (index) => {
    if (reviewsContainerRef.current) {
      const container = reviewsContainerRef.current;
      const cards = container.querySelectorAll('.review-set');
      if (cards[index]) {
        cards[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  const handleScroll = () => {
    if (reviewsContainerRef.current) {
      const container = reviewsContainerRef.current;
      const scrollPosition = container.scrollLeft + container.offsetWidth / 2;
      const sets = container.querySelectorAll('.review-set');
      
      for (let i = 0; i < sets.length; i++) {
        const set = sets[i];
        const setLeft = set.offsetLeft;
        const setRight = setLeft + set.offsetWidth;
        
        if (scrollPosition >= setLeft && scrollPosition <= setRight) {
          setActiveSet(i);
          break;
        }
      }
    }
  };

  return (
    <section className="section testimonials reveal">
      <div className="container">
        <h2>What Guests Say</h2>
        <div 
          className="reviews-scroll-container" 
          ref={reviewsContainerRef}
          onScroll={handleScroll}
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            padding: '1rem 0',
            gap: '2rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {visibleReviews.map((reviewSet, setIndex) => (
            <div 
              key={setIndex}
              className="review-set"
              style={{
                display: 'flex',
                gap: '1.5rem',
                minWidth: '100%',
                scrollSnapAlign: 'center',
                scrollSnapStop: 'always',
                padding: '0 1rem',
                boxSizing: 'border-box'
              }}
            >
              {reviewSet.map((review, reviewIndex) => (
                <div 
                  key={review?.id || `placeholder-${reviewIndex}`}
                  className={`review-card ${!review ? 'empty-card' : ''}`}
                  style={{
                    flex: '1',
                    minWidth: '300px',
                    maxWidth: '100%',
                    opacity: review ? 1 : 0,
                    pointerEvents: review ? 'auto' : 'none',
                    visibility: review ? 'visible' : 'hidden'
                  }}
                >
                  {review ? (
                    <>
                      <div className="review-card-content">
                        <div className="review-header">
                          <div className="avatar">
                            {review.profileImage ? (
                              <img 
                                src={review.profileImage} 
                                alt={review.name} 
                                className="avatar-image"
                                style={{
                                  width: '48px',
                                  height: '48px',
                                  borderRadius: '50%',
                                  objectFit: 'cover'
                                }}
                              />
                            ) : (
                              <div className="avatar-initial">{review.initial || review.name.charAt(0)}</div>
                            )}
                          </div>
                          <div className="review-id">
                            <div className="review-name">{review.name}</div>
                            <div className="review-time">{review.time}</div>
                          </div>
                          <div className="g-badge">
                            <img src="https://cdn1.npcdn.net/img/1692259633google_logo.png" className="g_img" alt="Google logo" />
                          </div>
                        </div>
                        <div className="review-stars" aria-label={`${review.rating} out of 5`}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < review.rating ? 'star filled' : 'star'}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="review-text">{review.text}</div>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '0.5rem',
          marginTop: '1.5rem'
        }}>
          {Array.from({ length: totalSets }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSet(index)}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                border: 'none',
                padding: 0,
                backgroundColor: activeSet === index ? '#0070f3' : '#ddd',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              aria-label={`Go to review set ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
