import { useEffect, useState } from "react";
import FormCreateJob from "../forms/FormCreateJob";
import "./project.scss";
import CardJob from "../card/CardJob";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { counterSelector } from "../../redux-tookit/selector";

const Avatar = ({ src, alt }) => (
  <img src={src} className="img-fluid avatar-xxl rounded-circle" alt={alt} />
);

const ProjectCard = ({ project, index }) => (
  <div className="col-md-6" id={`project-items-${index}`}>
    <div className="card">
      <div className="card-body">
        <div className="d-flex mb-3">
          <div className="flex-grow-1 align-items-start">
            <div>
              <h6 className="mb-0 text-muted">
                <i
                  className={`mdi mdi-circle-medium text-${project.statusColor} fs-3 align-middle`}
                ></i>
                <span className="team-date">{project.date}</span>
              </h6>
            </div>
          </div>
        </div>
        <div className="mb-4">
          {/* <h2 className="mb-1 font-size-17 team-title">
            {project.assignees[1].name}
          </h2> */}

          <h5 className="mb-1 font-size-15 team-title">{project.title}</h5>
          <p className="text-muted mb-0 team-description">
            {project.description}
          </p>
        </div>
        <div className="d-flex">
          <div className="avatar-group float-start flex-grow-1 task-assigne">
            {project.assignees.map((assignee, idx) => (
              <div key={idx} className="avatar-group-item">
                <a
                  href="javascript: void(0);"
                  className="d-inline-block"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  aria-label={assignee.name}
                  data-bs-original-title={assignee.name}
                >
                  <img
                    src={assignee.avatar}
                    alt=""
                    className="rounded-circle avatar-sm"
                  />
                </a>
              </div>
            ))}
          </div>
          <div className="align-self-end">
            <span
              className={`badge badge-soft-${project.statusColor} p-2 team-status`}
            >
              {project.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Projects = ({ projects }) => (
  <div className="row" id="all-projects">
    {projects.map((project, index) => (
      <ProjectCard key={index} project={project} index={index + 1} />
    ))}
  </div>
);

const Project = () => {
  const [activeCpn, setActiveCpn] = useState(1);
  const [dataApply, setDataApply] = useState([]);
  const [pro, setPro] = useState([]);

  useEffect(() => {
    setPro([]);
    dataApply.forEach((e) =>
      setPro((prev) => [
        ...prev,
        {
          date: e.applicationTime,
          statusColor: e.status === "PENDING" ? "danger" : "success",
          title: e.job.title,
          description: e.job.description,
          assignees: [
            {
              name: e.user.lastName + " " + e.user.firstName,
              avatar:
                e.user.avatar ||
                `https://bootdey.com/img/Content/avatar/avatar7.png`,
            },
            {
              name: e.job.user.lastName + " " + e.job.user.firstName,
              avatar:
                e.job.user.avatar ||
                "https://bootdey.com/img/Content/avatar/avatar1.png",
            },
          ],
          status: e.status,
        },
      ])
    );
  }, [dataApply]);

  // console.log("active: ", pro);

  const nav = [
    { id: 1, title: "Bài viết của tôi" },
    { id: 2, title: "Hợp tác" },
    { id: 3, title: "Đăng bài" },
    { id: 4, title: "Chỉnh sửa hồ sơ" },
  ];
  const [jobs, setJobs] = useState([]);
  let { activePr } = useParams();
  const counter = useSelector(counterSelector);
  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");

      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/user/job/get/${userId}`
        );
        // console.log("data: ", response.data);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDataApply = async () => {
      const userId = localStorage.getItem("userId");

      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/user/job/applications/${userId}`
        );
        // console.log("data apply: ", response.data);
        setDataApply(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (activeCpn === 1) {
      fetchData();
    } else if (activeCpn === 2) {
      fetchDataApply();
    } else {
    }
  }, [activeCpn, counter]);

  console.log("data apply: ", dataApply);

  return (
    <div className="project-container">
      <div className="row">
        <div className="col-xl-8">
          <div className="card" style={{ zoom: "0.8" }}>
            <div className="card-body pb-0">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <div className="text-center border-end">
                    <Avatar
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt="Jansh Wells"
                    />
                    <h4 className="text-primary font-size-20 mt-3 mb-2">
                      Mạnh Cường
                    </h4>
                    <h5 className="text-muted font-size-13 mb-0">
                      Web Designer
                    </h5>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="ms-3">
                    <div>
                      <h4 className="card-title mb-2">Biography</h4>
                      <p className="mb-0 text-muted">
                        Hi I'm Jansh, has been the industry's standard dummy
                        text To an English person alteration text.
                      </p>
                    </div>
                    <div className="row my-4">
                      <div className="col-md-12">
                        <div>
                          <p className="text-muted mb-2 fw-medium">
                            <i className="mdi mdi-email-outline me-2"></i>
                            Janshwells@probic.com
                          </p>
                          <p className="text-muted fw-medium mb-0">
                            <i className="mdi mdi-phone-in-talk-outline me-2"></i>
                            418-955-4703
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* nav bar  */}

                    <ul
                      className="nav nav-tabs nav-tabs-custom border-bottom-0 mt-3 nav-justified"
                      role="tablist"
                    >
                      {nav?.map((e, i) => (
                        <li key={i} className="nav-item" role="presentation">
                          <div
                            style={{ cursor: "pointer" }}
                            className={
                              activeCpn == e.id
                                ? "nav-link px-4 active"
                                : "nav-link px-4"
                            }
                            data-bs-toggle="tab"
                            role="tab"
                            aria-selected="false"
                            onClick={() => setActiveCpn(e.id)}
                          >
                            <span className="d-block d-sm-none">
                              <i className="fas fa-home"></i>
                            </span>
                            <span className="d-none d-sm-block">{e.title}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* card */}
          {activeCpn === 1 && (
            <div className="card" style={{ height: "100vh", overflow: "auto" }}>
              <div className="tab-content p-4">
                <div
                  className="tab-pane active show"
                  id="projects-tab"
                  role="tabpanel"
                >
                  {/* <Projects projects={projects} /> */}
                  {jobs?.length > 0 ? (
                    <CardJob jobs={jobs} owner={true}></CardJob>
                  ) : (
                    <div>Bạn chưa đăng bài viết nào</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeCpn === 2 && (
            <div className="card" style={{ height: "70vh", overflow: "auto" }}>
              <div className="tab-content p-4">
                <div
                  className="tab-pane active show"
                  id="projects-tab"
                  role="tabpanel"
                >
                  <Projects projects={pro} />
                  {/* <CardJob jobs={jobs}></CardJob> */}
                </div>
              </div>
            </div>
          )}

          {/* {activeCpn === 2 && <div>Chỉnh sửa hồ sơ</div>} */}
          {activeCpn === 3 && <FormCreateJob></FormCreateJob>}
        </div>

        <div className="col-xl-4">
          <div className="card">
            <div className="card-body">
              <div className="pb-2">
                <h4 className="card-title mb-3">About</h4>
                <p>
                  Hi I'm Jansh, has been the industry's standard dummy text To
                  an English person, it will seem like simplified.
                </p>
                <ul className="ps-3 mb-0">
                  <li>It will seem like simplified.</li>
                  <li>
                    To achieve this, it would be necessary to have uniform
                    pronunciation
                  </li>
                </ul>
              </div>
              <hr />
              <div className="pt-2">
                <h4 className="card-title mb-4">My Skill</h4>
                <div
                  className="d-flex gap-2 flex-wrap"
                  style={{ color: "red" }}
                >
                  <span className="badge badge-soft-primary">Photoshop</span>
                  <span className="badge badge-soft-primary">illustrator</span>
                  <span className="badge badge-soft-primary">HTML</span>
                  <span className="badge badge-soft-primary">CSS</span>
                  <span className="badge badge-soft-primary">Javascript</span>
                  <span className="badge badge-soft-primary">Php</span>
                  <span className="badge badge-soft-primary">Python</span>
                </div>
              </div>
              <hr />
              <div className="pt-2">
                <h4 className="card-title mb-4">Gallery</h4>
                <div className="row">
                  <div className="col-4">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar8.png"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      className="img-fluid rounded mt-4"
                      alt=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      className="img-fluid rounded mt-4"
                      alt=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      className="img-fluid rounded mt-4"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className="pt-2">
                <h4 className="card-title mb-3">Contact</h4>
                <div className="d-flex mb-3">
                  <div className="flex-shrink-0 me-3">
                    <i className="uil uil-map-marker text-primary h2"></i>
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-2">Location</p>
                    <h5 className="mb-1 font-size-15">California, USA</h5>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div className="flex-shrink-0 me-3">
                    <i className="uil uil-envelope-alt text-primary h2"></i>
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-2">Email</p>
                    <h5 className="mb-1 font-size-15">Janshwell@probic.com</h5>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div className="flex-shrink-0 me-3">
                    <i className="uil uil-phone text-primary h2"></i>
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-2">Phone</p>
                    <h5 className="mb-1 font-size-15">418-955-4703</h5>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div className="flex-shrink-0 me-3">
                    <i className="uil uil-globe text-primary h2"></i>
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-2">Website</p>
                    <h5 className="mb-1 font-size-15">www.bootdey.com</h5>
                  </div>
                </div>
              </div>
              <hr />
              <div className="pt-2">
                <h4 className="card-title mb-4">Social Media</h4>
                <div className="d-flex flex-wrap gap-2">
                  <a href="#" className="btn btn-soft-primary btn-sm">
                    <i className="uil uil-facebook-f me-1"></i> Facebook
                  </a>
                  <a href="#" className="btn btn-soft-info btn-sm">
                    <i className="uil uil-twitter me-1"></i> Twitter
                  </a>
                  <a href="#" className="btn btn-soft-danger btn-sm">
                    <i className="uil uil-instagram me-1"></i> Instagram
                  </a>
                  <a href="#" className="btn btn-soft-success btn-sm">
                    <i className="uil uil-whatsproject me-1"></i> Whatsproject
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
