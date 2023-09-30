// prop-types is a library for typechecking of props
// @mui material components
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDComponents/MDBox";

function DataTableHeadCell({ width, children, sorted, align, ...rest }) {
  return (
    <MDBox
      component="th"
      width={width}
      py={1.5}
      px={2}
      sx={({ palette: { light }, borders: { borderWidth } }) => ({
        borderBottom: `${borderWidth[1]} solid ${light.main}`
      })}
    >
      <MDBox
        {...rest}
        width="100%"
        position="relative"
        textAlign={align}
        color="#344767"
        sx={() => ({
          fontSize: "14px",
          fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
          cursor: sorted && "pointer",
          userSelect: sorted && "none"
        })}
      >
        {children}
        {sorted && (
          <MDBox
            position="absolute"
            top="15%"
            right="5px"
            left={align === "right" ? "-5px" : "unset"}
            sx={({ typography: { size } }) => ({
              fontSize: size.lg
            })}
          >
            <MDBox
              position="absolute"
              top={-6}
              color={sorted === "asce" ? "text" : "secondary"}
              opacity={sorted === "asce" ? 1 : 0.5}
            >
              <Icon>arrow_drop_up</Icon>
            </MDBox>
            <MDBox
              position="absolute"
              top={0}
              color={sorted === "desc" ? "text" : "secondary"}
              opacity={sorted === "desc" ? 1 : 0.5}
            >
              <Icon>arrow_drop_down</Icon>
            </MDBox>
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of DataTableHeadCell
DataTableHeadCell.defaultProps = {
  width: "auto",
  sorted: "none",
  align: "left"
};

// Typechecking props for the DataTableHeadCell
DataTableHeadCell.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  sorted: PropTypes.oneOf([false, "none", "asce", "desc"]),
  align: PropTypes.oneOf(["left", "right", "center"])
};

export default DataTableHeadCell;
