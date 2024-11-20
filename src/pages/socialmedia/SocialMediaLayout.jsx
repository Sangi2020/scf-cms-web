import React, { useState } from "react";
import { Instagram, Facebook, Share2, Twitter, Linkedin, Globe, MapPin } from "lucide-react";

function SocialMediaLayout() {
  const [socialLinks, setSocialLinks] = useState({
    instagram: "https://instagram.com/yourpage",
    facebook: "https://facebook.com/yourpage",
    whatsapp: "https://wa.me/1234567890",
    twitter: "https://twitter.com/yourpage",
    linkedin: "https://linkedin.com/in/yourprofile",
    pinterest: "https://pinterest.com/yourpage",
    location: "https://maps.google.com/?q=Your+Business+Location",
    googleBusiness: "https://yourbusiness.google.com",
  });

  const [editing, setEditing] = useState(null);
  const [newLink, setNewLink] = useState("");

  const platformIcons = {
    instagram: <Instagram className="text-pink-500" />,
    facebook: <Facebook className="text-blue-600" />,
    whatsapp: <Share2 className="text-green-500" />,
    twitter: <Twitter className="text-blue-400" />,
    linkedin: <Linkedin className="text-blue-700" />,
    pinterest: <Globe className="text-red-500" />, // Replaced Pinterest with Globe
    location: <MapPin className="text-red-600" />,
    googleBusiness: <Globe className="text-yellow-500" />,
  };

  const handleEditClick = (platform) => {
    setEditing(platform);
    setNewLink(socialLinks[platform]);
  };

  const handleSaveClick = () => {
    setSocialLinks((prev) => ({
      ...prev,
      [editing]: newLink,
    }));
    setEditing(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-neutral-content mb-6">Social Media Links</h1>
      <div className="overflow-x-auto bg-base-200 shadow-md rounded-lg">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-base-300 text-neutral-content">
              <th className="p-4 text-sm uppercase">Platform</th>
              <th className="p-4 text-sm uppercase">Link</th>
              <th className="p-4 text-sm uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(socialLinks).map((platform, index) => (
              <tr
                key={index}
                className="hover:bg-base-100 border-b border-neutral-content"
              >
                <td className="p-4 flex items-center space-x-2 text-neutral-content">
                  <span className="text-lg">{platformIcons[platform]}</span>
                  <span className="capitalize">{platform}</span>
                </td>
                <td className="p-4">
                  {editing === platform ? (
                    <input
                      type="text"
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    <a
                      href={socialLinks[platform]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {socialLinks[platform]}
                    </a>
                  )}
                </td>
                <td className="p-4">
                  {editing === platform ? (
                    <div className="flex space-x-2">
                      <button className="btn btn-sm btn-success" onClick={handleSaveClick}>
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => setEditing(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-sm btn-primary"
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
  );
}

export default SocialMediaLayout;