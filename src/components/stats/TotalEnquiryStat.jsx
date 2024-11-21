import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StatCard from '../ui/StatCard';
import {Clipboard} from 'lucide-react'

const TotalEnquiryStat = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/admin/stats/total-enquiries");
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
          title="Total Enquiries"
          value={data}
          description={'Recieved'}
          icon={Clipboard}
          iconColor="text-blue-500"
        />
    )
}

export default TotalEnquiryStat