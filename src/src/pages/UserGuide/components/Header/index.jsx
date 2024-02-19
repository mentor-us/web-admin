import React from "react";
import { Icon, IconButton } from "@mui/material";

import "../../styles.css";

// eslint-disable-next-line react/prop-types
function Header() {
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
      <a href="#header" className="guide">
        Hướng dẫn sử dụng
      </a>
    </header>
  );
}

export default Header;
