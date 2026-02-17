import SectionOne from "../components/SectionOne";
import SectionTwo from "../components/SectionTwo";
import SectionThree from "../components/SectionThree";

export default function Home() {
  return (
    <main className="container mx-auto">
      <img src="/bg.jpg" className="w-full h-screen object-cover fixed inset-0 -z-10" alt="background" />
      <div className="w-full h-screen bg-white/50 fixed inset-0 -z-10"></div>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </main>
  )
}