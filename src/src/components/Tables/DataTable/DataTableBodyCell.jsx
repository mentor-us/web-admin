import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import { getImageUrlWithKey } from "utils";

import MDAvatar from "components/MDComponents/MDAvatar";
import MDBox from "components/MDComponents/MDBox";
import MDTypography from "components/MDComponents/MDTypography";

function DataTableBodyCell({ noBorder, align, children, type, info }) {
  const renderChildren = () => {
    switch (type) {
      case "normal":
        return (
          <MDTypography component="a" variant="button" color="dark" sx={{ fontWeight: "400" }}>
            {children}{" "}
          </MDTypography>
        );
      case "link":
        return (
          <NavLink to={info.href}>
            <MDTypography variant="button" color="info" sx={{ fontWeight: "400" }}>
              {children}{" "}
            </MDTypography>
          </NavLink>
        );
      case "status":
        return (
          <MDBox display="flex" flexDirection="row" justifyContent="left" alignItems="center">
            <div
              style={{
                background: info.statusColor,
                borderRadius: "50%",
                width: "0.5rem",
                height: "0.5rem",
                marginRight: "15px"
              }}
            />
            <MDTypography
              component="a"
              variant="button"
              color="dark"
              sx={{ fontWeight: "400", ml: -1, color: info.statusColor }}
            >
              {children}{" "}
            </MDTypography>
          </MDBox>
        );
      case "icon":
        return (
          <MDBox sx={{ display: "inline-block", verticalAlign: "middle" }}>
            <MDAvatar
              src={getImageUrlWithKey(info.iconUrl)}
              alt="category-image"
              shadow="sm"
              size="sm"
              sx={{
                alignSelf: "center",
                mx: 0
              }}
            />
          </MDBox>
        );
      case "component":
        return children;
      default:
        return children;
    }
  };

  return (
    <MDBox
      component="td"
      textAlign={align}
      py={1.5}
      px={2}
      sx={({ palette: { light }, typography: { size }, borders: { borderWidth } }) => ({
        fontSize: size.sm,
        borderBottom: noBorder ? "none" : `${borderWidth[1]} solid ${light.main}`
      })}
    >
      <MDBox color="black" sx={{ verticalAlign: "middle" }}>
        {renderChildren()}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of DataTableBodyCell
DataTableBodyCell.defaultProps = {
  noBorder: false,
  align: "left",
  type: "normal",
  info: false
};

// Typechecking props for the DataTableBodyCell
DataTableBodyCell.propTypes = {
  children: PropTypes.node.isRequired,
  noBorder: PropTypes.bool,
  align: PropTypes.oneOf(["left", "right", "center"]),
  type: PropTypes.oneOf(["normal", "status", "link", "component", "icon"]),
  info: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      href: PropTypes.string,
      statusColor: PropTypes.string
    })
  ])
};

export default DataTableBodyCell;
