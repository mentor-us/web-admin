/* eslint-disable no-unused-vars */
import { PropTypes } from "prop-types";

import appstore from "assets/images/appstore.png";
import googleplay from "assets/images/googleplay.png";
import logo from "assets/images/logo_mentorus.jpg";

import "../../styles.css";

// eslint-disable-next-line react/prop-types
function Home({ isMobile, isChatpage }) {
  return (
    <section className="section home" id="home">
      <div className="home-text animate__animated animate__fadeInLeft animate__slow">
        <h1>MentorUS</h1>
        <h2>Hệ thống hỗ trợ cố vấn học tập</h2>
        <div
          className="home-text__btn flex items-center"
          style={{
            marginBottom: "20px"
          }}
        >
          <a
            href="https://play.google.com/store/apps/details?id=com.mentorus&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            style={{ width: "150px", marginRight: "20px" }}
          >
            <img src={googleplay} alt="Tải nội dung trên Google Play" />
          </a>
          <a
            href="https://apps.apple.com/vn/app/mentorus/id6478803453?l=vi"
            style={{ width: "150px", marginRight: "20px" }}
          >
            <img src={appstore} alt="Tải nội dung trên Google Play" />
          </a>
        </div>
        {/* {!isMobile && !isChatpage && (
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
        )} */}
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
