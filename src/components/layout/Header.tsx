import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react'; // Example icon

const Header: React.FC = () => {
  console.log('Header component loaded');

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-lg font-semibold text-foreground hover:text-primary transition-colors">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span>AuthApp</span>
        </Link>
        {/* Minimal header, no navigation links as per description for auth pages */}
      </div>
    </header>
  );
};

export default Header;