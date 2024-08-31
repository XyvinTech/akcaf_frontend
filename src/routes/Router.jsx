import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import MemberPage from "../pages/Members/MemberPage";
import CollegePage from "../pages/Colleges/CollegePage";
import GroupPage from "../pages/Groups/GroupPage";
import EventsListPage from "../pages/Events/EventsListPage";
import EventHistoryPage from "../pages/Events/EventHistoryPage";
import PaymentPage from "../pages/Payments/PaymentPage";
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
const router = createBrowserRouter([
  {
    path: "/",
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
    path: "/groups",
    element: (
      <Layout>
        <GroupPage />
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
    path: "/payments",
    element: (
      <Layout>
        <PaymentPage />
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
    path: "/settings",
    element: (
      <Layout>
        <SettingPage />
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
