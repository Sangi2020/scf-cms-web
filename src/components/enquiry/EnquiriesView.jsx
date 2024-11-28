import { useEffect, useState } from "react";
import { format } from "date-fns";
import axiosInstance from "../../config/axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {
  Mail,
  Clock,
  ChevronDown,
  Filter,
  RefreshCw,
  Phone,
  Inbox,
  Download
} from "lucide-react";

const EnquiryItem = ({ enquiry, onStatusChange }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = async () => {
    if (enquiry.status === "unread") {
      try {
        await axiosInstance.patch(`/enquiries/update-status/${enquiry.id}`, {
          status: "read"
        });
        onStatusChange(enquiry.id, "read");
      } catch (error) {
        console.error("Failed to update status", error);
      }
    }
    setShowMessage(!showMessage);
  };

  return (
    <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-200">
      <div className="card-body p-4">
        <div
          className="cursor-pointer"
          onClick={handleClick}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <h3 className={`text-lg ${enquiry.status === 'unread' ? 'font-bold' : 'font-medium'}`}>
                  {enquiry.name}
                </h3>
                {enquiry.status === 'unread' && (
                  <span className="badge badge-secondary text-white badge-sm py-2">New</span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-neutral-content flex-wrap">
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {enquiry.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {enquiry.phoneNumber}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {format(new Date(enquiry.createdAt), 'PPp')}
                </span>
              </div>
            </div>
            <button className="btn btn-ghost btn-sm">
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${showMessage ? "rotate-180" : ""
                  }`}
              />
            </button>
          </div>
        </div>
        {showMessage && (
          <div className="mt-4">
            <div className="divider my-2"></div>
            <div className="bg-base-200 p-4 rounded-lg">
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{enquiry.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EnquiriesFilter = ({ onFilterChange, onDateRangeChange, isVisible }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDateRangeChange("startDate", date ? format(date, "yyyy-MM-dd") : "");
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateRangeChange("endDate", date ? format(date, "yyyy-MM-dd") : "");
  };

  if (!isVisible) return null;

  return (
    <div className="bg-base-200 p-4 rounded-lg mb-6 animate-in slide-in-from-top duration-200">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 md:max-w-xs">
          <label className="label">
            <span className="label-text">Filter by Status</span>
          </label>
          <select
            className="select select-bordered select-sm w-full"
            onChange={(e) => onFilterChange(e.target.value)}
            defaultValue=""
          >
            <option value="">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="label">
            <span className="label-text">Date Range</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <ReactDatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Start Date"
              className="input input-bordered input-sm w-full sm:flex-1 placeholder:text-neutral-content"
              wrapperClassName="w-full"
            />
            <span className="text-gray-500 hidden sm:inline">to</span>
            <ReactDatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy-MM-dd"
              minDate={startDate}
              placeholderText="End Date"
              className="input input-bordered input-sm w-full sm:flex-1 placeholder:text-neutral-content"
              wrapperClassName="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    let pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, 5, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }
    return pages;
  };

  return (
    <div className="min-h-[100px] flex items-center justify-center mt-6 bg-base-200 rounded-lg py-4">
      <div className="join">
        <button
          className="join-item btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`join-item btn btn-sm ${currentPage === page
              ? 'btn-primary'
              : page === '...'
                ? 'btn-disabled'
                : ''
              }`}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}

        <button
          className="join-item btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};

const EnquiriesView = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 1,
    currentPage: 1
  });

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...filters,
        page: filters.page.toString(),
        limit: filters.limit.toString()
      });

      const response = await axiosInstance.get(`/enquiries/get-all-enquiries?${queryParams}`);
      setEnquiries(response.data.enquiries);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Failed to fetch enquiries", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [filters]);

  const handleStatusChange = async (id, newStatus) => {
    setEnquiries((prev) =>
      prev.map((enquiry) =>
        enquiry.id === id ? { ...enquiry, status: newStatus } : enquiry
      )
    );
  };

  const handleFilterChange = (status) => {
    setFilters(prev => ({ ...prev, status, page: 1 }));
  };

  const handleDateRangeChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value, page: 1 }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };


  const exportData = async () => {
    try {
      // Pass the current filters as query parameters
      const queryParams = new URLSearchParams({
        status: filters.status || "",
        startDate: filters.startDate || "",
        endDate: filters.endDate || "",
      });
  
      const response = await axiosInstance.get(`/enquiries/export-enquiry?${queryParams}`, {
        responseType: "blob",
      });
  
      // Create a blob from the response data
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
  
      const downloadUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "enquiries.xlsx";
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }

  return (
    <div className="py-8 min-h-screen">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Inbox className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-neutral-content">Enquiries</h1>
              <p className="text-sm text-gray-500 mt-1">Manage and respond to your enquiries</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportData}
              className="btn btn-accent hidden md:inline-flex text-neutral-content gap-2"
              aria-label="Export Data"
            >
              {/* Icon visible on all screens */}
              <Download className="h-5 w-5" />
              {/* Text hidden on smaller screens */}
              <span className="hidden sm:inline">
                Export Data
              </span>
            </button>

            <button
              onClick={toggleFilters}
              className="btn btn-ghost gap-2"
              aria-label="Toggle Filters"
            >
              {/* Icon visible on all screens */}
              <Filter className="h-5 w-5" />
              {/* Text hidden on smaller screens */}
              <span className="hidden sm:inline">
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </span>
            </button>

            <button
              onClick={fetchEnquiries}
              className="btn btn-ghost btn-circle"
              aria-label="Refresh"
            >
              <RefreshCw className="h-5 w-5" />
            </button>

          </div>
        </div>

        <EnquiriesFilter
          onFilterChange={handleFilterChange}
          onDateRangeChange={handleDateRangeChange}
          isVisible={showFilters}
        />

        {loading ? (
          <div className="flex justify-center items-center min-h-[600px]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 bg-base-200 rounded-lg min-h-[400px]">
            <Inbox className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No enquiries found</h3>
            <p className="text-gray-500">Try adjusting your filters or check back later</p>
          </div>
        ) : (
          <div className="space-y-4">
            {enquiries.map((enquiry) => (
              <EnquiryItem
                key={enquiry.id}
                enquiry={enquiry}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

        {enquiries.length > 0 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.pages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default EnquiriesView;