import { useState, useEffect } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1350&q=80",
    alt: "Sports Club",
    caption: "Welcome to Elite Arena",
  },
  {
    src: "https://images.unsplash.com/photo-1546484959-f5c1a7ec1776?auto=format&fit=crop&w=1350&q=80",
    alt: "Courts",
    caption: "Book Your Favorite Court",
  },
  {
    src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1350&q=80",
    alt: "Activities",
    caption: "Join Our Exciting Activities",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-64 md:h-296 overflow-hidden rounded-lg shadow-lg">
      {images.map((image, index) => (
        <div
          key={image.src}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg">
              {image.caption}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
