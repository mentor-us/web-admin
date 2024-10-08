import { Navigate } from "react-router-dom";
import Icon from "@mui/material/Icon";

// App pages
import AccountDetail from "pages/AccountDetail";
import AccountManagement from "pages/AccountManagement";
import AuditLog from "pages/AuditLog";
import Auth from "pages/Auth";
import ProtectedAuth from "pages/Auth/ProtectedAuth";
import DeepLink from "pages/DeepLink";
import GradeManagement from "pages/GradeManagement";
import GroupCategory from "pages/GroupCategoryManagement";
import GroupDetail from "pages/GroupDetail";
import GroupManagement from "pages/GroupManagement";
import MobileLandingPage from "pages/LandingPage/Mobile";
import WebLandingPage from "pages/LandingPage/Web";
import PageNotFound from "pages/NotFound";
import Privacy from "pages/Privacy";
import SignIn from "pages/SignIn";
import Statistic from "pages/Statistic";
import StatisticDetail from "pages/StatisticDetail";
// import SubjectManagement from "pages/SubjectManagement";
import TermOfService from "pages/TermOfService";
import MobileUserGuide from "pages/UserGuide/Mobile";
import WebAdminGuideline from "pages/UserGuide/Web";
import HomeLayout from "pages/WebUser/Home";
import { FullCalendarComponent } from "pages/WebUser/Home/FullCalendarComponent";
import WelcomePage from "pages/WebUser/Home/WelcomePage";
import GroupRoutes from "pages/WebUser/Route/GroupRoutes";
import { ROLE, ROUTE_URL } from "utils/constants";

const pagesMap = {
  groups: "Quản lý nhóm",
  "group-detail": "Chi tiết về nhóm",
  "group-category": "Quản lý loại nhóm",
  // subject: "Quản lý môn học",
  grade: "Quản lý điểm số",
  statistic: "Hoạt động",
  "statistic-detail": "Chi tiết hoạt động",
  "account-management": "Quản lý tài khoản",
  "account-detail": "Chi tiết tài khoản",
  "audit-log": "Nhật ký hệ thống"
};

export const translateToVNmeseByKey = (key) => {
  return pagesMap[key] ?? "";
};

const adminAccessRoles = [ROLE.ADMIN, ROLE.SUPER_ADMIN];

export const privateRoutes = [
  {
    key: "groups",
    name: translateToVNmeseByKey("groups"),
    icon: <Icon fontSize="small">groups</Icon>,
    path: "/admin/groups",
    roles: adminAccessRoles,
    element: <GroupManagement />
  },
  {
    key: "group-category",
    name: translateToVNmeseByKey("group-category"),
    icon: <Icon fontSize="small">category</Icon>,
    path: "/admin/group-category",
    roles: adminAccessRoles,
    element: <GroupCategory />
  },
  // {
  //   key: "subject",
  //   name: translateToVNmeseByKey("subject"),
  //   icon: <Icon fontSize="small">subject</Icon>,
  //   path: "/admin/subject",
  //   roles: adminAccessRoles,
  //   element: <SubjectManagement />
  // },
  {
    key: "grade",
    name: translateToVNmeseByKey("grade"),
    icon: <Icon fontSize="small">grade</Icon>,
    path: "/admin/grade",
    roles: adminAccessRoles,
    element: <GradeManagement />
  },
  {
    key: "group-detail",
    name: translateToVNmeseByKey("group-detail"),
    icon: null,
    path: "/admin/groups/group-detail/:id",
    roles: adminAccessRoles,
    element: <GroupDetail />
  },
  {
    key: "account-management",
    name: translateToVNmeseByKey("account-management"),
    icon: <Icon fontSize="small">account_circle</Icon>,
    path: "/admin/account-management",
    roles: adminAccessRoles,
    element: <AccountManagement />
  },
  {
    key: "account-detail",
    name: translateToVNmeseByKey("account-detail"),
    path: "/admin/account-management/account-detail/:id",
    roles: adminAccessRoles,
    element: <AccountDetail />
  },
  {
    key: "statistic",
    name: translateToVNmeseByKey("statistic"),
    icon: <Icon fontSize="small">query_stats</Icon>,
    path: "/admin/statistic",
    roles: adminAccessRoles,
    element: <Statistic />
  },
  {
    key: "statistic-detail",
    name: translateToVNmeseByKey("statistic-detail"),
    path: "/admin/statistic/statistic-detail/:id",
    roles: adminAccessRoles,
    element: <StatisticDetail />
  },
  {
    key: "audit-log",
    name: translateToVNmeseByKey("statistic"),
    icon: <Icon fontSize="small">query_stats</Icon>,
    path: ROUTE_URL.AUDIT_LOG_ROOT,
    roles: adminAccessRoles,
    element: <AuditLog />
  },

  // USER ROUTE
  {
    key: "HomeLayout",
    path: ROUTE_URL.CHAT_ROOT,
    roles: [ROLE.USER],
    element: <HomeLayout />,
    children: [
      {
        key: "WelcomePage",
        index: true,
        element: <WelcomePage />
      },
      {
        key: "WelcomePage",
        path: "group/:groupId/*",
        element: <GroupRoutes />
      },
      {
        key: "FullCalendarComponent",
        path: ROUTE_URL.CALENDAR_ROOT,
        element: <FullCalendarComponent />
      }
    ]
  }
];

