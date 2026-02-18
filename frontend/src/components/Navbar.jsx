import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (open && !event.target.closest('.navbar')) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open]);

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center transition-all duration-300 rounded-full bg-white/90 backdrop-blur-sm shadow-md py-2 border border-neutral-100">

        <Link to="/" className='text-2xl font-black italic tracking-tighter text-neutral-900'>
          LOREM<span className="text-emerald-500">IPSUM</span>
        </Link>

        <ul className='hidden md:flex gap-2 items-center'>
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className='px-5 py-2 hover:text-emerald-600 rounded-full transition-all duration-300 font-medium text-neutral-700 hover:bg-emerald-50/50'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* mobile view*/}
        <div className="md:hidden relative">
          <button className="text-neutral-900 p-2" onClick={toggleMenu} aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className={`md:hidden absolute top-20 left-0 right-0 z-50 py-4 bg-white/90 backdrop-blur-sm shadow-md rounded-2xl ${open ? 'block' : 'hidden'}`}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-2 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              className='px-5 py-2 hover:text-emerald-600 rounded-full transition-all duration-300 font-medium text-neutral-700 hover:bg-emerald-50/50 w-full text-center'
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
