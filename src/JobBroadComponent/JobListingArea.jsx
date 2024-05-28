import React, { useEffect, useState } from "react";
import "./css/style.scss"; // Ensure the correct path to your CSS file
import svgIcon1 from "./img/svg_icon/1.svg";
import svgIcon2 from "./img/svg_icon/2.svg";
import svgIcon3 from "./img/svg_icon/3.svg";
import svgIcon4 from "./img/svg_icon/4.svg";
import svgIcon5 from "./img/svg_icon/5.svg";
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
import JobListingCard from "./JobListingCard";
import { counterSelector } from "../redux-tookit/selector";
import { countImgSlice } from "../redux-tookit/reducer/countImgSlice";
import { counterSlice } from "../redux-tookit/reducer/counterSlice";

const jobCategories = {
  industries: [
    "Công nghệ thông tin",
    "Kế toán",
    "Nhân sự",
    "Marketing ",
    "Kinh doanh",
    "Giáo dục",
    "Y tế",
    "Sản xuất",
    "Logistics",
    "Xây dựng",
    "Khách sạn",
    "Ngân hàng ",
  ],
  positions: [
    "Thực tập sinh",
    "Nhân viên",
    "Chuyên viên",
    "Quản lý",
    "Giám đốc / Điều hành",
  ],
  locations: [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Cần Thơ",
    "Hải Phòng",
    "Bình Dương",
    "Đồng Nai",
  ],
  workTypes: [
    "Toàn thời gian",
    "Bán thời gian",
    "Hợp đồng",
    "Thời vụ",
    "Làm việc từ xa (Remote)",
  ],
};
function JobListingArea({ isAdmin }) {
  const dispatch = useDispatch();
  const [selectedWorkType, setSelectedWorkType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [jobs, setJobs] = useState([]);
  const counter = useSelector(counterSelector);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [size, setSize] = useState(5);

  function handleChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value > 1 ? value - 1 : value === 1 && 0);
    console.log("value: ", value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  useEffect(() => {
    // setPage(0);
    setIsLoading(true);
    const url = `http://localhost:8080/api/v1/user/job/filter?industryName=${selectedIndustry}
    &positionName=${selectedPosition}
    &locationName=${selectedLocation}
    &workTypeName=${selectedWorkType}
    &page=${page}
    &size=${size}`;

    // console.log(url);
    axios
      .get(url)
      .then((response) => {
        setJobs(response.data.content);
        setTotalPage(response.data.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setIsLoading(true);
      });

    if (
      selectedIndustry ||
      selectedLocation ||
      selectedPosition ||
      selectedWorkType
    ) {
      const formData = {
        userId: localStorage.getItem("userId"), // Thay thế 'YourUserId' bằng giá trị thực tế
        keySearch: searchKeyword, // Thêm các trường dữ liệu khác nếu cần
        industries: selectedIndustry,
        positions: selectedPosition,
        locations: selectedLocation,
        workTypes: selectedWorkType,
      };
      console.log("send search: ", formData);
      axios
        .post(`http://localhost:8080/api/v1/user/search/save`, formData)
        .then((response) => {
          console.log("res: ", response.data);
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error);
        });
    } else {
      console.log("ko có dữ liệu nên ko tạo search");
    }
  }, [
    page,
    size,
    selectedIndustry,
    selectedPosition,
    selectedLocation,
    selectedWorkType,
    counter,
  ]);

  // console.log("coutnt: ", counter);
  // console.log("reload: ", jobs);
  function handleSearch() {
    // Make an HTTP GET request to the backend API endpoint
    if (searchKeyword?.length > 0) {
      axios
        .get(
          `http://localhost:8080/api/v1/user/job/search?keyword=${searchKeyword}`
        )
        .then((response) => {
          console.log(response.data);
          setJobs(response.data);
          setIsLoading(false);

          const formData = {
            userId: localStorage.getItem("userId"), // Thay thế 'YourUserId' bằng giá trị thực tế
            keySearch: searchKeyword, // Thêm các trường dữ liệu khác nếu cần
            industries: selectedIndustry,
            positions: selectedPosition,
            locations: selectedLocation,
            workTypes: selectedWorkType,
          };
          // console.log("send search: ", formData);
          axios
            .post(`http://localhost:8080/api/v1/user/search/save`, formData)
            .then((response) => {
              // console.log("res: ", response.data);
              // dispatch(counterSlice.actions.descrease());
            })
            .catch((error) => {
              console.error("Error fetching jobs:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error);
          setIsLoading(true);
        });
    }

    setSelectedWorkType("");
    setSelectedLocation("");
    setSelectedIndustry("");
    setSelectedPosition("");
  }

  // console.log(jobs);

  const handleSubmit = (event) => {};

  return (
    <div className="job_listing_area plus_padding">
      <div className="container">
        {isAdmin ? <h2>ADMIN MANAGE JOB</h2> : ""}
        <div className="row">
          <div className="col-lg-3">
            <div className="job_filter white-bg">
              <div className="form_inner white-bg">
                <h3>Filter</h3>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12">
                      <Box
                        className="single_field sort-btn"
                        sx={{ minWidth: 120 }}
                      >
                        <FormControl fullWidth>
                          <NativeSelect
                            className="wide"
                            value={selectedWorkType}
                            onChange={(e) =>
                              setSelectedWorkType(e.target.value)
                            }
                            inputProps={{
                              name: "workType",
                              id: "work-type-select",
                            }}
                          >
                            <option value="" disabled>
                              Chọn loại hình
                            </option>
                            {jobCategories.workTypes.map((type, index) => (
                              <option key={index} value={type}>
                                {type}
                              </option>
                            ))}
                          </NativeSelect>
                        </FormControl>
                      </Box>
                    </div>
                    <div className="col-lg-12">
                      <Box
                        className="single_field sort-btn"
                        sx={{ minWidth: 120 }}
                      >
                        <FormControl fullWidth>
                          <NativeSelect
                            className="wide"
                            value={selectedLocation}
                            onChange={(e) =>
                              setSelectedLocation(e.target.value)
                            }
                            inputProps={{
                              name: "location",
                              id: "location-select",
                            }}
                          >
                            <option value="" disabled>
                              Chọn khu vực
                            </option>
                            {jobCategories.locations.map((location, index) => (
                              <option key={index} value={location}>
                                {location}
                              </option>
                            ))}
                          </NativeSelect>
                        </FormControl>
                      </Box>
                    </div>
                    <div className="col-lg-12">
                      <Box
                        className="single_field sort-btn"
                        sx={{ minWidth: 120 }}
                      >
                        <FormControl fullWidth>
                          <NativeSelect
                            className="wide"
                            value={selectedIndustry}
                            onChange={(e) =>
                              setSelectedIndustry(e.target.value)
                            }
                            inputProps={{
                              name: "industry",
                              id: "industry-select",
                            }}
                          >
                            <option value="" disabled>
                              Chọn ngành/nghề
                            </option>
                            {jobCategories.industries.map((industry, index) => (
                              <option key={index} value={industry}>
                                {industry}
                              </option>
                            ))}
                          </NativeSelect>
                        </FormControl>
                      </Box>
                    </div>
                    <div className="col-lg-12">
                      <Box
                        className="single_field sort-btn"
                        sx={{ minWidth: 120 }}
                      >
                        <FormControl fullWidth>
                          <NativeSelect
                            className="wide"
                            value={selectedPosition}
                            onChange={(e) =>
                              setSelectedPosition(e.target.value)
                            }
                            inputProps={{
                              name: "position",
                              id: "position-select",
                            }}
                          >
                            <option value="" disabled>
                              Chọn vị trí
                            </option>
                            {jobCategories.positions.map((position, index) => (
                              <option key={index} value={position}>
                                {position}
                              </option>
                            ))}
                          </NativeSelect>
                        </FormControl>
                      </Box>
                    </div>
                  </div>
                </form>
              </div>
              <div className="reset_btn">
                <button
                  className="boxed-btn3 w-100"
                  onClick={() => {
                    setSearchKeyword("");
                    setSelectedWorkType("");
                    setSelectedLocation("");
                    setSelectedIndustry("");
                    setSelectedPosition("");
                    setPage(0);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
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
                    <h4>Job Listing</h4>
                    <div className="single_field sr-input">
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
                {jobs?.length > 0 ? (
                  <>
                    {jobs.map((job, i) => (
                      <JobListingCard
                        isAdmin={isAdmin}
                        key={i}
                        job={job}
                      ></JobListingCard>
                    ))}
                  </>
                ) : (
                  <h2>Không tìm thấy kết quả tương ứng!</h2>
                )}
                {/* Repeat similar structure for more job listings */}
              </div>
            </div>

            <div className="pagination_wrap">
              {/* <ul>
                <li>
                  <a href="#">
                    {" "}
                    <i className="ti-angle-left"></i>{" "}
                  </a>
                </li>
                <li>
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">
                    {" "}
                    <i className="ti-angle-right"></i>{" "}
                  </a>
                </li>
              </ul> */}

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

export default JobListingArea;
