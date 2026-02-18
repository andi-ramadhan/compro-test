import { FaHistory, FaBullseye, FaUsers } from "react-icons/fa";

export default function About() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="text-center mb-20 px-6">
        <h1 className="text-5xl font-black italic tracking-tighter mb-6">
          KNOW <span className="text-emerald-500">ABOUT US</span>
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          We are a team of dedicated professionals committed to delivering excellence and innovation in everything we do.
        </p>
      </section>

      {/* Content Sections */}
      <section className="grid md:grid-cols-2 gap-12 mb-20">
        <div className="bg-neutral-50 p-10 rounded-3xl border border-neutral-100">
          <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6 text-2xl shadow-lg shadow-emerald-200">
            <FaHistory />
          </div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-neutral-600 leading-relaxed">
            Founded with a vision to redefine industry standards, we have grown from a small passionate group into a powerhouse of creativity and technical expertise. Our journey is paved with challenges turned into triumphs.
          </p>
        </div>

        <div className="bg-neutral-950 p-10 rounded-3xl text-white shadow-2xl shadow-neutral-200">
          <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6 text-2xl shadow-lg shadow-emerald-900/20">
            <FaBullseye />
          </div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-neutral-400 leading-relaxed">
            To empower our clients through innovative solutions that drive growth and create lasting impact. We believe in the power of collaboration and the pursuit of perfection.
          </p>
        </div>
      </section>

      {/* Team Values */}
      <section className="bg-emerald-50/50 rounded-[3rem] p-12 text-center border border-emerald-100/50">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white text-emerald-500 rounded-full flex items-center justify-center text-3xl shadow-md">
            <FaUsers />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-8">Our Core Values</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { title: "Innovation", desc: "Always pushing boundaries" },
            { title: "Integrity", desc: "Honest and transparent" },
            { title: "Excellence", desc: "Non-stop quality pursuit" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-50">
              <h3 className="font-bold text-emerald-600 mb-2">{item.title}</h3>
              <p className="text-sm text-neutral-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
