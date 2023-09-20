import React from "react";
import { PropTypes } from "prop-types";
import MDButton from "components/MDComponents/MDButton";
import logo from "assets/images/logo_mentorus.jpg";
import chplay from "assets/images/google-play.png";
import website from "assets/images/www.png";

import "../../styles.css";

function Home({ isMobile }) {
  return (
    <section className="section home" id="home">
      <div className="home-text animate__animated animate__fadeInLeft animate__slow">
        <h1>MentorUS</h1>
        <h2>Hệ thống hỗ trợ cố vấn học tập</h2>
        <div className="home-text__btn">
          {!isMobile && (
            <MDButton
              component="a"
              rel="noreferrer"
              variant="outlined"
              size="medium"
              color="info"
              href="https://mentor.fit.hcmus.edu.vn/"
              style={{ marginRight: "10px" }}
            >
              <img src={website} alt="website" style={{ width: "30px", marginRight: "10px" }} />
              <span style={{ fontSize: "1rem" }}>Truy cập website</span>
            </MDButton>
          )}
          <MDButton
            component="a"
            rel="noreferrer"
            variant="outlined"
            size="medium"
            color="info"
            href="https://play.google.com/store/apps/details?id=com.mentorus"
          >
            <img src={chplay} alt="website" style={{ width: "30px", marginRight: "10px" }} />
            <span style={{ fontSize: "1rem" }}>Tải ứng dụng</span>
          </MDButton>
        </div>
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
