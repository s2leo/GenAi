import { useState, useRef } from "react";
import { Users, Globe, BookOpen, CheckCircle, Upload as UploadIcon } from "lucide-react";

const Upload = ({ onFileUpload, uploadedFile }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="space-y-8">
      <div
        className={`relative border-3 border-dashed rounded-2xl p-16 text-center transition-all duration-300 ${
          dragActive
            ? "border-emerald-400 bg-emerald-50 scale-105"
            : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <UploadIcon className="w-10 h-10 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Drop Your Legal Document Here
        </h3>
        <p className="text-gray-600 mb-8 text-lg">
          Or click to browse and select from your device
        </p>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
        >
          Choose Document
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />

        <p className="text-sm text-gray-500 mt-6">
          Supports PDF, DOC, DOCX, and TXT files • Maximum size: 25MB
        </p>
      </div>

      {uploadedFile && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-emerald-500 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-emerald-900 text-lg">
                Document Ready!
              </h4>
              <p className="text-emerald-700 mt-1">{uploadedFile.name}</p>
              <p className="text-sm text-emerald-600 mt-1">
                Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Document Types Grid */}
      <div>
        <h4 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Supported Document Types
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              type: "Employment & HR",
              desc: "Contracts, NDAs, Employee handbooks",
              icon: <Users className="w-8 h-8" />,
            },
            {
              type: "Real Estate",
              desc: "Purchase agreements, Leases, Property deeds",
              icon: <Globe className="w-8 h-8" />,
            },
            {
              type: "Business Contracts",
              desc: "Service agreements, Partnerships, Licensing",
              icon: <BookOpen className="w-8 h-8" />,
            },
          ].map((docType, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 hover:border-emerald-300 rounded-xl p-6 text-center transition-all hover:shadow-lg group"
            >
              <div className="text-emerald-500 group-hover:text-emerald-600 mb-4 flex justify-center">
                {docType.icon}
              </div>
              <h5 className="font-semibold text-gray-900 mb-2 text-lg">
                {docType.type}
              </h5>
              <p className="text-gray-600">{docType.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upload;
