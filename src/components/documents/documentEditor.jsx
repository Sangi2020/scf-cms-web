import  { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const DocumentEditor = () => {
    const [selectedOption, setSelectedOption] = useState('privacy');
    const [value, setValue] = useState(''); // Editor content

    //   api here
    const fetchContent = async (option) => {
        try {
            const mockBackendData = {
                privacy: 'This is the Privacy & Policy content.',
                terms: 'This is the Terms & Conditions content.',
            };
            setValue(mockBackendData[option]);
        } catch (error) {
            console.error('Error fetching content:', error);
        }
    };

    useEffect(() => {
        fetchContent(selectedOption);
    }, [selectedOption]);

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, false] }],
            ['bold', 'italic', 'underline', 'strike'], // Text formatting
            [{ list: 'ordered' }, { list: 'bullet' }], // Lists
            [{ indent: '-1' }, { indent: '+1' }], // Indent
            [{ align: [] }], // Alignment
            ['link', 'image'], // Insert items
            ['clean'], // Clear formatting
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
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-content">Documents</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage your documents</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        className={`btn ${selectedOption === 'privacy' ? 'btn-primary' : 'btn-outline'
                            }`}
                        onClick={() => setSelectedOption('privacy')}
                    >
                        Privacy & Policy
                    </button>
                    <button
                        className={`btn ${selectedOption === 'terms' ? 'btn-primary' : 'btn-outline'
                            }`}
                        onClick={() => setSelectedOption('terms')}
                    >
                        Terms & Conditions
                    </button>
                    <button
                        className={`btn ${selectedOption === 'disclamer' ? 'btn-primary' : 'btn-outline'
                            }`}
                        onClick={() => setSelectedOption('disclamer')}
                    >
                       Disclamer
                    </button>
                </div>
            </div>

            {/* ReactQuill Editor */}
            <div
                className="overflow-hidden"
                style={{
                    height: 'calc(100vh - 150px)',
                }}
            >
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={modules}
                    formats={formats}
                    style={{
                        height: '100%',
                        maxHeight: '100%',
                        borderRadius: '8px', // Optional: for a rounded editor area
                    }}
                />
            </div>
        </div>
    );
};

export default DocumentEditor;
