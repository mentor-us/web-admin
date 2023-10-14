import { Drawer } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

const configuratorWidth = 360;

/**
 * ConfiguratorDrawer
 * @description
 * ConfiguratorDrawer is a drawer that show the configurator of MentorUs Web Admin
 *
 * @param {boolean} open - open drawer
 * @param {function} onClose - close drawer callback
 * @param {node} children - content of drawer
 * @param {object} props - other props
 * @returns {React.JSX.Element}
 */
function ConfiguratorDrawer({ open, onClose, children, ...props }) {
  const theme = useTheme();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        square: true,
        sx: {
          width: {
            xs: "90%",
            sm: configuratorWidth
          },
          height: "100vh",
          margin: 0,
          borderRadius: 0,
          padding: { md: `0 ${theme.functions.pxToRem(16)}`, xs: "0" },
          boxShadow: theme.boxShadows.lg,
          overflowY: "auto"
        }
      }}
      SlideProps={{
        in: open,
        easing: theme.transitions.easing.sharp
      }}
      transitionDuration={{
        enter: theme.transitions.duration.standard,
        exit: theme.transitions.duration.standard
      }}
      {...props}
    >
      {children}
    </Drawer>
  );
}

ConfiguratorDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default ConfiguratorDrawer;
