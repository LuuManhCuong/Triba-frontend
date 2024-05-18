import React, { useState } from "react";
import "./category.scss";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Button from "@mui/material/Button";

const jobCategories = {
  industries: [
    "Công nghệ thông tin (IT)",
    "Kế toán / Kiểm toán",
    "Nhân sự",
    "Marketing / Quảng cáo",
    "Kinh doanh / Bán hàng",
    "Giáo dục / Đào tạo",
    "Y tế / Dược phẩm",
    "Sản xuất / Vận hành sản xuất",
    "Logistics / Chuỗi cung ứng",
    "Xây dựng",
    "Khách sạn / Nhà hàng",
    "Ngân hàng / Tài chính",
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
  const [selectedWorkType, setSelectedWorkType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [jobs, setJobs] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `http://localhost:8080/api/v1/user/job/filter?industryName=${selectedIndustry}&positionName=${selectedPosition}&locationName=${selectedLocation}&workTypeName=${selectedWorkType}`
    );
    const data = await response.json();
    setJobs(data);
  };

  console.log("data job: ", jobs);

  return (
    <div className="categories">
      <div className="cate-list">
        <div className="cate button-btn">
          <h3>Tất cả</h3>
        </div>
        <div className="cate button-btn">
          <h3>Việc nhanh</h3>
        </div>
        <div className="cate button-btn">
          <h3>Tuyển dụng</h3>
        </div>
      </div>

      <div className="filter">
        <form onSubmit={handleSubmit}>
          <div className="sort">
            <Box className="sort-btn" sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="work-type-select">
                  Loại hình
                </InputLabel>
                <NativeSelect
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
            <Box className="sort-btn" sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="location-select">
                  Khu vực
                </InputLabel>
                <NativeSelect
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
            <Box className="sort-btn" sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="industry-select">
                  Ngành/Nghề
                </InputLabel>
                <NativeSelect
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
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
            <Box className="sort-btn" sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="position-select">
                  Vị trí
                </InputLabel>
                <NativeSelect
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
          </div>
          <Button type="submit" variant="contained" color="primary">
            Tìm kiếm
          </Button>
        </form>
      </div>
      <div className="job-results">
        {jobs.map((job) => (
          <div key={job.jobId} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>{job.companyName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
