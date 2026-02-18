import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Web Development", to: "/services" },
      { name: "UI/UX Design", to: "/services" },
      { name: "Digital Marketing", to: "/services" },
      { name: "Brand Identity", to: "/services" },
    ],
    company: [
      { name: "About Us", to: "/about" },
      { name: "Work", to: "/services" },
      { name: "Careers", to: "/contact" },
      { name: "Contact", to: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", to: "/privacy" },
      { name: "Terms of Service", to: "/terms" },
      { name: "Cookie Policy", to: "/privacy" },
    ]
  };

  const socialLinks = [
    { icon: <FaFacebook />, href: "#", label: "Facebook" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
    { icon: <FaWhatsapp />, href: "#", label: "WhatsApp" },
  ];

  return (
    <footer className='bg-neutral-950 text-neutral-400 py-16 border-t border-neutral-900 z-10'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16'>

          <div className='flex flex-col gap-6'>
            <div className='text-3xl font-black italic tracking-tighter text-white'>
              LOREM<span className="text-emerald-500">IPSUM</span>
            </div>
            <p className='text-sm leading-relaxed max-w-xs'>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae.
              Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis.
            </p>
            <div className='flex gap-4'>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className='text-xl hover:text-emerald-500 transition-colors duration-300 transform hover:-translate-y-1'
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className='text-white font-bold mb-6 uppercase tracking-wider text-sm'>Services</h4>
            <ul className='flex flex-col gap-4'>
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link to={link.to} className='hover:text-emerald-500 transition-colors duration-300 inline-block'>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='text-white font-bold mb-6 uppercase tracking-wider text-sm'>Company</h4>
            <ul className='flex flex-col gap-4'>
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link to={link.to} className='hover:text-emerald-500 transition-colors duration-300 inline-block'>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='text-white font-bold mb-6 uppercase tracking-wider text-sm'>Legal</h4>
            <ul className='flex flex-col gap-4'>
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link to={link.to} className='hover:text-emerald-500 transition-colors duration-300 inline-block'>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium'>
          <p>© {currentYear} Lorem Ipsum. All rights reserved.</p>
          <div className='flex items-center gap-6'>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Made for my Full-Stack Developer test
            </span>
            <p>Wish Me Luck!</p>
          </div>
        </div>
      </div>
    </footer>
  );
}