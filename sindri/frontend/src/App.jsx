import { useState, useEffect } from 'react';   
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function App() {
  console.log("React App mounted");  
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);   

  useEffect(() => {
    (async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("dashboard/api/provider-analytics/");
        setAnalytics(response.data);
      } catch (err) {
        setError("Failed to load analytics. Make sure you're logged in as a provider.");
        console.error("Analytics fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div className="p-6">Loading analytics...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!analytics) {
    return <div className="p-6">No analytics available.</div>;
  }

  const bookingsPerServiceData = analytics.service_names.map((name, idx) => ({
    name,
    count: analytics.service_counts[idx] || 0,
  }));

  const monthlyData = analytics.months.map((m, idx) => ({
    month: m,
    count: analytics.month_counts[idx] || 0,
  }));

  return (
    <div className="p-6 bg-white rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-3">Provider Analytics (React)</h2>

      <div className="mb-2">Total bookings: <strong>{analytics.total_bookings}</strong></div>
      <div className="mb-4">Completed bookings: <strong>{analytics.completed_bookings}</strong></div>
      <div className="mb-6">Total revenue: <strong>₹{analytics.total_revenue}</strong></div>

      <div style={{ width: "100%", height: 300 }} className="mb-6">
        <ResponsiveContainer>
          <BarChart data={bookingsPerServiceData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Bookings" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={monthlyData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" name="Monthly Bookings" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
