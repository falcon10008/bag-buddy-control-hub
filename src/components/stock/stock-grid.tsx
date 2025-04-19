
import { Luggage } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { formatStatus } from "@/utils/format-utils";

interface StockGridProps {
  luggageItems: Luggage[];
}

export function StockGrid({ luggageItems }: StockGridProps) {
  const statusColorMap = {
    "checked-in": "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    "in-transit": "bg-amber-500/20 text-amber-700 dark:text-amber-300",
    "delivered": "bg-green-500/20 text-green-700 dark:text-green-300",
    "lost": "bg-red-500/20 text-red-700 dark:text-red-300",
    "recovered": "bg-purple-500/20 text-purple-700 dark:text-purple-300"
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {luggageItems.length > 0 ? (
        luggageItems.map((item) => (
          <Link to={`/luggage/${item.id}`} key={item.id} className="no-underline">
            <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-200 hover:border-primary/50">
              <div className="aspect-video relative bg-muted flex items-center justify-center">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.description || "Luggage"} 
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-muted-foreground text-sm">No image</div>
                )}
                <Badge 
                  className={`absolute top-2 right-2 ${statusColorMap[item.status]}`}
                >
                  {formatStatus(item.status)}
                </Badge>
              </div>
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm truncate">{item.id.slice(0, 12)}</h3>
                  <div 
                    className="w-4 h-4 rounded-full ml-2 flex-shrink-0" 
                    style={{ 
                      backgroundColor: item.color.toLowerCase(),
                      boxShadow: "0 0 0 1px rgba(0,0,0,0.1)"
                    }}
                  />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description || "No description"}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">{item.weight} kg</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{item.color}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <span className="text-xs text-muted-foreground">
                  Owner: {item.ownerName}
                </span>
                <Button size="sm" variant="ghost">
                  <Eye className="h-3 w-3 mr-1" />
                  Details
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))
      ) : (
        <div className="col-span-full flex items-center justify-center h-32 text-muted-foreground">
          No luggage items found
        </div>
      )}
    </div>
  );
}
