import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/app/services/api";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  setAuthenticated: (username: string) => void; // Direct state update method
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const result = await api.auth.check();
      setIsAuthenticated(result.authenticated);
      setUsername(result.username || null);
    } catch (error) {
      setIsAuthenticated(false);
      setUsername(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log("AuthContext: Attempting login for:", username);
      const result = await api.auth.login(username, password);
      console.log("AuthContext: Login result:", result);
      
      if (result && result.success === true) {
        console.log("AuthContext: Setting authenticated state");
        setIsAuthenticated(true);
        setUsername(username);
        return true;
      }
      
      // If result exists but success is false, create an error with the message
      const errorMessage = result?.message || result?.error || "Invalid username or password";
      console.log("AuthContext: Creating error with message:", errorMessage);
      const error: any = new Error(errorMessage);
      error.data = result;
      error.status = 401; // Unauthorized
      throw error;
    } catch (error: any) {
      console.error("AuthContext: Login error:", error);
      console.error("AuthContext: Error details:", {
        message: error?.message,
        name: error?.name,
        stack: error?.stack,
        data: error?.data
      });
      
      // If error message is "No message available", provide a better message
      if (error?.message === "No message available" || !error?.message) {
        const betterError: any = new Error("Invalid username or password");
        betterError.data = error?.data;
        betterError.status = error?.status;
        throw betterError;
      }
      
      // Re-throw to let Login component handle the error message
      throw error;
    }
  };

  const setAuthenticated = (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      // Ignore logout errors
    } finally {
      setIsAuthenticated(false);
      setUsername(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, setAuthenticated, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
