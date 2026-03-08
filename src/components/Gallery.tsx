import React, { useState } from 'react';
import { analyzeImage } from '../services/imageService';
import { Upload, Image as ImageIcon, Tag, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Product {
  id: string;
  imageUrl: string;
  category: string;
  quality: number;
  isDuplicate: boolean;
  timestamp: Date;
}

export default function Gallery() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];
        const mimeType = file.type;
        
        try {
          const data = await analyzeImage(base64String, mimeType);
          
          const newProduct: Product = {
            id: Math.random().toString(36).substring(7),
            imageUrl: reader.result as string,
            category: data.category || 'Unknown',
            quality: data.quality || 0,
            isDuplicate: data.isDuplicate || false,
            timestamp: new Date()
          };

          setProducts(prev => [newProduct, ...prev]);
        } catch (err) {
          setError(String(err));
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(String(err));
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-emerald-400" />
          Product Gallery
        </h2>
        
        <label className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Upload className="w-4 h-4" />
          <span>Upload Image</span>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
            disabled={loading}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center p-12 border-2 border-dashed border-zinc-800 rounded-xl">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-zinc-400">Analyzing image with Gemini AI...</p>
          </div>
        </div>
      )}

      {products.length === 0 && !loading && !error ? (
        <div className="flex flex-col items-center justify-center p-24 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500">
          <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg">No products analyzed yet.</p>
          <p className="text-sm">Upload an image to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group hover:border-zinc-700 transition-colors">
              <div className="aspect-square relative overflow-hidden bg-zinc-950">
                <img 
                  src={product.imageUrl} 
                  alt={product.category}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.isDuplicate && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    DUPLICATE
                  </div>
                )}
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 text-zinc-100 font-medium">
                    <Tag className="w-4 h-4 text-emerald-400" />
                    {product.category}
                  </div>
                  <div className="flex items-center gap-1 bg-zinc-950 px-2 py-1 rounded text-xs font-mono">
                    <span className="text-zinc-500">Q:</span>
                    <span className={product.quality >= 4 ? 'text-emerald-400' : product.quality >= 3 ? 'text-amber-400' : 'text-red-400'}>
                      {product.quality}/5
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>{product.timestamp.toLocaleTimeString()}</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Analyzed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
