import { FaRocket } from "react-icons/fa";

export default function SectionThree() {
  return (
    <section className='relative w-full py-24 px-10 bg-neutral-950 rounded-[3rem] overflow-hidden shadow-2xl'>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 relative">
          <div className="bg-white/10 aspect-video rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10 group">
            <div className="absolute inset-0 bg-linear-to-bl from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center justify-center h-full">
              <span className="text-white/20 font-black italic text-4xl tracking-tighter select-none">ACTION READY</span>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 bg-white text-neutral-900 p-8 rounded-2xl shadow-xl hidden lg:block border border-neutral-100">
            <p className="text-4xl font-bold">2.4k</p>
            <p className="text-xs uppercase tracking-widest font-bold text-neutral-400 mt-1">Active Projects</p>
          </div>
        </div>

        <div className="order-1 md:order-2 text-right">
          <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-xl mb-6 ml-auto shadow-lg shadow-emerald-900/40">
            <FaRocket />
          </div>
          <h2 className='text-5xl font-black italic tracking-tighter mb-8 text-white'>
            FUTURE <span className="text-emerald-500">FOCUS</span>
          </h2>
          <div className="w-20 h-1.5 bg-emerald-500 mb-8 rounded-full ml-auto"></div>
          <p className='text-xl leading-relaxed text-neutral-400 mb-8 max-w-lg ml-auto'>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae.
            Adipiscing elit quisque faucibus ex sapien vitae pellentesque.
          </p>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 ml-auto shadow-lg shadow-emerald-500/20">
            Explore Growth
          </button>
        </div>
      </div>
    </section>
  )
}