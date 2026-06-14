import React from "react";
import {
  Heart,
  Activity,
  Users,
  Shield,
  Globe,
  Clock,
  CheckCircle2,
  ArrowRight,
  LogIn,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Banner with Real Image */}
      <section className="relative h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/hero-healthcare-workers.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-12 h-12 text-red-400 animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-bold">
                EBOLA EMERGENCY SUPPORT
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-blue-100">
              Supporting Ebola patients and affected communities with 
              emergency financial assistance and healthcare resources
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/apply">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg">
                  <FileText className="mr-2 h-5 w-5" />
                  Apply for Assistance
                </Button>
              </Link>
              
              <Link to="/admin/login">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 px-8 py-6 text-lg">
                  <LogIn className="mr-2 h-5 w-5" />
                  Admin Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-200">Applications Processed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-blue-200">Countries Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">$2M+</div>
              <div className="text-blue-200">Assistance Distributed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How We Support Ebola-Affected Communities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides comprehensive support for patients, families, and healthcare workers affected by Ebola outbreaks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/doctor-treatment.jpg" 
                  alt="Medical Treatment"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <Heart className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Emergency Medical Support</h3>
                <p className="text-gray-600">
                  Financial assistance for medical treatment, hospitalization, and essential healthcare services for Ebola patients.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/medical-team.jpg" 
                  alt="Healthcare Workers"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <Users className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Family Support</h3>
                <p className="text-gray-600">
                  Support for families who have lost loved ones, including funeral expenses and survivor support programs.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/volunteer-healthcare.jpg" 
                  alt="Volunteer Healthcare"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <Shield className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Healthcare Worker Support</h3>
                <p className="text-gray-600">
                  Financial assistance, protective equipment, and psychological support for frontline healthcare workers.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How to Apply */}
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="/images/healthcare-support.jpg" 
                  alt="Healthcare Support"
                  className="rounded-lg shadow-2xl"
                />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  How to Apply for Assistance
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Submit Your Application</h4>
                      <p className="text-gray-600">Complete our simple online application form with your details.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Application Review</h4>
                      <p className="text-gray-600">Our team reviews your application within 24-48 hours.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Receive Support</h4>
                      <p className="text-gray-600">Once approved, assistance is provided within 5-7 business days.</p>
                    </div>
                  </div>
                </div>
                
                <Link to="/apply">
                  <Button size="lg" className="mt-8 bg-blue-600 hover:bg-blue-700">
                    Start Your Application <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Testing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Globe className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Global Ebola Response Network
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We work with healthcare organizations, governments, and NGOs across Africa to provide 
                emergency support to Ebola-affected communities.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">DRC - Congo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Guinea</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Sierra Leone</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Liberia</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Uganda</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Nigeria</span>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="/images/ebola-research.jpg" 
                alt="Ebola Research"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/medical-testing.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 to-red-800/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <Clock className="w-16 h-16 mx-auto mb-6 text-red-300" />
          <h2 className="text-4xl font-bold mb-6">
            Urgent Assistance Available 24/7
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            During Ebola outbreaks, every minute counts. Our emergency support team is available 
            around the clock to process applications and provide immediate assistance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply">
              <Button size="lg" className="bg-white text-red-900 hover:bg-gray-100 px-8">
                Apply Now for Emergency Assistance
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Image Attribution */}
      <section className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-6 text-center text-sm">
          <p>
            Healthcare images sourced from Unsplash - Free for commercial use • 
            Photo credits: CDC, Unsplash, Healthcare Heroes
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
