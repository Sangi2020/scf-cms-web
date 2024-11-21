import React, { useState } from 'react';
import { Edit, Trash2, Plus, Linkedin, Twitter, Github, Instagram } from 'lucide-react';
const initialTeamMembers = {
  cLevel: [
    {
      id: 1,
      name: 'John Doe',
      title: 'CEO',
      avatar: 'https://i.pravatar.cc/150?img=1',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: 'https://twitter.com/johndoe',
        github: 'https://github.com/johndoe',
        instagram: 'https://instagram.com/johndoe',
      },
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'CFO',
      avatar: 'https://i.pravatar.cc/150?img=2',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/janesmith',
        twitter: 'https://twitter.com/janesmith',
      },
    },
    {
      id: 3,
      name: 'Michael Green',
      title: 'COO',
      avatar: 'https://i.pravatar.cc/150?img=6',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/michaelgreen',
        github: 'https://github.com/michaelgreen',
      },
    },
    {
      id: 4,
      name: 'Emily Carter',
      title: 'CTO',
      avatar: 'https://i.pravatar.cc/150?img=7',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/emilycarter',
        twitter: 'https://twitter.com/emilycarter',
      },
    },
    {
      id: 5,
      name: 'Sophia Brown',
      title: 'Chief Strategy Officer',
      avatar: 'https://i.pravatar.cc/150?img=8',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sophiabrown',
        instagram: 'https://instagram.com/sophiabrown',
      },
    },
    {
      id: 6,
      name: 'James Williams',
      title: 'Chief Marketing Officer',
      avatar: 'https://i.pravatar.cc/150?img=9',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/jameswilliams',
        twitter: 'https://twitter.com/jameswilliams',
      },
    },
  ],
  topLevel: [
    {
      id: 7,
      name: 'Mike Johnson',
      title: 'VP of Engineering',
      avatar: 'https://i.pravatar.cc/150?img=3',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/mikejohnson',
        github: 'https://github.com/mikejohnson',
      },
    },
    {
      id: 8,
      name: 'Sarah Williams',
      title: 'VP of Marketing',
      avatar: 'https://i.pravatar.cc/150?img=4',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sarahwilliams',
        twitter: 'https://twitter.com/sarahwilliams',
      },
    },
    {
      id: 9,
      name: 'Alex Brown',
      title: 'VP of Sales',
      avatar: 'https://i.pravatar.cc/150?img=5',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/alexbrown',
        instagram: 'https://instagram.com/alexbrown',
      },
    },
    {
      id: 10,
      name: 'Oliver Miller',
      title: 'VP of HR',
      avatar: 'https://i.pravatar.cc/150?img=10',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/olivermiller',
        twitter: 'https://twitter.com/olivermiller',
      },
    },
    {
      id: 11,
      name: 'Amelia Davis',
      title: 'VP of Product',
      avatar: 'https://i.pravatar.cc/150?img=11',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/ameliadavis',
        github: 'https://github.com/ameliadavis',
      },
    },
    {
      id: 12,
      name: 'Lucas Wilson',
      title: 'VP of Operations',
      avatar: 'https://i.pravatar.cc/150?img=12',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/lucaswilson',
        twitter: 'https://twitter.com/lucaswilson',
      },
    },
  ],
};


