import { Eye, FileText, AlertTriangle, Clock, BookOpen, Zap, CheckCircle, Download, Users } from "lucide-react";

const Result = ({ analysisResult }) => {
  if (!analysisResult) {
    return (
      <div className="text-center py-16 bg-white border-2 border-gray-200 rounded-xl">
        <Eye className="w-20 h-20 text-gray-400 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          No Results Yet
        </h3>
        <p className="text-gray-600 mb-6 text-lg">
          Complete the analysis to view detailed results
        </p>
        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all">
          Start Analysis
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-8">
        <div className="flex items-start space-x-4 mb-4">
          <div className="bg-emerald-500 p-3 rounded-xl">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-emerald-900 mb-2">
              Executive Summary
            </h3>
            <p className="text-emerald-700 text-lg leading-relaxed">
              {analysisResult.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`col-span-1 md:col-span-2 border-2 rounded-xl p-8 ${
            analysisResult.riskLevel === "High"
              ? "bg-red-50 border-red-200"
              : analysisResult.riskLevel === "Medium"
              ? "bg-yellow-50 border-yellow-200"
              : "bg-emerald-50 border-emerald-200"
          }`}
        >
          <div className="flex items-center space-x-4 mb-4">
            <AlertTriangle
              className={`w-8 h-8 ${
                analysisResult.riskLevel === "High"
                  ? "text-red-600"
                  : analysisResult.riskLevel === "Medium"
                  ? "text-yellow-600"
                  : "text-emerald-600"
              }`}
            />
            <div>
              <h3 className="text-xl font-bold">
                Risk Assessment: {analysisResult.riskLevel}
              </h3>
              <p className="text-sm opacity-75">
                Based on contract terms and industry standards
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${
                analysisResult.riskLevel === "High"
                  ? "bg-red-500 w-5/6"
                  : analysisResult.riskLevel === "Medium"
                  ? "bg-yellow-500 w-1/2"
                  : "bg-emerald-500 w-1/4"
              }`}
            ></div>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center">
          <Clock className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <div className="text-3xl font-bold text-gray-900 mb-2">2.3 min</div>
          <div className="text-sm text-gray-600">Analysis Time</div>
        </div>
      </div>

      {/* Key Terms Analysis */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <BookOpen className="w-6 h-6 text-emerald-500 mr-3" />
          Key Terms & Clauses
        </h3>
        <div className="grid gap-6">
          {analysisResult.keyTerms.map((term, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 hover:border-emerald-300 rounded-xl p-6 transition-all hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-semibold text-gray-900">
                  {term.term}
                </h4>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    term.risk === "high"
                      ? "bg-red-100 text-red-800 border border-red-200"
                      : term.risk === "medium"
                      ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                      : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  }`}
                >
                  {term.risk.toUpperCase()} RISK
                </span>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {term.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Zap className="w-6 h-6 text-emerald-500 mr-3" />
          AI Recommendations
        </h3>
        <div className="space-y-4">
          {analysisResult.recommendations.map((rec, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg"
            >
              <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
              <span className="text-gray-800 text-lg leading-relaxed">
                {rec}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3">
          <Download className="w-5 h-5" />
          <span>Download Full Report</span>
        </button>
        <button className="border-2 border-emerald-500 hover:bg-emerald-50 text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center space-x-3">
          <FileText className="w-5 h-5" />
          <span>Analyze Another Document</span>
        </button>
        <button className="border-2 border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center space-x-3">
          <Users className="w-5 h-5" />
          <span>Share with Team</span>
        </button>
      </div>
    </div>
  );
};

export default Result;
