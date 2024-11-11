import { Users, ShoppingBag, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';

function Overview() {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, change: '+12.5%', up: true },
    { label: 'Total Sales', value: '$12,345', icon: ShoppingBag, change: '+8.2%', up: true },
    { label: 'Revenue', value: '$54,321', icon: DollarSign, change: '-2.4%', up: false },
  ];

  return (
    <div className='w-full'>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-gray-500 text-sm">{stat.label}</h3>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 text-gray-400" />
            </div>
            <div className={`flex items-center mt-4 text-sm ${
              stat.up ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.up ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          {/* Activity list */}
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center py-2 border-b">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                <div>
                  <p className="text-sm font-medium">User completed action {item}</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Weekly Sales</span>
              <span className="text-sm font-medium">$4,320</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">New Users</span>
              <span className="text-sm font-medium">245</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending Orders</span>
              <span className="text-sm font-medium">12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;