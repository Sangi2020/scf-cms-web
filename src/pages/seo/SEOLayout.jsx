import React, { useState } from 'react';

const SeoLayout = () => {
  const pages = ['home', 'about', 'services', 'blog', 'contact'];
  
  const [selectedPage, setSelectedPage] = useState('home');
  const [seoData, setSeoData] = useState({
    home: {
      title: {
        default: '',
        template: ''
      },
      description: '',
      keywords: [],
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '',
        siteName: 'SCF Strategies',
        title: '',
        description: '',
        images: [{
          url: '',
          width: 630,
          height: 630,
          alt: ''
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: '',
        description: '',
        images: [''],
        creator: ''
      }
    }
  });

  const handleInputChange = (section, field, value) => {
    setSeoData(prev => ({
      ...prev,
      [selectedPage]: {
        ...prev[selectedPage],
        [section]: typeof field === 'string' 
          ? value 
          : {
              ...prev[selectedPage][section],
              [field]: value
            }
      }
    }));
  };

  const handleSubmit = () => {
    console.log('Saving SEO data for', selectedPage, ':', seoData[selectedPage]);
  };

  return (
    <div className="w-full mx-auto bg-base-100 p-6 space-y-8">
      {/* Page Selection */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-content">SEO Settings</h2>
        <div className="dropdown dropdown-end tooltip tooltip-open tooltip-left"  data-tip="Select a page">
  <div 
    tabIndex={0} 
    role="button" 
    className="btn m-1"
  >
    {selectedPage ? selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1) : "Select page"}
  </div>
  <ul 
    tabIndex={0} 
    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
  >
    {pages.map(page => (
      <li key={page}>
        <a onClick={() => setSelectedPage(page)}>
          {page.charAt(0).toUpperCase() + page.slice(1)}
        </a>
      </li>
    ))}
  </ul>
</div>

      </div>

      {/* Basic Meta Section */}
      <section className="space-y-4 bg-base-200 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-neutral-content">Basic Meta Tags</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-content block mb-1">Default Title</label>
            <input
              type="text"
              value={seoData[selectedPage]?.title?.default || ''}
              onChange={(e) => handleInputChange('title', 'default', e.target.value)}
              className="w-full p-2 bg-base-200 border border-gray-300 rounded-md"
              placeholder="e.g., SCF Strategies | About Us"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-neutral-content block mb-1">Title Template</label>
            <input
              type="text"
              value={seoData[selectedPage]?.title?.template || ''}
              onChange={(e) => handleInputChange('title', 'template', e.target.value)}
              className="w-full p-2 bg-base-200 border border-gray-300 rounded-md"
              placeholder="e.g., %s | SCF Strategies"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-content block mb-1">Description</label>
            <textarea
              value={seoData[selectedPage]?.description || ''}
              onChange={(e) => handleInputChange('description', null, e.target.value)}
              className="w-full p-2 bg-base-200 border border-gray-300 rounded-md"
              rows={3}
              placeholder="Enter page description"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-content block mb-1">Keywords</label>
            <textarea
              value={seoData[selectedPage]?.keywords?.join(', ') || ''}
              onChange={(e) => handleInputChange('keywords', null, e.target.value.split(',').map(k => k.trim()))}
              className="w-full p-2 bg-base-200 border border-gray-300 rounded-md"
              rows={3}
              placeholder="Enter keywords (comma-separated)"
            />
          </div>
        </div>
      </section>

      {/* Open Graph Section */}
      <section className="space-y-4 bg-base-200 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-neutral-content">Open Graph</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-neutral-content block mb-1">OG Title</label>
            <input
              type="text"
              value={seoData[selectedPage]?.openGraph?.title || ''}
              onChange={(e) => handleInputChange('openGraph', 'title', e.target.value)}
              className="w-full p-2 bg-base-200 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-content block mb-1">OG URL</label>
            <input
              type="text"
              value={seoData[selectedPage]?.openGraph?.url || ''}
              onChange={(e) => handleInputChange('openGraph', 'url', e.target.value)}
              className="w-full p-2 bg-base-200 border border-gray-300 rounded-md"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-neutral-content block mb-1">OG Description</label>
            <textarea
              value={seoData[selectedPage]?.openGraph?.description || ''}
              onChange={(e) => handleInputChange('openGraph', 'description', e.target.value)}
              className="w-full p-2 bg-base-200 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-content block mb-1">OG Image URL</label>
            <input
              type="text"
              value={seoData[selectedPage]?.openGraph?.images?.[0]?.url || ''}
              onChange={(e) => handleInputChange('openGraph', 'images', [{...seoData[selectedPage]?.openGraph?.images?.[0], url: e.target.value}])}
              className="w-full p-2 bg-base-200 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Twitter Section */}
      <section className="space-y-4 bg-base-200 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-neutral-content">Twitter Card</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-neutral-content block mb-1">Twitter Title</label>
            <input
              type="text"
              value={seoData[selectedPage]?.twitter?.title || ''}
              onChange={(e) => handleInputChange('twitter', 'title', e.target.value)}
              className="w-full p-2 bg-base-200 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-content block mb-1">Twitter Creator</label>
            <input
              type="text"
              value={seoData[selectedPage]?.twitter?.creator || ''}
              onChange={(e) => handleInputChange('twitter', 'creator', e.target.value)}
              className="w-full p-2 bg-base-200 border border-gray-300 rounded-md"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-neutral-content block mb-1">Twitter Description</label>
            <textarea
              value={seoData[selectedPage]?.twitter?.description || ''}
              onChange={(e) => handleInputChange('twitter', 'description', e.target.value)}
              className="w-full p-2 bg-base-200 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>
        </div>
      </section>

      <button 
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Save SEO Settings
      </button>
    </div>
  );
};

export default SeoLayout;