import { useState } from "react";
import { Brain, FileText, Search, Shield } from "lucide-react";

const Analyze = ({ uploadedFile, onStartAnalysis, isAnalyzing }) => {
  const [analysisOptions, setAnalysisOptions] = useState({
    type: "comprehensive",
    riskAssessment: true,
    keyTerms: true,
    recommendations: true,
    legalCompliance: false,
  });

  return (
    <div className="space-y-8">
      {uploadedFile ? (
        <>
          {/* Document Info */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                  Ready for Analysis
                </h3>
                <p className="text-emerald-700 text-lg">
                  Document: {uploadedFile.name}
                </p>
              </div>
              <div className="bg-emerald-500 p-4 rounded-xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>

            <button
              onClick={onStartAnalysis}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center space-x-3"
            >
              <Brain className="w-6 h-6" />
              <span>
                {isAnalyzing ? "AI is Analyzing..." : "Start AI Analysis"}
              </span>
            </button>
          </div>

          {/* Analysis Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Search className="w-6 h-6 text-emerald-500 mr-2" />
                Analysis Depth
              </h4>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="analysisType"
                    value="comprehensive"
                    checked={analysisOptions.type === "comprehensive"}
                    onChange={(e) =>
                      setAnalysisOptions({
                        ...analysisOptions,
                        type: e.target.value,
                      })
                    }
                    className="mr-3 text-emerald-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900">
                      Comprehensive Analysis
                    </span>
                    <p className="text-sm text-gray-600">
                      Full document review with detailed insights
                    </p>
                  </div>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="analysisType"
                    value="quick"
                    checked={analysisOptions.type === "quick"}
                    onChange={(e) =>
                      setAnalysisOptions({
                        ...analysisOptions,
                        type: e.target.value,
                      })
                    }
                    className="mr-3 text-emerald-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900">
                      Quick Summary
                    </span>
                    <p className="text-sm text-gray-600">
                      Essential points and key takeaways
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 text-emerald-500 mr-2" />
                Focus Areas
              </h4>
              <div className="space-y-3">
                {[
                  {
                    key: "riskAssessment",
                    label: "Risk Assessment",
                    desc: "Identify potential legal risks",
                  },
                  {
                    key: "keyTerms",
                    label: "Key Terms Explanation",
                    desc: "Plain English definitions",
                  },
                  {
                    key: "recommendations",
                    label: "Actionable Recommendations",
                    desc: "Suggestions for improvement",
                  },
                  {
                    key: "legalCompliance",
                    label: "Legal Compliance Check",
                    desc: "Regulatory requirement review",
                  },
                ].map((option) => (
                  <label
                    key={option.key}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={analysisOptions[option.key]}
                      onChange={(e) =>
                        setAnalysisOptions({
                          ...analysisOptions,
                          [option.key]: e.target.checked,
                        })
                      }
                      className="mr-3 text-emerald-500"
                    />
                    <div>
                      <span className="font-medium text-gray-900">
                        {option.label}
                      </span>
                      <p className="text-sm text-gray-600">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  AI Analysis in Progress
                </h3>
                <p className="text-gray-600">
                  Our advanced AI is processing your document...
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: "Document parsing and text extraction",
                    time: "10s",
                    status: "completed",
                  },
                  {
                    step: "Legal term identification and analysis",
                    time: "25s",
                    status: "active",
                  },
                  {
                    step: "Risk assessment and compliance check",
                    time: "15s",
                    status: "pending",
                  },
                  {
                    step: "Generating recommendations",
                    time: "10s",
                    status: "pending",
                  },
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        step.status === "completed"
                          ? "bg-emerald-500"
                          : step.status === "active"
                          ? "bg-emerald-400 animate-pulse"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <span
                        className={`font-medium ${
                          step.status === "completed"
                            ? "text-emerald-600"
                            : step.status === "active"
                            ? "text-emerald-500"
                            : "text-gray-500"
                        }`}
                      >
                        {step.step}
                      </span>
                      <span className="text-sm text-gray-400 ml-2">
                        ({step.time})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-white border-2 border-gray-200 rounded-xl">
          <Brain className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No Document Selected
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            Upload a document to begin AI analysis
          </p>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all">
            Upload Document
          </button>
        </div>
      )}
    </div>
  );
};

export default Analyze;
