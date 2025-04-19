
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Save, LogOut, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/context/theme-context";

interface UserProfile {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  theme: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchUserProfile();
  }, [user, navigate]);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();
        
      if (error) {
        throw error;
      }
      
      if (data) {
        setProfileData(data as UserProfile);
        setFormData({
          first_name: data.first_name,
          last_name: data.last_name,
          theme: data.theme
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThemeChange = (value: string) => {
    setFormData(prev => ({ ...prev, theme: value }));
  };

  const handleSaveChanges = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          theme: formData.theme,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      // Update profile data
      setProfileData(prev => ({
        ...prev!,
        ...formData,
        updated_at: new Date().toISOString()
      }));

      // Apply theme change
      if (formData.theme && formData.theme !== profileData?.theme) {
        setTheme(formData.theme as "light" | "dark");
      }
      
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleCancelEdit = () => {
    // Reset form data to profile data
    if (profileData) {
      setFormData({
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        theme: profileData.theme
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <AppLayout title="Profile">
        <div className="h-[50vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 size={40} className="animate-spin text-primary" />
            <p className="text-muted-foreground">Loading profile data...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Profile">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex justify-end">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleSignOut}>
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">User Profile</CardTitle>
                    <CardDescription>
                      View and manage your personal information
                    </CardDescription>
                  </div>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleCancelEdit} disabled={isSaving}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveChanges} disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile picture and basic info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="w-24 h-24">
                      {profileData?.avatar_url ? (
                        <AvatarImage src={profileData.avatar_url} alt={profileData.first_name || 'User'} />
                      ) : (
                        <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                          {profileData?.first_name?.[0] || user?.email?.[0] || 'U'}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {/* Avatar upload could be implemented here in the future */}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        {isEditing ? (
                          <Input
                            id="first_name"
                            name="first_name"
                            value={formData.first_name || ''}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <p className="text-lg">{profileData?.first_name || 'Not set'}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        {isEditing ? (
                          <Input
                            id="last_name"
                            name="last_name"
                            value={formData.last_name || ''}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <p className="text-lg">{profileData?.last_name || 'Not set'}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <p className="text-lg">{profileData?.email || user?.email || 'No email'}</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <p className="capitalize">{profileData?.role || 'User'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Theme settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Theme Settings</h3>
                  
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme Preference</Label>
                      {isEditing ? (
                        <Select
                          value={formData.theme || 'dark'}
                          onValueChange={handleThemeChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="capitalize">{profileData?.theme || 'Dark'}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user_since">User Since</Label>
                      <p>{new Date(profileData?.created_at || Date.now()).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                {/* Last updated timestamp */}
                <div className="pt-4 text-sm text-muted-foreground">
                  Last updated: {new Date(profileData?.updated_at || Date.now()).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default UserProfile;
