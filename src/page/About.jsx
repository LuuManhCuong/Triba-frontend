import React from "react";
import Header from "../components/wraper/Header";
import MainBanner from "../components/wraperAbout/MainBanner";
import Cities from "../components/wraperAbout/Cities";
import WeeklyOffers from "../components/wraperAbout/WeeklyOffers";
import MoreAbout from "../components/wraperAbout/MoreAbout";
import BestLocations from "../components/wraperAbout/BestLocations";
import CallToAction from "../components/wraper/CallToAction";
import Footer from "../components/wraper/Footer";
import SliderArea from "../JobBroadComponent/SliderArea";

function About() {
  return (
    <div>
      <Header></Header>
      {/* <MainBanner /> */}
      <div className="job-broad">
        <SliderArea></SliderArea>
      </div>
      <Cities />
      {/* <WeeklyOffers /> */}
      <MoreAbout />
      <BestLocations />
      <Footer></Footer>
    </div>
  );
}

export default About;
