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
                src="/logo.png" 
                alt="Lishe Yetu Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl tracking-tight hidden md:block uppercase">Lishe Yetu</span>
          </div>
          <div className="hidden md:flex gap-8 font-medium items-center">
            <a href="#about" className="hover:text-[#8C926B] transition border-b-2 border-transparent hover:border-[#8C926B]">About</a>
            <a href="#programs" className="hover:text-[#8C926B] transition border-b-2 border-transparent hover:border-[#8C926B]">Programs</a>
            <a href="#impact" className="hover:text-[#8C926B] transition border-b-2 border-transparent hover:border-[#8C926B]">Impact</a>
            <button className="bg-[#8C926B] px-6 py-2 rounded-full hover:bg-opacity-90 transition font-bold shadow-md">
              Donate
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
            A registered Community-Based Organization working with communities, schools, and health facilities to strengthen nutrition and support sustainable livelihoods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#about" className="bg-[#8C926B] px-10 py-4 rounded-lg font-bold text-lg hover:scale-105 transition transform shadow-xl">
              Who We Are
            </a>
            <a href="#programs" className="border-2 border-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1B3C1B] transition">
              Our Programs
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-[#1B3C1B] text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
              Who We Are
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
            Lishe Yetu Initiative is a community-based organisation in Kenya committed to transforming lives through nutrition, food safety and sustainable food systems. We stand at the intersection of health, agriculture and community development.            </p>
            <p className="text-lg leading-relaxed text-gray-700 font-medium italic border-l-4 border-[#8C926B] pl-4 bg-white p-4 rounded-r-lg shadow-sm">
              "We envision communities where every individual, every family and every household enjoys nourishment and health through local, safe, nutritious food."
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Our mission is to actively engage communities so that everyone has access to safe, nutritious food and the tools to live healthier, more resilient lives.
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

      {/* Programs / Objectives - Dark Section */}
      <section id="programs" className="bg-[#1B3C1B] text-white py-24 px-6 rounded-t-[3rem] -mt-12 relative z-10 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Programs</h2>
            <p className="text-xl opacity-90 leading-relaxed">
              We focus on organic, locally-sourced meals, food safety education, and partnerships for resilient livelihoods.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            
            {/* Program 1 */}
            <div className="bg-[#244d24] p-8 rounded-2xl border border-[#ffffff10] hover:border-[#8C926B] transition group shadow-lg">
              <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">🍲</div>
              <h3 className="text-2xl font-bold mb-4 text-[#8C926B]">Medically Tailored Meals</h3>
              <p className="text-gray-300 leading-relaxed">
                We partner with health facilities to provide meals and food support for individuals facing illness, malnutrition, or other health challenges.
              </p>
            </div>

            {/* Program 2 */}
            <div className="bg-[#244d24] p-8 rounded-2xl border border-[#ffffff10] hover:border-[#8C926B] transition group shadow-lg">
              <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">🧼</div>
              <h3 className="text-2xl font-bold mb-4 text-[#8C926B]">Food Safety & Education</h3>
              <p className="text-gray-300 leading-relaxed">
                Through outreach and training, we teach safe food handling, hygiene practices, and contamination prevention in homes, schools, and markets.
              </p>
            </div>

            {/* Program 3 */}
            <div className="bg-[#244d24] p-8 rounded-2xl border border-[#ffffff10] hover:border-[#8C926B] transition group shadow-lg">
              <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">🌱</div>
              <h3 className="text-2xl font-bold mb-4 text-[#8C926B]">Livelihoods & Value-Addition</h3>
              <p className="text-gray-300 leading-relaxed">
                We support community members—especially women and youth—to add value to local food (packaging, marketing) and create income opportunities.
              </p>
            </div>

            {/* Program 4 */}
            <div className="bg-[#244d24] p-8 rounded-2xl border border-[#ffffff10] hover:border-[#8C926B] transition group shadow-lg">
              <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">🤝</div>
              <h3 className="text-2xl font-bold mb-4 text-[#8C926B]">Partnerships & Advocacy</h3>
              <p className="text-gray-300 leading-relaxed">
                Collaborating with local government and NGOs to influence policy, scale nutrition interventions, and build strong food systems.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1B3C1B] mb-6 uppercase tracking-tight">Get Involved</h2>
          <p className="text-xl text-gray-600 mb-10">
            Join us in community outreach, setup kitchen gardens, or partner with us. Together, we can build healthier, stronger communities through the power of food.
          </p>
          <button className="bg-[#1B3C1B] text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-[#8C926B] shadow-2xl transition hover:-translate-y-1">
            Partner With Us
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative h-10 w-10">
                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <span className="font-black text-2xl text-[#1B3C1B]">LISHE YETU</span>
            </div>
            <p className="text-gray-500 max-w-sm">
              Transforming lives through nutrition, food safety and sustainable food systems. Anchored in health, agriculture and community development.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[#1B3C1B] mb-6 uppercase tracking-widest text-sm">Programs</h4>
            <ul className="space-y-4 text-gray-600">
              <li><a href="#" className="hover:text-[#8C926B] transition">Tailored Meals</a></li>
              <li><a href="#" className="hover:text-[#8C926B] transition">Food Safety</a></li>
              <li><a href="#" className="hover:text-[#8C926B] transition">Livelihoods</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#1B3C1B] mb-6 uppercase tracking-widest text-sm">Contact</h4>
            <p className="text-gray-600">Marsabit, Kenya</p>
            <p className="text-gray-600 font-medium">info@lisheyetu.org</p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} Lishe Yetu Initiative.
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