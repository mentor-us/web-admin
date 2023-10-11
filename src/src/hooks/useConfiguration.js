import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isAuthenticated } from "utils";

import { selectConfiguration } from "redux/configuration/selector";
import { getAllConfiguration } from "redux/configuration/slice";

/**
 * @description
 * Hook to get MentorUS Web Admin configuration from Redux store
 *
 * Auto fetch configuration when user is authenticated and configuration is not fetched yet
 * @returns {import("redux/configuration/slice").ConfigurationState} `configuration` - Configuration object of MentorUS Web Admin
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
