
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { LuggageStatus } from "@/types";

interface LuggageFilterProps {
  onFilterChange: (filters: {
    search: string;
    status: string;
    color: string;
    weight: string;
  }) => void;
}

export function LuggageFilter({ onFilterChange }: LuggageFilterProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [color, setColor] = useState("all");
  const [weight, setWeight] = useState("all");
  
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange({ search: e.target.value, status, color, weight });
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onFilterChange({ search, status: value, color, weight });
  };

  const handleColorChange = (value: string) => {
    setColor(value);
    onFilterChange({ search, status, color: value, weight });
  };

  const handleWeightChange = (value: string) => {
    setWeight(value);
    onFilterChange({ search, status, color, weight: value });
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("all");
    setColor("all");
    setWeight("all");
    onFilterChange({ search: "", status: "all", color: "all", weight: "all" });
  };

  const colors = ["Black", "Blue", "Red", "Green", "Purple", "Brown", "Gray"];
  const statuses: LuggageStatus[] = ["checked-in", "in-transit", "delivered", "lost", "recovered"];
  
  const formatStatus = (status: string): string => {
    return status.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search luggage..."
            className="pl-8"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        {(search || status !== "all" || color !== "all" || weight !== "all") && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={resetFilters}
            title="Reset filters"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {formatStatus(s)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={color} onValueChange={handleColorChange}>
            <SelectTrigger>
              <SelectValue placeholder="Color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Colors</SelectItem>
              {colors.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={weight} onValueChange={handleWeightChange}>
            <SelectTrigger>
              <SelectValue placeholder="Weight" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Weights</SelectItem>
              <SelectItem value="light">Light (&lt; 10kg)</SelectItem>
              <SelectItem value="medium">Medium (10-15kg)</SelectItem>
              <SelectItem value="heavy">Heavy (&gt; 15kg)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
