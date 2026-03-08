import { useState, useEffect } from 'react';
import { Image, BarChart3, Zap, BrainCircuit, AlertTriangle, TrendingUp, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface CategoryStat {
  category: string;
  revenue: number;
  margin: number;
}

interface InventoryAlert {
  product: string;
  status: string;
}

interface RetailData {
  daily_summary: { total_revenue: number; avg_ticket: number; date: string };
  category_stats: CategoryStat[];
  inventory_alerts: InventoryAlert[];
}

interface InsightData {
  insight: string;
  correlation_score: number;
  category: string;
}

interface CoachingAction {
  title: string;
  description: string;
  severity: string;
}

interface CoachingData {
  summary: string;
  daily_actions: CoachingAction[];
  anomalies: string[];
  tests_suggested: string[];
}

export default function Dashboard() {
  const [retailData, setRetailData] = useState<RetailData | null>(null);
  const [insight, setInsight] = useState<InsightData | null>(null);
  const [coaching, setCoaching] = useState<CoachingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [retailRes, insRes, coachRes] = await Promise.allSettled([
          fetch('/api/retail-data').then(res => res.ok ? res.json() : Promise.reject('Failed to fetch retail data')),
          fetch('/api/insights').then(res => res.ok ? res.json() : Promise.reject('Failed to fetch insights')),
          fetch('/api/coaching-insights').then(res => res.ok ? res.json() : Promise.reject('Failed to fetch coaching insights'))
        ]);

        if (retailRes.status === 'fulfilled') setRetailData(retailRes.value);
        if (insRes.status === 'fulfilled') setInsight(insRes.value);
        if (coachRes.status === 'fulfilled') setCoaching(coachRes.value);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-400">Loading intelligence data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Top Metrics Row */}
      <section className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg font-medium">Daily Revenue</h2>
          </div>
          <span className="text-emerald-400 text-xs bg-emerald-400/10 px-2 py-1 rounded">+12.5%</span>
        </div>
        <p className="text-3xl font-bold mb-2">${retailData?.daily_summary.total_revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p className="text-zinc-400 text-sm">Avg Ticket: ${retailData?.daily_summary.avg_ticket.toFixed(2)}</p>
      </section>

      <section className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Image className="w-6 h-6 text-indigo-400" />
            <h2 className="text-lg font-medium">Image Intelligence</h2>
          </div>
          <span className="bg-indigo-900/30 text-indigo-400 px-2 py-1 rounded text-xs font-bold">ACTIVE</span>
        </div>
        <p className="text-3xl font-bold mb-2">4,821</p>
        <p className="text-zinc-400 text-sm">Images Analyzed Today</p>
      </section>

      <section className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-amber-400" />
            <h2 className="text-lg font-medium">Inventory Alerts</h2>
          </div>
          <span className="bg-amber-900/30 text-amber-400 px-2 py-1 rounded text-xs font-bold">{retailData?.inventory_alerts.length} ALERTS</span>
        </div>
        <div className="space-y-3">
          {retailData?.inventory_alerts.map((alert, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-zinc-300">{alert.product}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${alert.status === 'Stockout' ? 'bg-red-900/50 text-red-400' : 'bg-amber-900/50 text-amber-400'}`}>
                {alert.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Multimodal Insights Banner */}
      <section className="bg-violet-950/20 p-6 rounded-2xl border border-violet-900/30 col-span-1 md:col-span-3">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-violet-400" />
          <h2 className="text-lg font-medium">MULTIMODAL INSIGHTS</h2>
          <span className="ml-auto text-xs text-violet-400 bg-violet-400/10 px-2 py-1 rounded">Confidence: {(insight?.correlation_score || 0) * 100}%</span>
        </div>
        <p className="text-lg text-zinc-200">{insight?.insight}</p>
      </section>

      {/* Charts Section */}
      <section className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 col-span-1 md:col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-blue-400" />
          <h2 className="text-lg font-medium">Revenue by Category</h2>
        </div>
        <div className="h-64 w-full">
          {retailData && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={retailData.category_stats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="category" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  cursor={{ fill: '#27272a' }}
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                />
                <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                  {retailData.category_stats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10b981' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      {/* Coaching Agent Section */}
      <section className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 col-span-1">
        <div className="flex items-center gap-3 mb-4">
          <BrainCircuit className="w-6 h-6 text-amber-400" />
          <h2 className="text-lg font-medium">Smart Coaching Agent</h2>
        </div>
        <p className="text-zinc-300 mb-6 text-sm leading-relaxed">{coaching?.summary}</p>
        
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Recommended Actions</h3>
        <div className="space-y-3 overflow-y-auto max-h-64 pr-2 custom-scrollbar">
          {coaching?.daily_actions?.map((action, i) => (
            <div key={i} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <p className="font-medium text-zinc-100 text-sm">{action.title}</p>
                {action.severity === 'High' && <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{action.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
