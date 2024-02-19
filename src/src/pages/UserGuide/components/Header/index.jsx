import React from "react";
import { Icon, IconButton } from "@mui/material";

import "../../styles.css";

// eslint-disable-next-line react/prop-types
function Header({ isMobile }) {
  const handleClick = () => {
    // const menu = document.querySelector("#menu-icon");
    const navbar = document.querySelector(".navbar");
    if (navbar.classList.contains("active")) {
      navbar.classList.remove("active");
    } else {
      navbar.classList.add("active");
    }
  };
  return (
    <header className="header" id="header">
      <a href="#header" className="logo">
        MentorUS
      </a>
      <IconButton id="menu-icon" onClick={handleClick}>
        <Icon color="dark" fontSize="large">
          menu
        </Icon>
      </IconButton>

      <ul className="navbar">
        <li>
          <a href="#home">Trang chủ</a>
        </li>
        {isMobile && (
          <li>
            <a href="#register">Điền form</a>
          </li>
        )}
        <li>
          <a href="#instruction">Hướng dẫn</a>
        </li>
        <li>
          <a href="#footer">Thông tin</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
