import React, { useState } from 'react';
import { analyzeImage } from '../services/imageService';

export default function TestPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setResult(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];
        const mimeType = file.type;
        
        try {
          const data = await analyzeImage(base64String, mimeType);
          setResult(JSON.stringify(data, null, 2));
        } catch (error) {
          setResult(String(error));
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setResult(String(error));
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">System Test Page</h2>
      
      <div className="flex flex-col gap-4 max-w-md">
        <label className="block">
          <span className="sr-only">Choose image</span>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
            disabled={loading}
            className="block w-full text-sm text-zinc-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-emerald-600 file:text-white
              hover:file:bg-emerald-700
              disabled:opacity-50"
          />
        </label>
      </div>

      {loading && (
        <div className="text-emerald-500 animate-pulse">Analyzing image...</div>
      )}

      {result && (
        <pre className="bg-zinc-900 p-4 rounded-lg text-emerald-400 overflow-auto">
          {result}
        </pre>
      )}
    </div>
  );
}
