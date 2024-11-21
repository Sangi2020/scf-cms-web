import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StatCard from '../ui/StatCard';
import {FileText} from 'lucide-react'
const TotalBlogStats = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/admin/stats/total-blogs");
                const result = response.data.data;
                setData(result);
            
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
  return (
    <StatCard
    title="Blog Posts"
    value={data}
    description={'Published'}
    icon={FileText}
    iconColor="text-green-500"
  />
  )
}

export default TotalBlogStats