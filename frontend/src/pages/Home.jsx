import SectionOne from "../components/SectionOne";
import SectionTwo from "../components/SectionTwo";
import SectionThree from "../components/SectionThree";

export default function Home() {
  return (
    <div className="relative">

      <img src="/bg.webp" className="w-full h-screen object-cover fixed inset-0 -z-20 blur-md" alt="background" />
      <div className="w-full h-screen bg-white/60 fixed inset-0 -z-10 backdrop-blur-[2px]"></div>

      <main className="container mx-auto px-4 pb-24">
        <SectionOne />

        <article className="flex flex-col gap-24 mt-12">
          <SectionTwo />
          <SectionThree />
        </article>
      </main>
    </div>
  )
}
