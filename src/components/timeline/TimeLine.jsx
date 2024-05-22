import React, { useEffect, useState } from "react";
import "./timeLine.scss";
import axios from "axios";

const timelineData = [
  {
    date: "2002",
    title: "Title 1",
    descr:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas itaque hic quibusdam fugiat est numquam harum, accusamus suscipit consequatur laboriosam!",
    color: "#41516C",
  },
  {
    date: "2007",
    title: "Title 2",
    descr:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos adipisci nobis nostrum vero nihil veniam.",
    color: "#FBCA3E",
  },
  {
    date: "2012",
    title: "Title 3",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga minima consequuntur soluta placeat iure totam commodi repellendus ea delectus, libero fugit quod reprehenderit, sequi quo, et dolorum saepe nulla hic.",
    color: "#E24A68",
  },
  {
    date: "2017",
    title: "Title 4",
    descr:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, cumque.",
    color: "#1B5F8C",
  },
  {
    date: "2022",
    title: "Title 5",
    descr:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit, non.",
    color: "#4CADAD",
  },
];

function Timeline() {
  const [dataApply, setDataApply] = useState([]);

  useEffect(() => {
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
    fetchDataApply();
  }, []);

  return (
    <div className="timeline-container">
      <h1>UL timeline cards</h1>
      <ul className="timeline">
        {dataApply.map((e, index) => (
          <li
            key={index}
            style={{
              "--accent-color": "#735e59",
              borderBottom: "1px solid #735e59",
            }}
          >
            <div className="date">{e.applicationTime}</div>
            <div className="title">{e.job.title}</div>
            <div className="descr">{e.job.description}</div>
          </li>
        ))}
      </ul>
      {/* <div className="credits">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.freepik.com/free-vector/infographic-template-with-yearly-info_1252895.htm"
        >
          inspired by
        </a>
      </div> */}
    </div>
  );
}

export default Timeline;
