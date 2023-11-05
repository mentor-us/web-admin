import { Card } from "@mui/material";

import bgImage from "assets/images/hcmus.jpg";
import logo from "assets/images/logo_mentorus.jpg";

import FullPageCenter from "layouts/components/FullPageCenter";
import FullBgImageLayout from "layouts/FullBgImageLayout";
import MDBox from "components/MDComponents/MDBox";
import MDButton from "components/MDComponents/MDButton";

import MDTypography from "../../components/MDComponents/MDTypography";

function DeepLink() {
  const path = window.location.href;
  const handleOpen = () => {
    const intentLink = path.replace("https", "intent");
    const url = `${intentLink}#Intent;scheme=https;end`;
    document.location.replace(url);
  };

  return (
    <FullBgImageLayout image={bgImage}>
      <FullPageCenter>
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
            <MDBox display="flex" alignItems="center" justifyContent="center">
              <MDBox component="img" src={logo} alt="Brand" width="2.3rem" />
              <MDBox mx={1.5}>
                <MDTypography
                  component="h6"
                  variant="button"
                  fontWeight="medium"
                  color="white"
                  sx={{ fontSize: "1.25rem" }}
                >
                  MentorUS
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
          <MDBox mt={4} mb={4} px={3}>
            <MDButton
              sx={{ mr: 1 }}
              onClick={handleOpen}
              variant="gradient"
              size="large"
              color="warning"
            >
              <MDTypography variant="body2" fontWeight="regular" color="white" fontSize="1.2rem">
                Nhấn để mở ứng dụng
              </MDTypography>
            </MDButton>
          </MDBox>
        </Card>
      </FullPageCenter>
    </FullBgImageLayout>
  );
}

export default DeepLink;
