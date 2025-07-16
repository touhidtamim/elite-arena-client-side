import React from "react";
import EventLandingHero from "./EventLandingHero";
import FeaturedEventBanner from "./FeaturedEventBanner";
import UpcomingEvents from "./UpcomingEvents";
import JoinEventCTA from "./JoinEventCTA";
import EventWall from "./EventWall";

const Events = () => {
  return (
    <div className="bg-white text-gray-800">
      <EventLandingHero />
      <EventWall />
      <FeaturedEventBanner />
      <UpcomingEvents />
      <JoinEventCTA />
    </div>
  );
};

export default Events;
