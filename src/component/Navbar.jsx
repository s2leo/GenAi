import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Menu, X, MessageSquare, Home } from "lucide-react";
import LoginForm from "./LoginForm";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const [user, setUser] = useState(() => {
    // Try to load user from localStorage
    const stored = localStorage.getItem("LegalAi_user");
    return stored ? JSON.parse(stored) : null;
  });

  const navigate = useNavigate();
  const handleNav = (path) => {
    setCurrentPath(path);
    navigate(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = (loginData) => {
    // Simulate login success and store user info
    const userObj = { email: loginData.email };
    setUser(userObj);
    localStorage.setItem("LegalAi_user", JSON.stringify(userObj));
    setIsLoginModalOpen(false);
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
  };

  // Optional: Add logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("LegalAi_user");
  };

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleNav("/")}
            >
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                  DocuMind
                </h1>
                <p className="text-xs text-gray-500 leading-none">
                  AI Legal Assistant
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handleNav("/")}
                className={`text-gray-600 hover:text-emerald-600 font-medium transition-colors flex items-center space-x-1 ${
                  currentPath === "/" ? "text-emerald-600" : ""
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => handleNav("/chat")}
                className={`text-gray-600 hover:text-emerald-600 font-medium transition-colors flex items-center space-x-1 ${
                  currentPath === "/chat" ? "text-emerald-600" : ""
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>AI Chat</span>
              </button>
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 font-medium px-4">
                    Hello{user.email ? `, ${user.email}` : "!"}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-emerald-600 hover:underline px-2 py-1 rounded"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    handleNav("/");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-gray-600 hover:text-emerald-600 font-medium px-4 py-2 text-left flex items-center space-x-2 ${
                    currentPath === "/" ? "text-emerald-600" : ""
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => {
                    handleNav("/chat");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-gray-600 hover:text-emerald-600 font-medium px-4 py-2 text-left flex items-center space-x-2 ${
                    currentPath === "/chat" ? "text-emerald-600" : ""
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>AI Chat</span>
                </button>
                {user ? (
                  <div className="mx-4 flex items-center space-x-2">
                    <span className="text-gray-700 font-medium px-4">
                      Hello{user.email ? `, ${user.email}` : "!"}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-xs text-emerald-600 hover:underline px-2 py-1 rounded"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="mx-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full font-medium"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-md">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 z-20 p-2 bg-white rounded-full shadow-lg text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* LoginForm Component */}
            <LoginForm onLogin={handleLogin} onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
