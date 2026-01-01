import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F1EA] text-gray-900 font-sans">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#1B3C1B] text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12">
              <Image 
                src="/logo.jpeg" 
                alt="Lishe Yetu Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl tracking-tight hidden md:block uppercase">Lishe Yetu</span>
          </div>
          <div className="hidden md:flex gap-8 font-medium items-center">
            <a href="#about" className="hover:text-[#8C926B] transition border-b-2 border-transparent hover:border-[#8C926B]">About</a>
            <a href="#mission" className="hover:text-[#8C926B] transition border-b-2 border-transparent hover:border-[#8C926B]">Mission</a>
            <a href="#impact" className="hover:text-[#8C926B] transition border-b-2 border-transparent hover:border-[#8C926B]">Impact</a>
            <button className="bg-[#8C926B] px-6 py-2 rounded-full hover:bg-opacity-90 transition font-bold shadow-md">
              Support Us
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[85vh] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero.png" 
            alt="Lishe Yetu Hero" 
            fill 
            className="object-cover brightness-[0.40]"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            Nourishing Communities, <br/>Building Resilience.
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 opacity-95 max-w-2xl mx-auto">
            A grassroots initiative dedicated to improving health outcomes in underserved communities of Marsabit County.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#about" className="bg-[#8C926B] px-10 py-4 rounded-lg font-bold text-lg hover:scale-105 transition transform shadow-xl">
              Our Story
            </a>
            <a href="#impact" className="border-2 border-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1B3C1B] transition">
              Our Impact
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-[#1B3C1B] text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
              Driving Positive Change
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              LISHE YETU INITIATIVE is a grassroots organization dedicated to driving positive change and improving health outcomes in underserved communities in <span className="font-bold text-[#1B3C1B]">Marsabit County</span>.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 font-medium italic border-l-4 border-[#8C926B] pl-4 bg-white p-4 rounded-r-lg shadow-sm">
              "We believe in the transformative power of nourishing food to promote wellness, reduce health disparities, and create more equitable and resilient communities."
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              By leveraging community partnerships, advocacy, and education, we strive to create lasting impact and inspire positive change in the lives of those we serve.
            </p>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
             <Image 
              src="/about.jpg" 
              alt="About Lishe Yetu" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission / Objectives - Dark Section */}
      <section id="mission" className="bg-[#1B3C1B] text-white py-24 px-6 rounded-t-[3rem] -mt-12 relative z-10 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Mission & Vision</h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Promoting access, affordability, and convenience of nutritious food while fostering food sovereignty and climate resilience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#244d24] p-8 rounded-2xl border border-[#ffffff10] hover:border-[#8C926B] transition group shadow-lg">
              <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">🌱</div>
              <h3 className="text-2xl font-bold mb-4 text-[#8C926B]">Regenerative Farming</h3>
              <p className="text-gray-300 leading-relaxed">
                Improving climate through organic farming practices that heal the soil and ensure long-term food security.
              </p>
            </div>

            <div className="bg-[#244d24] p-8 rounded-2xl border border-[#ffffff10] hover:border-[#8C926B] transition group shadow-lg">
              <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">🏥</div>
              <h3 className="text-2xl font-bold mb-4 text-[#8C926B]">Chronic Health</h3>
              <p className="text-gray-300 leading-relaxed">
                Addressing nutrition-sensitive chronic conditions through direct access to fresh, whole foods.
              </p>
            </div>

            <div className="bg-[#244d24] p-8 rounded-2xl border border-[#ffffff10] hover:border-[#8C926B] transition group shadow-lg">
              <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">⚖️</div>
              <h3 className="text-2xl font-bold mb-4 text-[#8C926B]">Social Justice</h3>
              <p className="text-gray-300 leading-relaxed">
                Advancing equity and inclusivity, prioritizing the needs and voices of marginalized communities in Marsabit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1B3C1B] mb-6 uppercase tracking-tight">Join the Movement</h2>
          <p className="text-xl text-gray-600 mb-10">
            Support our multi-sector initiative to create a healthier, more resilient Marsabit.
          </p>
          <button className="bg-[#1B3C1B] text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-[#8C926B] shadow-2xl transition hover:-translate-y-1">
            Get Involved Today
          </button>
        </div>
      </section>

      {/* Footer */}
     {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative h-10 w-10">
                <Image src="/logo.jpeg" alt="Logo" fill className="object-contain" />
              </div>
              <span className="font-black text-2xl text-[#1B3C1B]">LISHE YETU</span>
            </div>
            <p className="text-gray-500 max-w-sm">
              Cultivating a culture of wellness and resilience through sustainable agriculture and nutrition education in Kenya.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[#1B3C1B] mb-6 uppercase tracking-widest text-sm">Initiatives</h4>
            <ul className="space-y-4 text-gray-600">
              <li><a href="#" className="hover:text-[#8C926B] transition">Organic Farming</a></li>
              <li><a href="#" className="hover:text-[#8C926B] transition">Community Health</a></li>
              <li><a href="#" className="hover:text-[#8C926B] transition">Policy Advocacy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#1B3C1B] mb-6 uppercase tracking-widest text-sm">Contact</h4>
            <p className="text-gray-600">Marsabit County, Kenya</p>
            <p className="text-gray-600 font-medium">info@lisheyetu.org</p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} Lishe Yetu Initiative. Empowering Marsabit.
          </p>
          <p className="text-gray-400 text-sm font-medium">
            Made by{' '}
            <a 
              href="https://waki-solutions-portfolio.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#1B3C1B] hover:text-[#8C926B] font-bold transition-colors underline decoration-[#8C926B]/30 underline-offset-4"
            >
              Waki Solutions
            </a>
          </p>
        </div>
      </footer>

    </main>
  );
}