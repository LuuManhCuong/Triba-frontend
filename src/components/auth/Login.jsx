import React, { useState } from "react";
import "./auth.scss";

function Login() {
  const [formActive, setFormActive] = useState(false);

  return (
    <div className={formActive ? "login-wrap active-bg" : "login-wrap "}>
      <div className="container-login">
        <div className="primary-bg">
          <div className="title-note">
            Truy cập bằng máy tính để có trải nghiệm tốt hơn:
          </div>
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
        <div className={formActive ? "formBx active" : "formBx"}>
          <div className="form signinForm">
            <form>
              <h3>Sign In</h3>
              <span className="check-err-login"></span>
              <div className="form-group">
                <div>
                  <div>
                    <input
                      name="username"
                      id="user-name"
                      type="text"
                      placeholder="Username: admin"
                    />
                  </div>
                </div>
                <span className="form-message"></span>
              </div>
              <div className="form-group">
                <input
                  name="password"
                  id="user-password"
                  type="password"
                  placeholder="Password: admin"
                />
                <span className="form-message"></span>
              </div>
              <div className="form-group">
                <button className="form-submit">Submit</button>
              </div>

              <a href="#" className="forgot">
                Forgot Password
              </a>
            </form>
          </div>

          <div className="form signupForm">
            <form action="">
              <h3>Sign Up</h3>
              <span className="check-err-newuser"></span>
              <span className="check-success-newuser"></span>

              <div className="form-group">
                <input
                  name="username"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
                <span className="form-message"></span>
              </div>
              <div className="form-group">
                <input
                  name="email"
                  id="email"
                  type="text"
                  placeholder="Email address"
                />
                <span className="form-message check-email"></span>
              </div>
              <div className="form-group">
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                />
                <span className="form-message"></span>
              </div>
              <div className="form-group">
                <input
                  name="confirm-password"
                  id="confirm-user-password"
                  type="password"
                  placeholder="Confirm Password"
                />
                <span className="form-message"></span>
              </div>
              <div className="form-group">
                <select
                  name="province"
                  id="province"
                  style={{ cursor: "pointer", width: "100%" }}
                >
                  <option value="">-- Chọn Tỉnh/TP --</option>
                  <option value="HaNoi">Hà Nội</option>
                  <option value="DaNang">Đà Nẵng</option>
                  <option value="HoChiMinh">Tp Hồ Chí Minh</option>
                </select>
                <span className="form-message"></span>
              </div>
              <div className="form-group gender">
                <label htmlFor="">Gender</label>
                <div>
                  <div>
                    <input name="gender" type="radio" value="male" /> male
                  </div>
                  <div>
                    <input name="gender" type="radio" value="female" /> female
                  </div>
                </div>
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
