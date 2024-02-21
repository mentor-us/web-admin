import { Icon } from "@mui/material";

import { SUPPORT_EMAIL } from "config";
import ZaloIcon from "assets/images/icons8-zalo.svg";
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
            <li>Trần Hồng Quân - 20127067</li>
            <li>Nguyễn Tấn Hiếu - 20127159</li>
            <li>Võ Thanh Sương - 20127312</li>
            <li>Nguyễn Văn Hậu - 20127493</li>
            <li>Võ Minh Thông - 20127638</li>
            <li>Dương Quang Vinh - 20127665</li>
          </ul>
          <p style={{ marginTop: "10px" }}>Nhóm 5D1N:</p>
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
            {SUPPORT_EMAIL && (
              <div className="landing_footer__contact-text">
                <Icon fontSize="medium" className="landing_footer__contact-text-icon">
                  email
                </Icon>
                <a className="landing_footer-text" href={`mailto:${SUPPORT_EMAIL}`}>
                  {SUPPORT_EMAIL}
                </a>
              </div>
            )}

            <div className="landing_footer__contact-text">
              <Icon fontSize="medium" className="landing_footer__contact-text-icon">
                facebook
              </Icon>
              <a
                className="landing_footer-text"
                target="_blank"
                href="https://www.facebook.com/hieucckha"
                rel="noreferrer"
              >
                https://www.facebook.com/hieucckha
              </a>
            </div>
            <div className="landing_footer__contact-text">
              <img
                style={{
                  width: "24px"
                }}
                className="landing_footer__contact-text-icon"
                src={ZaloIcon}
                alt="Zalo Icon"
              />

              <a
                className="landing_footer-text"
                target="_blank"
                href="https://zalo.me/g/jljwwq240"
                rel="noreferrer"
              >
                Nhóm Zalo Hỗ trợ
              </a>
            </div>
          </div>

          <h4 style={{ marginTop: "10px" }}>Tài liệu hướng dẫn:</h4>
          <div className="landing_footer__contact">
            <div className="landing_footer__contact-text">
              <a
                className="landing_footer-text"
                target="_blank"
                href="/user-guide-web-admin"
                rel="noreferrer"
              >
                Dành cho web admin
              </a>
            </div>
            <div className="landing_footer__contact-text">
              <a
                className="landing_footer-text"
                target="_blank"
                href="/user-guide-mobile"
                rel="noreferrer"
              >
                Dành cho mobile app
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
