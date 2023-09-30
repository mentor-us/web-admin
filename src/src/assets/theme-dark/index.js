// @mui material components
import { createTheme } from "@mui/material/styles";

import borders from "assets/theme-dark/base/borders";
import boxShadows from "assets/theme-dark/base/boxShadows";
import breakpoints from "assets/theme-dark/base/breakpoints";
// import Fade from "@mui/material/Fade";
// Material Dashboard 2 React base styles
import colors from "assets/theme-dark/base/colors";
import globals from "assets/theme-dark/base/globals";
import typography from "assets/theme-dark/base/typography";
import appBar from "assets/theme-dark/components/appBar";
import avatar from "assets/theme-dark/components/avatar";
import breadcrumbs from "assets/theme-dark/components/breadcrumbs";
import button from "assets/theme-dark/components/button";
import buttonBase from "assets/theme-dark/components/buttonBase";
import card from "assets/theme-dark/components/card";
import cardContent from "assets/theme-dark/components/card/cardContent";
import cardMedia from "assets/theme-dark/components/card/cardMedia";
import container from "assets/theme-dark/components/container";
import dialog from "assets/theme-dark/components/dialog";
import dialogActions from "assets/theme-dark/components/dialog/dialogActions";
import dialogContent from "assets/theme-dark/components/dialog/dialogContent";
import dialogContentText from "assets/theme-dark/components/dialog/dialogContentText";
import dialogTitle from "assets/theme-dark/components/dialog/dialogTitle";
import divider from "assets/theme-dark/components/divider";
import autocomplete from "assets/theme-dark/components/form/autocomplete";
import checkbox from "assets/theme-dark/components/form/checkbox";
import formControlLabel from "assets/theme-dark/components/form/formControlLabel";
import formLabel from "assets/theme-dark/components/form/formLabel";
import input from "assets/theme-dark/components/form/input";
import inputLabel from "assets/theme-dark/components/form/inputLabel";
import inputOutlined from "assets/theme-dark/components/form/inputOutlined";
import radio from "assets/theme-dark/components/form/radio";
import select from "assets/theme-dark/components/form/select";
import switchButton from "assets/theme-dark/components/form/switchButton";
import textField from "assets/theme-dark/components/form/textField";
import icon from "assets/theme-dark/components/icon";
import iconButton from "assets/theme-dark/components/iconButton";
import linearProgress from "assets/theme-dark/components/linearProgress";
import link from "assets/theme-dark/components/link";
import list from "assets/theme-dark/components/list";
import listItem from "assets/theme-dark/components/list/listItem";
import listItemText from "assets/theme-dark/components/list/listItemText";
import menu from "assets/theme-dark/components/menu";
import menuItem from "assets/theme-dark/components/menu/menuItem";
import popover from "assets/theme-dark/components/popover";
// Material Dashboard 2 React components base styles for @mui material components
import sidenav from "assets/theme-dark/components/sidenav";
import slider from "assets/theme-dark/components/slider";
import stepper from "assets/theme-dark/components/stepper";
import step from "assets/theme-dark/components/stepper/step";
import stepConnector from "assets/theme-dark/components/stepper/stepConnector";
import stepIcon from "assets/theme-dark/components/stepper/stepIcon";
import stepLabel from "assets/theme-dark/components/stepper/stepLabel";
import svgIcon from "assets/theme-dark/components/svgIcon";
import tableCell from "assets/theme-dark/components/table/tableCell";
import tableContainer from "assets/theme-dark/components/table/tableContainer";
import tableHead from "assets/theme-dark/components/table/tableHead";
import tabs from "assets/theme-dark/components/tabs";
import tab from "assets/theme-dark/components/tabs/tab";
import tooltip from "assets/theme-dark/components/tooltip";
// Material Dashboard 2 React helper functions
import boxShadow from "assets/theme-dark/functions/boxShadow";
import hexToRgb from "assets/theme-dark/functions/hexToRgb";
import linearGradient from "assets/theme-dark/functions/linearGradient";
import pxToRem from "assets/theme-dark/functions/pxToRem";
import rgba from "assets/theme-dark/functions/rgba";

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container
      }
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions }
  }
});
