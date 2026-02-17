export default function Navbar() {

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <nav>
      <ul>
        {navLinks.map((link) => (
          <li key={link.label}>
            <a href={link.to}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}