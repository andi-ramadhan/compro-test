import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="pt-32 pb-20 px-6">

      {/* header */}
      <section className="text-center mb-20">
        <h1 className="text-5xl font-black italic tracking-tighter mb-6">
          GET IN <span className="text-emerald-500">TOUCH</span>
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Have a question or a project in mind? We'd love to hear from you. Reach out and let's talk.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

        {/* contact info */}
        <div className="space-y-10">
          <div>
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
            <p className="text-neutral-500 mb-10 leading-relaxed">
              Our team is here to support you. Whether you have a technical question or want to discuss a new partnership, we're just a message away.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: <FaPhone />, label: "Call Us", value: "+1 (234) 567-890", color: "text-emerald-500" },
              { icon: <FaEnvelope />, label: "Email Us", value: "hello@loremipsum.com", color: "text-emerald-500" },
              { icon: <FaMapMarkerAlt />, label: "Visit Us", value: "123 Street, 456 City", color: "text-emerald-500" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 p-6 rounded-2xl bg-neutral-50 border border-neutral-100/50 hover:bg-white hover:shadow-xl hover:shadow-neutral-100 transition-all duration-300">
                <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">{item.label}</p>
                  <p className="font-bold text-neutral-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* form */}
        <div className="bg-white p-10 rounded-[3rem] border border-neutral-100 shadow-2xl shadow-neutral-100">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Message Topic</label>
              <select className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none cursor-pointer">
                <option>Web Development</option>
                <option>Design Inquiry</option>
                <option>General Support</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Your Message</label>
              <textarea
                rows="5"
                placeholder="How can we help you?"
                className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              ></textarea>
            </div>
            <button className="w-full bg-neutral-900 hover:bg-emerald-600 text-white font-bold py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-xl shadow-neutral-200">
              Send Message
              <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
