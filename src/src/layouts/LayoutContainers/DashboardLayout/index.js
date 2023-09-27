import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDComponents/MDBox";
// import { getAllUser } from "redux/accounts/slice";

// Material Dashboard 2 React context
import { setLayout, setLoading } from "context";
import { useMentorUs } from "hooks";
import Loading from "components/Loading";
import Footer from "layouts/Footer";

function DashboardLayout({ children }) {
  const [controller, dispatchContext] = useMentorUs();
  const { miniSidenav, loading } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatchContext, "dashboard");
  }, [pathname]);

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
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default DashboardLayout;
