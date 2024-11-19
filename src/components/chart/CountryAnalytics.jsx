import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import { useTheme } from "../../context/ThemeContext";

export default function CountryAnalytics() {
  const [data, setData] = useState([["Country", "Total users"]]);
  const { theme } = useTheme(); // Access the theme from context

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulated API response
        const result = [
          { country: "US", totalUsers: 100 },
          { country: "GB", totalUsers: 50 },
          { country: "IN", totalUsers: 75 }
        ];

        // Format the data for Google Charts
        const chartData = [["Country", "Total users"]];
        result.forEach(item => {
          chartData.push([item.country, item.totalUsers]);
        });

        setData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const chartBackground = theme === "dark" ? "#191D23" : "#FFFFFF";
  const containerClasses = theme === "dark" ? "bg-base-200 text-neutral-content" : "bg-base-200 text-neutral-content";
  const datalessRegionColor = theme === "dark" ? "#FFFFFF" : "#191D23";

  return (
    <div className={`w-full mx-auto p-6 rounded-xl shadow-lg ${containerClasses}`}>
      <h1 className="text-3xl font-semibold text-center mb-6">
        Real-Time Active Users
      </h1>
      <div className="w-full h-[400px]">
        <Chart
          chartType="GeoChart"
          width="100%"
          height="100%"
          data={data}
          options={{
            colorAxis: { colors: ["#c799f8", "#7c3aed"] },
            backgroundColor: chartBackground,
            displayMode: "regions",
            resolution: "countries",
            datalessRegionColor: datalessRegionColor,
          }}
        />
      </div>
    </div>
  );
}