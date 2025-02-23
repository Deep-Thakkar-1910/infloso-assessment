import { create } from "zustand";
import axios from "../axios/axios";
import { toast } from "sonner";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  checkAuth: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),

  // checking the authentication status and setting is autheticated value
  checkAuth: async () => {
    try {
      const reuslt = await axios.get("/dashboard-data", {
        withCredentials: true,
      });
      if (reuslt.data.success) {
        set({ isAuthenticated: true });
      } else {
        throw new Error("Unauthorized!");
      }
    } catch (err) {
      console.log(err);
      set({ isAuthenticated: false });
    }
  },

  // signout function
  signOut: async () => {
    try {
      const result = await axios.post("/auth/signout", undefined, {
        withCredentials: true,
      });
      if (result.data.success) {
        set({ isAuthenticated: false });
        toast.success(result.data.message);
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  },
}));
