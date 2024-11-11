import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Switch } from '../../components/ui/Switch';
import { 
  Bell, 
  Moon, 
  Shield, 
  Globe, 
  Mail,
  Smartphone,
  Clock,
  Database,
  Save
} from 'lucide-react';

const Settings = () => {
  return (
    <div className=" ">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">Manage your application preferences and configurations</p>
      </div>

      {/* Appearance Settings */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Moon className="w-5 h-5 mr-2" />
          Appearance
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-gray-600">Toggle dark mode on/off</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Compact Mode</p>
              <p className="text-sm text-gray-600">Reduce padding and margins</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive email updates</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-gray-600">Receive push notifications</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Desktop Notifications</p>
              <p className="text-sm text-gray-600">Show desktop alerts</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Security
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Login Alerts</p>
              <p className="text-sm text-gray-600">Get notified of new sign-ins</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Language and Region */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Language & Region
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Language</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time Zone</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>UTC-08:00) Pacific Time</option>
              <option>(UTC-05:00) Eastern Time</option>
              <option>(UTC+00:00) UTC</option>
              <option>(UTC+01:00) Central European Time</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2" />
          Data & Storage
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Auto-save Frequency</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>Every 5 minutes</option>
              <option>Every 15 minutes</option>
              <option>Every 30 minutes</option>
              <option>Every hour</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Clear Cache</p>
              <p className="text-sm text-gray-600">Clear temporary files</p>
            </div>
            <Button variant="outline">Clear</Button>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Storage Usage</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">7.0 GB of 10 GB used</p>
          </div>
        </div>
      </Card>

      {/* Contact Preferences */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Mail className="w-5 h-5 mr-2" />
          Contact Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Emails</p>
              <p className="text-sm text-gray-600">Receive product updates and offers</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">System Emails</p>
              <p className="text-sm text-gray-600">Important system notifications</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Mobile Settings */}
      <Card className="p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Smartphone className="w-5 h-5 mr-2" />
          Mobile Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Mobile Data Usage</p>
              <p className="text-sm text-gray-600">Sync on mobile data</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Download on Mobile</p>
              <p className="text-sm text-gray-600">Allow downloads on mobile data</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="flex items-center">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;