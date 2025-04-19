
import { Luggage } from "@/types";
import { formatStatus } from "@/utils/format-utils";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface StockTableProps {
  luggageItems: Luggage[];
}

export function StockTable({ luggageItems }: StockTableProps) {
  const statusColorMap = {
    "checked-in": "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    "in-transit": "bg-amber-500/20 text-amber-700 dark:text-amber-300",
    "delivered": "bg-green-500/20 text-green-700 dark:text-green-300",
    "lost": "bg-red-500/20 text-red-700 dark:text-red-300",
    "recovered": "bg-purple-500/20 text-purple-700 dark:text-purple-300"
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Luggage ID</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {luggageItems.length > 0 ? (
          luggageItems.map((item) => (
            <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell className="font-medium">{item.id.slice(0, 8)}</TableCell>
              <TableCell>{item.description || "N/A"}</TableCell>
              <TableCell>{item.weight} kg</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ 
                      backgroundColor: item.color.toLowerCase(),
                      boxShadow: "0 0 0 1px rgba(0,0,0,0.1)" 
                    }}
                  />
                  {item.color}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={statusColorMap[item.status]}>
                  {formatStatus(item.status)}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(item.lastUpdated), 'MMM dd, yyyy')}
              </TableCell>
              <TableCell className="text-right">
                <Button asChild size="icon" variant="ghost">
                  <Link to={`/luggage/${item.id}`}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="h-32 text-center">
              No luggage items found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
