import { Icon, IconButton } from "@mui/material";

import { ROUTE_URL } from "utils/constants";

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

      <ul className="navbar">
        <li>
          <a href="#home">Trang chủ</a>
        </li>
        <li>
          <a href="#instruction">Hướng dẫn</a>
        </li>
        <li>
          <a href="#footer">Thông tin</a>
        </li>
        <li>
          <a href={ROUTE_URL.SIGN_IN}>Đăng nhập</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
