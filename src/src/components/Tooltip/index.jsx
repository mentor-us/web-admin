import { styled } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import PropTypes from "prop-types";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className, arrow: { backgroundColor: "white" } }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#567189",
    color: "white",
    boxShadow: theme.shadows[1],
    fontSize: 14
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#567189"
  }
}));

function TooltipCustom({ title, children, placement }) {
  return (
    <LightTooltip title={title} placement={placement}>
      {children}
    </LightTooltip>
  );
}

TooltipCustom.defaultProps = {
  placement: "bottom"
};

TooltipCustom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  placement: PropTypes.string
};

export default TooltipCustom;
