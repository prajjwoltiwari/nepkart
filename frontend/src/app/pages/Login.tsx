import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/app/contexts/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState<"checking" | "connected" | "disconnected">("checking");
  const { login, setAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if backend is accessible
    fetch(`${API_BASE}/auth/health`, {
      credentials: "include",
    })
      .then(() => setBackendStatus("connected"))
      .catch(() => setBackendStatus("disconnected"));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Trim whitespace from inputs
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();
      
      if (!trimmedUsername || !trimmedPassword) {
        setError("Please enter both username and password");
        setLoading(false);
        return;
      }
      
      console.log("Submitting login form:", { username: trimmedUsername, passwordLength: trimmedPassword.length });
      console.log("API Base URL:", API_BASE);
      
      // Call API directly first to see the response
      const loginUrl = `${API_BASE}/auth/login`;
      console.log("Making login request to:", loginUrl);
      
      const res = await fetch(loginUrl, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: trimmedUsername, password: trimmedPassword }),
      });
      
      console.log("Response status:", res.status, res.statusText);
      console.log("Response headers:", Object.fromEntries(res.headers.entries()));
      
      const responseText = await res.text();
      console.log("Response text:", responseText);
      
      let responseData: any = null;
      try {
        responseData = JSON.parse(responseText);
        console.log("Parsed response data:", responseData);
      } catch (parseErr) {
        console.error("Failed to parse JSON:", parseErr);
        setError(`Server returned invalid response: ${responseText.substring(0, 100)}`);
        setLoading(false);
        return;
      }
      
      // Check if login was successful
      if (responseData && responseData.success === true) {
        console.log("Login successful! Response:", responseData);
        // Update auth context state directly (no need to call API again)
        setAuthenticated(trimmedUsername);
        console.log("AuthContext updated, navigating to admin panel");
        navigate("/admin/inventory");
        return; // Exit early on success
      } else {
        // Login failed - show the message from backend
        const errorMsg = responseData?.message || responseData?.error || "Invalid username or password";
        console.log("Login failed. Response data:", responseData);
        console.log("Error message:", errorMsg);
        setError(errorMsg);
      }
    } catch (err: any) {
      console.error("Login error caught:", err);
      console.error("Error type:", typeof err);
      console.error("Error name:", err?.name);
      console.error("Error message:", err?.message);
      console.error("Error keys:", Object.keys(err || {}));
      console.error("Error string:", String(err));
      console.error("Error toString:", err?.toString?.());
      
      let errorMessage = "Login failed. Please try again.";
      
      // Handle "No message available" specifically
      if (err?.message === "No message available" || err?.message === "" || !err?.message) {
        // Check if we have response data with a message
        if (err?.data?.message) {
          errorMessage = err.data.message;
        } else {
          errorMessage = "Invalid username or password. Please verify:\nUsername: admin\nPassword: nepkart2026";
        }
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      } else if (err?.toString) {
        const errStr = err.toString();
        if (errStr && errStr !== "[object Object]" && !errStr.includes("No message available")) {
          errorMessage = errStr;
        }
      }
      
      // Network error
      if (err?.name === 'TypeError' && err.message?.includes('fetch')) {
        errorMessage = "Cannot connect to server. Please make sure the backend is running on http://localhost:8080";
      }
      
      // Final fallback
      if (errorMessage === "Login failed. Please try again." || errorMessage.includes("No message available")) {
        errorMessage = "Invalid username or password. Please verify:\nUsername: admin\nPassword: nepkart2026";
      }
      
      console.log("Final error message to display:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/nepkart-logo.png"
            alt="NEPKART"
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600 mt-2">Enter your credentials to access the admin panel</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">Error:</p>
            <p className="whitespace-pre-line">{error || "An unknown error occurred"}</p>
            {error.includes("Cannot connect") && (
              <p className="text-sm mt-2 text-red-600">
                Make sure the backend is running: <code className="bg-red-100 px-2 py-1 rounded">cd backend && mvn spring-boot:run</code>
              </p>
            )}
          </div>
        )}
        
        {backendStatus === "disconnected" && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">⚠️ Backend Not Connected</p>
            <p className="text-sm mt-1">Cannot reach the backend server. Please make sure it's running on port 8080.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-gray-600 hover:text-orange-600 transition"
          >
            ← Back to Store
          </a>
        </div>
      </div>
    </div>
  );
}
