import { useContext } from "react";
import { MentorUsContext, MentorUsDispatchContext } from "context";

/**
 * MentorUsContext hook to get the state and dispatch of the app context
 * @returns {[state, dispatch]} Returns the state and dispatch of the app context
 */
export default function useMentorUs() {
  const context = useContext(MentorUsContext);
  const dispatch = useContext(MentorUsDispatchContext);

  if (!context || !dispatch) {
    throw new Error("useMentorUs must be used inside the MentorUSAppProvider.");
  }

  return [context, dispatch];
}
