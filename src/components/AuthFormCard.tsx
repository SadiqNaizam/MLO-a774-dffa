import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

interface AuthFormLink {
  to: string;
  label: string;
  className?: string;
}

interface AuthFormCardProps {
  title: string;
  children: React.ReactNode; // Form fields are passed as children
  submitButtonText: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void; // Parent's form submission handler
  isSubmitting?: boolean;
  footerLinks?: AuthFormLink[];
  errorMessage?: string | null; // For displaying form-level errors
}

const AuthFormCard: React.FC<AuthFormCardProps> = ({
  title,
  children,
  submitButtonText,
  onSubmit,
  isSubmitting = false,
  footerLinks,
  errorMessage,
}) => {
  console.log('AuthFormCard loaded with title:', title);

  return (
    <Card className="w-full max-w-md mx-auto my-8 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            {children}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              submitButtonText
            )}
          </Button>
        </form>
      </CardContent>
      {footerLinks && footerLinks.length > 0 && (
        <CardFooter className="flex flex-col items-center space-y-2 pt-4 border-t">
          {footerLinks.map((link) => (
            <Button
              variant="link"
              asChild
              key={link.to}
              className={`p-0 h-auto font-normal text-sm text-muted-foreground hover:text-primary ${link.className || ''}`}
            >
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthFormCard;