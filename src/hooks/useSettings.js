// hooks/useSettings.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API = "http://localhost:3000/api/account"; // adjust as needed

/* ------------------------------------------------------------------ *
 | ░░  Centralised data‑access layer (Axios)                          |
 * ------------------------------------------------------------------ */
const fetchProfile = async (userId) => {
  const { data } = await axios.get(`${API}/${userId}`, {
    withCredentials: true,
  });
  return data; // e.g. { id, email, ... }
};

const changePassword = async ({ userId, currentPassword, newPassword }) => {
  const { data } = await axios.post(
    `${API}/${userId}/change-password`,
    { currentPassword, newPassword },
    { withCredentials: true }
  );
  return data; // e.g. { message: 'Password updated' }
};

/* ------------------------------------------------------------------ *
 | ░░  React‑Query hook exported to UI components                     |
 * ------------------------------------------------------------------ */
export const useSettings = (userId) => {
  const qc = useQueryClient();

  /* -------- profile query (optional) -------- */
  const profileQuery = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfile(userId),
    enabled: !!userId,
  });

  /* -------- password‑change mutation -------- */
  const changePasswordMutation = useMutation({
    mutationFn: ({ currentPassword, newPassword }) =>
      changePassword({ userId, currentPassword, newPassword }),

    // Invalidate or update any cached data after success
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile", userId] });
    },
  });

  /* -------- public API returned by the hook -------- */
  return {
    // profile data
    profile: profileQuery.data,
    isProfileLoading: profileQuery.isLoading,
    profileError: profileQuery.error,
    refetchProfile: profileQuery.refetch,

    // password‑change mutation object (mutate, isPending, isError, etc.)
    changePasswordMutation,
  };
};
