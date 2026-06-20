import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setStats(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return (
      <div className="p-10">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        ZeroTrace Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card
          title="Total Reports"
          value={stats.totalReports}
        />

        <Card
          title="Average Similarity"
          value={`${stats.averageSimilarity}%`}
        />

        <Card
          title="Highest Similarity"
          value={`${stats.highestSimilarity}%`}
        />

        <Card
          title="Low Risk"
          value={stats.lowRisk}
        />

        <Card
          title="Medium Risk"
          value={stats.mediumRisk}
        />

        <Card
          title="High Risk"
          value={stats.highRisk}
        />

      </div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg">

      <h2 className="text-gray-500">
        {title}
      </h2>

      <p className="text-4xl font-bold mt-3">
        {value}
      </p>

    </div>
  );
}

export default Dashboard;