import CourtHero from "./CourtHero";
import AllCourts from "./AllCourts/AllCourts";
import CourtTestimonials from "./CourtTestimonials";
import CourtFacilities from "./CourtFacilities";

const Courts = () => {
  return (
    <div>
      <CourtHero />
      <AllCourts />
      <CourtFacilities />
      <CourtTestimonials />
    </div>
  );
};

export default Courts;
