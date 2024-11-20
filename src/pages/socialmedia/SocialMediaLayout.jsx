
import React, { useState } from 'react';
import { 
  Instagram, 
  Facebook, 
  Share2, 
  Twitter, 
  Linkedin, 
  Globe, 
  MapPin 
} from 'lucide-react';

const SocialMediaLayout = () => {
  const [socialLinks, setSocialLinks] = useState({
    instagram: {
      url: "https://instagram.com/yourpage",
      name: "Instagram Official",
      region: "Social Media",
      icon: "/api/placeholder/48/48"
    },
    facebook: {
      url: "https://facebook.com/yourpage",
      name: "Facebook Page",
      region: "Social Media",
      icon: "/api/placeholder/48/48"
    },
    twitter: {
      url: "https://twitter.com/yourpage",
      name: "Twitter Profile",
      region: "Social Media",
      icon: "/api/placeholder/48/48"
    },
    linkedin: {
      url: "https://linkedin.com/in/yourprofile",
      name: "LinkedIn Business",
      region: "Professional",
      icon: "/api/placeholder/48/48"
    },
    whatsapp: {
      url: "https://wa.me/1234567890",
      name: "WhatsApp Business",
      region: "Messaging",
      icon: "/api/placeholder/48/48"
    }
  });

  const [editing, setEditing] = useState(null);
  const [newLink, setNewLink] = useState("");

  const platformIcons = {
    instagram: <Instagram className="text-pink-500" />,
    facebook: <Facebook className="text-blue-600" />,
    whatsapp: <Share2 className="text-green-500" />,
    twitter: <Twitter className="text-blue-400" />,
    linkedin: <Linkedin className="text-blue-700" />
  };

  const handleEditClick = (platform) => {
    setEditing(platform);
    setNewLink(socialLinks[platform].url);
  };

  const handleSaveClick = () => {
    setSocialLinks((prev) => ({
      ...prev,
      [editing]: {
        ...prev[editing],
        url: newLink
      }
    }));
    setEditing(null);
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
           
              <th>Platform</th>
              <th>URL</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(socialLinks).map(([platform, details]) => (
              <tr key={platform}>
                
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar w-12 h-12  flex items-center justify-center">
                      <div className="mask mask-squircle text-center  bg-base-300 ">
                        {platformIcons[platform]}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{details.name}</div>
                      <div className="text-sm opacity-50">{details.region}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {editing === platform ? (
                    <input
                      type="text"
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  ) : (
                    <div>
                      {details.url}
                      <br/>
                      <span className="badge badge-ghost badge-sm">{platform}</span>
                    </div>
                  )}
                </td>
                <td>Active</td>
                <th>
                  {editing === platform ? (
                    <div className="flex space-x-2">
                      <button className="btn btn-ghost btn-xs" onClick={handleSaveClick}>
                        save
                      </button>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => setEditing(null)}
                      >
                        cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleEditClick(platform)}
                    >
                      details
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
    </div>
  );
};

export default SocialMediaLayout;