import { Inbox } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../config/axios';

const organizationSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email address'),
  location: yup.string(),
  mapUrl: yup.string(),
  phone: yup.string().matches(/^\d+$/, 'Phone must contain only numbers'),
});

const OrganizationDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const inputRef = useRef(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(organizationSchema),
    defaultValues: {
      email: '',
      location: '',
      mapUrl: '',
      phone: ''
    }
  });

  // Fetch existing organization details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get('/company/settings');
        // console.log('Fetched data:', response.data);


        Object.keys(data).forEach((key) => {
          if (key !== 'id') {
            setValue(key, data[key]);
          }
        });
        // setConfigId(data.id);
        // setIsEnabled(true);



      } catch (error) {
        console.error('Error fetching organization details:', error);
        toast.error('Failed to load organization details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [reset]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImagePreview(URL.createObjectURL(file));
      setLogoFile(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImagePreview(null);
    setLogoFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();

    // Append all form fields
    formData.append('email', data.email);
    formData.append('location', data.location);
    formData.append('mapUrl', data.mapUrl);
    formData.append('phone', data.phone);

    // Append logo if changed
    if (logoFile) {
      formData.append('logo', logoFile);
    }

    const toastId = toast.loading('Saving organization details...');

    try {
      await axiosInstance.post('/company/settings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.update(toastId, {
        render: 'Organization details saved successfully',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });

      // Refresh the data
      const response = await axiosInstance.get('/company/settings');
      if (response.data) {
        reset({
          email: response.data.email || '',
          location: response.data.location || '',
          mapUrl: response.data.mapUrl || '',
          phone: response.data.phone || '',
        });

        if (response.data.logo) {
          setImagePreview(response.data.logo);
        }
      }
    } catch (error) {
      console.error('Error saving organization details:', error);
      toast.update(toastId, {
        render: error.response?.data?.message || 'Failed to save organization details',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-base-100 rounded-lg space-y-6 flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 rounded-lg space-y-6">
      <div className="flex items-center gap-3">
        <Inbox className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-neutral-content">Organization Details</h1>
      </div>
      <div className="bg-base-200 rounded-lg shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Logo</span>
              </label>
              <div
                className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-base-100"
                onClick={() => inputRef.current?.click()}
              >
                {!imagePreview ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-primary mb-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 3a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v3.586l-1.293-1.293a1 1 0 00-1.414 0L10 12l-2.293-2.293a1 1 0 00-1.414 0L4 12V5zm0 10v-1.586l2.293-2.293a1 1 0 011.414 0L10 13l3.293-3.293a1 1 0 011.414 0L16 12.414V15H4z" />
                    </svg>
                    <p className="text-neutral-content">Drag and drop or click to upload</p>
                  </>
                ) : (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-lg shadow-lg" />
                    <button
                      type="button"
                      className="absolute top-2 right-2 btn btn-xs btn-error"
                      onClick={handleRemoveImage}
                    >
                      Remove
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={inputRef}
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Ex: your@email.com"
                className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                {...register('email')}
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                placeholder="Ex: New York, USA"
                className={`input input-bordered ${errors.location ? 'input-error' : ''}`}
                {...register('location')}
              />
              {errors.location && <span className="text-red-500 text-sm mt-1">{errors.location.message}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Map URL</span>
              </label>
              <input
                type="text"
                placeholder="Ex: https://maps.google.com/..."
                className={`input input-bordered ${errors.mapUrl ? 'input-error' : ''}`}
                {...register('mapUrl')}
              />
              {errors.mapUrl && <span className="text-red-500 text-sm mt-1">{errors.mapUrl.message}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                placeholder="Ex: 1234567890"
                className={`input input-bordered ${errors.phone ? 'input-error' : ''}`}
                {...register('phone')}
              />
              {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone.message}</span>}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizationDetails;
