import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchForm = ({ onSearch = () => {}, onClear = () => {}, isSearching = false, initialValues = {} }) => {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    npiNumber: "",
    organizationName: "",
    authorizedOfficialFirst: "",
    authorizedOfficialLast: "",
    taxonomyDescription: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    addressType: "",
  });

  // Update form data when initialValues change
  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...initialValues,
        // If we have authorizedOfficialFirst or authorizedOfficialLast, populate the respective fields
        authorizedOfficialFirst: initialValues.authorizedOfficialFirst || initialValues.firstName || prev.authorizedOfficialFirst,
        authorizedOfficialLast: initialValues.authorizedOfficialLast || initialValues.lastName || prev.authorizedOfficialLast,
        // Handle NPI number
        npiNumber: initialValues.npiNumber || prev.npiNumber,
      }));
    }
  }, [initialValues]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a cleaned version of form data with only non-empty values
    const cleanedData = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value && value.toString().trim() !== '') {
        // For NPI number, remove any non-digit characters
        if (key === 'npiNumber') {
          const npiNumber = value.toString().replace(/\D/g, '');
          if (npiNumber.length === 10) {
            acc[key] = npiNumber;
          } else if (npiNumber) {
            alert('Please enter a valid 10-digit NPI number.');
            return {}; // Return empty object to trigger no search
          }
        } else {
          acc[key] = value.toString().trim();
        }
      }
      return acc;
    }, {});

    // If no search criteria provided, show error
    if (Object.keys(cleanedData).length === 0) {
      alert('Please enter at least one search criteria');
      return;
    }

    // Call the onSearch callback with cleaned data
    onSearch(cleanedData);
  };

  const handleClear = () => {
    setFormData({
      npiNumber: "",
      organizationName: "",
      authorizedOfficialFirst: "",
      authorizedOfficialLast: "",
      taxonomyDescription: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      addressType: "",
    });
    onClear();
  };

  return (
    <div className="relative overflow-hidden w-full bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-8">
      {/* Dots background overlay */}
      <div className="pointer-events-none absolute -top-6 -right-6 w-48 h-48 rounded-full bg-dots-secondary opacity-20"></div>
      <div className="pointer-events-none absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-dots opacity-20"></div>

      {/* Soft gradient blobs */}
      <div className="pointer-events-none absolute -top-20 -left-24 w-72 h-72 bg-primary/20 blur-3xl rounded-full"></div>
      <div className="pointer-events-none absolute -bottom-28 -right-20 w-80 h-80 bg-secondary/20 blur-3xl rounded-full"></div>

      {/* Decorative bottom wave */}
      <div className="wave-bottom text-secondary/10" aria-hidden>
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,64L60,80C120,96,240,128,360,117.3C480,107,600,53,720,53.3C840,53,960,107,1080,117.3C1200,128,1320,96,1380,80L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-center text-secondary mb-2 animate-fade-in">
        Advanced Provider Search
      </h2>
      {/* Gradient accent line */}
      <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full"></div>

      {/* Feature chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <span className="px-3 py-1 text-xs rounded-full bg-secondary/10 text-secondary">Fast</span>
        <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">Accurate</span>
        <span className="px-3 py-1 text-xs rounded-full bg-secondary/10 text-secondary">Secure</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Primary Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="npiNumber" className="block text-sm font-medium">
              NPI Number
            </label>
            <input
              id="npiNumber"
              type="text"
              placeholder="Enter NPI (1234567890)"
              value={formData.npiNumber}
              onChange={(e) => handleInputChange("npiNumber", e.target.value)}
              maxLength={100}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            />
          </div>
          <div>
            <label htmlFor="organizationName" className="block text-sm font-medium">
              Organization Name
            </label>
            <input
              id="organizationName"
              type="text"
              placeholder="Enter organization name"
              value={formData.organizationName}
              onChange={(e) =>
                handleInputChange("organizationName", e.target.value)
              }
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>

       
        {/* Authorized Official Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="authorizedOfficialFirst" className="block text-sm font-medium">
               First Name
            </label>
            <input
              id="authorizedOfficialFirst"
              type="text"
              placeholder="First name"
              value={formData.authorizedOfficialFirst}
              onChange={(e) =>
                handleInputChange("authorizedOfficialFirst", e.target.value)
              }
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            />
          </div>
          <div>
            <label htmlFor="authorizedOfficialLast" className="block text-sm font-medium">
              Last Name
            </label>
            <input
              id="authorizedOfficialLast"
              type="text"
              placeholder="Last name"
              value={formData.authorizedOfficialLast}
              onChange={(e) =>
                handleInputChange("authorizedOfficialLast", e.target.value)
              }
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>

        {/* Taxonomy & Address Type as Text Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tspeciality" className="block text-sm font-medium">
              speciality
            </label>
            <input
              id="speciality"
              type="text"
              placeholder="Enter speciality"
              value={formData.taxonomyDescription}
              onChange={(e) => handleInputChange("taxonomyDescription", e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            />
          </div>
           {/* Location Fields */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium">City</label>
            <input
              id="city"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium">State</label>
            <input
              id="state"
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            />
          </div>
          {/* <div>
            <label htmlFor="country" className="block text-sm font-medium">Country</label>
            <input
              id="country"
              type="text"
              placeholder="Country"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            />
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium">Postal Code</label>
            <input
              id="postalCode"
              type="text"
              placeholder="ZIP/Postal"
              value={formData.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            />
          </div> */}
        </div>
          {/* <div>
            <label htmlFor="addressType" className="block text-sm font-medium">
              Address Type
            </label>
            <input
              id="addressType"
              type="text"
              placeholder="Enter address type"
              value={formData.addressType}
              onChange={(e) => handleInputChange("addressType", e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            />
          </div> */}
        </div>

       

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <button
            type="submit"
            disabled={isSearching}
            className="flex items-center justify-center gap-2 w-full sm:w-auto min-w-[200px] px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-50 transition-transform hover:scale-[1.02]"
          >
            <Search className="h-5 w-5 animate-float" />
            {isSearching ? "Searching..." : "Search Providers"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};
export default SearchForm