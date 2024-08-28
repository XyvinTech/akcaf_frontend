import { createBrowserRouter } from "react-router-dom";
import Test from "../pages/Test";
import Layout from "../Layout/Layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Test />
      </Layout>
    ),
  },
]);

export default router;
