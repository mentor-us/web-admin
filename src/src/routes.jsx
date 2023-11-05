import { Navigate } from "react-router-dom";
import Icon from "@mui/material/Icon";

// App pages
import AccountDetail from "pages/AccountDetail";
import AccountManagement from "pages/AccountManagement";
import Auth from "pages/Auth";
import ProtectedAuth from "pages/Auth/ProtectedAuth";
import DeepLink from "pages/DeepLink";
import GroupCategory from "pages/GroupCategoryManagement";
import GroupDetail from "pages/GroupDetail";
import GroupManagement from "pages/GroupManagement";
import MobileLandingPage from "pages/LandingPage/Mobile";
import WebLandingPage from "pages/LandingPage/Web";
import PageNotFound from "pages/NotFound";
import SignIn from "pages/SignIn";
import Statistic from "pages/Statistic";
import StatisticDetail from "pages/StatisticDetail";

const pagesMap = {
  groups: "Quản lý nhóm",
  "group-detail": "Chi tiết về nhóm",
  "group-category": "Quản lý loại nhóm",
  statistic: "Hoạt động",
  "statistic-detail": "Chi tiết hoạt động",
  "account-management": "Quản lý tài khoản",
  "account-detail": "Chi tiết tài khoản"
};

export const translateToVNmeseByKey = (key) => {
  return pagesMap[key] ?? "";
};

export const privateRoutes = [
  {
    key: "groups",
    name: translateToVNmeseByKey("groups"),
    icon: <Icon fontSize="small">groups</Icon>,
    path: "/groups",
    element: <GroupManagement />
  },
  {
    key: "group-category",
    name: translateToVNmeseByKey("group-category"),
    icon: <Icon fontSize="small">category</Icon>,
    path: "/group-category",
    element: <GroupCategory />
  },
  {
    key: "group-detail",
    name: translateToVNmeseByKey("group-detail"),
    icon: null,
    path: "/groups/group-detail/:id",
    element: <GroupDetail />
  },
  {
    key: "account-management",
    name: translateToVNmeseByKey("account-management"),
    icon: <Icon fontSize="small">account_circle</Icon>,
    path: "/account-management",
    element: <AccountManagement />
  },
  {
    key: "account-detail",
    name: translateToVNmeseByKey("account-detail"),
    path: "/account-management/account-detail/:id",
    element: <AccountDetail />
  },
  {
    key: "statistic",
    name: translateToVNmeseByKey("statistic"),
    icon: <Icon fontSize="small">query_stats</Icon>,
    path: "/statistic",
    element: <Statistic />
  },
  {
    key: "statistic-detail",
    name: translateToVNmeseByKey("statistic-detail"),
    path: "/statistic/statistic-detail/:id",
    element: <StatisticDetail />
  }
];

export const publicRoutes = [
  {
    key: "home",
    path: "/",
    element: <Navigate to="/groups" replace />
  },
  {
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    path: "/sign-in",
    element: <SignIn />
  },
  {
    name: "Authentication",
    key: "auth",
    path: "/auth/redirect",
    element: <Auth />
  },
  {
    name: "Link mở app",
    key: "deep-link",
    path: "/send-link/:type", // Open mobile app
    element: <DeepLink />
  },
  {
    name: "Web landing page",
    key: "web-landing-page",
    path: "/web-landing-page",
    element: <WebLandingPage />
  },
  {
    name: "App landing page",
    key: "mobile-landing-page",
    path: "/mobile-landing-page",
    element: <MobileLandingPage />
  },
  {
    name: "Trang không tồn tại",
    key: "not-found",
    path: "/not-found",
    element: <PageNotFound />
  }
];

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
    name: translateToVNmeseByKey("groups"),
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
    name: translateToVNmeseByKey("group-category"),
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
    name: translateToVNmeseByKey("group-detail"),
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
    name: translateToVNmeseByKey("account-management"),
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
    name: translateToVNmeseByKey("account-detail"),
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
    name: translateToVNmeseByKey("statistic"),
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
    name: translateToVNmeseByKey("statistic-detail"),
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

export default routes;