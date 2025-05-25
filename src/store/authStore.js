import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

// In a production environment, API URLs should ideally be configured through environment variables.
// Example: const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api";
// For this example, we'll keep them as constants but acknowledge this best practice.

const API_BASE_URL =
  `${process.env.REACT_APP_API_BASE_URL}/api/auth` ||
  "http://localhost:3000/api/auth";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null, // Stores user-friendly error messages or error codes
      isAuthenticated: false,
      accessToken: null, // Consider storing JWT token if your API uses it

      // Helper function to handle API request lifecycle
      handleApiCall: async (apiCall, successCallback, errorCallback) => {
        set({ loading: true, error: null });
        try {
          const response = await apiCall();
          if (successCallback) {
            successCallback(response);
          }
          return response.data; // Return data for potential chaining or direct use
        } catch (err) {
          // Log the full error for debugging in production (e.g., to a logging service)
          console.error("API Error:", err.response || err.message || err);

          // Set a user-friendly error message or an error code
          const errorMessage =
            err.response?.data?.message || // Prefer backend-provided user-friendly message
            err.message ||
            "An unexpected error occurred. Please try again.";

          set({
            loading: false,
            error: errorMessage,
            // Potentially reset auth state on critical errors
            // user: null,
            // isAuthenticated: false,
            // accessToken: null,
          });
          if (errorCallback) {
            errorCallback(err);
          }
          // Re-throwing allows components to also catch and react to specific errors if needed.
          // However, ensure sensitive details from `err` are not directly exposed to the user interface.
          throw new Error(errorMessage);
        }
      },

      checkAuth: async () => {
        // If already authenticated and user data exists, avoid redundant API calls
        // This depends on your session management strategy (e.g., token expiry)
        if (get().isAuthenticated && get().user) {
          set({ loading: false }); // Ensure loading is false if we skip the API call
          return;
        }

        await get().handleApiCall(
          () => axios.get(`${API_BASE_URL}/profile`, { withCredentials: true }),
          (response) => {
            set({
              user: response.data,
              isAuthenticated: true,
              loading: false,
              error: null,
              // accessToken: response.data.token, // if token is returned
            });
          },
          (error) => {
            // On auth check failure, ensure user is logged out
            set({
              user: null,
              isAuthenticated: false,
              accessToken: null,
              loading: false,
              // error is already set by handleApiCall
            });
          }
        );
      },

      login: async (credentials) => {
        return get().handleApiCall(
          () =>
            axios.post(`${API_BASE_URL}/login`, credentials, {
              withCredentials: true,
            }),
          (response) => {
            set({
              user: response.data.user || response.data, // Adjust based on your API response structure
              isAuthenticated: true,
              loading: false,
              error: null,
              accessToken: response.data.token, // Store token if API returns one
            });
          }
          // Error handling is managed by handleApiCall
        );
      },

      register: async (userData) => {
        return get().handleApiCall(
          () =>
            axios.post(`${API_BASE_URL}/register`, userData, {
              withCredentials: true,
            }),
          (response) => {
            set({
              user: response.data.user || response.data, // Adjust based on API response
              isAuthenticated: true,
              loading: false,
              error: null,
              accessToken: response.data.token, // Store token if API returns one
            });
          }
        );
      },

      logout: async () => {
        // Optimistically update UI first for better perceived performance
        const previousState = {
          user: get().user,
          isAuthenticated: get().isAuthenticated,
          accessToken: get().accessToken,
        };
        set({
          user: null,
          isAuthenticated: false,
          accessToken: null,
          loading: true,
        });

        try {
          await axios.post(
            `${API_BASE_URL}/logout`,
            {},
            { withCredentials: true }
          );
          set({ loading: false, error: null });
        } catch (err) {
          console.error(
            "Logout API Error:",
            err.response || err.message || err
          );
          // Even if logout API fails, the client-side state is cleared.
          // You might want to notify the user or retry, but for safety, keep client logged out.
          // Revert to previous state if logout fails and you want to allow retry
          // set({ ...previousState, loading: false, error: "Logout failed. Please try again." });
          set({
            loading: false,
            // Keep user logged out on client-side regardless of server error during logout
            error:
              "Logout attempt encountered an issue, but you have been logged out locally.",
          });
          // Depending on strategy, you might not want to throw here,
          // as the primary goal (client-side logout) is achieved.
        }
      },
    }),
    {
      name: "auth-storage", // Unique name for localStorage key
      // getStorage: () => localStorage, // Default is localStorage, explicitly stating is fine
      storage: {
        // More explicit way to define storage, good for potential future changes
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            return JSON.parse(str);
          } catch (e) {
            console.error("Failed to parse auth-storage", e);
            localStorage.removeItem(name); // Clear corrupted storage
            return null;
          }
        },
        setItem: (name, newValue) => {
          try {
            localStorage.setItem(name, JSON.stringify(newValue));
          } catch (e) {
            console.error("Failed to save auth-storage", e);
            // Potentially handle storage full errors, etc.
          }
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
      // By default, all state is persisted. For auth, this is usually fine.
      // If you have sensitive temporary data in the store, use `partialize`
      // partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated, accessToken: state.accessToken }),

      // onRehydrateStorage: (state) => {
      //   console.log("Hydration finished.");
      //   return (state, error) => {
      //     if (error) {
      //       console.log("An error happened during hydration", error);
      //       // Potentially clear storage or handle error
      //     } else {
      //       console.log("Hydration successful", state);
      //       // You could dispatch checkAuth here if token expiry needs validation post-hydration
      //       // useAuthStore.getState().checkAuth(); // Be careful with immediate calls
      //     }
      //   };
      // },
    }
  )
);

