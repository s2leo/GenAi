import { Star, Play, ArrowRight } from "lucide-react";
const Hero = () => {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Trusted by 25,000+ legal professionals
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="block">Decode Legal</span>
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Documents Instantly
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform complex legal jargon into clear, actionable insights with
            our advanced AI. Upload any document and get instant analysis, risk
            assessment, and plain English explanations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center">
              <Play className="w-5 h-5 mr-2" />
              Try Free Demo
            </button>
            <button className="border-2 border-emerald-500 text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-all flex items-center">
              Watch Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                98%
              </div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                25K+
              </div>
              <div className="text-sm text-gray-600">Documents Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                15K+
              </div>
              <div className="text-sm text-gray-600">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                4.9★
              </div>
              <div className="text-sm text-gray-600">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
