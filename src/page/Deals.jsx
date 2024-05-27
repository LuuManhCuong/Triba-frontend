import React from "react";
import Header from "../components/wraper/Header";
import SearchForm from "../components/wraperDeals/SearchForm";
import AmazingDeals from "../components/wraperDeals/AmazingDeals";
import Footer from "../components/wraper/Footer";
import BannerDeals from "../components/wraperDeals/BannerDeals";
import CategoryArea from "../JobBroadComponent/CategoryArea";
import SliderArea from "../JobBroadComponent/SliderArea";
import JobListingArea from "../JobBroadComponent/JobListingArea";
// import Header from "../JobBroadComponent/Header";

function Deals() {
  return (
    <div>
      {/* <SearchForm /> */}
      <div className="job-broad">
        <Header></Header>
        {/* <BannerDeals></BannerDeals> */}
        <SliderArea></SliderArea>
        {/* <CategoryArea></CategoryArea> */}
        <JobListingArea></JobListingArea>
      </div>
      <AmazingDeals />
      <Footer />
    </div>
  );
}

export default Deals;
