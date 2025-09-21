/*
 * Suggested future enhancements for HomePage:
 * - Add interactive demo section with real-time document analysis preview
 * - Implement testimonial carousel with more customer stories
 * - Add pricing calculator based on document volume
 * - Include integration showcase with popular legal software
 * - Add compliance certifications display with verification links
 * - Implement A/B testing for CTA buttons and hero section
 */

import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import {
  Brain,
  Shield,
  CheckCircle,
  Search,
  Star,
  FileText,
  Globe,
  Users,
  BookOpen,
  Scale,
  Award,
  Clock,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

const LegalSymbol = () => (
  <div className="flex justify-center py-8">
    <div className="relative">
      <div className="w-16 h-16 bg-gradient-to-r from-slate-700 to-slate-900 rounded-full flex items-center justify-center shadow-lg">
        <Scale className="w-8 h-8 text-white" />
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
        <Brain className="w-3 h-3 text-white" />
      </div>
    </div>
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-20">
      <Navbar />
      <Hero />
      <LegalSymbol />

      {/* Enhanced Statistics Bar */}
      <div className="bg-slate-900 text-white py-8 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-400">50K+</div>
              <div className="text-slate-300">Documents Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">98.5%</div>
              <div className="text-slate-300">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">500+</div>
              <div className="text-slate-300">Legal Firms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">24/7</div>
              <div className="text-slate-300">AI Availability</div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Features Section */}
      <div className="mt-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            <span>Enterprise-Grade Legal Technology</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Advanced Legal Intelligence Platform
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  "LegalAi has transformed our contract review process. The AI insights have helped us identify critical risks that our junior associates consistently missed, improving our overall service quality.",
            analysis, risk assessment, and contract optimization with
            institutional-grade security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {[
                  "Security and accuracy were our primary concerns. LegalAi exceeded expectations on both fronts, and the detailed audit trails satisfy our compliance requirements perfectly.",
              icon: <Brain className="w-8 h-8" />,
              title: "Advanced Natural Language Processing",
              description:
                "Proprietary AI models trained on millions of legal documents with 98.5% accuracy in clause identification and risk assessment.",
              features: [
                "Multi-jurisdiction support",
                "Real-time processing",
                "Contextual understanding",
              ],
              gradient: "from-slate-600 to-slate-800",
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Enterprise Security & Compliance",
              description:
                "Bank-level encryption, SOC 2 Type II certified infrastructure with complete audit trails and data governance.",
              features: [
                "End-to-end encryption",
                "GDPR compliant",
                "Zero-trust architecture",
              ],
              gradient: "from-emerald-600 to-emerald-800",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl mb-6`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.features.map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Search className="w-6 h-6" />,
              title: "Intelligent Extraction",
              description:
                "Automated identification of critical terms, obligations, and risk factors with contextual analysis.",
              metric: "99.2% accuracy",
            },
            {
              icon: <AlertTriangle className="w-6 h-6" />,
              title: "Risk Intelligence",
              description:
                "Proactive identification of compliance issues, liability exposures, and contract vulnerabilities.",
              metric: "24/7 monitoring",
            },
            {
              icon: <Clock className="w-6 h-6" />,
              title: "Rapid Processing",
              description:
                "Complete document analysis and recommendations delivered in under 2 minutes.",
              metric: "<2 min analysis",
            },
            {
              icon: <TrendingUp className="w-6 h-6" />,
              title: "Market Benchmarking",
              description:
                "Compare contract terms against industry standards and best practices.",
              metric: "500K+ database",
            },
          ].map((capability, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:bg-white hover:shadow-md transition-all"
            >
              <div className="text-emerald-600 mb-4">{capability.icon}</div>
              <h4 className="font-semibold text-slate-900 mb-2">
                {capability.title}
              </h4>
              <p className="text-sm text-slate-600 mb-3">
                {capability.description}
              </p>
              <div className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                {capability.metric}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Testimonials */}
      <div className="mt-20 bg-slate-50 rounded-2xl p-12">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">
            Trusted by Legal Professionals
          </h3>
          <p className="text-slate-600 text-lg">
            Join leading law firms and enterprises worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  © 2025 LegalAi Technologies, Inc. All rights reserved.
            {
              quote:
                "LegalAi has transformed our contract review process. The AI insights have helped us identify critical risks that our junior associates consistently missed, improving our overall service quality.",
              author: "Sarah Mitchell, Esq.",
              role: "Partner",
              company: "Goldman & Associates LLP",
              practice: "Corporate Law",
            },
            {
              quote:
                "The platform's ability to benchmark our agreements against market standards has been invaluable during negotiations. We've improved our contract terms significantly.",
              author: "David Chen",
              role: "General Counsel",
              company: "TechVenture Global",
              practice: "In-house Legal",
            },
            {
              quote:
                "Security and accuracy were our primary concerns. LegalAi exceeded expectations on both fronts, and the detailed audit trails satisfy our compliance requirements perfectly.",
              author: "Rebecca Torres, Esq.",
              role: "Managing Director",
              company: "Legal Operations Consulting",
              practice: "Legal Tech",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm border border-slate-200"
            >
              <div className="flex text-emerald-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-slate-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="border-t border-slate-200 pt-4">
                <div className="font-semibold text-slate-900">
                  {testimonial.author}
                </div>
                <div className="text-sm text-slate-600">{testimonial.role}</div>
                <div className="text-sm text-slate-500">
                  {testimonial.company} • {testimonial.practice}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Footer */}
      <footer className="bg-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 rounded-xl">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">LegalAi</h4>
                  <p className="text-slate-400">Legal Intelligence Platform</p>
                </div>
              </div>
              <p className="text-slate-300 mb-8 text-lg leading-relaxed max-w-lg">
                Empowering legal professionals and enterprises with AI-driven
                document analysis, risk assessment, and contract optimization
                solutions.
              </p>
              <div className="flex space-x-4">
                <button className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition-colors">
                  <Globe className="w-5 h-5" />
                </button>
                <button className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition-colors">
                  <Users className="w-5 h-5" />
                </button>
                <button className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition-colors">
                  <BookOpen className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-6 text-lg">Platform</h5>
              <ul className="space-y-3 text-slate-300">
                {[
                  "Document Analysis",
                  "Risk Assessment",
                  "Contract Review",
                  "Compliance Monitoring",
                  "API Integration",
                ].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-emerald-400 transition-colors flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-6 text-lg">Support</h5>
              <ul className="space-y-3 text-slate-300">
                {[
                  "Help Center",
                  "Documentation",
                  "Security Center",
                  "Professional Services",
                  "Contact Support",
                ].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-emerald-400 transition-colors flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-8 mb-4 lg:mb-0">
              <p className="text-slate-400">
                © 2025 LegalAi AI Technologies, Inc. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="bg-emerald-600 text-white px-2 py-1 rounded text-xs">
                  SOC 2 Certified
                </span>
                <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                  GDPR Compliant
                </span>
              </div>
            </div>
            <div className="flex space-x-6 text-slate-400">
              {["Terms of Service", "Privacy Policy", "Security", "SLA"].map(
                (item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="hover:text-emerald-400 transition-colors text-sm"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
