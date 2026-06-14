import React from "react";
import { Heart, Activity, MessageCircle } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              About Us
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Ebola Emergency Support provides financial assistance to Ebola victims,
              their families, and affected communities. We're committed to helping those
              in need during difficult times.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/apply" className="hover:text-white transition">
                  Apply for Support
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-white transition">
                  Application Status
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-green-400" />
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: support@ebola-emergency.org</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Hours: Mon-Fri, 9AM-5PM (UTC)</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Ebola Emergency Support. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
