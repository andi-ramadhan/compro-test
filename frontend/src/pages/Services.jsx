import { FaCode, FaPaintBrush, FaChartLine, FaRocket, FaShieldAlt, FaMobileAlt } from "react-icons/fa";

export default function Services() {
  const services = [
    {
      icon: <FaCode />,
      title: "Web Development",
      description: "Custom built, high-performance websites tailored to your business needs.",
      accent: "bg-emerald-500"
    },
    {
      icon: <FaPaintBrush />,
      title: "UI/UX Design",
      description: "User-centric design that creates intuitive and engaging digital experiences.",
      accent: "bg-neutral-900"
    },
    {
      icon: <FaChartLine />,
      title: "Digital Marketing",
      description: "Data-driven strategies to amplify your online presence and reach.",
      accent: "bg-emerald-500"
    },
    {
      icon: <FaRocket />,
      title: "Brand Identity",
      description: "Crafting memorable brands that stand out in a crowded marketplace.",
      accent: "bg-neutral-900"
    },
    {
      icon: <FaShieldAlt />,
      title: "Cyber Security",
      description: "Ensuring your digital assets are protected with robust security measures.",
      accent: "bg-emerald-500"
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Apps",
      description: "Seamless mobile applications that provide value on the go.",
      accent: "bg-neutral-900"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      {/* Header */}
      <section className="text-center mb-20">
        <h1 className="text-5xl font-black italic tracking-tighter mb-6">
          OUR <span className="text-emerald-500">SERVICES</span>
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          We offer a comprehensive suite of digital services designed to take your brand to the next level.
        </p>
      </section>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="group p-8 rounded-[2.5rem] bg-white border border-neutral-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 hover:-translate-y-2"
          >
            <div className={`w-14 h-14 ${service.accent} text-white rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform duration-500`}>
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-600 transition-colors duration-300">{service.title}</h3>
            <p className="text-neutral-500 leading-relaxed mb-6">
              {service.description}
            </p>
            <button className="text-sm font-bold uppercase tracking-widest text-neutral-400 group-hover:text-emerald-500 transition-colors duration-300 flex items-center gap-2">
              Learn More <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="mt-32 bg-neutral-950 rounded-[3rem] p-16 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <h2 className="text-4xl font-bold mb-6">Ready to start your project?</h2>
        <p className="text-neutral-400 mb-10 max-w-lg mx-auto">
          Let's collaborate to build something amazing together. Our experts are ready to help you.
        </p>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/20">
          Get Started Now
        </button>
      </section>
    </div>
  )
}
