export interface SalesAnalyticsData {
    totalRevenue: number;
    completedOrders: number;
    categoryBreakdown: {
        category: string;
        revenue: number;
    }[];
}
