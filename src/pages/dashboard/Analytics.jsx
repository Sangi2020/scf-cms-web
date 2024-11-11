import React from "react";
function Analytics() {
    const metrics = [
      { label: 'Page Views', value: '125,432', change: '+12.3%' },
      { label: 'Bounce Rate', value: '32.4%', change: '-2.1%' },
      { label: 'Session Duration', value: '2m 45s', change: '+0.8%' },
      { label: 'Conversion Rate', value: '3.2%', change: '+1.4%' },
    ];
  
    return (
      <div className="w-full ">
        <h1 className="text-2xl font-bold mb-6 w-full">Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm">{metric.label}</h3>
              <p className="text-2xl font-bold mt-2">{metric.value}</p>
              <p className="text-sm text-green-600 mt-2">{metric.change} from last period</p>
            </div>
          ))}
        </div>
  
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {['Direct', 'Organic Search', 'Referral', 'Social'].map((source, index) => (
              <div key={index} className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{source}</span>
                    <span className="text-sm text-gray-500">{Math.floor(Math.random() * 40 + 10)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.floor(Math.random() * 40 + 10)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default Analytics;