import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function AdminUpload() {
  const [portraitFile, setPortraitFile] = useState<File | null>(null);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [certName, setCertName] = useState("");
  const [status, setStatus] = useState("");

  const handleUploadPortrait = async () => {
    if (!portraitFile) return;
    setStatus("Uploading portrait...");
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      try {
        const res = await fetch("/api/upload-portrait", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64 }),
        });
        if (res.ok) {
          setStatus("Portrait uploaded successfully! It will be saved into your code repository.");
        } else {
          setStatus("Error uploading portrait.");
        }
      } catch (err) {
        setStatus("Network error uploading portrait.");
      }
    };
    reader.readAsDataURL(portraitFile);
  };

  const handleUploadCert = async () => {
    if (!certFile || !certName) return;
    setStatus("Uploading certificate...");
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      try {
        const res = await fetch("/api/upload-certificate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64, id: certName }),
        });
        if (res.ok) {
          setStatus("Certificate uploaded successfully!");
        } else {
          setStatus("Error uploading certificate.");
        }
      } catch (err) {
        setStatus("Network error uploading certificate.");
      }
    };
    reader.readAsDataURL(certFile);
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-24 px-6">
      <h1 className="text-3xl font-light tracking-wide text-primary-dark dark:text-primary-light mb-8">Admin Upload Panel</h1>
      
      <Card className="p-6 mb-8 border-gold/20 bg-primary-light/50 dark:bg-primary-dark/50">
        <h2 className="text-xl font-medium mb-4">Update Portrait</h2>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setPortraitFile(e.target.files?.[0] || null)}
          className="mb-4 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
        />
        <Button onClick={handleUploadPortrait} disabled={!portraitFile}>
          Upload Portrait
        </Button>
      </Card>

      <Card className="p-6 border-gold/20 bg-primary-light/50 dark:bg-primary-dark/50">
        <h2 className="text-xl font-medium mb-4">Upload Certificate</h2>
        <input 
          type="text" 
          placeholder="Filename (e.g. usda-haccp)" 
          value={certName}
          onChange={(e) => setCertName(e.target.value)}
          className="mb-4 w-full p-2 rounded border bg-transparent border-primary-dark/20 dark:border-primary-light/20"
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setCertFile(e.target.files?.[0] || null)}
          className="mb-4 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
        />
        <Button onClick={handleUploadCert} disabled={!certFile || !certName}>
          Upload Certificate
        </Button>
      </Card>

      {status && (
        <p className="mt-6 p-4 rounded bg-gold/20 text-primary-dark dark:text-primary-light font-medium">
          {status}
        </p>
      )}
    </div>
  );
}
