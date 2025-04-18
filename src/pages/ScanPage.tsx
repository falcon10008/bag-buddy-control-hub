
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { QRScanner } from "@/components/luggage/qr-scanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { mockLuggage } from "@/utils/mock-data";
import { LuggageStatus } from "@/types";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const ScanPage = () => {
  const { toast } = useToast();
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<LuggageStatus>("checked-in");
  const [notes, setNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [manualId, setManualId] = useState("");
  const [processedResult, setProcessedResult] = useState<{
    success: boolean;
    message: string;
    luggageId?: string;
  } | null>(null);

  const handleScan = (qrCode: string) => {
    setScannedCode(qrCode);
    setProcessedResult(null);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualId.trim()) {
      setScannedCode(manualId);
      setProcessedResult(null);
    }
  };

  const handleProcess = () => {
    if (!scannedCode) return;
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      const matchedLuggage = mockLuggage.find(
        item => item.id === scannedCode || item.qrCode === scannedCode
      );
      
      if (matchedLuggage) {
        setProcessedResult({
          success: true,
          message: `Luggage found! Status updated to ${selectedStatus}.`,
          luggageId: matchedLuggage.id
        });
        
        toast({
          title: "Status Updated",
          description: `Luggage status changed to ${selectedStatus.replace("-", " ")}.`,
          variant: "default",
        });
      } else {
        setProcessedResult({
          success: false,
          message: "No luggage found with the scanned code."
        });
      }
      
      setIsProcessing(false);
      setNotes("");
    }, 1500);
  };

  const formatStatus = (status: string): string => {
    return status.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <AppLayout title="Check-In / Scan">
      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Scan Section */}
          <Card>
            <CardHeader>
              <CardTitle>Scan QR Code</CardTitle>
              <CardDescription>
                Scan the QR code on the luggage tag
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <QRScanner onScanComplete={handleScan} />
              
              <Separator className="my-6" />
              
              <div className="w-full">
                <h3 className="font-medium mb-2">Or enter ID manually</h3>
                <form onSubmit={handleManualSubmit} className="flex space-x-2">
                  <Input
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    placeholder="Enter luggage ID or QR code"
                    className="flex-1"
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </div>
            </CardContent>
          </Card>
          
          {/* Status Update Section */}
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
              <CardDescription>
                Change the status for the scanned luggage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {scannedCode ? (
                <>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="px-3 py-1">
                      Code: {scannedCode}
                    </Badge>
                    <Button variant="ghost" onClick={() => setScannedCode(null)}>
                      Clear
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Select new status</Label>
                      <Select
                        value={selectedStatus}
                        onValueChange={(value) => setSelectedStatus(value as LuggageStatus)}
                      >
                        <SelectTrigger>
                          <SelectValue>{formatStatus(selectedStatus)}</SelectValue>
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
                      <Label htmlFor="notes">Notes (optional)</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add any additional information about this update"
                      />
                    </div>
                    
                    <Button
                      onClick={handleProcess}
                      disabled={isProcessing}
                      className="w-full"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Update Status"
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="h-40 flex flex-col items-center justify-center text-muted-foreground">
                  <p>Scan a QR code or enter an ID manually to continue</p>
                </div>
              )}
              
              {processedResult && (
                <div className={`mt-4 p-4 rounded-lg ${
                  processedResult.success 
                    ? "bg-green-500/10 text-green-700 dark:text-green-300" 
                    : "bg-red-500/10 text-red-700 dark:text-red-300"
                }`}>
                  <div className="flex items-start gap-2">
                    {processedResult.success ? (
                      <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">{processedResult.message}</p>
                      {processedResult.luggageId && (
                        <Button asChild variant="link" className="p-0 h-auto mt-1">
                          <Link to={`/luggage/${processedResult.luggageId}`}>
                            View luggage details
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Check-In Luggage</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Scan the QR code on the luggage tag using the scanner above</li>
              <li>If scanning doesn't work, enter the luggage ID manually</li>
              <li>Select the new status for the luggage</li>
              <li>Add any notes or additional information as needed</li>
              <li>Click "Update Status" to save the changes</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ScanPage;
