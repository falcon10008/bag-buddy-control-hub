
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { mockLuggage } from "@/utils/mock-data";
import { Luggage } from "@/types";
import { LayoutGrid, List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StockTable } from "@/components/stock/stock-table";
import { StockGrid } from "@/components/stock/stock-grid";
import { AddLuggageForm } from "@/components/stock/add-luggage-form";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const StockView = () => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [luggageItems, setLuggageItems] = useState<Luggage[]>(mockLuggage);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate pagination
  const totalPages = Math.ceil(luggageItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = luggageItems.slice(startIndex, startIndex + itemsPerPage);

  const handleAddLuggage = (newLuggage: Luggage) => {
    setLuggageItems([newLuggage, ...luggageItems]);
    setIsDialogOpen(false);
  };

  return (
    <AppLayout title="Luggage Stock">
      <div className="grid gap-6">
        {/* Top controls */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              <List className="mr-1 h-4 w-4" />
              Table View
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="mr-1 h-4 w-4" />
              Grid View
            </Button>
          </div>

          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-1 h-4 w-4" />
            Add Luggage
          </Button>
        </div>

        {/* View content */}
        <div className="bg-card rounded-lg border p-1 shadow-sm">
          {viewMode === "table" ? (
            <StockTable luggageItems={paginatedItems} />
          ) : (
            <StockGrid luggageItems={paginatedItems} />
          )}
        </div>

        {/* Pagination */}
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* Add Luggage Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Luggage</DialogTitle>
              <DialogDescription>
                Add details for the new luggage item
              </DialogDescription>
            </DialogHeader>
            <AddLuggageForm onSubmit={handleAddLuggage} onCancel={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default StockView;
