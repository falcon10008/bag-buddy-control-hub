
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./auth-context";
import { supabase } from "@/integrations/supabase/client";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from local storage or use system preference
    const savedTheme = localStorage.getItem("bagbuddy-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });
  
  const { user } = useAuth();

  // Effect to update theme when user changes
  useEffect(() => {
    if (user) {
      const fetchUserTheme = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('theme')
            .eq('id', user.id)
            .maybeSingle();
            
          if (!error && data && data.theme) {
            setTheme(data.theme as Theme);
          }
        } catch (error) {
          console.error('Error fetching user theme preference:', error);
        }
      };
      
      fetchUserTheme();
    }
  }, [user]);

  useEffect(() => {
    // Update document class and local storage when theme changes
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    localStorage.setItem("bagbuddy-theme", theme);
    
    // If user is authenticated, update their theme preference in database
    if (user) {
      const updateUserTheme = async () => {
        try {
          await supabase
            .from('profiles')
            .update({ theme })
            .eq('id', user.id);
        } catch (error) {
          console.error('Error updating user theme preference:', error);
        }
      };
      
      updateUserTheme();
    }
  }, [theme, user]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
