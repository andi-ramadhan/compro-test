export default function Navbar() {

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <nav className='fixed inset-0 z-10'>
      <ul className='flex gap-5 justify-center items-center max-w-xl mx-auto my-2 rounded-md p-1 shadow-md bg-white/80 backdrop-blur-sm'>
        {navLinks.map((link) => (
          <li key={link.label} className='px-6 py-2 hover:bg-gray-200 rounded-md'>
            <a href={link.to}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}