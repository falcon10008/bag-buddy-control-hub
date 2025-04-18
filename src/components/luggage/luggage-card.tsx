
import { useState } from "react";
import { Link } from "react-router-dom";
import { Luggage } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Luggage as LuggageIcon, 
  Calendar, 
  MapPin, 
  Plane,
  Clock
} from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface LuggageCardProps {
  luggage: Luggage;
}

export function LuggageCard({ luggage }: LuggageCardProps) {
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

  const lastUpdated = formatDistanceToNow(new Date(luggage.lastUpdated), { addSuffix: true });

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className="h-2" style={{ backgroundColor: `var(--${luggage.status === "delivered" ? "status-active" : `status-${luggage.status}`})` }} />
      <CardHeader className="flex flex-row items-center gap-2 p-4">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
          <LuggageIcon className="h-6 w-6" />
        </div>
        <div>
          <p className="font-medium">{luggage.description}</p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <p>{luggage.color}</p>
            <span>•</span>
            <p>{luggage.weight} kg</p>
          </div>
        </div>
        <Badge className={`ml-auto ${statusColorMap[luggage.status]}`}>
          {formatStatus(luggage.status)}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid gap-2">
          {luggage.location && (
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{luggage.location}</span>
            </div>
          )}
          {luggage.flight && (
            <div className="flex items-center text-sm">
              <Plane className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Flight {luggage.flight}</span>
            </div>
          )}
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Checked in: {new Date(luggage.checkInDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Updated {lastUpdated}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2">
          {luggage.tags.map(tag => (
            <Badge key={tag} variant="outline" className="bg-secondary/50">
              {tag}
            </Badge>
          ))}
        </div>
        <Button variant="outline" asChild className="ml-auto">
          <Link to={`/luggage/${luggage.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
