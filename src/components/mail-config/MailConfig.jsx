import { Inbox, Mail } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../../config/axios';

// Validation schema
const mailConfigSchema = yup.object().shape({
  host: yup
    .string()
    .required('Host is required')
    .matches(
      /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
      'Please enter a valid hostname (e.g., smtp.gmail.com)'
    ),
  port: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Port is required')
    .min(1, 'Port must be greater than 0')
    .max(65535, 'Port must be less than 65536')
    .integer('Port must be a whole number'),
  secure: yup
    .boolean()
    .required('Secure connection field is required'),
  authUser: yup
    .string()
    .required('Auth user is required')
    .email('Please enter a valid email address'),
  authPass: yup
    .string()
    .required('Auth password is required')
    .min(8, 'Password must be at least 8 characters')
});

const MailConfig = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(mailConfigSchema),
    defaultValues: {
      host: '',
      port: '',
      secure: false,
      authUser: '',
      authPass: ''
    }
  });

  const [configId, setConfigId] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await axiosInstance.get('/config/email-config');
        Object.keys(data).forEach((key) => {
          if (key !== 'id') {
            setValue(key, data[key]);
          }
        });
        setConfigId(data.id);
        setIsEnabled(true);
      } catch (error) {
        setStatus({
          type: 'error',
          message: 'Failed to load email configuration'
        });
      }
    };
    fetchConfig();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      // No need to manually convert port as Yup handles it
      if (configId) {
        await axiosInstance.put(`/config/email-config/${configId}`, data);
        setStatus({
          type: 'success',
          message: 'Email configuration updated successfully'
        });
      } else {
        setStatus({
          type: 'error',
          message: 'No email configuration found to update'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to update configuration'
      });
    }
  };

  const handleTestEmail = async () => {
    if (!testEmail) {
      setStatus({
        type: 'error',
        message: 'Please enter a test email address'
      });
      return;
    }

    if (!yup.string().email().isValidSync(testEmail)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address for testing'
      });
      return;
    }

    setIsTesting(true);
    try {
      await axiosInstance.post('/api/test-email', { email: testEmail });
      setStatus({
        type: 'success',
        message: 'Test email sent successfully'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to send test email'
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="p-6 bg-base-100 rounded-lg space-y-6">
      <div className="flex items-center gap-3">
        <Inbox className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-neutral-content">Enquiries</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and respond to your enquiries</p>
        </div>
      </div>

      {/* Test Email Section */}
      <div className="p-4 bg-base-200 rounded-lg shadow">
        <div className="flex gap-4 items-center">
          <input
            type="email"
            placeholder="Enter email for testing"
            className="input input-bordered flex-grow"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={handleTestEmail}
            disabled={isTesting}
          >
            <Mail className="w-4 h-4 mr-2" />
            {isTesting ? 'Sending...' : 'Send Test Email'}
          </button>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="bg-base-200 rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">Mail Configuration Status</h2>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={isEnabled}
                onChange={() => setIsEnabled(!isEnabled)}
              />
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Host</span>
              </label>
              <input
                type="text"
                placeholder="Ex: smtp.gmail.com"
                className={`input input-bordered ${errors.host ? 'input-error' : ''}`}
                {...register('host')}
              />
              {errors.host && (
                <span className="text-red-500 text-sm mt-1">{errors.host.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Port</span>
              </label>
              <input
                type="number"
                placeholder="Ex: 587"
                className={`input input-bordered ${errors.port ? 'input-error' : ''}`}
                {...register('port')}
              />
              {errors.port && (
                <span className="text-red-500 text-sm mt-1">{errors.port.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Auth User</span>
              </label>
              <input
                type="email"
                placeholder="Ex: your@email.com"
                className={`input input-bordered ${errors.authUser ? 'input-error' : ''}`}
                {...register('authUser')}
              />
              {errors.authUser && (
                <span className="text-red-500 text-sm mt-1">{errors.authUser.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Auth Password</span>
              </label>
              <input
                type="password"
                className={`input input-bordered ${errors.authPass ? 'input-error' : ''}`}
                {...register('authPass')}
              />
              {errors.authPass && (
                <span className="text-red-500 text-sm mt-1">{errors.authPass.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Secure Connection (SSL/TLS)</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  {...register('secure')}
                />
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => reset()}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isEnabled}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MailConfig;