import { useState } from "react";
import locations from "../../../public/locations.json";
const Location = () => {
  const [activeCity, setActiveCity] = useState(locations[0].city);
  const [selectedLocation, setSelectedLocation] = useState(
    locations[0].locations[0]
  );

  // Get current city locations
  const currentCityLocations =
    locations.find((city) => city.city === activeCity)?.locations || [];

  // Generate static map image URL (using OpenStreetMap)
  const getStaticMapUrl = (address) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://maps.googleapis.com/maps/api/staticmap?center=${encodedAddress}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${encodedAddress}&key=YOUR_FREE_KEY`;
    // Note: For actual deployment, consider using Leaflet or OpenLayers with OpenStreetMap
  };

  // Alternative using OpenStreetMap (no API key needed)
  const getOSMUrl = (address) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.openstreetmap.org/export/embed.html?bbox=90.35,23.75,90.45,23.85&layer=mapnik&marker=${encodedAddress}`;
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            Our <span className="text-yellow-500">Locations</span> Across
            Bangladesh
          </h2>
          <p className="text-xl text-gray-600">
            30+ elite facilities nationwide
          </p>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mt-4"></div>
        </div>

        {/* City Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {locations.map((cityData) => (
            <button
              key={cityData.city}
              onClick={() => {
                setActiveCity(cityData.city);
                setSelectedLocation(cityData.locations[0]);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCity === cityData.city
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cityData.city} ({cityData.locations.length})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location List */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <svg
                  className="w-6 h-6 text-yellow-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {activeCity} Branches
              </h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {currentCityLocations.map((location) => (
                  <div
                    key={location.branch}
                    onClick={() => setSelectedLocation(location)}
                    className={`p-4 rounded-lg text-black cursor-pointer transition-all ${
                      selectedLocation?.branch === location.branch
                        ? "bg-yellow-50 border-l-4 border-yellow-500"
                        : "hover:bg-gray-50 border-l-4 border-transparent"
                    }`}
                  >
                    <h4 className="font-bold">{location.branch}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {location.address}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(location.map, "_blank");
                      }}
                      className="mt-2 text-xs text-yellow-600 hover:text-yellow-800 font-medium flex items-center"
                    >
                      View on Map
                      <svg
                        className="w-3 h-3 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full min-h-[400px]">
              {selectedLocation ? (
                <>
                  {/* Static Map Image */}
                  <div className="h-64 bg-gray-200 overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=90.35,23.75,90.45,23.85&layer=mapnik&marker=${encodeURIComponent(
                        selectedLocation.address
                      )}`}
                    ></iframe>
                  </div>

                  {/* Location Details */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-black">
                      {selectedLocation.branch}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {selectedLocation.address}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <a
                        href={selectedLocation.map}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-full flex items-center"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                          />
                        </svg>
                        Get Directions
                      </a>

                      <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-full flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        Call Branch
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select a location to view details
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Locations Note */}
        <div className="mt-8 text-center text-gray-500">
          <p>
            Visit our facilities in {locations.length} cities across Bangladesh
          </p>
        </div>
      </div>
    </section>
  );
};

export default Location;
