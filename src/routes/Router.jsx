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
import EditPromotion from "../pages/Promotions/EditPromotion";
import BatchMemberPage from "../pages/Colleges/BatchMemberPage";
import GroupMembers from "../pages/Groups/GroupMembers";
import PaymentPage from "../pages/payments/PaymentPage";
import QRPage from "../pages/QRPage";
import { PrivateRoute } from "./PrivateRouter";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/user",
    element: <QRPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Layout>
          <DashboardPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/members",
    element: (
      <PrivateRoute>
        <Layout>
          <MemberPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/members/:id",
    element: (
      <PrivateRoute>
        <Layout>
          <MemberView />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/members/member",
    element: (
      <PrivateRoute>
        <Layout>
          <AddMemberPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/colleges",
    element: (
      <PrivateRoute>
        <Layout>
          <CollegePage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/college/add",
    element: (
      <PrivateRoute>
        <Layout>
          <AddCollegePage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/college/:id",
    element: (
      <PrivateRoute>
        <Layout>
          <Batchpage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/college/batch/:id",
    element: (
      <PrivateRoute>
        <Layout>
          <BatchMemberPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/groups",
    element: (
      <PrivateRoute>
        <Layout>
          <GroupPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/group/:id",
    element: (
      <PrivateRoute>
        <Layout>
          <GroupMembers />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/groups/group",
    element: (
      <PrivateRoute>
        <Layout>
          <AddGroupPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/events/list",
    element: (
      <PrivateRoute>
        <Layout>
          <EventsListPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/events/:id",
    element: (
      <PrivateRoute>
        <Layout>
          <EventSinglePage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/events/edit/:id",
    element: (
      <PrivateRoute>
        <Layout>
          <EditEvent />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/events/history",
    element: (
      <PrivateRoute>
        <Layout>
          <EventHistoryPage />
        </Layout>
      </PrivateRoute>
    ),
  },

  {
    path: "/approvals",
    element: (
      <PrivateRoute>
        <Layout>
          <ApprovalPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/promotions",
    element: (
      <PrivateRoute>
        <Layout>
          <PromotionPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/promotions/promotion",
    element: (
      <PrivateRoute>
        <Layout>
          <Createpromotion />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/promotions/edit/:id",
    element: (
      <PrivateRoute>
        <Layout>
          <EditPromotion />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/payments",
    element: (
      <PrivateRoute>
        <Layout>
          <PaymentPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <PrivateRoute>
        <Layout>
          <NotificationPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/news",
    element: (
      <PrivateRoute>
        <Layout>
          <NewsPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/news/edit/:id",
    element: (
      <PrivateRoute>
        <Layout>
          <EditNews />
        </Layout>
      </PrivateRoute>
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
      <PrivateRoute>
        <Layout>
          <AddAdminPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/settings/add-role",
    element: (
      <PrivateRoute>
        <Layout>
          <AddRolePage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/logout",
    element: (
      <PrivateRoute>
        <Layout>
          <LogoutPage />
        </Layout>
      </PrivateRoute>
    ),
  },
]);

export default router;
