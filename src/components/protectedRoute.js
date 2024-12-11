import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const protectedRoute = (requiredRole, Component) => {
  return (props) => {
    const { user, isAuthenticated, hasRole } = useAuthStore();
    const router = useRouter();

    if (!isAuthenticated) {
      console.log(isAuthenticated)
      router.push("/login");
      return null;
    }

    if (!hasRole(requiredRole)) {
      router.push("/403");
      return null;
    }

    return <Component {...props} />;
  };
};

export default protectedRoute;
