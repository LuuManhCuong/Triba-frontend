import React, { useEffect, useState } from "react";
import Header from "../components/wraper/Header";
import Banner from "../components/wraper/Banner";
import VisitCountry from "../components/wraper/VisitCountry";
import CallToAction from "../components/wraper/CallToAction";
import Footer from "../components/wraper/Footer";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import axios from "axios";

function Index() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [jobs, setJobs] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  function handleChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
    // window.scrollTo({ top: 300, behavior: "smooth" });
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/job?page=${page}&size=${size}`
      );
      console.log("res ", response.data);
      setJobs(response.data.content);
      setTotalPage(response.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    console.log("page: ", page);
    fetchData();
  }, [page]);

  console.log("data: ", jobs);

  return (
    <div>
      <Header />
      <Banner />

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
          <VisitCountry  key={i} job={job} />
        ))}
      </div>

      <Stack spacing={2}>
        <Pagination
          className="pagination"
          count={totalPage}
          color="primary"
          page={page || 1}
          onChange={handleChange}
        />
      </Stack>

      {/* <CallToAction /> */}
      <Footer />
    </div>
  );
}

export default Index;
