import { BookOpen, Github, Cloud, Image as ImageIcon, LayoutDashboard } from 'lucide-react';

export default function Manual() {
  return (
    <div className="space-y-8 text-zinc-300 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-8 h-8 text-emerald-400" />
        <h2 className="text-2xl font-semibold text-white">System Manual</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <LayoutDashboard className="w-6 h-6 text-indigo-400" />
            <h3 className="text-lg font-medium text-white">Dashboard Intelligence</h3>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            The Dashboard provides a real-time overview of your retail and visual intelligence metrics.
          </p>
          <ul className="space-y-2 text-sm text-zinc-400 list-disc list-inside">
            <li><strong>Retail Intelligence:</strong> Aggregates daily data from POS, marketing, and inventory sources to calculate performance metrics and generate revenue charts.</li>
            <li><strong>Inventory Alerts:</strong> Real-time feed of stock warnings (e.g., "Low Stock", "Stockout").</li>
            <li><strong>Smart Coaching Agent:</strong> Analyzes retail data and image metrics to provide proactive, AI-generated daily actions and recommendations using Gemini.</li>
          </ul>
        </section>

        <section className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <ImageIcon className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-medium text-white">Image Gallery</h3>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            The Gallery allows you to upload and analyze product images using Gemini's multimodal vision capabilities.
          </p>
          <ul className="space-y-2 text-sm text-zinc-400 list-disc list-inside">
            <li><strong>Automated Categorization:</strong> Identifies the product category from the image.</li>
            <li><strong>Quality Scoring:</strong> Assigns a quality score (1-5) based on lighting, framing, and clarity.</li>
            <li><strong>Duplicate Detection:</strong> Flags images that appear to be duplicates or highly similar to existing assets.</li>
          </ul>
        </section>
      </div>

      <section className="bg-violet-950/20 p-6 rounded-2xl border border-violet-900/30">
        <div className="flex items-center gap-3 mb-4">
          <Cloud className="w-6 h-6 text-violet-400" />
          <h3 className="text-lg font-medium text-white">Deployment & Exporting</h3>
        </div>
        <p className="text-sm leading-relaxed mb-4">
          To deploy this application or commit it to your own repositories (like GitHub or Firebase), use the built-in AI Studio tools:
        </p>
        <div className="space-y-3 text-sm text-zinc-300">
          <div className="flex items-start gap-3 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800">
            <Github className="w-5 h-5 text-zinc-400 mt-0.5" />
            <div>
              <strong className="text-white block mb-1">Export to GitHub / ZIP</strong>
              Click the <strong>Settings</strong> or <strong>Export</strong> menu in the AI Studio Build interface to download the source code as a ZIP file or push it directly to a GitHub repository.
            </div>
          </div>
          <div className="flex items-start gap-3 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800">
            <Cloud className="w-5 h-5 text-zinc-400 mt-0.5" />
            <div>
              <strong className="text-white block mb-1">Deploy to Cloud Run / Firebase</strong>
              You can deploy directly to Google Cloud Run via the AI Studio UI. For Firebase, export the code locally, run <code>npm run build</code>, and use the Firebase CLI (<code>firebase deploy</code>) to host the application.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
