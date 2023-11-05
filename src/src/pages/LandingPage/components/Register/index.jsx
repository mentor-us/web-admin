import React from "react";

import MDButton from "components/MDComponents/MDButton";

import "../../styles.css";

// eslint-disable-next-line react/prop-types
function Register({ link }) {
  return (
    <section className="section register" id="register">
      <div className="register__container animate__animated animate__fadeInUp animate__slow animate__delay-1s">
        <p className="register__text">
          Bạn vui lòng điền form theo đường link bên dưới để tụi mình thêm bạn vào hệ thống
        </p>
        <MDButton
          variant="gradient"
          component="a"
          color="info"
          sx={{ m: 1, textTransform: "none", fontSize: "1rem" }}
          href={link}
        >
          Điền form
        </MDButton>
      </div>
    </section>
  );
}

export default Register;
