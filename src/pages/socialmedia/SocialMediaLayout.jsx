import React, { useState } from 'react';
import { 
  Instagram, 
  Facebook, 
  Share2, 
  Twitter, 
  Linkedin,
  Link as LinkIcon,
  CheckCircle,
  XCircle,
  Globe,
  Plus
} from 'lucide-react';

const SocialMediaLayout = () => {
  const [socialLinks, setSocialLinks] = useState({
    instagram: {
      url: "https://instagram.com/yourpage",
      name: "Instagram Official",
      region: "Social Media",
      active: true,
      lastChecked: "2024-03-15"
    },
    facebook: {
      url: "https://facebook.com/yourpage",
      name: "Facebook Page",
      region: "Social Media",
      active: true,
      lastChecked: "2024-03-15"
    },
    twitter: {
      url: "https://twitter.com/yourpage",
      name: "Twitter Profile",
      region: "Social Media",
      active: false,
      lastChecked: "2024-03-14"
    },
    linkedin: {
      url: "https://linkedin.com/in/yourprofile",
      name: "LinkedIn Business",
      region: "Professional",
      active: true,
      lastChecked: "2024-03-15"
    },
    whatsapp: {
      url: "https://wa.me/1234567890",
      name: "WhatsApp Business",
      region: "Messaging",
      active: true,
      lastChecked: "2024-03-15"
    }
  });

  const [editing, setEditing] = useState(null);
  const [newLink, setNewLink] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const platformIcons = {
    instagram: <Instagram className="w-6 h-6 text-pink-500" />,
    facebook: <Facebook className="w-6 h-6 text-blue-600" />,
    whatsapp: <Share2 className="w-6 h-6 text-green-500" />,
    twitter: <Twitter className="w-6 h-6 text-blue-400" />,
    linkedin: <Linkedin className="w-6 h-6 text-blue-700" />
  };

  const handleEditClick = (platform) => {
    setEditing(platform);
    setNewLink(socialLinks[platform].url);
  };

  const handleSaveClick = () => {
    if (!isValidUrl(newLink)) {
      alert("Please enter a valid URL");
      return;
    }

    setSocialLinks((prev) => ({
      ...prev,
      [editing]: {
        ...prev[editing],
        url: newLink,
        lastChecked: new Date().toISOString().split('T')[0]
      }
    }));
    setEditing(null);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleToggleStatus = (platform) => {
    setSocialLinks((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        active: !prev[platform].active
      }
    }));
  };

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link");
    }
  };

  return (
    <div className="card w-full bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-base md:text-2xl text-neutral-content flex items-center gap-2">
          <Globe className="w-6 h-6 text-accent " />
          Social Media Management
        </h2>


        <div className="overflow-x-auto">
          <table className="table w-full ">
            <thead>
              <tr className="text-base text-neutral-content">
                <th className="w-1/4">Platform</th>
                <th className="w-1/4">URL</th>
                <th className="w-1/4">Status</th>
                <th className="w-1/4 ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(socialLinks).map(([platform, details]) => (
                <tr key={platform}className='border-t border-base-300'>
    
                  <td className='text-neutral-content'>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-base-200 rounded-lg w-12 h-12">
                          <div className="flex items-center justify-center ">
                            {platformIcons[platform]}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{details.name}</div>
                        <div className="text-sm">{details.region}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {editing === platform ? (
                      <input
                        type="text"
                        value={newLink}
                        onChange={(e) => setNewLink(e.target.value)}
                        className="input input-bordered w-full max-w-xs text-neutral-content"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="truncate font-mono max-w-xs text-neutral-content">{details.url}</span>
                        <button
                          onClick={() => copyToClipboard(details.url)}
                          className="btn btn-ghost btn-sm"
                        >
                          <LinkIcon className="w-4 h-4 text-neutral-content" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleStatus(platform)}
                      className={`badge badge-lg text-white ${details.active ? 'badge-success' : 'badge-error'} gap-1`}
                    >
                      {details.active ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      {details.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="">
                    {editing === platform ? (
                      <div className="flex gap-2">
                        <button
                          className="btn btn-success btn-sm text-white"
                          onClick={handleSaveClick}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-error text-white btn-sm"
                          onClick={() => setEditing(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEditClick(platform)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaLayout;
