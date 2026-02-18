import { FaArrowRight } from "react-icons/fa";

export default function SectionOne() {
  return (
    <section className='container flex flex-col justify-center items-center min-h-screen max-w-5xl mx-auto px-6 text-center pt-20'>
      <div className="inline-block px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold tracking-widest uppercase mb-8 animate-fade-in">
        Elevating Digital Excellence
      </div>
      <h1 className='text-5xl md:text-8xl font-black italic tracking-tighter mb-8 leading-none'>
        LOREM<span className="text-emerald-500">IPSUM</span>
      </h1>
      <p className='text-xl md:text-2xl leading-relaxed text-neutral-600 max-w-3xl mb-12 text-balance'>
        We craft cutting-edge digital experiences that combine
        <span className="text-neutral-900 font-semibold"> innovation</span> with
        <span className="text-neutral-900 font-semibold"> precision</span>.
        Transform your vision into a professional reality with our expert team.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-neutral-950 hover:bg-emerald-600 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 flex items-center gap-3 group shadow-xl shadow-neutral-200">
          Get Started <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200 font-bold py-5 px-10 rounded-2xl transition-all duration-300">
          Our Services
        </button>
      </div>
    </section>
  )
}