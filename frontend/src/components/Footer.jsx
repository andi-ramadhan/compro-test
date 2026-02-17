import { FaWhatsapp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  return (
    <footer className='bg-neutral-950 text-white py-16' >
      <div className='container mx-auto px-6'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-8 mb-12'>

          <div className='text-2xl font-black italic tracking-tighter'>
            Lorem Ipsum
          </div>
        </div>
      </div>
    </footer>
  )
}