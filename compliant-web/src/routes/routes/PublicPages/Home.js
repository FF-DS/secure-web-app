import Home from "@/views/Public/Home";
import ReviewDashbord from "@/views/Admin/ReviewDashbord";
import UserManagement from "@/views/Admin/UserManagement";
import ForgottenPassword from "@/views/Public/ForgottenPassword";
import VerifyAccount from "@/views/Public/VerifyAccount";
import PrivacyPolicy from "@/views/Public/PrivacyPolicy";

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
    path: "/admin-user-management",
    name: "admin-user-management",
    component: UserManagement,
  },
  {
    path: "/verify-account",
    name: "verify",
    component: VerifyAccount,
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: ForgottenPassword,
  },
  {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: PrivacyPolicy,
  },
];

export default routes.map((route) => {
  const meta = {
    public: true,
    onlyLoggedOut: true,
  };
  return { ...route, meta };
});
