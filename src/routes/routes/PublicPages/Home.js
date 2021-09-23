import Home from "@/views/Public/Home";
import ReviewDashbord from "@/views/Admin/ReviewDashbord";
import UserManagement from "@/views/Admin/UserManagement";
import Compliant from "@/views/Compliant";

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/my-service",
    name: "my-service",
    component: Home,
  },
  {
    path: "/admin-service",
    name: "admin-service",
    component: ReviewDashbord,
  },
  {
    path: "/compliant-user",
    name: "compliant-user",
    component: Compliant,
  },
  {
    path: "/admin-user-management",
    name: "admin-user-management",
    component: UserManagement,
  },
];

export default routes.map((route) => {
  const meta = {
    public: true,
    onlyLoggedOut: true,
  };
  return { ...route, meta };
});
