import React from "react";
import GalleryHero from "./GalleryHero";
import MomentGrid from "./MomentGrid";
import HighlightSlider from "./HighlightSlider";
import QuoteSection from "./QuoteSection";
import CallToAction from "./CallToAction";

const GalleryPage = () => {
  return (
    <main>
      <GalleryHero />
      <MomentGrid />
      <QuoteSection />
      <HighlightSlider />
      <CallToAction />
    </main>
  );
};

export default GalleryPage;
