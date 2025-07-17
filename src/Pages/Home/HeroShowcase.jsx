const EliteExperience = () => {
  return (
    <section className="py-32 px-8 bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Luxury Image Panel */}
          <div className="md:w-1/2 relative">
            <div className="relative h-[500px] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute -bottom-1 -left-1 w-32 h-32 border-l-2 border-b-2 border-yellow-400" />
              <div className="absolute -top-1 -right-1 w-32 h-32 border-r-2 border-t-2 border-yellow-400" />
            </div>
          </div>

          {/* Luxury Content */}
          <div className="md:w-1/2">
            <p className="text-yellow-400 mb-4 tracking-widest">
              THE ELITE DIFFERENCE
            </p>
            <h2 className="text-4xl font-serif font-light mb-8 leading-tight">
              Curated{" "}
              <span className="text-yellow-400 font-normal">Experiences</span>{" "}
              for
              <br />
              Discerning{" "}
              <span className="text-yellow-400 font-normal">Athletes</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Elite Arena transcends conventional sports facilities with bespoke
              training programs, personalized coaching, and exclusive member
              events designed for those who demand excellence.
            </p>
            <ul className="space-y-4">
              {[
                "Private training sessions with Olympians",
                "Biometric performance tracking",
                "Luxury recovery lounges",
                "Concierge service",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-yellow-400 mr-3">✧</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteExperience;
