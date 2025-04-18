
import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar */}
      <Sheet>
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <h1 className="font-bold text-lg">{title || "BagBuddy"}</h1>
          <ThemeToggle />
        </div>
        <SheetContent side="left" className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="hidden md:flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-2xl font-bold">{title || "BagBuddy"}</h1>
          <ThemeToggle />
        </div>
        <div className="page-container">
          {children}
        </div>
      </main>
    </div>
  );
}
