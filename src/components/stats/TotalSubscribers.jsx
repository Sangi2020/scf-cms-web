import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StatCard from '../ui/StatCard';
import {Mail} from 'lucide-react'

const TotalSubscribers = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/admin/stats/total-subscribers");
                const result = response.data.data;
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <StatCard
          title="Total Subscribers"
          value={data}
          description={'Recieved'}
          icon={Mail}
          iconColor="text-yellow-500"
        />
    )
}

export default TotalSubscribers