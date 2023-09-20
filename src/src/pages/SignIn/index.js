import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Card } from "@mui/material";
import bgImage from "assets/images/hcmus.jpg";
import google from "assets/images/google.png";
import microsoft from "assets/images/microsoft.png";

import { API_URL, WEB_URL } from "config";

import { getCurrentUserSelector } from "redux/currentUser/selector";
import { logout } from "redux/currentUser/slice";
import { isExpiredToken } from "utils";

import MDButton from "components/MDComponents/MDButton";
import MDBox from "../../components/MDComponents/MDBox";
import MDTypography from "../../components/MDComponents/MDTypography";
import BasicLayout from "./components/BasicLayout/BasicLayout";

import "./style.css";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserSelector);
  const token = localStorage.getItem("access_token");
  const googleSignInURL = `${API_URL}oauth2/authorize/google?redirect_uri=${WEB_URL}auth/redirect`;
  const microsoftSignInURL = `${API_URL}oauth2/authorize/azure?redirect_uri=${WEB_URL}auth/redirect`;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    // if (currentUser.provider === "google") {
    //   window.location.assign(
    //     `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${WEB_URL}sign-in`
    //   );
    // } else if (currentUser.provider === "azure") {
    //   window.location.assign(
    //     `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${WEB_URL}sign-in&client_id=`
    //   );
    // } else {
    //   navigate("/sign-in", { replace: true });
    // }
    navigate("/sign-in", { replace: true });
    dispatch(logout());
  };

  return (
    <BasicLayout image={bgImage}>
      {((!token && Object.keys(currentUser).length === 0) || (token && isExpiredToken(token))) && (
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            mb={1}
            p={2}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Đăng nhập
            </MDTypography>
          </MDBox>
          <MDBox mt={4} mb={4} px={3}>
            <MDButton
              component="a"
              rel="noreferrer"
              variant="outlined"
              size="medium"
              color="info"
              href={googleSignInURL}
              fullWidth
            >
              <img src={google} alt="Google" style={{ width: "20px", marginRight: "10px" }} />
              <span style={{ fontSize: "1rem" }}>Đăng nhập bằng Google</span>
            </MDButton>
          </MDBox>
          <MDBox px={3}>
            <MDBox className="signin__line-border">
              <hr className="signin__line" />
              <MDTypography
                variant="h4"
                fontWeight="regular"
                fontSize="small"
                color="dark"
                mt={1}
                mx={1}
                className="signin__text-or"
                sx={({ palette: { white } }) => ({
                  backgroundColor: white.main
                })}
              >
                <span>hoặc</span>
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox mt={4} mb={4} px={3}>
            <MDButton
              component="a"
              rel="noreferrer"
              variant="outlined"
              size="medium"
              color="info"
              href={microsoftSignInURL}
              fullWidth
            >
              <img src={microsoft} alt="Microsoft" style={{ width: "20px", marginRight: "10px" }} />
              <span style={{ fontSize: "1rem" }}>Đăng nhập bằng Microsoft</span>
            </MDButton>
          </MDBox>
        </Card>
      )}

      {token && !isExpiredToken(token) && Object.keys(currentUser).length > 0 && (
        <Card sx={{ width: "50vw" }}>
          <MDBox
            sx={{
              width: "100%",
              height: "max-content",
              px: 4,
              py: 4,
              background: "white",
              borderRadius: "10px",
              zIndex: 1
            }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <MDTypography component="p" fontSize="4rem" className="not-found___text">
              Xác nhận thoát
            </MDTypography>
            <Divider sx={{ width: "100%" }} />
            <MDTypography component="p" fontSize="1.5rem" className="not-found___text">
              Bạn đã đăng nhập với tên <b>{currentUser.name}</b>, cần đăng xuất trước khi đăng nhập
              tài khoản khác.
            </MDTypography>
            <MDBox
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              mt={1}
            >
              <MDButton
                variant="gradient"
                color="error"
                sx={{ m: 1, textTransform: "none", fontSize: "1rem" }}
                onClick={handleLogout}
              >
                Thoát
              </MDButton>
              <MDButton
                variant="gradient"
                color="info"
                sx={{ m: 1, textTransform: "none", fontSize: "1rem" }}
                onClick={() => navigate(-1)}
              >
                Hủy bỏ
              </MDButton>
            </MDBox>
          </MDBox>
        </Card>
      )}

      {token && Object.keys(currentUser).length === 0 && null}
    </BasicLayout>
  );
}

export default SignIn;
