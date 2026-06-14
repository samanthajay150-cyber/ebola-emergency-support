import React from "react";
import Layout from "@/layouts/Layout";
import OnboardingForm from "@/components/OnboardingForm";

const ApplyPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Application for Ebola Emergency Support
            </h1>
            <p className="text-lg text-gray-600">
              Complete the form below to apply for financial assistance
            </p>
          </div>
          
          <OnboardingForm />
        </div>
      </div>
    </Layout>
  );
};

export default ApplyPage;
