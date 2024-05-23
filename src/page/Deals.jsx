import React from "react";
import Header from "../components/wraper/Header";
import SearchForm from "../components/wraperDeals/SearchForm";
import AmazingDeals from "../components/wraperDeals/AmazingDeals";
import Footer from "../components/wraper/Footer";
import BannerDeals from "../components/wraperDeals/BannerDeals";

function Deals() {
  return (
    <div>
      <Header />
      <BannerDeals></BannerDeals>
      <SearchForm />
      <AmazingDeals />
      <Footer />
    </div>
  );
}

export default Deals;
