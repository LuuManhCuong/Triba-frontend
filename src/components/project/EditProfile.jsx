import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { accountSlice } from "../../redux-tookit/reducer/accountSlice";
import { counterSlice } from "../../redux-tookit/reducer/counterSlice";
import { ToastContainer, toast } from "react-toastify";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    ...user,
    password: "",
    avatarFile: null,
    coverImgFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    // console.log("phone: ", profile);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === "avatar") {
          setProfile({ ...profile, avatarFile: file, avatar: reader.result });
        } else if (type === "coverImg") {
          setProfile({
            ...profile,
            coverImgFile: file,
            coverImg: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (profile?.password.length <= 0) {
      toast.warn("Vui lòng nhập mật khẩu mới");
      return;
    }

    const uploadPromises = [];
    if (profile.avatarFile) {
      uploadPromises.push(uploadImage(profile.avatarFile));
    } else {
      uploadPromises.push(Promise.resolve(null));
    }

    if (profile.coverImgFile) {
      uploadPromises.push(uploadImage(profile.coverImgFile));
    } else {
      uploadPromises.push(Promise.resolve(null));
    }

    Promise.all(uploadPromises)
      .then(([avatarUrl, coverImgUrl]) => {
        const updatedProfile = {
          ...profile,
          avatar: avatarUrl || profile.avatar,
          coverImg: coverImgUrl || profile.coverImg,
        };
        updateProfile(updatedProfile);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  };

  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "mpght0dj"); // Replace with your upload preset

      axios
        .post("https://api.cloudinary.com/v1_1/djcamu6kz/upload", formData)
        .then((response) => {
          resolve(response.data.secure_url);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const updateProfile = (updatedProfile) => {
    const userId = localStorage.getItem("userId");
    axios
      .patch(
        `http://localhost:8080/api/v1/user/update/${userId}`,
        updatedProfile
      )
      .then((response) => {
        // console.log("Update successful:", response.data);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("role", response.data.user.role);

        dispatch(accountSlice.actions.login(response.data));
        dispatch(counterSlice.actions.increase());
        toast.success("Cập nhật thông tin thành công");
      })
      .catch((error) => {
        console.error("Update failed:", error);
        toast.error("Email này đã được sử dụng!");
      });
  };

  return (
    <div className="edit-profile">
      <ToastContainer />

      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                <img
                  //   className=" mt-5"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "500px",
                    border: "1px solid var(--primary-color)",
                  }}
                  src={profile?.avatar}
                  alt="Profile"
                />
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, "avatar")}
              />
              <span className="text-black-50">Change Avatar</span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name="firstName"
                    value={profile?.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={profile?.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Introduce</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="slogan"
                    value={profile?.slogan}
                    onChange={handleChange}
                    placeholder="Introduce Myself"
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    value={profile?.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={profile?.address}
                    onChange={handleChange}
                    placeholder="Enter Address"
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={profile?.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                  onClick={handleSubmit}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <label
                  htmlFor="cvInput"
                  className="border px-3 p-1 add-experience"
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa fa-plus"></i>&nbsp;Upload CV Image
                </label>
                <input
                  type="file"
                  id="cvInput"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, "coverImg")}
                />
              </div>
              <br />
              <div className="col-md-12 text-center">
                <label htmlFor="cvInput" style={{ cursor: "pointer" }}>
                  <img
                    className="rounded mt-3"
                    width="150px"
                    src={profile?.coverImg}
                    alt="CV"
                    style={{ height: "142px", objectFit: "contain" }}
                  />
                </label>
              </div>
              <div className="col-md-12">
                <label className="labels">Experience</label>
                <input
                  type="text"
                  className="form-control"
                  name="experience"
                  value={profile?.experience}
                  onChange={handleChange}
                  placeholder="Experience"
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Education</label>
                <input
                  type="text"
                  className="form-control"
                  name="education"
                  value={profile?.education}
                  onChange={handleChange}
                  placeholder="Education"
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={profile?.password}
                  onChange={handleChange}
                  placeholder="password"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
