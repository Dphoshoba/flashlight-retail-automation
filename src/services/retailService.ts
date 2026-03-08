export const RETAIL_CONFIG = {
  time_horizon_days: 90,
  stores: ["Store_A_Physical", "Store_B_Physical", "Online_Store"],
  categories: {
    Shoes: { price_range: [60, 200], margin_pct_range: [0.4, 0.55], seasonality: { weekend_multiplier: 1.1 } },
    Electronics: { price_range: [80, 800], margin_pct_range: [0.15, 0.3], seasonality: { campaign_multiplier: 1.5 } },
    Furniture: { price_range: [120, 1200], margin_pct_range: [0.35, 0.5] },
    Clothing: { price_range: [25, 150], margin_pct_range: [0.45, 0.6], seasonality: { collection_drop_multiplier: 1.4 } },
    Accessories: { price_range: [10, 80], margin_pct_range: [0.5, 0.7] }
  },
  transactions_per_day: {
    Store_A_Physical: [150, 300],
    Store_B_Physical: [100, 200],
    Online_Store: [250, 500]
  },
  basket_size: { physical_mean: 2.0, online_mean: 2.5 },
  marketing_channels: ["Email", "Social", "Paid_Search", "Display", "Organic"],
  image_quality_effect: { high_score_ctr_uplift: 0.15, high_score_conversion_uplift: 0.1 }
};

export function generateDailyRetailData() {
  // Simulate daily retail data based on config
  return {
    daily_summary: {
      total_revenue: 12482.00,
      avg_ticket: 84.50,
      date: new Date().toISOString().split('T')[0]
    },
    category_stats: Object.keys(RETAIL_CONFIG.categories).map(cat => ({
      category: cat,
      revenue: Math.random() * 5000,
      margin: Math.random() * 0.5
    })),
    inventory_alerts: [
      { product: "Running Shoes", status: "Low Stock" },
      { product: "Wireless Headphones", status: "Stockout" }
    ]
  };
}
