import React from "react";
import "./sidebar.scss";

import { NavLink } from "react-router-dom";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import SettingsIcon from "@mui/icons-material/Settings";
import { FaUserTag } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { TiGroup } from "react-icons/ti";
import { MdHandshake } from "react-icons/md";

function Sidebar() {
  return (
    <div className="sidebar gradient">
      <NavLink
        to="/personal"
        className={({ isActive, isPending }) =>
          isPending ? "pending link" : isActive ? "active link" : " link"
        }
      >
        <FaUser></FaUser> Mạnh Cường
      </NavLink>

      <NavLink
        to="/follow"
        className={({ isActive, isPending }) =>
          isPending ? "pending link" : isActive ? "active link" : " link"
        }
      >
        <FaUserTag></FaUserTag> Người theo dõi
      </NavLink>

      <NavLink
        to="/group"
        className={({ isActive, isPending }) =>
          isPending ? "pending link" : isActive ? "active link" : " link"
        }
      >
        <TiGroup></TiGroup> Nhóm
      </NavLink>

      <NavLink
        to="/cooperate"
        className={({ isActive, isPending }) =>
          isPending ? "pending link" : isActive ? "active link" : " link"
        }
      >
        <MdHandshake /> Dòng thời gian
      </NavLink>

      <NavLink
        to="/honor"
        className={({ isActive, isPending }) =>
          isPending ? "pending link" : isActive ? "active link" : " link"
        }
      >
        <MilitaryTechIcon></MilitaryTechIcon> Vinh danh
      </NavLink>

      <NavLink
        to="/analysis"
        className={({ isActive, isPending }) =>
          isPending ? "pending link" : isActive ? "active link" : " link"
        }
      >
        <AutoGraphIcon></AutoGraphIcon> Phân tích
      </NavLink>

      <NavLink
        to="/setting"
        className={({ isActive, isPending }) =>
          isPending ? "pending link" : isActive ? "active link" : " link"
        }
      >
        <SettingsIcon></SettingsIcon> Cài đặt
      </NavLink>
    </div>
  );
}

export default Sidebar;
