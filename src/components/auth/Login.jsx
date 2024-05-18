import React, { useState } from "react";
import "./auth.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { accountSelector } from "../../redux-tookit/selector";
import { accountSlice } from "../../redux-tookit/reducer/accountSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account } = useSelector(accountSelector);
  const [formActive, setFormActive] = useState(false);
  const [logErr, setLogErr] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  console.log("account: ", account);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    if (data.password === data.confirm) {
      setLogErr("");
      console.log("data: ", data);
      axios
        .post("http://localhost:8080/api/v1/auth/sigup", data)
        .then(function (response) {
          console.log("Response:", response.data);
        })
        .then(() => {
          setFormActive(!formActive);
        })
        .then(() => {
          toast.success("Đăng ký thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch(function (error) {
          toast.error("Đăng ký thất bại", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else {
      setLogErr("Mật khẩu xác thực chưa đúng");
    }
  };

  function onLogin() {
    console.log(email, password);

    if (email?.trim() === undefined && password?.trim() === undefined) {
      setEmail("");
      setPassword("");
      console.log("here", email?.trim(), password?.trim());
    } else {
      let account = { email, password };
      console.log("acoutn", account);
      axios
        .post("http://localhost:8080/api/v1/auth/sigin", account)
        .then(function (response) {
          console.log("Response:", response.data);
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          dispatch(accountSlice.actions.login(response.data));
        })
        .then(() => {
          navigate(`/`);
        })

        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <div className={formActive ? "login-wrap active-bg" : "login-wrap "}>
      <ToastContainer />
      <div className="container-login">
        <div className="primary-bg">
          <div className="box signin">
            <h2>Already Have an Account?</h2>
            <button
              onClick={() => setFormActive(!formActive)}
              className="signinBtn"
            >
              Đăng nhập
            </button>
          </div>

          <div className="box signup">
            <h2>Bạn chưa có tài khoản?</h2>
            <button
              onClick={() => setFormActive(!formActive)}
              className="signupBtn"
            >
              Đăng ký
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------------------------ */}
        <div className={formActive ? "formBx active" : "formBx"}>
          <div className="form signinForm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onLogin();
              }}
            >
              <h3>Sign In</h3>
              <span className="check-err-login"></span>
              <div className="form-group">
                <div>
                  <div>
                    {email?.trim() <= 0 ? (
                      <span
                        style={{
                          color: "red",
                          marginLeft: "10spanx",
                          marginTop: "5px",
                        }}
                        role="alert"
                      >
                        Email is required
                      </span>
                    ) : (
                      <span style={{ color: "green", fontSize: "1.2rem" }}>
                        Email
                      </span>
                    )}
                    <input
                      name="username"
                      id="user-name"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin"
                    />
                  </div>
                </div>
                <span className="form-message"></span>
              </div>
              <div className="form-group">
                {password?.trim() <= 0 ? (
                  <span
                    style={{
                      color: "red",
                      marginLeft: "10spanx",
                      marginTop: "5px",
                    }}
                    role="alert"
                  >
                    Password is required
                  </span>
                ) : (
                  <span style={{ color: "green", fontSize: "1.2rem" }}>
                    Password
                  </span>
                )}
                <input
                  name="password"
                  id="user-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin"
                />
                <span className="form-message"></span>
              </div>
              <div className="form-group">
                <button className="form-submit" type="submit">
                  Submit
                </button>
              </div>

              <a href="#" className="forgot">
                Forgot Password
              </a>
            </form>
          </div>

          {/* ----------------------------------------------------------------------------- */}
          <div className="form signupForm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3>Đăng ký</h3>
              <span className="check-err-newuser"></span>
              <span className="check-success-newuser"></span>

              <div className="form-group">
                {errors.firstName?.type === "required" ? (
                  <span
                    style={{
                      color: "red",
                      marginLeft: "10spanx",
                      marginTop: "5px",
                    }}
                    role="alert"
                  >
                    First name is required
                  </span>
                ) : (
                  <span style={{ color: "green", fontSize: "1.2rem" }}>
                    FirstName
                  </span>
                )}

                <input
                  name="FirstName"
                  id="FirstName"
                  type="text"
                  placeholder="FirstName"
                  {...register("firstName", { required: true, maxLength: 10 })}
                />
              </div>
              <div className="form-group">
                {errors.lastName?.type === "required" ? (
                  <span
                    style={{
                      color: "red",
                      marginLeft: "10spanx",
                      marginTop: "5px",
                    }}
                    role="alert"
                  >
                    Last name is required
                  </span>
                ) : (
                  <span style={{ color: "green", fontSize: "1.2rem" }}>
                    LastName
                  </span>
                )}
                <input
                  name="LastName"
                  id="LastName"
                  type="text"
                  placeholder="LastName"
                  {...register("lastName", { required: true, maxLength: 20 })}
                />
                <span className="form-message"></span>
              </div>
              <div className="form-group">
                {errors.email?.type === "required" ? (
                  <span
                    style={{
                      color: "red",
                      marginLeft: "10spanx",
                      marginTop: "5px",
                    }}
                    role="alert"
                  >
                    Email is required
                  </span>
                ) : (
                  <span style={{ color: "green", fontSize: "1.2rem" }}>
                    Email
                  </span>
                )}

                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email address"
                  required
                  {...register("email", { required: true })}
                />
                <span className="form-message check-email"></span>
              </div>
              <div className="form-group">
                {errors.password?.type === "required" ? (
                  <span
                    style={{
                      color: "red",
                      marginLeft: "10spanx",
                      marginTop: "5px",
                    }}
                    role="alert"
                  >
                    Password is required
                  </span>
                ) : (
                  <span style={{ color: "green", fontSize: "1.2rem" }}>
                    Password
                  </span>
                )}
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <span className="form-message"></span>
              </div>
              <div className="form-group">
                {errors.confirm?.type === "required" ? (
                  <span
                    style={{
                      color: "red",
                      marginLeft: "10spanx",
                      marginTop: "5px",
                    }}
                    role="alert"
                  >
                    Confirm password is required
                  </span>
                ) : logErr !== "" ? (
                  <span
                    style={{
                      color: "red",
                      marginLeft: "10spanx",
                      marginTop: "5px",
                    }}
                    role="alert"
                  >
                    {logErr}
                  </span>
                ) : (
                  <span style={{ color: "green", fontSize: "1.2rem" }}>
                    Confirm password
                  </span>
                )}
                <input
                  name="confirm-password"
                  id="confirm-user-password"
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirm", { required: true })}
                />
                <span className="form-message"></span>
              </div>
              <div className="form-group">
                <button className="form-submit">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
