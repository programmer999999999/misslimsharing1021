import Head from 'next/head';

export default function Promotions() {
  return (
    <>
      <Head>
        <title>Latest Promotion</title>
        <meta name="description" content="Discover our latest promotions and special offers. Enjoy exclusive discounts on early bird bookings, long stays, and weekend getaways." />
      </Head>
      <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">Home / Latest Promotion</div>
          <h1>Latest Promotion</h1>
          <p>Discover our current deals and seasonal offers. Book directly to enjoy the best rates.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="cards">
            <div className="card">
              <h3>Early Bird</h3>
              <p>Book 30 days in advance and get 15% off your stay.</p>
            </div>
            <div className="card">
              <h3>Long Stay</h3>
              <p>Stay 7+ nights and receive 20% off plus complimentary weekly cleaning.</p>
            </div>
            <div className="card">
              <h3>Weekend Special</h3>
              <p>Enjoy 10% off for weekend stays (Fri–Sun). Perfect for short getaways.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
