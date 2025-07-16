import React from "react";
import MembershipTiers from "./MembershipTiers";
import MemberBenefits from "./MemberBenefits";
import MembershipCTA from "./MembershipCTA";
import MembershipHero from "./MembershipHero";

const Membership = () => {
  return (
    <div className="bg-white text-gray-800">
      <MembershipHero />
      <MembershipTiers />
      <MemberBenefits />
      <MembershipCTA />
    </div>
  );
};

export default Membership;
