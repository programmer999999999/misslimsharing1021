import Head from 'next/head';

export default function FAQ() {
  return (
    <>
      <Head>
        <title>FAQ</title>
        <meta name="description" content="Find answers to common questions about bookings, check-in, amenities, and more for your homestay experience." />
      </Head>
      <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">Home / FAQ</div>
          <h1>Frequently Asked Questions</h1>
          <p>Quick answers to common questions about booking, check-in, and amenities.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="cards">
            <div className="card">
              <h3>How do I check in?</h3>
              <p>We provide self check-in instructions via email with a smart lock code before your arrival.</p>
            </div>
            <div className="card">
              <h3>Is parking available?</h3>
              <p>Most locations offer on-site or nearby parking. Details will be included on each unit listing.</p>
            </div>
            <div className="card">
              <h3>Do you allow long-term stays?</h3>
              <p>Yes! We offer discounts for weekly and monthly stays. See our Latest Promotion page or contact us.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