export default useAuthStore;

/*
General Production Considerations for Zustand Stores:

1.  **Environment Variables:**
    * API endpoints (like `API_BASE_URL`) should be configured via environment variables (e.g., `.env` files)
        and accessed through `process.env.REACT_APP_YOUR_VARIABLE` (for Create React App) or similar mechanisms
        depending on your build system. This prevents hardcoding URLs.

2.  **Error Handling & Reporting:**
    * Integrate a proper logging service (Sentry, LogRocket, etc.) for production to capture and analyze errors.
        Replace `console.error` with calls to your logging service.
    * Provide user-friendly error messages. Avoid exposing raw technical error details to the UI.
        The `errorMessage` in `handleApiCall` attempts this.

3.  **Build Optimizations:**
    * Ensure your build process (Webpack, Rollup, Vite) is configured for production to minify code,
        tree-shake unused modules, and perform other optimizations. Zustand itself is quite small.

4.  **Code Splitting:**
    * If your application is large, consider code-splitting your Zustand stores or parts of your application
        that use them, so users only download the JavaScript they need for the current view.

5.  **Security with `persist`:**
    * Be mindful of what you store in `localStorage`. It's accessible via client-side JavaScript,
        so avoid storing highly sensitive information that isn't necessary for the client.
        User data and authentication status are common, but tokens (like JWTs) should be handled with care.
        If `accessToken` is a JWT, ensure it's transmitted securely (HTTPS) and consider its expiry.
        HttpOnly cookies are generally more secure for storing session tokens if your backend supports them,
        as they are not accessible via JavaScript, mitigating XSS risks. `withCredentials: true` helps with this.

6.  **State Hydration & Rehydration:**
    * The `persist` middleware handles rehydrating state from `localStorage` on app load.
    * The `onRehydrateStorage` option can be used for actions post-hydration, like validating a token's expiry.
    * The custom `storage` object with `try-catch` around `JSON.parse` adds robustness against corrupted storage.

7.  **Selective Persistence (`partialize`):**
    * If your store contains a mix of data that should and shouldn't be persisted, use the `partialize`
        option in the `persist` middleware to select only the necessary parts of the state.
        Example: `partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated, accessToken: state.accessToken })`

8.  **Testing:**
    * Thoroughly test your authentication flow, including edge cases and error states, in an environment
        that mimics production as closely as possible.

9.  **Axios Interceptors:**
    * For more complex applications, consider using Axios interceptors to handle common tasks like
        attaching auth tokens to requests or refreshing tokens automatically. This keeps the store logic cleaner.
        For example, an interceptor could automatically add the `accessToken` from the store to outgoing requests.
*/
