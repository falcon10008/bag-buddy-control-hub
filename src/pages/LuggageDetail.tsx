
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  Luggage as LuggageIcon,
  MapPin,
  Calendar,
  User,
  Tag,
  Edit,
  Trash2,
  Save,
  X,
  Plane,
  Clock
} from "lucide-react";
import { mockLuggage } from "@/utils/mock-data";
import { Luggage as LuggageType } from "@/types";
import { formatDistanceToNow } from "date-fns";

const LuggageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [luggage, setLuggage] = useState<LuggageType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<LuggageType>>({});
  
  const statusColorMap = {
    "checked-in": "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    "in-transit": "bg-amber-500/20 text-amber-700 dark:text-amber-300",
    "delivered": "bg-green-500/20 text-green-700 dark:text-green-300",
    "lost": "bg-red-500/20 text-red-700 dark:text-red-300",
    "recovered": "bg-purple-500/20 text-purple-700 dark:text-purple-300"
  };

  useEffect(() => {
    // Find luggage by ID
    const item = mockLuggage.find(item => item.id === id);
    
    if (item) {
      setLuggage(item);
      setFormData(item);
    } else {
      // Handle 404 case
      console.error("Luggage not found");
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags: tagsArray }));
  };

  const handleSaveChanges = () => {
    if (luggage && formData) {
      const updatedLuggage = { ...luggage, ...formData };
      // In a real app, you would send an API request here
      console.log("Saving changes:", updatedLuggage);
      setLuggage(updatedLuggage);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData(luggage || {});
    setIsEditing(false);
  };

  const formatStatus = (status: string): string => {
    return status.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase());
  };

  if (!luggage) {
    return (
      <AppLayout title="Luggage Details">
        <div className="flex items-center justify-center h-64">
          <p>Loading luggage details...</p>
        </div>
      </AppLayout>
    );
  }

  const lastUpdated = formatDistanceToNow(new Date(luggage.lastUpdated), { addSuffix: true });

  return (
    <AppLayout title="Luggage Details">
      {/* Back button and actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Luggage details */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Main info */}
        <Card className="col-span-3 md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Luggage Details</CardTitle>
                <CardDescription>View and edit luggage information</CardDescription>
              </div>
              <Badge className={statusColorMap[luggage.status]}>
                {formatStatus(luggage.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic details */}
            <div className="grid md:grid-cols-2 gap-6">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={formData.description || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value) => handleSelectChange("status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checked-in">Checked In</SelectItem>
                        <SelectItem value="in-transit">In Transit</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                        <SelectItem value="recovered">Recovered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      name="color"
                      value={formData.color || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={formData.weight || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="flight">Flight</Label>
                    <Input
                      id="flight"
                      name="flight"
                      value={formData.flight || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-1">ID</h3>
                      <p className="font-mono">{luggage.id}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-1">Description</h3>
                      <p>{luggage.description || "No description"}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-1">Color</h3>
                      <p>{luggage.color}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-1">Weight</h3>
                      <p>{luggage.weight} kg</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Current Location</p>
                        <p className="text-sm text-muted-foreground">{luggage.location || "Unknown"}</p>
                      </div>
                    </div>
                    
                    {luggage.flight && (
                      <div className="flex items-center gap-2">
                        <Plane className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Flight</p>
                          <p className="text-sm text-muted-foreground">{luggage.flight}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Check-in Date</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(luggage.checkInDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Last Updated</p>
                        <p className="text-sm text-muted-foreground">{lastUpdated}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <Separator />
            
            {/* Tags */}
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Tag className="h-4 w-4" /> Tags
              </h3>
              
              {isEditing ? (
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags?.join(", ") || ""}
                    onChange={handleTagsChange}
                    placeholder="e.g., fragile, electronics, clothing"
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {luggage.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <Separator />
            
            {/* Owner info */}
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <User className="h-4 w-4" /> Owner Information
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{luggage.ownerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ID</p>
                  <p className="font-medium">{luggage.ownerId}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* QR Code and Image */}
        <Card className="col-span-3 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Visual Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Luggage image */}
            <div>
              <h3 className="font-medium text-sm mb-2">Luggage Image</h3>
              <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                {luggage.imageUrl ? (
                  <img 
                    src={luggage.imageUrl} 
                    alt="Luggage" 
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <LuggageIcon className="h-16 w-16 text-muted-foreground" />
                )}
              </div>
              
              {isEditing && (
                <div className="mt-2">
                  <Label htmlFor="image">Upload Image</Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="mt-1"
                  />
                </div>
              )}
            </div>
            
            {/* QR Code */}
            <div>
              <h3 className="font-medium text-sm mb-2">QR Code</h3>
              <div className="aspect-square bg-white border rounded-md p-4 flex items-center justify-center">
                {luggage.qrCode ? (
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gray-200 rounded-md flex items-center justify-center">
                      {/* Replace with actual QR Code component in real app */}
                      <p className="text-xs text-gray-500">QR Code</p>
                    </div>
                    <p className="mt-2 text-sm font-mono">{luggage.qrCode}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No QR Code available</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default LuggageDetail;
