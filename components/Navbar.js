import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);

  const isActive = (path) => {
    // For home, check exact match
    if (path === '/') {
      return pathname === path ? 'active' : '';
    }
    // For other paths, check if current path starts with the path (to handle nested routes)
    return pathname.startsWith(path) ? 'active' : '';
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="brand" onClick={close}>MissLimSharing</Link>
        <button className="nav-toggle" aria-label="Toggle navigation" onClick={toggle}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <Link href="/" className={isActive('/')} onClick={close}>Home</Link>
          <Link href="/units" className={isActive('/units')} onClick={close}>Our Units</Link>
          <Link href="/promotions" className={isActive('/promotions')} onClick={close}>Latest Promotion</Link>
          <Link href="/contact" className={isActive('/contact')} onClick={close}>Contact Us</Link>
          <Link href="/about" className={isActive('/about')} onClick={close}>About Us</Link>
          <Link href="/faq" className={isActive('/faq')} onClick={close}>FAQ</Link>
        </nav>
      </div>
    </header>
  );
}
