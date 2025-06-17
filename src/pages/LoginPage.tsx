import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Components
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AuthFormCard from '../components/AuthFormCard';

// Shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from "@/components/ui/use-toast"; // For success/error messages


const LoginPage: React.FC = () => {
  console.log('LoginPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    console.log('Login attempt with:', { email, password, rememberMe });

    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example login logic
    if (email === 'user@example.com' && password === 'password') {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      // On successful login, you would typically redirect to a dashboard page.
      // For this example, let's assume a '/dashboard' route exists, though it's not in App.tsx.
      // navigate('/dashboard'); // Or another appropriate route
      console.log("Login successful, redirecting (placeholder)...");
      // Since no dashboard is defined in App.tsx, we'll just clear loading and show success.
      // If a dashboard route like '/' or other was the target after login, that would be used.
      // The current App.tsx has '/' as LoginPage, so a successful login might not redirect
      // immediately without a target page.
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const authFormFooterLinks = [
    {
      to: '/registration', // Path from App.tsx
      label: "Don't have an account? Sign Up",
    },
    {
      to: '/forgot-password', // Path from App.tsx
      label: 'Forgot Password?',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <AuthFormCard
          title="Login to Your Account"
          submitButtonText="Login"
          onSubmit={handleLoginSubmit}
          isSubmitting={isLoading}
          errorMessage={errorMessage}
          footerLinks={authFormFooterLinks}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox 
                id="remember-me" 
                checked={rememberMe} 
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Remember me
              </Label>
            </div>
          </div>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;