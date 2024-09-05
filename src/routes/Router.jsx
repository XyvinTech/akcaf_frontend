import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import MemberPage from "../pages/Members/MemberPage";
import CollegePage from "../pages/Colleges/CollegePage";
import GroupPage from "../pages/Groups/GroupPage";
import EventsListPage from "../pages/Events/EventsListPage";
import EventHistoryPage from "../pages/Events/EventHistoryPage";
import ApprovalPage from "../pages/Approvals/ApprovalPage";
import PromotionPage from "../pages/Promotions/PromotionPage";
import NotificationPage from "../pages/Notifications/NotificationPage";
import NewsPage from "../pages/News/NewsPage";
import SettingPage from "../pages/Settings/SettingPage";
import LogoutPage from "../pages/Logout/LogoutPage";
import AddMemberPage from "../pages/Members/AddMemberPage";
import EventSinglePage from "../pages/Events/EventSinglePage";
import EditEvent from "../pages/Events/EditEvent";
import AddGroupPage from "../pages/Groups/AddGroupPage";
import Createpromotion from "../pages/Promotions/CreatePromotion";
import MemberView from "../pages/Members/MemberView";
import Batchpage from "../pages/Colleges/BatchPage";
import AddCollegePage from "../pages/Colleges/AddCollegePage";
import AddAdminPage from "../pages/Settings/AddAdminPage";
import AddRolePage from "../pages/Settings/AddRolePage";
import LoginPage from "../pages/LoginPage";
import EditNews from "../pages/News/EditNews";
import { Edit } from "@mui/icons-material";
import EditPromotion from "../pages/Promotions/EditPromotion";
import BatchMemberPage from "../pages/Colleges/BatchMemberPage";
import GroupMembers from "../pages/Groups/GroupMembers";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <DashboardPage />
      </Layout>
    ),
  },
  {
    path: "/members",
    element: (
      <Layout>
        <MemberPage />
      </Layout>
    ),
  },
  {
    path: "/members/:id",
    element: (
      <Layout>
        <MemberView />
      </Layout>
    ),
  },
  {
    path: "/members/member",
    element: (
      <Layout>
        <AddMemberPage />
      </Layout>
    ),
  },
  {
    path: "/colleges",
    element: (
      <Layout>
        <CollegePage />
      </Layout>
    ),
  },
  {
    path: "/college/add",
    element: (
      <Layout>
        <AddCollegePage />
      </Layout>
    ),
  },
  {
    path: "/college/:id",
    element: (
      <Layout>
        <Batchpage />
      </Layout>
    ),
  },
  {
    path: "/college/batch/:id",
    element: (
      <Layout>
        <BatchMemberPage />
      </Layout>
    ),
  },
  {
    path: "/groups",
    element: (
      <Layout>
        <GroupPage />
      </Layout>
    ),
  },
  {
    path: "/group/:id",
    element: (
      <Layout>
        <GroupMembers />
      </Layout>
    ),
  },
  {
    path: "/groups/group",
    element: (
      <Layout>
        <AddGroupPage />
      </Layout>
    ),
  },
  {
    path: "/events/list",
    element: (
      <Layout>
        <EventsListPage />
      </Layout>
    ),
  },
  {
    path: "/events/:id",
    element: (
      <Layout>
        <EventSinglePage />
      </Layout>
    ),
  },
  {
    path: "/events/edit/:id",
    element: (
      <Layout>
        <EditEvent />
      </Layout>
    ),
  },
  {
    path: "/events/history",
    element: (
      <Layout>
        <EventHistoryPage />
      </Layout>
    ),
  },

  {
    path: "/approvals",
    element: (
      <Layout>
        <ApprovalPage />
      </Layout>
    ),
  },
  {
    path: "/promotions",
    element: (
      <Layout>
        <PromotionPage />
      </Layout>
    ),
  },
  {
    path: "/promotions/promotion",
    element: (
      <Layout>
        <Createpromotion />
      </Layout>
    ),
  },
  {
    path: "/promotions/edit/:id",
    element: (
      <Layout>
        <EditPromotion />
      </Layout>
    ),
  },
  {
    path: "/notifications",
    element: (
      <Layout>
        <NotificationPage />
      </Layout>
    ),
  },
  {
    path: "/news",
    element: (
      <Layout>
        <NewsPage />
      </Layout>
    ),
  },
  {
    path: "/news/edit/:id",
    element: (
      <Layout>
        <EditNews />
      </Layout>
    ),
  },
  {
    path: "/settings",
    element: (
      <Layout>
        <SettingPage />
      </Layout>
    ),
  },
  {
    path: "/settings/add-admin",
    element: (
      <Layout>
        <AddAdminPage />
      </Layout>
    ),
  },
  {
    path: "/settings/add-role",
    element: (
      <Layout>
        <AddRolePage />
      </Layout>
    ),
  },
  {
    path: "/logout",
    element: (
      <Layout>
        <LogoutPage />
      </Layout>
    ),
  },
]);

export default router;
