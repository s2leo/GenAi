/*
 * Suggested future enhancements for ChatPage:
 * - Add real-time collaborative chat for team document reviews
 * - Implement voice-to-text input for hands-free document queries
 * - Add export options for chat conversations (PDF, Word)
 * - Include document comparison functionality within chat
 * - Add AI suggestions for follow-up questions based on document content
 * - Implement advanced search within chat history
 * - Add document annotation features with shared comments
 * - Include integration with calendar for scheduling follow-ups
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ChatHistory from "./ChatHistory";
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
  Search
} from "lucide-react";

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
                <span className="font-medium text-slate-900">Comprehensive Analysis</span>
                <p className="text-sm text-slate-600">Detailed review of all clauses, risks, and recommendations</p>
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
                <span className="font-medium text-slate-900">Quick Summary</span>
                <p className="text-sm text-slate-600">High-level overview and key findings only</p>
              </div>
            </label>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="mb-6">
          <h4 className="font-semibold text-slate-900 mb-3">Focus Areas</h4>
          <div className="space-y-2">
            {[
              { key: "riskAssessment", label: "Risk Assessment", icon: <AlertTriangle className="w-4 h-4" />, desc: "Identify potential legal risks and liabilities" },
              { key: "keyTerms", label: "Key Terms Explanation", icon: <BookOpen className="w-4 h-4" />, desc: "Plain English explanations of complex terms" },
              { key: "recommendations", label: "Actionable Recommendations", icon: <TrendingUp className="w-4 h-4" />, desc: "Specific steps to improve the document" },
              { key: "legalCompliance", label: "Legal Compliance Check", icon: <Shield className="w-4 h-4" />, desc: "Verify compliance with relevant regulations" },
            ].map((option) => (
              <label key={option.key} className="flex items-start cursor-pointer p-2 rounded hover:bg-slate-50">
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
                    <span className="font-medium text-slate-900">{option.label}</span>
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

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

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
        content: "Hello! I'm your AI Legal Assistant. Upload a document to get started with analysis, or ask me any questions about legal documents.",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setShowAnalysisModal(true);
    }
  };

  const handleAnalysisConfirm = (options) => {
    // Store options for potential future use
    console.log("Analysis options selected:", options);
    
    // Add file upload message
    const fileMessage = {
      id: Date.now(),
      type: "user",
      content: `📄 Uploaded: ${uploadedFile.name}`,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setMessages(prev => [...prev, fileMessage]);
    
    // Add analysis options message
    const optionsMessage = {
      id: Date.now() + 1,
      type: "user",
      content: `Analysis configured: ${options.depth === "comprehensive" ? "Comprehensive" : "Quick Summary"} with focus on ${Object.entries(options.focusAreas).filter(([, value]) => value).map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())).join(", ")}`,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setMessages(prev => [...prev, optionsMessage]);
    
    // Start analysis
    simulateAnalysis();
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    
    // Add analyzing message
    const analyzingMessage = {
      id: Date.now() + 2,
      type: "assistant",
      content: "🔄 Analyzing your document... This may take a moment.",
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setMessages(prev => [...prev, analyzingMessage]);

    setTimeout(() => {
      const analysisResult = {
        id: Date.now() + 3,
        type: "assistant",
        content: `✅ Analysis Complete!\n\n**Document Summary:**\nThis employment agreement demonstrates industry-standard practices with competitive compensation structures and balanced risk allocation.\n\n**Key Findings:**\n• Compensation package is competitive with market standards\n• Non-compete clause may be restrictive (6-month duration)\n• IP assignment terms are comprehensive but standard\n• Termination provisions provide reasonable security\n\n**Risk Level:** Moderate\n**Compliance Score:** 92%\n\n**Top Recommendations:**\n1. Consider negotiating non-compete duration from 6 to 3 months\n2. Request clarification on geographic scope limitations\n3. Seek definition of "confidential information" to prevent overreach\n\nWould you like me to elaborate on any of these findings?`,
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setMessages(prev => [...prev, analysisResult]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        type: "user",
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputMessage("");
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          type: "assistant",
          content: "I understand your question. Based on the document analysis, I can provide more specific guidance. Could you clarify which aspect you'd like me to focus on?",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectChat = (chat) => {
    // In a real app, this would load the chat history
    console.log("Loading chat:", chat);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />
      
      {/* Chat Header */}
      <div className="pt-20 pb-6 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">AI Assistant Chat</h1>
                <p className="text-slate-600">Upload documents and get instant legal analysis</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="text-slate-600 hover:text-slate-900 font-medium"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                        message.type === "user"
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-900"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      <div className={`text-xs mt-1 ${
                        message.type === "user" ? "text-emerald-100" : "text-slate-500"
                      }`}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
                {isAnalyzing && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600"></div>
                        <span className="text-sm">AI is analyzing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* File Upload Area */}
              <div className="border-t border-slate-200 p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <label className="flex items-center space-x-2 cursor-pointer bg-emerald-100 text-emerald-700 px-3 py-2 rounded-lg hover:bg-emerald-200 transition-colors">
                    <UploadIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Upload Document</span>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                    />
                  </label>
                  {uploadedFile && (
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <FileText className="w-4 h-4" />
                      <span>{uploadedFile.name}</span>
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
                    placeholder="Ask questions about your document..."
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    rows="1"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Options Modal */}
      <AnalysisOptionsModal
        isOpen={showAnalysisModal}
        onClose={() => setShowAnalysisModal(false)}
        onConfirm={handleAnalysisConfirm}
        fileName={uploadedFile?.name || ""}
      />
    </div>
  );
};

export default ChatPage;