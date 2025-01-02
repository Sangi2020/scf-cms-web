import { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

const DocumentEditor = () => {
  const [selectedOption, setSelectedOption] = useState('privacy');
  const [value, setValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const quillRef = useRef(null);

  const fetchContent = async (option) => {
    try {
      const mockBackendData = {
        privacy: 'This is the Privacy & Policy content.',
        terms: 'This is the Terms & Conditions content.',
        disclaimer: 'This is the Disclaimer content.',
      };
      setValue(mockBackendData[option]);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const saveContent = async () => {
    try {
      setIsSaving(true);
      console.log(`Saving content for ${selectedOption}:`, value);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success(`${selectedOption} has been saved successfully!`)
    } catch (error) {
      console.error('Error saving content:', error);
    toast.success(`Failed to save content. Please try again.`)

    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchContent(selectedOption);
  }, [selectedOption]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'align',
    'link',
    'image',
  ];

  return (
    <div className="min-h-screen bg-base-100 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-neutral-content">Documents</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your documents</p>
          </div>
        </div>
        <div className="flex gap-2 ">
          <button
            className={`btn btn-outline hover:btn-success mr-10 text-slate-300`}
            onClick={saveContent}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          {['privacy', 'terms', 'disclaimer'].map((option) => (
            <button
              key={option}
              className={`btn ${
                selectedOption === option ? 'btn-primary' : 'btn-outline'
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div
        className="overflow-hidden"
        style={{
          height: 'calc(100vh - 200px)',
        }}
      >
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          style={{
            height: '100%',
            maxHeight: '100%',
            borderRadius: '8px',
          }}
        />
      </div>
    </div>
  );
};

export default DocumentEditor;
