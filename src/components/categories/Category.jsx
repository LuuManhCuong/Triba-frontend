import React, { useCallback, useEffect, useState } from "react";
import "./category.scss";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Button from "@mui/material/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { filterSlice } from "../../redux-tookit/reducer/filterSclice";
import { BiSolidLeftDownArrowCircle } from "react-icons/bi";
import { counterSlice } from "../../redux-tookit/reducer/counterSlice";

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
function Category() {
  const dispatch = useDispatch();
  const [selectedWorkType, setSelectedWorkType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      filterSlice.actions.filter({
        selectedIndustry,
        selectedLocation,
        selectedPosition,
        selectedWorkType,
      })
    );
  };

  useEffect(() => {
    dispatch(counterSlice.actions.increase());
    dispatch(
      filterSlice.actions.filter({
        selectedIndustry,
        selectedLocation,
        selectedPosition,
        selectedWorkType,
      })
    );

    if (
      selectedIndustry ||
      selectedLocation ||
      selectedPosition ||
      selectedWorkType
    ) {
      const formData = {
        userId: localStorage.getItem("userId"), // Thay thế 'YourUserId' bằng giá trị thực tế
        keySearch: "", // Thêm các trường dữ liệu khác nếu cần
        industries: selectedIndustry,
        positions: selectedPosition,
        locations: selectedLocation,
        workTypes: selectedWorkType,
      };
      // console.log("send search: ", formData);
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
  }, [selectedIndustry, selectedLocation, selectedPosition, selectedWorkType]);

  function handleSearch() {
    // Make an HTTP GET request to the backend API endpoint
    if (searchKeyword?.length > 0) {
      dispatch(
        filterSlice.actions.filter({
          selectedIndustry,
          selectedLocation,
          selectedPosition,
          selectedWorkType,
          searchKeyword,
        })
      );
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
          // console.log("res: ", response.data);
          dispatch(counterSlice.actions.descrease());
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error);
        });
    }

    setSelectedWorkType("");
    setSelectedLocation("");
    setSelectedIndustry("");
    setSelectedPosition("");
  }

  return (
    <div className="categories">
      {/* <div className="cate-list">
        <div
          className="cate button-btn"
          onClick={() => setSelectedWorkType("tất cả")}
        >
          <h3>Tất cả</h3>
        </div>
        {jobCategories.workTypes.map((type, index) => (
          <div
            className="cate button-btn"
            key={index}
            onClick={() => setSelectedWorkType(type)}
          >
            <h3>{type}</h3>
          </div>
        ))}
      </div> */}

      <div className="filter">
        <form onSubmit={handleSubmit}>
          <div className="sort">
            <Button
              onClick={() => {
                setSelectedWorkType("");
                setSelectedIndustry("");
                setSelectedLocation("");
                setSelectedPosition("");
                setSearchKeyword("");
                dispatch(filterSlice.actions.filter({ searchKeyword }));
              }}
              variant="contained"
              style={{
                background: "rgb(34 179 193)",
                color: "white",
                margin: "0 5px",
              }}
            >
              Refresh
            </Button>
            <Box className=" single_field sort-btn" sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <NativeSelect
                  className="wide"
                  value={selectedWorkType}
                  onChange={(e) => setSelectedWorkType(e.target.value)}
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
            <Box className=" single_field sort-btn" sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <NativeSelect
                  className="wide"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
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
            <Box className=" single_field sort-btn" sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <NativeSelect
                  className="wide"
                  value={selectedLocation}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  inputProps={{
                    name: "industry",
                    id: "industry-select",
                  }}
                >
                  <option value="" disabled>
                    Chọn Lĩnh Vực
                  </option>
                  {jobCategories.industries.map((indusry, index) => (
                    <option key={index} value={indusry}>
                      {indusry}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Box>
            <Box className=" single_field sort-btn" sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <NativeSelect
                  className="wide"
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
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

            <Box className=" single_field sort-btn" sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <input
                  className="wide"
                  type="text"
                  value={searchKeyword}
                  placeholder="Search..."
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </FormControl>
            </Box>
            <Button
              type="submit"
              variant="contained"
              style={{ background: "rgb(34 179 193)" }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Category;