export const publicRoutes = [
  {
    key: "privacy-page",
    path: "/privacy",
    element: <Privacy />
  },
  {
    key: "privacy-page",
    path: "/term-of-service",
    element: <TermOfService />
  },
  {
    key: "mobile-landing-page",
    path: "/",
    element: <MobileLandingPage />
  },
  {
    key: "user-guide",
    path: "/user-guide-web-admin",
    element: <WebAdminGuideline />
  },
  {
    key: "user-guide-mobile",
    path: "/user-guide-mobile",
    element: <MobileUserGuide />
  },
  {
    key: "home",
    path: "/admin",
    element: <Navigate to="/admin/groups" replace />
  },
  {
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    path: ROUTE_URL.SIGN_IN,
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
    path: "/about/web",
    element: <WebLandingPage />
  },
  {
    name: "App landing page",
    key: "mobile-landing-page",
    path: "/about/mobile",
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
    route: "/admin/sign-in",
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
    route: "/admin/groups",
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
    route: "/admin/group-category",
    slideNavShow: true,
    component: (
      <ProtectedAuth>
        <GroupCategory />
      </ProtectedAuth>
    )
  },
  // {
  //   type: "collapse",
  //   name: translateToVNmeseByKey("subject"),
  //   key: "subject",
  //   icon: <Icon fontSize="small">subject</Icon>,
  //   route: "/admin/subject",
  //   slideNavShow: true,
  //   component: (
  //     <ProtectedAuth>
  //       <SubjectManagement />
  //     </ProtectedAuth>
  //   )
  // },
  {
    type: "collapse",
    name: translateToVNmeseByKey("grade"),
    key: "grade",
    icon: <Icon fontSize="small">grade</Icon>,
    route: "/admin/grade",
    slideNavShow: true,
    component: (
      <ProtectedAuth>
        <GradeManagement />
      </ProtectedAuth>
    )
  },
  {
    type: "collapse",
    name: translateToVNmeseByKey("group-detail"),
    key: "group-detail",
    icon: null,
    route: "/admin/groups/group-detail/:id",
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
    route: "/admin/account-management",
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
    route: "/admin/account-management/account-detail/:id",
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
    route: "/admin/statistic",
    slideNavShow: true,
    component: (
      <ProtectedAuth>
        <Statistic />
      </ProtectedAuth>
    )
  },
  {
    type: "collapse",
    name: translateToVNmeseByKey("audit-log"),
    key: "audit-log",
    icon: <Icon fontSize="small">assignment_outlined</Icon>,
    route: "/admin/audit-log",
    slideNavShow: true,
    component: (
      <ProtectedAuth>
        <AuditLog />
      </ProtectedAuth>
    )
  },
  {
    type: "collapse",
    name: translateToVNmeseByKey("statistic-detail"),
    key: "statistic-detail",
    route: "/admin/statistic/statistic-detail/:id",
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
    route: "/about/web", // invitation, meeting, task
    slideNavShow: false,
    component: <WebLandingPage />
  },
  {
    type: "collapse",
    name: "App landing page",
    key: "mobile-landing-page",
    route: "/about/mobile", // invitation, meeting, task
    slideNavShow: false,
    component: <MobileLandingPage />
  },
  {
    type: "collapse",
    name: "App user guide",
    key: "user-guide-mobile",
    route: "/user-guide-mobile", // invitation, meeting, task
    slideNavShow: false,
    component: <MobileUserGuide />
  }
];

export default routes;
