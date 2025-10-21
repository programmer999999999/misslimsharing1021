import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Learn more about our homestay services, mission, and what makes us different. We provide comfortable, clean, and convenient accommodations in great locations." />
      </Head>
      <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">Home / About Us</div>
          <h1>About Us</h1>
          <p>We provide thoughtfully designed homestay experiences across the city, focused on comfort, cleanliness, and convenience.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="cards">
            <div className="card">
              <h3>Our Mission</h3>
              <p>To offer a home-away-from-home with seamless self check-in, responsive support, and modern amenities.</p>
            </div>
            <div className="card">
              <h3>Locations</h3>
              <p>Strategically located near public transport, business districts, and popular attractions.</p>
            </div>
            <div className="card">
              <h3>Quality</h3>
              <p>We maintain high standards of cleanliness and comfort, with professional housekeeping between stays.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
