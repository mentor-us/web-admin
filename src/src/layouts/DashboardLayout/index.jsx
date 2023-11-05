import { useEffect } from "react";
import PropTypes from "prop-types";

import { setLoading } from "context";
import { useMentorUs } from "hooks";

import Footer from "layouts/Footer";
import LayoutHelper from "layouts/LayoutHelpers";
import Loading from "components/Loading";
import MDBox from "components/MDComponents/MDBox";

function DashboardLayout({ children }) {
  const [controller, dispatchContext] = useMentorUs();
  const { miniSidenav, loading } = controller;

  useEffect(() => {
    const time = setTimeout(() => {
      setLoading(dispatchContext, false);
    }, 500);

    setLoading(dispatchContext, true);

    return () => {
      clearTimeout(time);
    };
  }, []);

  return (
    <>
      <LayoutHelper />
      <MDBox
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          p: 2,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh)",

          [breakpoints.up("xl")]: {
            marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
            transition: transitions.create(["margin-left", "margin-right"], {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.standard
            })
          }
        })}
      >
        {children}
        <Footer />
        {loading && <Loading />}
      </MDBox>
    </>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default DashboardLayout;
