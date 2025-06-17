import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-6 px-4 md:px-6 text-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <p className="text-sm">
          &copy; {currentYear} Your Application Name. All rights reserved.
        </p>
        <nav className="flex space-x-4">
          <Link
            to="/terms-of-service" // Placeholder route, not in App.tsx but common for footers
            className="text-sm hover:text-gray-900 dark:hover:text-gray-100 hover:underline"
          >
            Terms of Service
          </Link>
          <Link
            to="/privacy-policy" // Placeholder route, not in App.tsx but common for footers
            className="text-sm hover:text-gray-900 dark:hover:text-gray-100 hover:underline"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;