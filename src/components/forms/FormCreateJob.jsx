import React, { useEffect, useState } from "react";
import "./form.scss";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { LinearProgress } from "@mui/material";

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
const initialFormData = {
  userId: "ffe9aa45-f655-45d4-a8ec-fd9794751c14",
  title: "công Việc filter",
  description: "Mô tả test 10",
  image: "URL của image",
  companyName: "Tên công ty",
  logo: "URL của logo",
  address: "Địa chỉ công ty",
  salary: 10000000,
  budget: 20000000,
  quantity: 5,
  category: "Danh mục công việc",
  createAt: "2023-05-16",
  updateAt: "2023-05-16",
  deadline: "2023-06-16",
  hastag: "Hashtag",
  industryIds: ["3"],
  positionIds: ["3"],
  locationIds: ["3"],
  workTypeIds: ["3"],
};

function FromCreateJob({ jobEdit }) {
  // console.log("jobEdit: ", jobEdit);

  const [selectedWorkType, setSelectedWorkType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [preview, setPreview] = useState();

  const [formData, setFormData] = useState(() => {
    var dataEdit;
    if (jobEdit) {
      const imageUrls = jobEdit.images.map((image) => image.url);
      setPreview(imageUrls);
      dataEdit = {
        title: jobEdit.title,
        description: jobEdit.description,
        address: jobEdit.address,
        salary: jobEdit.salary,
        // images: imageUrls,
      };
      return dataEdit;
    }
  });
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (jobEdit) {
      // Lấy ra tên của các industries
      const industryNames = jobEdit.industries.map((industry) => industry.name);
      // console.log("Industry Names:", industryNames);

      // Lấy ra tên của các locations
      const locationNames = jobEdit.locations.map((location) => location.name);
      // console.log("Location Names:", locationNames);

      // Lấy ra tên của các positions
      const positionNames = jobEdit.positions.map((position) => position.name);
      // console.log("Position Names:", positionNames);

      const worktypeNames = jobEdit.workTypes.map((workType) => workType.name);
      // console.log("Position Names:", worktypeNames);

      setSelectedWorkType(worktypeNames);
      setSelectedLocation(locationNames);
      setSelectedIndustry(industryNames);
      setSelectedPosition(positionNames);
    }
  }, [jobEdit]);

  const handleWorkTypeChange = (e) => {
    // console.log("id: ", e.target);
    const { value, checked } = e.target;
    if (checked) {
      if (selectedWorkType.length < 2) {
        setSelectedWorkType([...selectedWorkType, value]);
      } else {
        // Remove the first selected item and add the new one
        const newSelectedWorkType = [...selectedWorkType.slice(1), value];
        setSelectedWorkType(newSelectedWorkType);
      }
    } else {
      setSelectedWorkType(selectedWorkType.filter((type) => type !== value));
    }
  };

  const handleLocationChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (selectedLocation.length < 2) {
        setSelectedLocation([...selectedLocation, value]);
      } else {
        // Remove the first selected item and add the new one
        const newSelectedLocation = [...selectedLocation.slice(1), value];
        setSelectedLocation(newSelectedLocation);
      }
    } else {
      setSelectedLocation(selectedLocation.filter((type) => type !== value));
    }
  };

  const handleIndustryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (selectedIndustry.length < 3) {
        setSelectedIndustry([...selectedIndustry, value]);
      } else {
        // Remove the first selected item and add the new one
        const newSelectedIndustry = [...selectedIndustry.slice(1), value];
        setSelectedIndustry(newSelectedIndustry);
      }
    } else {
      setSelectedIndustry(selectedIndustry.filter((type) => type !== value));
    }
  };

  const handlePositionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (selectedPosition.length < 3) {
        setSelectedPosition([...selectedPosition, value]);
      } else {
        // Remove the first selected item and add the new one
        const newSelectedPosition = [...selectedPosition.slice(1), value];
        setSelectedPosition(newSelectedPosition);
      }
    } else {
      setSelectedPosition(selectedPosition.filter((type) => type !== value));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleimageChange = (e) => {
    const imgfiles = Array.from(e.target.files);
    setImages(imgfiles);

    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      const imageUrls = fileList.map((file) => URL.createObjectURL(file));
      // Tạo một mảng chứa URL của các file ảnh
      setPreview(imageUrls);
    }
  };
  useEffect(() => {
    setFormData({
      ...formData,
      industries: selectedIndustry,
      locations: selectedLocation,
      positions: selectedPosition,
      workTypes: selectedWorkType,
    });
  }, [selectedIndustry, selectedLocation, selectedPosition, selectedWorkType]);
  // console.log("urls: ", urls);
  const uploadImages = () => {
    return new Promise((resolve, reject) => {
      const uploaders = images.map((image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "mpght0dj"); // Replace with your upload preset

        return axios
          .post(
            "https://api.cloudinary.com/v1_1/djcamu6kz/upload", // Replace with your cloud name
            formData
          )
          .then((response) => response.data.secure_url)
          .catch((error) => {
            console.error("Error uploading image:", error);
            return null;
          });
      });

      Promise.all(uploaders)
        .then((results) => {
          const validUrls = results.filter((url) => url !== null);
          setUrls((prevUrls) => [...prevUrls, ...validUrls]);
          resolve(validUrls);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleAddJob = () => {
    setIsLoading(true);
    uploadImages()
      .then((urls) => {
        // console.log("Uploaded URLs: ", urls);
        const token = localStorage.getItem("access_token");
        const owerId = localStorage.getItem("userId");
        const sendData = { ...formData, images: urls, ownerId: owerId };
        console.log("Data:", sendData);
        // Gửi dữ liệu lên server

        console.log("token: ", token);
        // Kiểm tra xem token có tồn tại không
        if (!token) {
          console.error("Token is not available.");
          return;
        }

        // Thêm token vào headers của yêu cầu
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Gửi dữ liệu lên server với token đã được xác thực
        axios
          .post("http://localhost:8080/api/v1/user/job/add", sendData, config)
          .then((response) => {
            console.log("Response from server:", response.data);
            // Xử lý phản hồi từ server tại đây nếu cần
            setIsLoading(false);
            toast.success("Đăng bài thành công", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate(`/personal?activePr=${1}`);
          })
          .catch((error) => {
            setIsLoading(false);

            console.error("Error sending data to server:", error);
          });
      })
      .catch((error) => {
        setIsLoading(false);

        console.error("Error in handleAddJob:", error);
      });
  };

  const handleUpdateJob = () => {
    setIsLoading(true);
    uploadImages()
      .then((urls) => {
        // console.log("Uploaded URLs: ", urls);
        const token = localStorage.getItem("access_token");
        const owerId = localStorage.getItem("userId");
        const sendData = { ...formData, images: urls, ownerId: owerId };
        console.log("Data:", sendData);
        // Gửi dữ liệu lên server

        console.log("token: ", token);
        // Kiểm tra xem token có tồn tại không
        if (!token) {
          console.error("Token is not available.");
          return;
        }

        // Thêm token vào headers của yêu cầu
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Gửi dữ liệu lên server với token đã được xác thực
        axios
          .post(
            `http://localhost:8080/api/v1/user/job/update/${jobEdit.jobId} `,
            sendData,
            config
          )
          .then((response) => {
            console.log("Response from server:", response.data);
            // Xử lý phản hồi từ server tại đây nếu cần
            setIsLoading(false);
            toast.success("Cập nhật bài đăng thành công", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate(`/personal`);
          })
          .catch((error) => {
            setIsLoading(false);

            console.error("Error sending data to server:", error);
          });
      })
      .catch((error) => {
        setIsLoading(false);

        console.error("Error in handleAddJob:", error);
      });
  };
  return (
    <div className="layout-wrapper layout-content-navbar">
      <Modal
        className="moda"
        show={isLoading}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <LinearProgress />
        </Modal.Body>
      </Modal>

      <ToastContainer />

      <div className="layout-container">
        <div className="layout-page">
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-xxl">
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="reservation-form">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-12">
                              <form
                                id="reservation-form"
                                name="gs"
                                method="submit"
                                role="search"
                                action="#"
                              >
                                <div className="row">
                                  <div className="col-lg-12">
                                    <h4>
                                      Join our team and embark on an exciting
                                      journey of growth and opportunity.
                                    </h4>
                                  </div>
                                  <div className="col-lg-6">
                                    <fieldset>
                                      <label
                                        htmlFor="Name"
                                        className="form-label"
                                      >
                                        Title
                                      </label>

                                      <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        placeholder={jobEdit?.title}
                                        value={formData?.title}
                                        onChange={handleChange}
                                      />
                                    </fieldset>
                                  </div>
                                  <div className="col-lg-6">
                                    <fieldset>
                                      <label
                                        htmlFor="Number"
                                        className="form-label"
                                      >
                                        Address
                                      </label>
                                      <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        placeholder={jobEdit?.address}
                                        value={formData?.address}
                                        onChange={handleChange}
                                      />
                                    </fieldset>
                                  </div>

                                  <div className="col-lg-6">
                                    <fieldset>
                                      <label
                                        htmlFor="Number"
                                        className="form-label"
                                      >
                                        Budget ($)
                                      </label>
                                      <input
                                        required
                                        type="number"
                                        className="form-control"
                                        id="salary"
                                        name="salary"
                                        placeholder={jobEdit?.salary}
                                        value={formData?.salary}
                                        onChange={handleChange}
                                      />
                                    </fieldset>
                                  </div>
                                  {/* <div className="col-lg-6">
                                    <fieldset>
                                      <label
                                        htmlFor="chooseGuests"
                                        className="form-label"
                                      >
                                        Budget
                                      </label>
                                      <select
                                        name="Guests"
                                        className="form-select"
                                        aria-label="Default select example"
                                        id="chooseGuests"
                                        onChange="this.form.click()"
                                      >
                                        <option selected>
                                          ex. 3 or 4 or 5
                                        </option>
                                        <option
                                          type="checkbox"
                                          name="option1"
                                          value="1"
                                        >
                                          1
                                        </option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4+">4+</option>
                                      </select>
                                    </fieldset>
                                  </div> */}
                                  <div className="col-lg-6">
                                    <fieldset>
                                      <label
                                        htmlFor="Number"
                                        className="form-label"
                                      >
                                        Deadline Appyly
                                      </label>
                                      <input
                                        type="date"
                                        name="date"
                                        className="date"
                                        required
                                      />
                                    </fieldset>
                                  </div>

                                  <div className="col-lg-12">
                                    <fieldset>
                                      <label
                                        htmlFor="chooseDestination"
                                        className="form-label"
                                      >
                                        Description
                                      </label>
                                      <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        placeholder={jobEdit?.description}
                                        value={formData?.description}
                                        onChange={handleChange}
                                      ></textarea>
                                      {/* <select
                                        name="Destination"
                                        className="form-select"
                                        aria-label="Default select example"
                                        id="chooseCategory"
                                        onChange="this.form.click()"
                                      >
                                        <option selected>
                                          ex. Switzerland, Lausanne
                                        </option>
                                        <option value="Italy, Roma">
                                          Italy, Roma
                                        </option>
                                        <option value="France, Paris">
                                          France, Paris
                                        </option>
                                        <option value="Engaland, London">
                                          Engaland, London
                                        </option>
                                        <option value="Switzerland, Lausanne">
                                          Switzerland, Lausanne
                                        </option>
                                      </select> */}
                                    </fieldset>
                                  </div>

                                  <div className="col-lg-12">
                                    <fieldset>
                                      <label
                                        htmlFor="chooseDestination"
                                        className="form-label"
                                      >
                                        Images
                                      </label>
                                      <input
                                        required
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        name="image"
                                        onChange={handleimageChange}
                                        multiple // Cho phép chọn nhiều file
                                      />
                                    </fieldset>
                                  </div>
                                  <div className="img-preview-wrap">
                                    {preview &&
                                      preview?.map((image, index) => (
                                        <img
                                          key={index}
                                          src={image}
                                          alt={`image Preview`}
                                          className="img-preview"
                                        />
                                      ))}
                                  </div>
                                  {/* <div className="col-lg-12">
                                    <fieldset>
                                      <button className="main-button">
                                        Hiring Now
                                      </button>
                                    </fieldset>
                                  </div> */}
                                </div>
                              </form>
                              <Row className="select-cate">
                                <Col xs={3} className="cate-item">
                                  Category ({selectedWorkType?.length} / 2)
                                  <div className="cate-item-h">
                                    {jobCategories.workTypes.map(
                                      (type, index) => (
                                        <div className="form-check" key={index}>
                                          <input
                                            required
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`workType-${index}`}
                                            value={type}
                                            checked={selectedWorkType.includes(
                                              type
                                            )}
                                            onChange={handleWorkTypeChange}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`workType-${index}`}
                                          >
                                            {type}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Col>

                                <Col xs={3} className="cate-item">
                                  Region ({selectedLocation?.length} / 2)
                                  <div className="cate-item-h">
                                    {jobCategories.locations.map(
                                      (type, index) => (
                                        <div className="form-check" key={index}>
                                          <input
                                            required
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`location-${index}`}
                                            value={type}
                                            checked={selectedLocation.includes(
                                              type
                                            )}
                                            onChange={handleLocationChange}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`location-${index}`}
                                          >
                                            {type}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Col>

                                <Col xs={3} className="cate-item">
                                  Industry ({selectedIndustry?.length} / 3)
                                  <div className="cate-item-h">
                                    {jobCategories.industries.map(
                                      (type, index) => (
                                        <div className="form-check" key={index}>
                                          <input
                                            required
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`industry-${index}`}
                                            value={type}
                                            checked={selectedIndustry.includes(
                                              type
                                            )}
                                            onChange={handleIndustryChange}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`industry-${index}`}
                                          >
                                            {type}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Col>
                                <Col xs={3} className="cate-item">
                                  Position ({selectedPosition?.length} / 3 )
                                  <div className="cate-item-h">
                                    {jobCategories.positions.map(
                                      (type, index) => (
                                        <div className="form-check" key={index}>
                                          <input
                                            required
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`position-${index}`}
                                            value={type}
                                            checked={selectedPosition.includes(
                                              type
                                            )}
                                            onChange={handlePositionChange}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`position-${index}`}
                                          >
                                            {type}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row justify-content-end">
                        <div className="col-sm-12">
                          {jobEdit ? (
                            <button
                              className="btn btn-post"
                              onClick={() => handleUpdateJob()}
                            >
                              Update post
                            </button>
                          ) : (
                            <button
                              className="btn btn-post"
                              onClick={() => handleAddJob()}
                            >
                              Post
                            </button>
                          )}
                        </div>
                      </div>
                      {/* ---------------------------------------------------- */}
                      {/* <div>
                        <div className="row mb-3">
                          <label
                            className="col-sm-2 col-form-label"
                            htmlFor="title"
                          >
                            Tiêu đề
                          </label>
                          <div className="col-sm-10">
                            <input
                              required
                              type="text"
                              className="form-control"
                              id="title"
                              name="title"
                              placeholder={jobEdit?.title}
                              value={formData?.title}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            className="col-sm-2 col-form-label"
                            htmlFor="description"
                          >
                            Mô tả công việc
                          </label>
                          <div className="col-sm-10">
                            <textarea
                              className="form-control"
                              id="description"
                              name="description"
                              placeholder={jobEdit?.description}
                              value={formData?.description}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            className="col-sm-2 col-form-label"
                            htmlFor="address"
                          >
                            Địa chỉ cụ thể
                          </label>
                          <div className="col-sm-10">
                            <input
                              required
                              type="text"
                              className="form-control"
                              id="address"
                              name="address"
                              placeholder={jobEdit?.address}
                              value={formData?.address}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            className="col-sm-2 col-form-label"
                            htmlFor="salary"
                          >
                            Mức lương
                          </label>
                          <div className="col-sm-10">
                            <input
                              required
                              type="number"
                              className="form-control"
                              id="salary"
                              name="salary"
                              placeholder={jobEdit?.salary}
                              value={formData?.salary}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            className="col-sm-2 col-form-label"
                            htmlFor="image"
                          >
                            Hình ảnh
                          </label>
                          <div className="col-sm-10">
                            <input
                              required
                              type="file"
                              className="form-control"
                              id="image"
                              name="image"
                              onChange={handleimageChange}
                              multiple // Cho phép chọn nhiều file
                            />
                          </div>
                        </div>

                        <div className="img-preview-wrap">
                          {preview &&
                            preview?.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`image Preview`}
                                className="img-preview"
                              />
                            ))}
                        </div>

                        <Row className="select-cate">
                          <Col xs={3} className="cate-item">
                            Danh mục ({selectedWorkType?.length} / 2)
                            <div className="cate-item-h">
                              {jobCategories.workTypes.map((type, index) => (
                                <div className="form-check" key={index}>
                                  <input
                                    required
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`workType-${index}`}
                                    value={type}
                                    checked={selectedWorkType.includes(type)}
                                    onChange={handleWorkTypeChange}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`workType-${index}`}
                                  >
                                    {type}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Col>

                          <Col xs={3} className="cate-item">
                            Khu vực ({selectedLocation?.length} / 2)
                            <div className="cate-item-h">
                              {jobCategories.locations.map((type, index) => (
                                <div className="form-check" key={index}>
                                  <input
                                    required
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`location-${index}`}
                                    value={type}
                                    checked={selectedLocation.includes(type)}
                                    onChange={handleLocationChange}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`location-${index}`}
                                  >
                                    {type}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Col>

                          <Col xs={3} className="cate-item">
                            Ngành nghề ({selectedIndustry?.length} / 3)
                            <div className="cate-item-h">
                              {jobCategories.industries.map((type, index) => (
                                <div className="form-check" key={index}>
                                  <input
                                    required
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`industry-${index}`}
                                    value={type}
                                    checked={selectedIndustry.includes(type)}
                                    onChange={handleIndustryChange}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`industry-${index}`}
                                  >
                                    {type}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Col>
                          <Col xs={3} className="cate-item">
                            Vị trí ({selectedPosition?.length} / 3 )
                            <div className="cate-item-h">
                              {jobCategories.positions.map((type, index) => (
                                <div className="form-check" key={index}>
                                  <input
                                    required
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`position-${index}`}
                                    value={type}
                                    checked={selectedPosition.includes(type)}
                                    onChange={handlePositionChange}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`position-${index}`}
                                  >
                                    {type}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Col>
                        </Row>

                        <div className="row justify-content-end">
                          <div className="col-sm-10">
                            {jobEdit ? (
                              <button
                                className="btn btn-post"
                                onClick={() => handleAddJob()}
                              >
                                Update post
                              </button>
                            ) : (
                              <button
                                className="btn btn-post"
                                onClick={() => handleAddJob()}
                              >
                                Post
                              </button>
                            )}
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
  );
}

export default FromCreateJob;
