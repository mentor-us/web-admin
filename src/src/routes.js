import Icon from "@mui/material/Icon";
import AccountDetail from "pages/AccountDetail";
import AccountManagement from "pages/AccountManagement";
import Auth from "pages/Auth";
import ProtectedAuth from "pages/Auth/ProtectedAuth";
import DeepLink from "pages/DeepLink";
import GroupCategory from "pages/GroupCategoryManagement";
import GroupDetail from "pages/GroupDetail";
// eslint-disable-next-line import/no-named-as-default
import GroupManagement from "pages/GroupManagement";
import PageNotFound from "pages/NotFound";
import SignIn from "pages/SignIn/index";
import Statistic from "pages/Statistic";
import StatisticDetail from "pages/StatisticDetail";
import WebLandingPage from "pages/LandingPage/Web";
import MobileLandingPage from "pages/LandingPage/Mobile";

const routes = [
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/sign-in",
    slideNavShow: false,
    component: <SignIn />
  },
  {
    type: "collapse",
    name: "Authentication",
    key: "auth",
    icon: null,
    route: "/auth/redirect",
    slideNavShow: false,
    component: <Auth />
  },
  {
    type: "collapse",
    name: "Quản lý nhóm",
    key: "groups",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/groups",
    slideNavShow: true,
    component: (
      <ProtectedAuth>
        <GroupManagement />
      </ProtectedAuth>
    )
  },
  {
    type: "collapse",
    name: "Quản lý loại nhóm",
    key: "group-category",
    icon: <Icon fontSize="small">category</Icon>,
    route: "/group-category",
    slideNavShow: true,
    component: (
      <ProtectedAuth>
        <GroupCategory />
      </ProtectedAuth>
    )
  },
  {
    type: "collapse",
    name: "Chi tiết về nhóm",
    key: "group-detail",
    icon: null,
    route: "/groups/group-detail/:id",
    slideNavShow: false,
    component: (
      <ProtectedAuth>
        <GroupDetail />
      </ProtectedAuth>
    )
  },
  {
    type: "collapse",
    name: "Quản lý tài khoản",
    key: "account-management",
    icon: <Icon fontSize="small">account_circle</Icon>,
    route: "/account-management",
    slideNavShow: true,
    component: (
      <ProtectedAuth>
        <AccountManagement />
      </ProtectedAuth>
    )
  },
  {
    type: "collapse",
    name: "Chi tiết tài khoản",
    key: "account-detail",
    route: "/account-management/account-detail/:id",
    slideNavShow: false,
    component: (
      <ProtectedAuth>
        <AccountDetail />
      </ProtectedAuth>
    )
  },
  {
    type: "collapse",
    name: "Hoạt động",
    key: "statistic",
    icon: <Icon fontSize="small">query_stats</Icon>,
    route: "/statistic",
    slideNavShow: true,
    component: (
      <ProtectedAuth>
        <Statistic />
      </ProtectedAuth>
    )
  },
  {
    type: "collapse",
    name: "Chi tiết hoạt động",
    key: "statistic-detail",
    route: "/statistic/statistic-detail/:id",
    slideNavShow: false,
    component: (
      <ProtectedAuth>
        <StatisticDetail />
      </ProtectedAuth>
    )
  },
  {
    type: "collapse",
    name: "Trang không tồn tại",
    key: "not-found",
    route: "/not-found",
    slideNavShow: false,
    component: <PageNotFound />
  },
  {
    type: "collapse",
    name: "Link mở app",
    key: "deep-link",
    route: "/send-link/:type", // invitation, meeting, task
    slideNavShow: false,
    component: <DeepLink />
  },
  {
    type: "collapse",
    name: "Web landing page",
    key: "web-landing-page",
    route: "/web-landing-page", // invitation, meeting, task
    slideNavShow: false,
    component: <WebLandingPage />
  },
  {
    type: "collapse",
    name: "App landing page",
    key: "mobile-landing-page",
    route: "/mobile-landing-page", // invitation, meeting, task
    slideNavShow: false,
    component: <MobileLandingPage />
  }
];

export const translateToVNmeseByKey = (key) => {
  let value = "";
  switch (key) {
    case "groups":
      value = "Quản lý nhóm";
      break;
    case "group-detail":
      value = "Chi tiết về nhóm";
      break;
    case "group-category":
      value = "Quản lý loại nhóm";
      break;
    case "statistic":
      value = "Hoạt động";
      break;
    case "statistic-detail":
      value = "Chi tiết hoạt động";
      break;
    case "account-management":
      value = "Quản lý tài khoản";
      break;
    case "account-detail":
      value = "Chi tiết tài khoản";
      break;
    default:
      break;
  }

  return value;
};

export default routes;
