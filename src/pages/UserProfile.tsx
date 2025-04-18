
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { currentUser } from "@/utils/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Save, Bell, Eye, EyeOff, CreditCard, Luggage } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockLuggage } from "@/utils/mock-data";
import { LuggageCard } from "@/components/luggage/luggage-card";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(currentUser);
  const [activeTab, setActiveTab] = useState("profile");
  
  // Filter luggage owned by current user
  const userLuggage = mockLuggage.filter(item => item.ownerId === currentUser.id);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    console.log("Saving profile changes:", profileData);
    setIsEditing(false);
  };

  return (
    <AppLayout title="Profile">
      <div className="space-y-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="luggage">My Luggage</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
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
                    <Button onClick={handleSaveChanges}>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
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
                      {profileData.profileImage ? (
                        <AvatarImage src={profileData.profileImage} alt={profileData.name} />
                      ) : (
                        <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                          {profileData.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                    )}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <p className="text-lg">{profileData.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <p className="text-lg">{profileData.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <p className="capitalize">{profileData.role}</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="id">User ID</Label>
                        <p className="font-mono">{profileData.id}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Security section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Security</h3>
                  
                  {isEditing ? (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div></div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <p>Password</p>
                      </div>
                      <p className="text-muted-foreground">••••••••</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Luggage Tab */}
          <TabsContent value="luggage">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Luggage className="h-5 w-5" /> My Luggage
                </CardTitle>
                <CardDescription>
                  View and manage your luggage items
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userLuggage.length > 0 ? (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    {userLuggage.map(luggage => (
                      <LuggageCard key={luggage.id} luggage={luggage} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Luggage className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
                    <h3 className="text-lg font-medium mb-1">No luggage found</h3>
                    <p className="text-muted-foreground">
                      You don't have any luggage in the system yet.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Control how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <div className="grid gap-0.5">
                        <Label htmlFor="status-updates">Status Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when your luggage status changes
                        </p>
                      </div>
                    </div>
                    <Switch id="status-updates" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                      <div className="grid gap-0.5">
                        <Label htmlFor="lost-alerts">Lost Luggage Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts for lost luggage notifications
                        </p>
                      </div>
                    </div>
                    <Switch id="lost-alerts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <div className="grid gap-0.5">
                        <Label htmlFor="billing-notifs">Billing Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about billing and service charges
                        </p>
                      </div>
                    </div>
                    <Switch id="billing-notifs" />
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Communication Preferences</h3>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email-prefs">Email Notifications</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="email-prefs" defaultChecked />
                        <Label htmlFor="email-prefs">Enabled</Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sms-prefs">SMS Notifications</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="sms-prefs" />
                        <Label htmlFor="sms-prefs">Enabled</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button>Save Preferences</Button>
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
