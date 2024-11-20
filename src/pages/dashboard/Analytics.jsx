import React from "react";
import CountryAnalytics from "../../components/chart/CountryAnalytics";

function Analytics() {
    const metrics = [
      { label: 'Page Views', value: '125,432', change: '+12.3%' },
      { label: 'Bounce Rate', value: '32.4%', change: '-2.1%' },
      { label: 'Session Duration', value: '2m 45s', change: '+0.8%' },
      { label: 'Conversion Rate', value: '3.2%', change: '+1.4%' },
    ];
  
    return (
      <div className="w-full ">
        <h1 className="text-2xl font-bold mb-6 w-full text-neutral-content">Analytics</h1>
        
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm">{metric.label}</h3>
              <p className="text-2xl font-bold mt-2">{metric.value}</p>
              <p className="text-sm text-green-600 mt-2">{metric.change} from last period</p>
            </div>
          ))}
        </div> */}

        <CountryAnalytics />
  
       
      </div>
    );
  }
  
  export default Analytics;