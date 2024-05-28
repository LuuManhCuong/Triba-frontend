import React, { useEffect, useState } from "react";
import Header from "../components/wraper/Header";
import Banner from "../components/wraper/Banner";
import WeeklyOffers from "../components/wraperAbout/WeeklyOffers";

import VisitCountry from "../components/wraper/VisitCountry";
import CallToAction from "../components/wraper/CallToAction";
import Footer from "../components/wraper/Footer";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import axios from "axios";
import CategoryArea from "../JobBroadComponent/CategoryArea";

function Index() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [jobs, setJobs] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [recommend, setRecommend] = useState([]);

  function handleChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value > 1 ? value - 1 : value === 1 && 0);
    // console.log("value: ", value);
    //   window.scrollTo({ top: 500, behavior: "smooth" });
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/job?page=${page}&size=${size}`
      );
      // console.log("res ", response.data);
      setJobs(response.data.content);
      setTotalPage(response.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`http://127.0.0.1:8000/fetch-job/${userId}/`)
        .then((response) => {
          // console.log("suggest: ", response.data.recommended_jobs);
          setRecommend(response?.data?.recommended_jobs);
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error);
        });
    } else {
      console.error("No user ID found in localStorage");
    }
  }, []);
  // console.log("suggest: ", recommend);

  return (
    <div>
      <Header />
      <Banner />
      {recommend?.length > 0 ? (
        <WeeklyOffers recommend={recommend}></WeeklyOffers>
      ) : (
        ""
      )}

      <div className="row title-gr">
        <div className="col-lg-5">
          <div className="section-heading">
            <h2>
              Start your career journey with the most suitable jobs for you
            </h2>
            <p>
              Don't miss out on the best job opportunities with the latest
              recruitment information updated daily.
            </p>
          </div>
        </div>
      </div>

      <div style={{ margin: "50px 100px" }}>
        {jobs?.map((job, i) => (
          <VisitCountry key={i} job={job} />
        ))}
      </div>

      <Stack spacing={2}>
        <Pagination
          className="pagination"
          count={totalPage}
          color="primary"
          page={page === 0 ? 1 : page + 1}
          onChange={handleChange}
        />
      </Stack>

      {/* <CallToAction /> */}
      <Footer />
    </div>
  );
}

export default Index;
