import React from "react";
import { Heart, Activity, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header
      className={cn(
        "bg-white border-b border-gray-200 sticky top-0 z-50",
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                EBOLA EMERGENCY
              </h1>
              <p className="text-xs text-gray-500 -mt-1">SUPPORT</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </a>
            <a
              href="/apply"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Apply for Support
            </a>
            <a
              href="/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Check Status
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/apply"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            >
              <Activity className="h-4 w-4" />
              Apply Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              <a
                href="/"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/apply"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply for Support
              </a>
              <a
                href="/dashboard"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Check Status
              </a>
              <a
                href="/apply"
                className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply Now
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export { Header };
