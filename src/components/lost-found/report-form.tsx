
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  luggageId: z.string().min(1, {
    message: "Luggage ID is required",
  }),
  reportType: z.enum(["lost", "found"], {
    required_error: "Please select a report type",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
  lastSeen: z.string().optional(),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  contactName: z.string().min(1, {
    message: "Contact name is required",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface ReportFormProps {
  onSubmitSuccess?: (data: FormValues) => void;
  className?: string;
}

export function ReportForm({ onSubmitSuccess, className }: ReportFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      luggageId: "",
      reportType: "lost",
      description: "",
      lastSeen: "",
      location: "",
      contactName: "",
      contactEmail: "",
    },
  });

  function onSubmit(data: FormValues) {
    console.log("Report submitted:", data);
    
    // Simulate form submission
    setTimeout(() => {
      if (onSubmitSuccess) {
        onSubmitSuccess(data);
      }
      
      form.reset();
    }, 1000);
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Report Lost or Found Luggage</CardTitle>
        <CardDescription>
          Fill out the form below to report luggage as lost or found.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="reportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="lost">Lost Luggage</SelectItem>
                      <SelectItem value="found">Found Luggage</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select whether you are reporting lost or found luggage.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="luggageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Luggage ID (if known)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., QR12345" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the luggage ID if you know it, or leave blank if unknown.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Terminal B" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastSeen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Seen (if lost)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please describe the luggage (color, size, unique features, etc.)" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
