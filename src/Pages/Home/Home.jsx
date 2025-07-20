import React from "react";
import Banner from "../../Components/Banner/Banner";
import FeaturedSports from "./FeaturedSports";
import UpcomingEvents from "./UpcomingEvents";
import MembershipBenefits from "./MembershipBenefits";
import EliteExperience from "./HeroShowcase";
import SignatureFacilities from "./FacilitiesShowcase";
import WhyEliteArena from "./WhyEliteArena";
import Location from "./Location";

const Home = () => {
  return (
    <>
      <Banner />
      <WhyEliteArena />
      <FeaturedSports />
      <UpcomingEvents />
      <Location />
      <SignatureFacilities />
      <EliteExperience />
      <MembershipBenefits />
    </>
  );
};

export default Home;
