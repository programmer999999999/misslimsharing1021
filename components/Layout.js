import Navbar from './Navbar';
import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">{children}</main>
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Your Homestay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
