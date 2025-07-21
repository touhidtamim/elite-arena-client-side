const SignatureFacilities = () => {
  const facilities = [
    {
      name: "Olympic Swimming Pavilion",
      image: "https://i.ibb.co/C31LDsZb/lhu-shi-hui-YWk-RJjctjb-A-unsplash.jpg",
      specs: [
        "50m Competition Pool",
        "Underwater Camera System",
        "VIP Viewing Lounge",
      ],
    },
    {
      name: "Grand Tennis Atrium",
      image: "https://i.ibb.co/3mKXSq0B/pranai-shah-hmub-Aaw-2as-unsplash.jpg",
      specs: ["French Clay Courts", "Hawkeye Technology", "Player Lounge"],
    },
  ];

  return (
    <section className="py-32 px-8 bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-yellow-400 mb-4 tracking-widest">
            WORLD-CLASS FACILITIES
          </p>
          <h2 className="text-4xl font-serif font-light mb-6">
            Our <span className="text-yellow-400 font-normal">Signature</span>{" "}
            Venues
          </h2>
          <div className="w-32 h-px bg-yellow-400 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {facilities.map((facility, i) => (
            <div key={i} className="group relative overflow-hidden">
              <div className="relative h-[500px] overflow-hidden">
                <img
                  src={facility.image}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-serif mb-4">{facility.name}</h3>
                <ul className="space-y-2">
                  {facility.specs.map((spec, j) => (
                    <li key={j} className="flex items-center text-gray-300">
                      <span className="w-2 h-2 bg-yellow-400 mr-3"></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureFacilities;
