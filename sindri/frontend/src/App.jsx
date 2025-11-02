import { useState, useEffect } from 'react';   
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart
} from 'recharts';

export default function App() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);   

  useEffect(() => {
    (async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("/dashboard/api/provider-analytics/", {
          withCredentials: true
        });
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading your analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-gray-100 rounded-lg shadow p-8 max-w-md text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-xl text-gray-600">No analytics available.</p>
        </div>
      </div>
    );
  }

  const bookingsPerServiceData = analytics.service_names.map((name, idx) => ({
    name,
    count: analytics.service_counts[idx] || 0,
  }));

  const monthlyData = analytics.months.map((m, idx) => ({
    month: `Month ${m}`,
    count: analytics.month_counts[idx] || 0,
  }));

  const completionRate = analytics.total_bookings > 0 
    ? ((analytics.completed_bookings / analytics.total_bookings) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            Provider Analytics Dashboard
          </h1>
          <p className="text-gray-600">Track your performance and insights at a glance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Bookings Card */}
          <div className="bg-gray-100 rounded-lg shadow p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="text-3xl">📅</div>
              <div className="bg-blue-100 text-blue-600 rounded px-2 py-1 text-xs font-semibold">
                Total
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{analytics.total_bookings}</div>
            <div className="text-gray-600 text-sm">Total Bookings</div>
          </div>

          {/* Completed Bookings Card */}
          <div className="bg-gray-100 rounded-lg shadow p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="text-3xl">✅</div>
              <div className="bg-blue-100 text-blue-600 rounded px-2 py-1 text-xs font-semibold">
                {completionRate}%
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{analytics.completed_bookings}</div>
            <div className="text-gray-600 text-sm">Completed Bookings</div>
          </div>

          {/* Revenue Card */}
          <div className="bg-gray-100 rounded-lg shadow p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="text-3xl">💰</div>
              <div className="bg-blue-100 text-blue-600 rounded px-2 py-1 text-xs font-semibold">
                INR
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">₹{analytics.total_revenue.toLocaleString()}</div>
            <div className="text-gray-600 text-sm">Total Revenue</div>
          </div>

          {/* Avg Revenue Card */}
          <div className="bg-gray-100 rounded-lg shadow p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="text-3xl">📈</div>
              <div className="bg-blue-100 text-blue-600 rounded px-2 py-1 text-xs font-semibold">
                Avg
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">
              ₹{analytics.completed_bookings > 0 
                ? Math.round(analytics.total_revenue / analytics.completed_bookings).toLocaleString()
                : 0}
            </div>
            <div className="text-gray-600 text-sm">Per Booking</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Performance Chart */}
          <div className="bg-gray-100 rounded-lg shadow p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-blue-600 mb-1">Service Performance</h2>
              <p className="text-gray-500 text-sm">Number of bookings by service type</p>
            </div>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={bookingsPerServiceData} margin={{ top: 10, right: 30, left: 10, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#6B7280" 
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    interval={0}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    allowDecimals={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" name="Bookings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Trend Chart */}
          <div className="bg-gray-100 rounded-lg shadow p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-blue-600 mb-1">Monthly Trends</h2>
              <p className="text-gray-500 text-sm">Booking activity over time</p>
            </div>
            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer>
                <LineChart data={monthlyData} margin={{ top: 20, right: 20, left: 60, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6B7280"
                  />
                  <YAxis 
                    stroke="#6B7280"
                    label={{ value: 'Number of Bookings', angle: -90, position: 'insideLeft', style: { fill: '#6B7280', textAnchor: 'middle' } }}
                    allowDecimals={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="count"
                    name="Monthly Bookings"
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Data updates in real-time • Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}