import React, { useState } from "react";
import { Eye, EyeOff, FileText, Mail, Lock } from "lucide-react";

export default function LoginForm({ onLogin, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    // Call the onLogin prop with the form data
    onLogin({ email, password });
  };

  return (
    // Remove the full-screen container since it's now inside a modal
    <div className="relative z-10 w-full max-w-sm">
      {/* Animated background elements - positioned relative to modal */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      {/* Main Login Card */}
      <div className="relative backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/25">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">DocuMind</h1>
              <p className="text-xs text-green-600 font-medium -mt-1">
                AI Legal Assistant
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-1">Welcome Back</h2>
          <p className="text-gray-600">Sign in to decode legal documents</p>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/40 backdrop-blur-sm border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 text-gray-800 hover:bg-white/50"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-white/40 backdrop-blur-sm border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 text-gray-800 hover:bg-white/50"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-green-600 bg-white/40 border-white/50 rounded focus:ring-green-500 focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            Sign In
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/30"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white/20 backdrop-blur-sm text-gray-600 rounded-full">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            className="flex items-center justify-center py-2.5 px-4 bg-white/40 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285f4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34a853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#fbbc05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#ea4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-700 font-medium text-sm">Google</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center py-2.5 px-4 bg-white/40 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <svg className="w-5 h-5 mr-2" fill="#1877f2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="text-gray-700 font-medium text-sm">Facebook</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              className="font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              Sign up for free
            </button>
          </p>
        </div>

        {/* Trust Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-100/50 backdrop-blur-sm rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">
              Trusted by 25,000+ legal professionals
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
