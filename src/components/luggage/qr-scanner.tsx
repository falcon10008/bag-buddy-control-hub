
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScanSearch, Loader2, Check, X } from "lucide-react";

// Simulating QR scanning functionality
export function QRScanner({
  onScanComplete,
}: {
  onScanComplete: (code: string) => void;
}) {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startScan = () => {
    setScanning(true);
    setError(null);
    setScanResult(null);

    // Simulate scanning process with a timeout
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      
      if (success) {
        const mockQRCode = `QR${Math.floor(10000 + Math.random() * 90000)}`; // Generate random QR code
        setScanResult(mockQRCode);
        onScanComplete(mockQRCode);
      } else {
        setError("Failed to scan QR code. Please try again.");
      }
      
      setScanning(false);
    }, 2000);
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-6 flex flex-col items-center">
        <div 
          className={`
            w-64 h-64 mb-4 border-2 rounded-lg flex items-center justify-center
            ${scanning ? "border-primary animate-pulse" : "border-dashed border-muted"}
            ${scanResult ? "border-green-500" : ""} 
            ${error ? "border-red-500" : ""}
          `}
        >
          {scanning ? (
            <Loader2 className="h-12 w-12 text-muted-foreground animate-spin" />
          ) : scanResult ? (
            <div className="text-center">
              <Check className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <p className="font-medium">{scanResult}</p>
            </div>
          ) : error ? (
            <div className="text-center p-4">
              <X className="h-12 w-12 text-red-500 mx-auto mb-2" />
              <p className="text-sm text-red-500">{error}</p>
            </div>
          ) : (
            <div className="text-center p-4">
              <ScanSearch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">Scan area</p>
            </div>
          )}
        </div>

        <Button
          onClick={startScan}
          disabled={scanning}
          className="w-full"
        >
          {scanning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : scanResult ? (
            "Scan Again"
          ) : (
            "Scan QR Code"
          )}
        </Button>

        {error && (
          <p className="text-sm text-muted-foreground mt-2">
            {error}
          </p>
        )}
      </div>
    </Card>
  );
}
