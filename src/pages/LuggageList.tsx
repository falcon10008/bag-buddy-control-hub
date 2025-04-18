
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { LuggageFilter } from "@/components/luggage/luggage-filter";
import { LuggageCard } from "@/components/luggage/luggage-card";
import { mockLuggage } from "@/utils/mock-data";
import { Luggage } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

const LuggageList = () => {
  const [filteredLuggage, setFilteredLuggage] = useState<Luggage[]>(mockLuggage);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filter luggage based on search and filter criteria
  const handleFilterChange = (filters: { 
    search: string; 
    status: string; 
    color: string; 
    weight: string;
  }) => {
    let result = [...mockLuggage];

    // Apply search filter (case-insensitive)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter((item) => 
        item.description?.toLowerCase().includes(searchLower) ||
        item.id.toLowerCase().includes(searchLower) ||
        item.ownerName.toLowerCase().includes(searchLower) ||
        item.color.toLowerCase().includes(searchLower) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply status filter
    if (filters.status !== "all") {
      result = result.filter((item) => item.status === filters.status);
    }

    // Apply color filter
    if (filters.color !== "all") {
      result = result.filter((item) => item.color === filters.color);
    }

    // Apply weight filter
    if (filters.weight !== "all") {
      switch (filters.weight) {
        case "light":
          result = result.filter((item) => item.weight < 10);
          break;
        case "medium":
          result = result.filter((item) => item.weight >= 10 && item.weight <= 15);
          break;
        case "heavy":
          result = result.filter((item) => item.weight > 15);
          break;
      }
    }

    setFilteredLuggage(result);
  };

  const statusColorMap = {
    "checked-in": "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    "in-transit": "bg-amber-500/20 text-amber-700 dark:text-amber-300",
    "delivered": "bg-green-500/20 text-green-700 dark:text-green-300",
    "lost": "bg-red-500/20 text-red-700 dark:text-red-300",
    "recovered": "bg-purple-500/20 text-purple-700 dark:text-purple-300"
  };

  const formatStatus = (status: string): string => {
    return status.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <AppLayout title="Luggage List">
      <div className="grid gap-6">
        {/* Filters and search */}
        <LuggageFilter onFilterChange={handleFilterChange} />

        {/* View toggle */}
        <div className="flex justify-end">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "table")}>
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Results count */}
        <div>
          <p className="text-muted-foreground">
            Showing {filteredLuggage.length} {filteredLuggage.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLuggage.map((luggage) => (
              <LuggageCard key={luggage.id} luggage={luggage} />
            ))}
            {filteredLuggage.length === 0 && (
              <Card className="col-span-full p-8 text-center text-muted-foreground">
                No luggage items found matching your criteria.
              </Card>
            )}
          </div>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLuggage.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center h-32">
                      No luggage items found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLuggage.map((luggage) => (
                    <TableRow key={luggage.id}>
                      <TableCell className="font-medium">{luggage.id.slice(0, 8)}</TableCell>
                      <TableCell>{luggage.description || "N/A"}</TableCell>
                      <TableCell>{luggage.color}</TableCell>
                      <TableCell>{luggage.weight} kg</TableCell>
                      <TableCell>{luggage.ownerName}</TableCell>
                      <TableCell>
                        <Badge className={statusColorMap[luggage.status]}>
                          {formatStatus(luggage.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{luggage.location || "N/A"}</TableCell>
                      <TableCell className="text-right">
                        <Button asChild size="icon" variant="ghost">
                          <Link to={`/luggage/${luggage.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default LuggageList;
