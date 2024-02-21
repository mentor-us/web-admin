import { useMemo } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook to get the title and routes path of the current page
 * @returns {Object} { title, routes } - title: the last element of the path, routes: the path array
 */
export default function useBreadcrumbs() {
  const location = useLocation();
  return useMemo(() => {
    const paths = location.pathname.split("/").slice(2);
    // Remove the last element if it contains "*-detail" (e.g. "group-detail")
    if (paths.length > 1 && paths.some((path) => path.includes("detail"))) {
      paths.pop();
    }
    const title = paths[paths.length - 1];
    const routes = paths;
    return { title, routes };
  }, [location]);
}
