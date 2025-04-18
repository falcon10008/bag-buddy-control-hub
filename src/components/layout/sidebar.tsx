
"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Luggage, 
  ScanSearch, 
  Search, 
  UserCircle, 
  Settings, 
  AlertTriangle, 
  Menu, 
  X, 
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/utils/mock-data";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const SidebarLink = ({ path, icon: Icon, label }: { path: string; icon: React.ElementType; label: string }) => (
    <Link to={path} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 px-3",
          isActive(path) ? "bg-primary/10 text-primary dark:bg-primary/20" : ""
        )}
      >
        <Icon size={20} />
        {!collapsed && <span>{label}</span>}
      </Button>
    </Link>
  );

  return (
    <aside 
      className={cn(
        "flex flex-col h-screen bg-sidebar dark:bg-sidebar-background border-r border-border",
        collapsed ? "w-[70px]" : "w-[250px]",
        "transition-all duration-300 ease-in-out",
        className
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Luggage className="text-primary" size={24} />
            <h1 className="font-bold text-lg">BagBuddy</h1>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>
      
      <div className="flex flex-col gap-1 p-2">
        <SidebarLink path="/" icon={Home} label="Dashboard" />
        <SidebarLink path="/luggage" icon={Luggage} label="Luggage List" />
        <SidebarLink path="/scan" icon={ScanSearch} label="Check-In / Scan" />
        <SidebarLink path="/lost-found" icon={AlertTriangle} label="Lost & Found" />
      </div>
      
      <div className="mt-auto flex flex-col gap-1 p-2">
        <SidebarLink path="/profile" icon={UserCircle} label="Profile" />
        <SidebarLink path="/settings" icon={Settings} label="Settings" />
        
        <div className="flex items-center justify-between p-2 border-t border-border mt-2 pt-2">
          {!collapsed && <ThemeToggle />}
          
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
            <LogOut size={20} />
          </Button>
        </div>
      </div>
    </aside>
  );
}
