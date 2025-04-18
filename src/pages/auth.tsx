
import { AuthForm } from "@/components/auth/auth-form";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Auth = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="flex flex-1 items-center justify-center p-6">
        <AuthForm />
      </div>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} BagBuddy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Auth;
