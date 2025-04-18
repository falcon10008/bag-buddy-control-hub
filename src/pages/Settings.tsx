
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/theme-context";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Moon, Sun, Monitor, Languages, Mail, Bell, Zap } from "lucide-react";

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <AppLayout title="Settings">
      <div className="grid gap-6">
        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize how BagBuddy looks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Theme</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center gap-2">
                    <Button 
                      variant={theme === "light" ? "default" : "outline"} 
                      className="w-full h-20 flex flex-col gap-2"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-6 w-6" />
                      <span>Light</span>
                    </Button>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Button 
                      variant={theme === "dark" ? "default" : "outline"} 
                      className="w-full h-20 flex flex-col gap-2"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-6 w-6" />
                      <span>Dark</span>
                    </Button>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Button 
                      variant="outline" 
                      className="w-full h-20 flex flex-col gap-2"
                      onClick={() => {
                        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        setTheme(prefersDark ? "dark" : "light");
                      }}
                    >
                      <Monitor className="h-6 w-6" />
                      <span>System</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Language</h3>
                <div className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-muted-foreground" />
                  <Select defaultValue="en">
                    <SelectTrigger className="w-full md:w-[240px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Manage how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label htmlFor="email-notifs">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                </div>
                <Switch id="email-notifs" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label htmlFor="push-notifs">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications in browser</p>
                  </div>
                </div>
                <Switch id="push-notifs" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label htmlFor="sms-notifs">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive text messages for critical updates</p>
                  </div>
                </div>
                <Switch id="sms-notifs" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number for SMS</Label>
                <Input id="phone" placeholder="Enter your phone number" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Data</CardTitle>
            <CardDescription>
              Control your data and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics">Share Anonymous Analytics</Label>
                <Switch id="analytics" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="cookies">Allow Cookies</Label>
                <Switch id="cookies" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing">Marketing Communications</Label>
                <Switch id="marketing" />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="font-medium">Your Data</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline">Export Your Data</Button>
                <Button variant="outline" className="text-destructive hover:text-destructive">
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;