const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [editingMember, setEditingMember] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    avatar: '',
    socialLinks: {
      linkedin: '',
      twitter: '',
      github: '',
      instagram: '',
    },
  });

  const SocialIcon = ({ type, url }) => {
    const iconMap = {
      linkedin: <Linkedin size={20} />,
      twitter: <Twitter size={20} />,
      github: <Github size={20} />,
      instagram: <Instagram size={20} />,
    };

    return url ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
      >
        {iconMap[type]}
      </a>
    ) : null;
  };

  const handleAdd = () => {
    setFormData({
      name: '',
      title: '',
      avatar: '',
      socialLinks: {
        linkedin: '',
        twitter: '',
        github: '',
        instagram: '',
      },
    });
    setEditingMember(null);
    setIsEditing(false);
    setIsDrawerOpen(true);
  };

  const handleEdit = (member) => {
    setFormData(member);
    setEditingMember(member);
    setIsEditing(true);
    setIsDrawerOpen(true);
  };

  const handleDelete = (member) => {
    setMemberToDelete(member);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedMembers = {
      cLevel: teamMembers.cLevel.filter((m) => m.id !== memberToDelete.id),
      topLevel: teamMembers.topLevel.filter((m) => m.id !== memberToDelete.id),
    };
    setTeamMembers(updatedMembers);
    setIsModalOpen(false);
    setMemberToDelete(null);
  };

  const saveMember = () => {
    if (isEditing) {
      const updatedMembers = {
        cLevel: teamMembers.cLevel.map((m) =>
          m.id === editingMember.id ? { ...formData, id: m.id } : m
        ),
        topLevel: teamMembers.topLevel.map((m) =>
          m.id === editingMember.id ? { ...formData, id: m.id } : m
        ),
      };
      setTeamMembers(updatedMembers);
    } else {
      const newMember = { ...formData, id: Date.now() };
      setTeamMembers({
        ...teamMembers,
        cLevel: [...teamMembers.cLevel, newMember], // Add to C-Level for simplicity
      });
    }
    setIsDrawerOpen(false);
  };

  const TeamMemberCard = ({ member }) => (
    <div className="relative bg-base-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent opacity-75"></div>
      <div className="p-4 flex flex-col items-center relative space-y-5">
        <div className="flex w-full justify-start gap-3 items-center">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-accent">{member.name}</h3>
            <p className="text-sm text-neutral-content">{member.title}</p>
          </div>
        </div>
        <div className="flex justify-between items-end w-full">
          <div className="flex space-x-3">
            {Object.entries(member.socialLinks || {}).map(([type, url]) => (
              <SocialIcon key={type} type={type} url={url} />
            ))}
          </div>
          <div className="flex space-x-2">
            <button
              className="btn text-sm text-neutral-content hover:text-accent"
              onClick={() => handleEdit(member)}
            >
              <Edit size={16} />
            </button>
            <button
              className="btn text-sm text-neutral-content hover:text-error"
              onClick={() => handleDelete(member)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TeamMemberCardSkeleton = () => (
    <div className="relative bg-base-200 rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent opacity-75"></div>
      <div className="p-4 flex flex-col items-center relative space-y-5">
        <div className="flex w-full justify-start gap-3 items-center">
          {/* Avatar Placeholder */}
          <div className="w-20 h-20 bg-neutral-focus rounded-full"></div>
  
          <div>
            {/* Name Placeholder */}
            <div className="h-5 bg-neutral-focus rounded-md w-32 mb-2"></div>
            {/* Title Placeholder */}
            <div className="h-4 bg-neutral-focus rounded-md w-24"></div>
          </div>
        </div>
        <div className="flex justify-between items-end w-full">
          {/* Social Icons Placeholder */}
          <div className="flex space-x-3">
            <div className="w-5 h-5 bg-neutral-focus rounded-full"></div>
            <div className="w-5 h-5 bg-neutral-focus rounded-full"></div>
            <div className="w-5 h-5 bg-neutral-focus rounded-full"></div>
          </div>
          <div className="flex space-x-2">
            {/* Buttons Placeholder */}
            <div className="w-10 h-8 bg-neutral-focus rounded-md"></div>
            <div className="w-10 h-8 bg-neutral-focus rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
  

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team Management</h1>
        <button className="btn btn-primary flex items-center space-x-2" onClick={handleAdd}>
          <Plus size={18} />
          <span>Add Member</span>
        </button>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">C-Level Executives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.cLevel.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Top Level Employees</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.topLevel.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      </div>

      {/* Drawer for Add/Edit */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end">
          <div className="bg-base-200 rounded-2xl z-40 w-1/3 h-fit p-6">
            <h3 className="text-xl font-bold mb-4">
              {isEditing ? 'Edit Member' : 'Add New Member'}
            </h3>
            <form>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded-md mb-4"
              />
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 border rounded-md mb-4"
              />
              <input
                type="text"
                placeholder="Avatar URL"
                value={formData.avatar}
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.value })
                }
                className="w-full p-2 border rounded-md mb-4"
              />
              {/* Social Links */}
              {Object.keys(formData.socialLinks).map((platform) => (
                <input
                  key={platform}
                  type="text"
                  placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                  value={formData.socialLinks[platform]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: {
                        ...formData.socialLinks,
                        [platform]: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2 border rounded-md mb-4"
                />
              ))}
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveMember}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-base-100 p-6 rounded-md">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete{' '}
              <span className="font-bold">{memberToDelete?.name}</span>?
            </h3>
            <div className="flex justify-end space-x-4">
            <button
                className="btn btn-ghost"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={confirmDelete}
              >
                Delete
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;