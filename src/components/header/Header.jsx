import React from "react";
import "./header.scss";
import { NavLink } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa6";
import { TiGroup } from "react-icons/ti";
import { IoNotifications } from "react-icons/io5";
import { MdHandshake } from "react-icons/md";
import SettingsIcon from "@mui/icons-material/Settings";
import { RiMessengerFill } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";
function Header() {
  return (
    <div className="header">
      <ul className="header-inner">
        <li>
          <div className="logo">Triba</div>
          <div className="search">
            <input
              type="text"
              name="key-search"
              placeholder="Tìm kiếm..."
            ></input>
            <SearchOutlinedIcon className="search-btn"></SearchOutlinedIcon>
          </div>
        </li>

        <li>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending link" : isActive ? "active link" : " link"
            }
          >
            <AiFillHome />
          </NavLink>

          <NavLink
            to="/group"
            className={({ isActive, isPending }) =>
              isPending ? "pending link" : isActive ? "active link" : " link"
            }
          >
            <TiGroup></TiGroup>
          </NavLink>

          <NavLink
            to="/cooperate"
            className={({ isActive, isPending }) =>
              isPending ? "pending link" : isActive ? "active link" : " link"
            }
          >
            <MdHandshake />
          </NavLink>

          <NavLink
            to="/noti"
            className={({ isActive, isPending }) =>
              isPending ? "pending link" : isActive ? "active link" : " link"
            }
          >
            <IoNotifications></IoNotifications>
          </NavLink>

          <NavLink
            to="/messenger"
            className={({ isActive, isPending }) =>
              isPending ? "pending link" : isActive ? "active link" : " link"
            }
          >
            <RiMessengerFill></RiMessengerFill>
          </NavLink>

          <Dropdown>
            <Dropdown.Toggle className={"account-btn"} id="dropdown-basic">
              <div className={" link "}>
                <FaUser></FaUser>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="/login">login</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <NavLink
            to="/setting"
            className={({ isActive, isPending }) =>
              isPending ? "pending link" : isActive ? "active link" : " link"
            }
          >
            <SettingsIcon></SettingsIcon>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Header;
