
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Luggage, LuggageStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  ownerName: z.string().min(1, "Owner name is required"),
  color: z.string().min(1, "Color is required"),
  weight: z.coerce.number().positive("Weight must be positive"),
  description: z.string().optional(),
  status: z.enum(["checked-in", "in-transit", "delivered", "lost", "recovered"] as const),
  imageUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddLuggageFormProps {
  onSubmit: (luggage: Luggage) => void;
  onCancel: () => void;
}

export function AddLuggageForm({ onSubmit, onCancel }: AddLuggageFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: "",
      color: "",
      weight: 0,
      description: "",
      status: "checked-in" as LuggageStatus,
      imageUrl: "/placeholder.svg",
    },
  });

  const handleSubmit = (values: FormValues) => {
    const newLuggage: Luggage = {
      id: uuidv4(),
      ownerId: "user-" + uuidv4().slice(0, 8),
      ownerName: values.ownerName,
      color: values.color,
      weight: values.weight,
      status: values.status,
      description: values.description,
      tags: [],
      imageUrl: values.imageUrl || "/placeholder.svg",
      checkInDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
    
    onSubmit(newLuggage);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="ownerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input placeholder="Black" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="checked-in">Checked In</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                  <SelectItem value="recovered">Recovered</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Medium fabric suitcase with TSA lock" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input 
                  placeholder="/placeholder.svg" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Enter URL for luggage image or leave as default
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Save Luggage
          </Button>
        </div>
      </form>
    </Form>
  );
}
