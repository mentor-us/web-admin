import React from "react";
import { GitHub } from "@mui/icons-material";
import { Icon } from "@mui/material";

import logo from "assets/images/logo.png";

import "../../styles.css";

function Footer() {
  return (
    <section className="section landing_footer" id="footer">
      <div className="landing_footer__main animate__animated animate__slideInUp animate__slow">
        <div className="col">
          <h4>Dự án thuộc:</h4>
          <img src={logo} alt="hcmus" className="landing_footer__img" />
        </div>
        <div className="col landing_footer__info">
          <h4>Thông tin dự án:</h4>
          <p>Giáo viên hướng dẫn:</p>
          <ul className="landing_footer__info-text">
            <li>
              <strong>TS. Lâm Quang Vũ</strong>
            </li>
          </ul>
          <p style={{ marginTop: "10px" }}>Nhóm sinh viên thực hiện:</p>
          <ul className="landing_footer__info-text">
            <li>Đoàn Thu Ngân - 19120302</li>
            <li>Lê Văn Định - 19120477</li>
            <li>Thới Hải Đức - 19120483</li>
            <li>Trầm Hữu Đức - 19120484</li>
            <li>Đỗ Thái Duy - 19120492</li>
            <li>Nguyễn Nhật Duy - 19120495</li>
          </ul>
        </div>
        <div className="col ">
          <h4>Liên hệ:</h4>
          <p>Mọi thắc mắc vui lòng liên hệ qua:</p>
          <div className="landing_footer__contact">
            <div className="landing_footer__contact-text">
              <Icon fontSize="medium" className="landing_footer__contact-text-icon">
                alternate_email
              </Icon>
              <p className="landing_footer-text">mentorus.hcmus@gmail.com</p>
            </div>
            <div className="landing_footer__contact-text">
              <Icon fontSize="medium" className="landing_footer__contact-text-icon">
                facebook
              </Icon>
              <p className="landing_footer-text">https://www.facebook.com/toladui</p>
            </div>
            <div className="landing_footer__contact-text">
              <GitHub fontSize="medium" className="landing_footer__contact-text-icon" />
              <p className="landing_footer-text">https://github.com/iamduy17</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
