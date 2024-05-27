import React, { useEffect, useState } from "react";
import "./css/style.scss"; // Ensure the correct path to your CSS file
import { useDispatch, useSelector } from "react-redux";
import { filterSlice } from "../redux-tookit/reducer/filterSclice";
import {
  Box,
  FormControl,
  NativeSelect,
  Pagination,
  Stack,
} from "@mui/material";
import axios from "axios";
import { counterSelector } from "../redux-tookit/selector";
import UserListingCard from "./UserListingCard";

function UserListingArea() {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [size, setSize] = useState(5);
  const [reload, setReload] = useState(false);
  const counter = useSelector(counterSelector);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/v1/user/get-all?page=${page}&size=${size}`
      )
      .then((response) => {
        console.log(response.data);
        setUserData(response.data.content);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setIsLoading(true);
      });
  }, [page, size, reload, counter]);

  function handleChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value > 1 ? value - 1 : value === 1 && 0);
    console.log("value: ", value);
    //   window.scrollTo({ top: 500, behavior: "smooth" });
  }
  function handleGetAll() {
    setPage(0);
    setReload(!reload);
    setSearchKeyword("");
  }

  function handleSearch() {
    setPage(0);
    setSize(20);
    // Make an HTTP GET request to the backend API endpoint
    if (searchKeyword?.length > 0) {
      axios
        .get(
          `http://localhost:8080/api/v1/user/search?keyword=${searchKeyword}&page=${page}&size=${size}`
        )
        .then((response) => {
          console.log(response.data);
          setUserData(response.data.content);
          setTotalPage(response.data.totalPages);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }
  return (
    <div className="job_listing_area plus_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="recent_joblist_wrap">
              <div className="recent_joblist white-bg">
                <div className="row align-items-center">
                  <div
                    className="col-md-8"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h4>User Listing</h4>
                    <div className="single_field sr-input">
                      <button
                        onClick={handleGetAll}
                        className="boxed-btn3"
                        type="submit"
                      >
                        ALL
                      </button>
                      <input
                        type="text"
                        className=" wide"
                        placeholder="Search keyword"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                      />
                      <button
                        onClick={handleSearch}
                        className="boxed-btn3"
                        type="submit"
                      >
                        search
                      </button>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="serch_cat d-flex justify-content-end">
                      <select>
                        <option data-display="Most Recent">Most Recent</option>
                        <option value="1">Marketer</option>
                        <option value="2">Wordpress</option>
                        <option value="4">Designer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="job_lists m-0">
              <div className="row">
                {userData?.length > 0 ? (
                  userData?.map((user, i) => (
                    <UserListingCard key={i} user={user}></UserListingCard>
                  ))
                ) : (
                  <h2>Không tìm thấy dữ liệu</h2>
                )}

                {/* Repeat similar structure for more job listings */}
              </div>
            </div>

            <div className="pagination_wrap">
              <Stack spacing={2}>
                <Pagination
                  className="pagination"
                  count={totalPage}
                  color="primary"
                  page={page === 0 ? 1 : page + 1}
                  onChange={handleChange}
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserListingArea;
