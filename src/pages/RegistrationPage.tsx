import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormCard from '@/components/AuthFormCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Assuming useToast is available for notifications as per App.tsx Toaster context
// import { useToast } from "@/components/ui/use-toast"; // Not explicitly requested to implement toast, but good for future.

// Schema for registration form validation
const registrationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Specify which field the error message applies to
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const RegistrationPage: React.FC = () => {
  console.log('RegistrationPage loaded');
  // const { toast } = useToast(); // If toast notifications are desired
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    setApiError(null); // Clear previous API errors
    console.log('Registration form data:', data);
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Simulate success/failure
      const isSuccess = Math.random() > 0.2; // 80% success rate for demo
      if (isSuccess) {
        console.log("Registration successful for:", data.email);
        // toast({ title: "Registration Successful!", description: "Welcome! You can now log in." });
        navigate('/'); // Navigate to login page after successful registration
      } else {
        throw new Error("An unexpected error occurred during registration. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setApiError(error instanceof Error ? error.message : "An unknown error occurred.");
      // toast({ variant: "destructive", title: "Registration Failed", description: error instanceof Error ? error.message : "Please try again." });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <AuthFormCard
          title="Create your account"
          submitButtonText="Sign Up"
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          errorMessage={apiError}
          footerLinks={[
            { to: '/', label: 'Already have an account? Log in' } // Link to LoginPage (path from App.tsx)
          ]}
        >
          {/* Form fields are passed as children to AuthFormCard */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
          </div>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationPage;