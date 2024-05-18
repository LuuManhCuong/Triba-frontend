import React from "react";
import "./mess.scss";

const users = [
  {
    name: "Steve Bangalter",
    time: "15/02/2019",
    status: "busy",
    img: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
  },
  {
    name: "Steve Bangalter",
    time: "15/02/2019",
    status: "offline",
    img: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
  },
  {
    name: "Peter Gregor",
    time: "12/02/2019",
    status: "away",
    img: "https://www.bootdey.com/img/Content/avatar/avatar2.png",
    active: true,
  },
  {
    name: "Jessica Larson",
    time: "11/02/2019",
    status: "busy",
    img: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
  },
  {
    name: "Lisa Guerrero",
    time: "08/02/2019",
    status: "offline",
    img: "https://www.bootdey.com/img/Content/avatar/avatar4.png",
  },
  {
    name: "Michael Jordan",
    time: "05/02/2019",
    status: "away",
    img: "https://www.bootdey.com/img/Content/avatar/avatar5.png",
  },
];

const chats = [
  {
    side: "left",
    name: "Russell",
    img: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
    text: "Hello, I'm Russell. How can I help you today?",
    time: "08:55",
  },
  {
    side: "right",
    name: "Sam",
    img: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
    text: "Hi, Russell. I need more information about Developer Plan.",
    time: "08:56",
  },
  {
    side: "left",
    name: "Russell",
    img: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
    text: "Are we meeting today? Project has been already finished and I have results to show you.",
    time: "08:57",
  },
  {
    side: "right",
    name: "Joyse",
    img: "https://www.bootdey.com/img/Content/avatar/avatar5.png",
    text: "Well I am not sure. I have results to show you.",
    time: "08:59",
  },
  {
    side: "left",
    name: "Russell",
    img: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
    text: "The rest of the team is not here yet. Maybe in an hour or so?",
    time: "08:57",
  },
  {
    side: "right",
    name: "Jin",
    img: "https://www.bootdey.com/img/Content/avatar/avatar4.png",
    text: "Have you faced any problems at the last phase of the project?",
    time: "08:59",
  },
  {
    side: "left",
    name: "Russell",
    img: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
    text: "Actually everything was fine. I'm very excited to show this to our team.",
    time: "07:00",
  },
];

const Mess = () => (
  <div className="container">
    {/* Page header start */}
    <div className="page-title">
      <div className="row gutters">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <h5 className="title">Chat Mess</h5>
        </div>
      </div>
    </div>
    {/* Page header end */}

    {/* Content wrMesser start */}
    <div className="content-wrMesser">
      {/* Row start */}
      <div className="row gutters">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="card m-0">
            {/* Row start */}
            <div className="row no-gutters">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                <div className="users-container">
                  <div className="chat-search-box">
                    <div className="input-group">
                      <input className="form-control" placeholder="Search" />
                      <div className="input-group-btn">
                        <button type="button" className="btn btn-info">
                          <i className="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <ul className="users">
                    {users.map((user, index) => (
                      <li
                        key={index}
                        className={`person ${user.active ? "active-user" : ""}`}
                        data-chat={`person${index + 1}`}
                      >
                        <div className="user">
                          <img src={user.img} alt="Retail Admin" />
                          <span className={`status ${user.status}`}></span>
                        </div>
                        <p className="name-time">
                          <span className="name">{user.name}</span>
                          <span className="time">{user.time}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                <div className="selected-user">
                  <span>
                    To: <span className="name">Emily Russell</span>
                  </span>
                </div>
                <div className="chat-container">
                  <ul className="chat-box chatContainerScroll">
                    {chats.map((chat, index) => (
                      <li key={index} className={`chat-${chat.side}`}>
                        <div className="chat-avatar">
                          <img src={chat.img} alt="Retail Admin" />
                          <div className="chat-name">{chat.name}</div>
                        </div>
                        <div className="chat-text">{chat.text}</div>
                        <div className="chat-hour">
                          {chat.time}{" "}
                          <span className="fa fa-check-circle"></span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="form-group mt-3 mb-0">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            {/* Row end */}
          </div>
        </div>
      </div>
      {/* Row end */}
    </div>
    {/* Content wrMesser end */}
  </div>
);

export default Mess;
