import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormCard from '@/components/AuthFormCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button'; // Used by AuthFormCard, but good to be aware of for consistency
import { toast } from "sonner"; // For notifications

const ForgotPasswordPage: React.FC = () => {
  console.log('ForgotPasswordPage loaded');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    console.log('Forgot password submitted for email:', email);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Basic email validation example (in a real app, this would be more robust)
    if (!email || !email.includes('@')) {
      setErrorMessage("Please enter a valid email address.");
      setIsSubmitting(false);
      toast.error("Invalid email format. Please try again.");
      return;
    }

    // Simulate success
    setIsSubmitting(false);
    toast.success("If an account exists for this email, a reset link has been sent.");
    // Optionally, navigate back to login or a confirmation page
    // navigate('/');
  };

  const authFormFooterLinks = [
    {
      to: "/", // Path from App.tsx for LoginPage
      label: "Remembered your password? Login"
    },
    {
      to: "/registration", // Path from App.tsx for RegistrationPage
      label: "Don't have an account? Sign Up"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <AuthFormCard
          title="Forgot Your Password?"
          submitButtonText="Send Reset Link"
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          footerLinks={authFormFooterLinks}
          errorMessage={errorMessage}
        >
          <p className="text-sm text-muted-foreground text-center mb-4">
            No worries! Enter your email address below and we'll send you a link to reset your password.
          </p>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;