
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { ReportForm } from "@/components/lost-found/report-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockLuggage } from "@/utils/mock-data";
import { TabsContent, TabsTrigger, TabsList, Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const LostFound = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("lost");
  
  // Filter luggage based on status and search term
  const filteredLuggage = mockLuggage.filter(item => {
    const matchesStatus = activeTab === "lost" 
      ? item.status === "lost" 
      : item.status === "recovered";
      
    if (!searchTerm) return matchesStatus;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      matchesStatus && (
        item.description?.toLowerCase().includes(searchLower) ||
        item.id.toLowerCase().includes(searchLower) ||
        item.ownerName.toLowerCase().includes(searchLower) ||
        item.color.toLowerCase().includes(searchLower) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    );
  });

  return (
    <AppLayout title="Lost & Found">
      <div className="grid gap-6">
        <div className="grid md:grid-cols-5 gap-6">
          {/* Report Form */}
          <div className="md:col-span-2">
            <ReportForm />
          </div>
          
          {/* Lost and Found Items */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Lost & Found Database</CardTitle>
                <CardDescription>
                  Search for lost or found items
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by description, color, tag..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="lost" className="flex gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Lost Items
                    </TabsTrigger>
                    <TabsTrigger value="found" className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Found Items
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="lost" className="mt-4 space-y-4">
                    {filteredLuggage.length > 0 ? (
                      filteredLuggage.map((item) => (
                        <LostFoundItem key={item.id} item={item} type="lost" />
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <AlertTriangle className="h-12 w-12 mx-auto mb-2 opacity-20" />
                        <p>No lost items found matching your search criteria.</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="found" className="mt-4 space-y-4">
                    {filteredLuggage.length > 0 ? (
                      filteredLuggage.map((item) => (
                        <LostFoundItem key={item.id} item={item} type="found" />
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <CheckCircle2 className="h-12 w-12 mx-auto mb-2 opacity-20" />
                        <p>No found items matching your search criteria.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Tips and Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Tips for Lost Luggage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Act Quickly
                </h3>
                <p className="text-sm text-muted-foreground">
                  Report lost luggage as soon as possible. The longer you wait, the harder it is to recover.
                </p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Search className="h-4 w-4" /> Be Detailed
                </h3>
                <p className="text-sm text-muted-foreground">
                  Provide as much detail as possible about your luggage, including color, size, and unique features.
                </p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Check Back
                </h3>
                <p className="text-sm text-muted-foreground">
                  Regularly check the lost and found database as new items are added daily.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

function LostFoundItem({ item, type }: { item: any; type: "lost" | "found" }) {
  return (
    <div className="border rounded-md p-4 flex items-start gap-4">
      <Avatar className="hidden sm:flex h-12 w-12">
        <AvatarFallback className="bg-primary/10 text-primary">
          {item.color.substring(0, 1)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium truncate">
            {item.description || "Unknown Item"}
          </h3>
          <Badge variant="outline" className="shrink-0">
            {item.color}
          </Badge>
        </div>
        
        <div className="text-sm text-muted-foreground mb-2">
          {type === "lost" ? (
            <p>Lost by {item.ownerName} • Last seen at {item.location || "Unknown"}</p>
          ) : (
            <p>Found at {item.location || "Unknown"} • Awaiting claim</p>
          )}
          <p className="mt-1">
            Tags: {item.tags.join(", ")}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            {type === "lost" ? "Reported" : "Found"} {new Date(item.lastUpdated).toLocaleDateString()}
          </p>
          <Button asChild variant="link" className="p-0 h-auto">
            <Link to={`/luggage/${item.id}`}>View Details →</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LostFound;
