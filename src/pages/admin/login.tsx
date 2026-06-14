import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";

// Simple auth token storage
const AUTH_TOKEN_KEY = "ebola_admin_token";
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "ebola2026admin", // In production, use proper auth
};

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simple credential check (in production, use proper auth)
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Store auth token
      const token = btoa(`${username}:${Date.now()}`);
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      
      // Navigate to admin dashboard
      navigate("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-3 bg-white rounded-xl">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-blue-200">Ebola Emergency Support Administration</p>
        </div>

        {/* Login Card */}
        <Card variant="elevated">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-xl">Sign In</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="error" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </Alert>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="pl-10 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Alert variant="info" className="text-sm">
                <strong>Demo Credentials:</strong>
                <br />
                Username: <code className="bg-blue-100 px-1 rounded">admin</code>
                <br />
                Password: <code className="bg-blue-100 px-1 rounded">ebola2026admin</code>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-blue-200 hover:text-white transition text-sm"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
