import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectConfiguration } from "features/configuration/selector";
import { getAllConfiguration } from "features/configuration/slice";

import { isAuthenticated } from "utils";

/**
 * @description
 * Hook to get MentorUS Web Admin configuration from Redux store
 *
 * Auto fetch configuration when user is authenticated and configuration is not fetched yet
 * @returns {import("features/configuration/slice").ConfigurationState} `configuration` - Configuration object of MentorUS Web Admin
 */
export default function useConfiguration() {
  const dispatch = useDispatch();
  const configuration = useSelector(selectConfiguration);

  // Fetch configuration when user is authenticated and configuration is not fetched yet
  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(getAllConfiguration());
    }
  }, []);

  return configuration;
}
