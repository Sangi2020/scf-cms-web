import React from 'react';
import StatCard from '../../components/stats/StatCard'; // Import the StatCard component
import { Users, FileText, MessageSquare, Eye, BarChart, Mail, Clipboard } from 'lucide-react'; // Import relevant icons

function Overview() {
  // Define the CMS-related stats data in an array
  const stats = [
    {
      title: 'Total Pages',
      value: 50, // Example number of pages
      description: 'Published',
      icon: FileText,
      iconColor: 'text-blue-500',
      trend: 'up',
      trendValue: 5.0, // Example percentage growth
    },
    {
      title: 'Blog Posts',
      value: 120, // Example number of blog posts
      description: 'Published',
      icon: FileText,
      iconColor: 'text-green-500',
      trend: 'up',
      trendValue: 8.2, // Example percentage increase in posts
    },
    {
      title: 'Comments',
      value: 320, // Example number of comments
      description: 'Total Comments',
      icon: MessageSquare,
      iconColor: 'text-purple-500',
      trend: 'down',
      trendValue: 2.1, // Example percentage decrease in comments
    },
    {
      title: 'Visitors',
      value: 5000, // Example number of visitors
      description: 'this month',
      icon: Users,
      iconColor: 'text-orange-500',
      trend: 'up',
      trendValue: 15.8, // Example percentage increase in visitors
    },
    {
      title: 'Content Views',
      value: 15000, // Example number of views
      description: 'this month',
      icon: Eye,
      iconColor: 'text-teal-500',
      trend: 'up',
      trendValue: 10.3, // Example percentage increase in content views
    },
    {
      title: 'Active Users',
      value: 10, // Example number of active users or admins
      description: 'Managing content',
      icon: Users,
      iconColor: 'text-red-500',
      trend: 'up',
      trendValue: 20.5, // Example percentage increase in active users
    },
    {
      title: 'Total Newsletters',
      value: 500, // Example number of newsletters
      description: 'Sent',
      icon: Mail,
      iconColor: 'text-yellow-500',
      trend: 'up',
      trendValue: 7.8, // Example percentage increase in newsletters sent
    },
    {
      title: 'Total Enquiries',
      value: 120, // Example number of enquiries
      description: 'Received',
      icon: Clipboard,
      iconColor: 'text-indigo-500',
      trend: 'down',
      trendValue: 3.1, // Example percentage decrease in enquiries
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}  // Using index as a unique key (consider using a unique ID in production)
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          iconColor={stat.iconColor}
          trend={stat.trend}
          trendValue={stat.trendValue}
        />
      ))}
    </div>
  );
}

export default Overview;
