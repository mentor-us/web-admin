import React from "react";
import { PropTypes } from "prop-types";

import apple from "assets/images/apple-logo.png";
import chplay from "assets/images/google-play.png";
import logo from "assets/images/logo_mentorus.jpg";
import website from "assets/images/www.png";

import MDButton from "components/MDComponents/MDButton";

import "../../styles.css";

// eslint-disable-next-line react/prop-types
function Home({ isMobile, isChatpage }) {
  return (
    <section className="section home" id="home">
      <div className="home-text animate__animated animate__fadeInLeft animate__slow">
        <h1>MentorUS</h1>
        <h2>Hệ thống hỗ trợ cố vấn học tập</h2>
        <div
          className="home-text__btn"
          style={{
            marginBottom: "20px"
          }}
        >
          <MDButton
            component="a"
            rel="noreferrer"
            variant="outlined"
            size="medium"
            color="info"
            href="https://play.google.com/store/apps/details?id=com.mentorus"
            style={{ marginRight: "20px", border: "solid 2px" }}
          >
            <div className="flex my-2 mr-4">
              <img src={chplay} alt="website" style={{ width: "3rem", marginRight: "1rem" }} />
              <div className="break-normal">
                <span
                  style={{
                    fontSize: "0.7rem",
                    display: "block",
                    textAlign: "left"
                  }}
                >
                  Tải xuống với
                </span>
                <span style={{ fontSize: "1.5rem", display: "block" }}>Google Play</span>
              </div>
            </div>
          </MDButton>
          <MDButton
            component="a"
            rel="noreferrer"
            variant="outlined"
            size="medium"
            color="info"
            href="https://apps.apple.com/vn/app/mentorus/id6478803453?l=vi"
            style={{ marginRight: "10px", border: "solid 2px" }}
          >
            <div className="flex my-2 mr-4">
              <img src={apple} alt="website" style={{ width: "40px", marginRight: "1rem" }} />
              <div className="break-normal">
                <span style={{ fontSize: "0.7rem", display: "block", textAlign: "left" }}>
                  Cài đặt trên
                </span>
                <span style={{ fontSize: "1.5rem", display: "block" }}>App Store</span>
              </div>
            </div>
          </MDButton>
        </div>
        {!isMobile && !isChatpage && (
          <MDButton
            component="a"
            rel="noreferrer"
            variant="outlined"
            size="medium"
            color="info"
            href="https://mentor.fit.hcmus.edu.vn/"
            style={{ marginRight: "10px", border: "solid 2px" }}
          >
            <img src={website} alt="website" style={{ width: "3rem", marginRight: "1rem" }} />
            <span style={{ fontSize: "1rem" }}>Truy cập Website</span>
          </MDButton>
        )}
      </div>
      <div className="home-img animate__animated animate__fadeInRight animate__slow">
        <img src={logo} alt="logo-mentorus" />
      </div>
    </section>
  );
}

Home.defaultProps = {
  isMobile: false
};

Home.propTypes = {
  isMobile: PropTypes.bool
};

export default Home;
