import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  FileText,
  Upload as UploadIcon,
  Brain,
  Settings,
  Send,
  CheckCircle,
  AlertTriangle,
  Shield,
  BookOpen,
  TrendingUp,
  Search,
  GitCompare,
  X,
  Plus,
  Loader2,
  ChevronDown,
  Zap,
} from "lucide-react";
import Navbar from "./Navbar";

// ...existing code...

const ChatHistory = ({ chatHistory, onSelectChat }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-4">
    <h3 className="font-semibold text-slate-900 mb-4">Recent Chats</h3>
    <div className="space-y-3">
      {chatHistory.map((chat) => (
        <button
          key={chat.id}
          onClick={() => onSelectChat(chat)}
          className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all"
        >
          <h4 className="font-medium text-slate-900 text-sm">{chat.title}</h4>
          <p className="text-xs text-slate-600 mt-1">{chat.lastMessage}</p>
          <span className="text-xs text-slate-500">{chat.timestamp}</span>
        </button>
      ))}
    </div>
  </div>
);

// API Configuration
const API_BASE_URL = "http://localhost:5000";

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

// Document Comparison Modal
const DocumentComparisonModal = ({
  isOpen,
  onClose,
  onConfirm,
  documents,
  categories,
}) => {
  const [comparisonType, setComparisonType] = useState("categories");
  const [selectedItems, setSelectedItems] = useState({ first: "", second: "" });
  const [customClause, setCustomClause] = useState("");

  const comparisonOptions = [
    { id: "categories", label: "Compare Categories", icon: GitCompare },
    { id: "files", label: "Compare Files", icon: FileText },
    { id: "obligations", label: "Compare Obligations", icon: Shield },
    { id: "termination", label: "Compare Termination", icon: AlertTriangle },
    { id: "custom_clause", label: "Compare Custom Clause", icon: Zap },
  ];

  const handleConfirm = () => {
    onConfirm({
      type: comparisonType,
      ...selectedItems,
      customClause:
        comparisonType === "custom_clause" ? customClause : undefined,
    });
    onClose();
    setSelectedItems({ first: "", second: "" });
    setCustomClause("");
  };

  if (!isOpen) return null;

  const availableItems = comparisonType === "files" ? documents : categories;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900">
            Document Comparison
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Comparison Type
          </label>
          <div className="grid grid-cols-1 gap-2">
            {comparisonOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setComparisonType(option.id)}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                  comparisonType === option.id
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <option.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Clause Input */}
        {comparisonType === "custom_clause" && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Describe the clause to compare
            </label>
            <textarea
              value={customClause}
              onChange={(e) => setCustomClause(e.target.value)}
              placeholder="e.g., termination clauses, liability limitations, payment terms..."
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              rows="3"
            />
          </div>
        )}

        {/* Item Selection */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              First {comparisonType === "files" ? "Document" : "Category"}
            </label>
            <select
              value={selectedItems.first}
              onChange={(e) =>
                setSelectedItems({ ...selectedItems, first: e.target.value })
              }
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">
                Select {comparisonType === "files" ? "document" : "category"}...
              </option>
              {availableItems.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Second {comparisonType === "files" ? "Document" : "Category"}
            </label>
            <select
              value={selectedItems.second}
              onChange={(e) =>
                setSelectedItems({ ...selectedItems, second: e.target.value })
              }
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">
                Select {comparisonType === "files" ? "document" : "category"}...
              </option>
              {availableItems
                .filter((item) => item !== selectedItems.first)
                .map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={
              !selectedItems.first ||
              !selectedItems.second ||
              (comparisonType === "custom_clause" && !customClause.trim())
            }
            className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
          >
            Compare
          </button>
        </div>
      </div>
    </div>
  );
};

const AnalysisOptionsModal = ({ isOpen, onClose, onConfirm, fileName }) => {
  const [analysisDepth, setAnalysisDepth] = useState("comprehensive");
  const [focusAreas, setFocusAreas] = useState({
    riskAssessment: true,
    keyTerms: true,
    recommendations: true,
    legalCompliance: false,
  });

  const handleConfirm = () => {
    onConfirm({
      depth: analysisDepth,
      focusAreas: focusAreas,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4">
          Configure Analysis for "{fileName}"
        </h3>

        {/* Analysis Depth */}
        <div className="mb-6">
          <h4 className="font-semibold text-slate-900 mb-3">Analysis Depth</h4>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="depth"
                value="comprehensive"
                checked={analysisDepth === "comprehensive"}
                onChange={(e) => setAnalysisDepth(e.target.value)}
                className="mr-3"
              />
              <div>
                <span className="font-medium text-slate-900">
                  Comprehensive Analysis
                </span>
                <p className="text-sm text-slate-600">
                  Detailed review of all clauses, risks, and recommendations
                </p>
              </div>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="depth"
                value="quick"
                checked={analysisDepth === "quick"}
                onChange={(e) => setAnalysisDepth(e.target.value)}
                className="mr-3"
              />
              <div>
                <span className="font-medium text-slate-900">
                  Quick Summary
                </span>
                <p className="text-sm text-slate-600">
                  High-level overview and key findings only
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="mb-6">
          <h4 className="font-semibold text-slate-900 mb-3">Focus Areas</h4>
          <div className="space-y-2">
            {[
              {
                key: "riskAssessment",
                label: "Risk Assessment",
                icon: <AlertTriangle className="w-4 h-4" />,
                desc: "Identify potential legal risks and liabilities",
              },
              {
                key: "keyTerms",
                label: "Key Terms Explanation",
                icon: <BookOpen className="w-4 h-4" />,
                desc: "Plain English explanations of complex terms",
              },
              {
                key: "recommendations",
                label: "Actionable Recommendations",
                icon: <TrendingUp className="w-4 h-4" />,
                desc: "Specific steps to improve the document",
              },
              {
                key: "legalCompliance",
                label: "Legal Compliance Check",
                icon: <Shield className="w-4 h-4" />,
                desc: "Verify compliance with relevant regulations",
              },
            ].map((option) => (
              <label
                key={option.key}
                className="flex items-start cursor-pointer p-2 rounded hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={focusAreas[option.key]}
                  onChange={(e) =>
                    setFocusAreas({
                      ...focusAreas,
                      [option.key]: e.target.checked,
                    })
                  }
                  className="mr-3 mt-1"
                />
                <div className="flex items-start space-x-2">
                  <div className="text-emerald-600 mt-0.5">{option.icon}</div>
                  <div>
                    <span className="font-medium text-slate-900">
                      {option.label}
                    </span>
                    <p className="text-sm text-slate-600">{option.desc}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Start Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper: simple HTML escape to reduce XSS risk (still sanitize server inputs)
const escapeHtml = (unsafe) => {
  if (typeof unsafe !== "string") return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Function to format markdown-style content
const formatMessageContent = (content) => {
  if (!content) return "";

  // Escape HTML first
  let safe = escapeHtml(content);

  return (
    safe
      // Bold **text**
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Italic *text*
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Convert line breaks to <br>
      .replace(/\n/g, "<br>")
      // Handle bullet points
      .replace(/^•\s/gm, '<span class="text-emerald-600">•</span> ')
      // Handle numbered lists
      .replace(
        /^(\d+)\.\s/gm,
        '<span class="text-emerald-600 font-medium">$1.</span> '
      )
  );
};

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allFilePaths, setAllFilePaths] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [apiError, setApiError] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock chat history data
  const [chatHistory] = useState([
    {
      id: 1,
      title: "Employment Contract Review",
      documentName: "employment_agreement.pdf",
      timestamp: "2 hours ago",
      lastMessage: "The non-compete clause seems quite restrictive...",
    },
    {
      id: 2,
      title: "NDA Analysis",
      documentName: "mutual_nda.docx",
      timestamp: "1 day ago",
      lastMessage: "Overall, this NDA provides balanced protection...",
    },
    {
      id: 3,
      title: "Service Agreement Review",
      documentName: "service_contract.pdf",
      timestamp: "3 days ago",
      lastMessage: "The liability limitations are well-structured...",
    },
  ]);

  useEffect(() => {
    // Initial welcome message
    setMessages([
      {
        id: 1,
        type: "assistant",
        content:
          "Hello! I'm your AI Legal Assistant. Upload documents to get started with analysis, or use the comparison feature to analyze differences between documents.",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    checkApiHealth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkApiHealth = async () => {
    try {
      const response = await apiCall("/health");
      if (response.status === "healthy") {
        console.log("API is healthy:", response);
      }
    } catch (error) {
      setApiError(
        "Failed to connect to API server. Please ensure the server is running."
      );
      addMessage(
        "assistant",
        "Could not connect to the analysis server. Some features may not work properly.",
        true
      );
    }
  };

  const addMessage = (type, content, isError = false) => {
    const message = {
      id: Date.now() + Math.random(),
      type,
      content,
      timestamp: new Date().toLocaleTimeString(),
      isError,
    };
    setMessages((prev) => [...prev, message]);
    return message.id;
  };

  const updateMessage = (messageId, newContent) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, content: newContent } : msg
      )
    );
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    try {
      setIsUploading(true);
      setApiError(null);

      addMessage(
        "user",
        `Uploading ${files.length} file(s): ${files
          .map((f) => f.name)
          .join(", ")}`
      );

      const statusId = addMessage(
        "assistant",
        "Uploading and processing files..."
      );

      // Upload files
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        // update uploadedFiles with the actual File objects
        setUploadedFiles((prev) => [...prev, ...files]);
        setAllFilePaths((prev) => [...prev, ...uploadData.file_paths]);

        updateMessage(
          statusId,
          "Files uploaded successfully. Processing documents..."
        );

        // Process documents on server
        const processResponse = await apiCall("/process", {
          method: "POST",
          body: JSON.stringify({
            file_paths: uploadData.file_paths,
          }),
        });

        if (processResponse.success) {
          updateMessage(
            statusId,
            "Documents processed. Analyzing categories..."
          );

          // Get categories
          const categoriesResponse = await apiCall("/categories");
          if (categoriesResponse.success) {
            setCategories((prev) => {
              const newCategories = [
                ...new Set([...prev, ...categoriesResponse.categories]),
              ];
              return newCategories;
            });

            // Use local length calculation for clarity
            const totalFiles =
              uploadData.file_paths && uploadData.file_paths.length
                ? uploadData.file_paths.length
                : files.length;
            updateMessage(
              statusId,
              `Processing complete! Files: ${totalFiles}. Categories: ${categoriesResponse.categories.join(
                ", "
              )}. You can now ask questions or compare documents.`
            );
          } else {
            updateMessage(
              statusId,
              "Processing complete, but failed to fetch categories."
            );
          }
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      addMessage("assistant", `Upload failed: ${error.message}`, true);
      setApiError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAnalysisConfirm = (options) => {
    console.log("Analysis options selected:", options);
    // Add analysis start message
    const analysisMessage = {
      id: Date.now(),
      type: "user",
      content: `Starting ${
        options.depth
      } analysis with focus on: ${Object.entries(options.focusAreas)
        .filter(([, value]) => value)
        .map(([key]) =>
          key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
        )
        .join(", ")}`,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, analysisMessage]);
    simulateAnalysis();
  };

  const handleComparisonConfirm = async (comparisonData) => {
    try {
      setIsAnalyzing(true);

      addMessage(
        "user",
        `Comparing ${comparisonData.first} vs ${comparisonData.second}${
          comparisonData.customClause ? ` (${comparisonData.customClause})` : ""
        }`
      );

      const processingId = addMessage(
        "assistant",
        "Running comparison analysis..."
      );

      let endpoint = "";
      let payload = {};

      switch (comparisonData.type) {
        case "categories":
          endpoint = "/compare";
          payload = {
            question: "Compare these categories in detail",
            category1: comparisonData.first,
            category2: comparisonData.second,
          };
          break;
        case "files":
          endpoint = "/compare_files";
          payload = {
            question: "Compare these documents in detail",
            file_path1: comparisonData.first,
            file_path2: comparisonData.second,
          };
          break;
        case "obligations":
          endpoint = "/compare_obligations";
          payload = {
            category1: comparisonData.first,
            category2: comparisonData.second,
          };
          break;
        case "termination":
          endpoint = "/compare_termination";
          payload = {
            category1: comparisonData.first,
            category2: comparisonData.second,
          };
          break;
        case "custom_clause":
          endpoint = "/compare_clauses";
          payload = {
            clause_description: comparisonData.customClause,
            category1: comparisonData.first,
            category2: comparisonData.second,
          };
          break;
        default:
          throw new Error("Unknown comparison type");
      }

      const response = await apiCall(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // remove the 'running' assistant message
      setMessages((prev) => prev.filter((msg) => msg.id !== processingId));

      if (response.success && response.result) {
        const responseText =
          response.result.answer ||
          response.result.comparison ||
          "Comparison completed successfully.";
        addMessage("assistant", `**Comparison Results:**\n\n${responseText}`);
      } else {
        throw new Error("Comparison failed");
      }
    } catch (error) {
      console.error("Comparison error:", error);
      addMessage("assistant", `Comparison failed: ${error.message}`, true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);

    const analyzingMessage = {
      id: Date.now() + 2,
      type: "assistant",
      content: "Analyzing your document... This may take a moment.",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, analyzingMessage]);

    setTimeout(() => {
      const analysisResult = {
        id: Date.now() + 3,
        type: "assistant",
        content: `Analysis Complete!

**Document Summary:**
This employment agreement demonstrates industry-standard practices with competitive compensation structures and balanced risk allocation.

**Key Findings:**
• Compensation package is competitive with market standards
• Non-compete clause may be restrictive (6-month duration)
• IP assignment terms are comprehensive but standard
• Termination provisions provide reasonable security

**Risk Level:** Moderate
**Compliance Score:** 92%

**Top Recommendations:**
1. Consider negotiating non-compete duration from 6 to 3 months
2. Request clarification on geographic scope limitations
3. Seek definition of "confidential information" to prevent overreach

Would you like me to elaborate on any of these findings?`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, analysisResult]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      setApiError(null);
      const userMessage = inputMessage.trim();
      addMessage("user", userMessage);
      setInputMessage("");

      if (allFilePaths.length === 0) {
        addMessage(
          "assistant",
          "Please upload and process some documents first, then I can answer questions about them."
        );
        return;
      }

      const thinkingId = addMessage("assistant", "Analyzing your question...");

      const queryResponse = await apiCall("/query", {
        method: "POST",
        body: JSON.stringify({
          question: userMessage,
        }),
      });

      // remove the thinking message
      setMessages((prev) => prev.filter((msg) => msg.id !== thinkingId));

      if (queryResponse.success && queryResponse.result) {
        let responseText = "";

        if (queryResponse.result.category_results) {
          const firstCategory = Object.keys(
            queryResponse.result.category_results
          )[0];
          responseText =
            queryResponse.result.category_results[firstCategory]?.answer;
        } else if (queryResponse.result.answer) {
          responseText = queryResponse.result.answer;
        } else {
          responseText =
            "I received your question but couldn't generate a proper response. Please try rephrasing your question.";
        }

        if (responseText) {
          addMessage("assistant", responseText);
        } else {
          addMessage(
            "assistant",
            "I couldn't process your question properly. Please try asking again in a different way.",
            true
          );
        }
      } else {
        throw new Error("Query response was not successful");
      }
    } catch (error) {
      console.error("Query error:", error);
      addMessage("assistant", `Query failed: ${error.message}`, true);
      setApiError(error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectChat = (chat) => {
    console.log("Loading chat:", chat);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />
      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat History Sidebar */}
          <div className="lg:col-span-1">
            <ChatHistory
              chatHistory={chatHistory}
              onSelectChat={handleSelectChat}
            />
          </div>
          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                      AI Assistant Chat
                    </h1>
                    <p className="text-slate-600">
                      Upload documents and get instant legal analysis
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/")}
                  className="text-slate-600 hover:text-slate-900 font-medium"
                >
                  ← Back to Home
                </button>
              </div>
              {/* Error Message */}
              {apiError && (
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <p className="text-red-600 text-sm">{apiError}</p>
                </div>
              )}
              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                        message.type === "user"
                          ? "bg-emerald-600 text-white"
                          : message.isError
                          ? "bg-red-50 text-red-800 border border-red-200"
                          : "bg-slate-100 text-slate-900"
                      }`}
                    >
                      <div
                        className="whitespace-pre-wrap text-sm"
                        dangerouslySetInnerHTML={{
                          __html: formatMessageContent(message.content),
                        }}
                      />
                      <div
                        className={`text-xs mt-1 ${
                          message.type === "user"
                            ? "text-emerald-100"
                            : message.isError
                            ? "text-red-600"
                            : "text-slate-500"
                        }`}
                      >
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
                {isAnalyzing && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                        <span className="text-sm">AI is analyzing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              {/* File Upload and Controls Area */}
              <div className="border-t border-slate-200 p-4">
                {/* Top row - Comparison button when files available */}
                {uploadedFiles.length > 1 && (
                  <div className="mb-3 flex justify-center">
                    <button
                      onClick={() => setShowComparisonModal(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
                    >
                      <GitCompare className="w-4 h-4" />
                      <span className="font-medium">Compare Documents</span>
                    </button>
                  </div>
                )}
                {/* File upload and status */}
                <div className="flex items-center space-x-3 mb-3">
                  <label className="flex items-center space-x-2 cursor-pointer bg-emerald-100 text-emerald-700 px-3 py-2 rounded-lg hover:bg-emerald-200 transition-colors">
                    <UploadIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Upload Document</span>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.txt"
                      multiple
                      className="hidden"
                    />
                  </label>
                  {isUploading && (
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading...</span>
                    </div>
                  )}
                  {uploadedFiles.length > 0 && (
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <FileText className="w-4 h-4" />
                      <span>{uploadedFiles.length} file(s) uploaded</span>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                  )}
                </div>
                {/* Message Input */}
                <div className="flex space-x-2">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      allFilePaths.length > 0
                        ? "Ask questions about your documents..."
                        : "Upload documents first, then ask questions..."
                    }
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    rows="1"
                    disabled={isAnalyzing || isUploading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={
                      !inputMessage.trim() || isAnalyzing || isUploading
                    }
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {isAnalyzing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
              </div>
              {/* Document Status */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">
                      {uploadedFiles.length} document(s) processed •{" "}
                      {categories.length} categories detected
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Analysis Options Modal */}
      <AnalysisOptionsModal
        isOpen={showAnalysisModal}
        onClose={() => setShowAnalysisModal(false)}
        onConfirm={handleAnalysisConfirm}
        fileName={pendingFile?.name || ""}
      />
      {/* Document Comparison Modal */}
      <DocumentComparisonModal
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        onConfirm={handleComparisonConfirm}
        documents={allFilePaths}
        categories={categories}
      />
    </div>
  );
};

export default ChatPage;
