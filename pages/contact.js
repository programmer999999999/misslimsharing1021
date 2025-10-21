import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Get in touch with us for bookings, questions, or support. We're here to help with your homestay needs." />
      </Head>
      <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">Home / Contact Us</div>
          <h1>Contact Us</h1>
          <p>We’d love to hear from you. Reach out for bookings, questions, or support.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="card">
            <h3>Email</h3>
            <p>hello@yourhomestay.com</p>
            <h3>Phone</h3>
            <p>+60 12-345 6789</p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
