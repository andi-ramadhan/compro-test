import { FaLightbulb } from "react-icons/fa";

export default function SectionTwo() {
  return (
    <section className='relative w-full py-24 px-10 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-white/50 overflow-hidden'>
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-xl mb-6 shadow-lg shadow-emerald-200">
            <FaLightbulb />
          </div>
          <h2 className='text-5xl font-black italic tracking-tighter mb-8'>
            STRATEGIC <span className="text-emerald-500">INSIGHT</span>
          </h2>
          <div className="w-20 h-1.5 bg-neutral-950 mb-8 rounded-full"></div>
          <p className='text-xl leading-relaxed text-neutral-600 mb-8 max-w-lg'>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae.
            Ex sapien vitae pellentesque sem placerat in id cursus mi pretium.
          </p>
          <button className="text-emerald-600 font-bold flex items-center gap-2 group">
            View Analysis <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        <div className="relative">
          <div className="bg-neutral-950 aspect-video rounded-3xl overflow-hidden shadow-2xl relative group">
            <div className="absolute inset-0 bg-linear-to-tr from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center justify-center h-full">
              <span className="text-neutral-700 font-black italic text-4xl tracking-tighter select-none">DATA VISUAL</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-emerald-500 text-white p-8 rounded-2xl shadow-xl hidden lg:block">
            <p className="text-4xl font-bold">99%</p>
            <p className="text-xs uppercase tracking-widest font-bold opacity-80 mt-1">Efficiency Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
}