import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { 
  User, 
  Building2, 
  MapPin, 
  Phone, 
  FileText, 
  ChevronLeft, 
  ExternalLink, 
  Map as MapIcon,
  Mail,
  Briefcase,
  Star,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";

const calculateProviderMatchPercentage = (provider, firstName = "", lastName = "") => {
  if (!provider) return 0;
  
  let score = 0;
  const providerFirstName = (provider["Provider First Name"] || "").toLowerCase();
  const providerLastName = (provider["Provider Last Name (Legal Name)"] || "").toLowerCase();
  
  if (firstName && providerFirstName.includes(firstName.toLowerCase())) score += 40;
  if (lastName && providerLastName === lastName.toLowerCase()) score += 60;
  
  return Math.min(100, score);
};

const generateMapUrl = (addressComponents) => {
  if (!addressComponents) return null;
  const address = addressComponents
    .filter(v => v && String(v).trim() !== "" && v !== "N/A")
    .join(", ");
  return address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : null;
};

export default function Result() {
  const { npi } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://api.prognozadataminds.com/api/npi/${npi}`);
        const providerData = res.data.data?.[0] || res.data;
        console.log('Full Provider Data:', JSON.stringify(providerData, null, 2)); // Detailed log of provider data
        console.log('Available Keys:', Object.keys(providerData)); // Log all available keys
        console.log('Specializations:', providerData.Specializations); // Log specific fields
        console.log('Classifications:', providerData.Classifications);
        
        setProvider(providerData);
        setError("");
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching provider details");
        setProvider(null);
      } finally {
        setLoading(false);
      }
    };

    if (npi) {
      fetchProvider();
    }
  }, [npi]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading provider details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Provider</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  if (!provider) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Provider Not Found</h2>
        <p className="text-gray-600 mb-6">The requested provider could not be found.</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Return to Search
        </button>
      </div>
    </div>
  );

  const matchPercentage = calculateProviderMatchPercentage(provider);
  const entityType = String(provider["Entity Type Code"]) === "1" ? "Individual" : "Organization";
  
  // Helper function to render table rows
  const renderTableRow = (label, value, isHeader = false, linkType = null) => {
    if (!value && value !== 0) return null;
    
    let displayValue = value;
    let cellContent = (
      <span className={isHeader ? "font-semibold" : ""}>
        {String(displayValue).includes('\n') ? (
          <div className="whitespace-pre-line">{displayValue}</div>
        ) : (
          displayValue
        )}
      </span>
    );

    if (linkType === 'tel' && value) {
      cellContent = (
        <a href={`tel:${value}`} className="text-blue-600 hover:underline flex items-center">
          <Phone className="w-4 h-4 mr-1" />
          {value}
        </a>
      );
    } else if (linkType === 'map' && value) {
      cellContent = (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline flex items-center"
        >
          <MapIcon className="w-4 h-4 mr-1" />
          View on Map
        </a>
      );
    }
console.log("Provider data:", provider);

    return (
      <tr className={isHeader ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}>
        <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-900 w-1/4">
          {label}
        </td>
        <td className="px-6 py-4 text-xl text-gray-900">
          {cellContent}
        </td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen pt-[130px] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Results
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-[#00CD97] text-white p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center text-sm text-white">
                  {String(provider["Entity Type Code"]) === "1" 
                    ? <User className="h-5 w-5 mr-2" /> 
                    : <Building2 className="h-5 w-5 mr-2" />
                  }
                  
                </div>
                <div>
                  <h2 className="text-2xl md:text-5xl font-bold text-white tracking-tight">
                    {(() => {
                      const parts = [];
                      const authName = `${provider["Authorized Official First Name"] || ""} ${provider["Authorized Official Last Name"] || ""}`.trim();
                      if (authName) parts.push(`Auth: ${authName}`);
                      const providerName = `${provider["Provider First Name"] || ""} ${provider["Provider Last Name (Legal Name)"] || ""}`.trim();
                      if (providerName) parts.push(`Name: ${providerName}`);
                      if (provider["Provider Organization Name (Legal Business Name)"]) {
                        parts.push(`Organization: ${provider["Provider Organization Name (Legal Business Name)"]}`);
                      }
                      return parts.join(" / ") || "Unknown Provider";
                    })()}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-white/20 text-white px-3 py-1 text-2xl font-medium">
                      NPI: {provider.NPI || provider.number}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-white/20 text-white px-3 py-1 text-2xl font-medium">
                      {entityType}
                    </span>
                    {matchPercentage > 0 && (
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-2xl font-medium ${
                        matchPercentage >= 80
                          ? "bg-green-200 text-green-900"
                          : matchPercentage >= 60
                          ? "bg-yellow-200 text-yellow-900"
                          : "bg-orange-200 text-orange-900"
                      }`}>
                        {matchPercentage}% Match
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {provider.Specializations && (
                  <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-base sm:text-lg md:text-xl font-medium bg-emerald-100 text-emerald-800">
                    {provider.Specializations}
                  </span>
                )}
                {provider.Classifications && (
                  <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-base sm:text-lg md:text-xl font-medium bg-emerald-100 text-emerald-800">
                    {provider.Classifications}
                  </span>
                )}
                {provider["Provider License Number"] && (
                  <div className="flex flex-col gap-1">
                    <span className="inline-flex items-center rounded-full bg-white/20 text-white px-3 py-1 text-xl font-medium">
                      License: {provider["Provider License Number"]}
                    </span>
                    {provider["Provider License Number State Code_1"] && (
                      <span className="inline-flex items-center rounded-full bg-white/20 text-white px-3 py-1 text-xl font-medium">
                        State: {provider["Provider License Number State Code_1"]}
                      </span>
                    )}
                    {provider["Healthcare Provider Taxonomy Code_1"] && (
                      <span className="inline-flex items-center rounded-full bg-white/20 text-white px-3 py-1 text-xl font-medium">
                        Taxonomy: {provider["Healthcare Provider Taxonomy Code_1"]}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              {/* Basic Information */}
              <div className="border-b border-gray-200">
                <div className="px-4 py-5 sm:px-6 bg-gray-50">
                  <h3 className="text-2xl font-medium text-gray-900 flex items-center">    
                    {String(provider["Entity Type Code"]) === "1" 
                    ? <User className="h-5 w-5 mr-2 text-[#00CD97]" /> 
                    : <Building2 className="h-5 w-5 mr-2 text-[#00CD97]" />
                  }
                  
                    Basic Information
                  </h3>
                </div>
                <div className="border-t text- border-gray-200">
                  <dl className="text-2xl">
                    {renderTableRow("NPI", provider.NPI || provider.number, true)}
                    {renderTableRow("Entity Type", entityType, true)}
                    {provider["Provider Sex Code"] && provider["Provider Sex Code"] !== "N/A" && 
                      renderTableRow("Gender", provider["Provider Sex Code"])}
                    {provider["Provider Enumeration Date"] && 
                      renderTableRow("Enrollment Date", new Date(provider["Provider Enumeration Date"]).toLocaleDateString())}
                    {provider["Last Update Date"] && 
                      renderTableRow("Last Updated", new Date(provider["Last Update Date"]).toLocaleDateString())}
                    {provider["Provider Business Mailing Address State Name"] && 
                      renderTableRow("State", provider["Provider Business Mailing Address State Name"])}
                  </dl>
                </div>
              </div>

              {/* Mailing Address */}
              <div className="border-b border-gray-200">
                <div className="px-4 py-5 sm:px-6 bg-gray-50">
                  <h3 className="text-xl font-medium text-gray-900 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-[#00CD97]" />
                    Mailing Address
                  </h3>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    {provider["Provider First Line Business Mailing Address"] && 
                      renderTableRow("Address Line 1", provider["Provider First Line Business Mailing Address"])}
                    {provider["Provider Second Line Business Mailing Address"] && 
                      renderTableRow("Address Line 2", provider["Provider Second Line Business Mailing Address"])}
                    {[
                      provider["Provider Business Mailing Address City Name"],
                      provider["Provider Business Mailing Address State Name"],
                      provider["Provider Business Mailing Address Postal Code"]
                    ].filter(Boolean).length > 0 && 
                      renderTableRow("City/State/ZIP", [
                        provider["Provider Business Mailing Address City Name"],
                        provider["Provider Business Mailing Address State Name"],
                        provider["Provider Business Mailing Address Postal Code"]
                      ].filter(Boolean).join(", "))}
                    {provider["Provider Business Mailing Address Country Code (If country is US, the instruction to select a state is required)"] && 
                      renderTableRow("Country", provider["Provider Business Mailing Address Country Code (If country is US, the instruction to select a state is required)"])}
                    {provider["Provider Business Mailing Address Telephone Number"] && 
                      renderTableRow("Phone", provider["Provider Business Mailing Address Telephone Number"], false, 'tel')}
                    {provider["Provider Business Mailing Address Fax Number"] && 
                      renderTableRow("Fax", provider["Provider Business Mailing Address Fax Number"])}
                  </dl>
                </div>
              </div>

              {/* Practice Location */}
              <div className="border-b border-gray-200">
                <div className="px-4 py-5 sm:px-6 bg-gray-50">
                  <h3 className="text-xl font-medium text-gray-900 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-[#00CD97]" />
                    Practice Location
                  </h3>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    {provider["Provider First Line Business Practice Location Address"] && 
                      renderTableRow("Address Line 1", provider["Provider First Line Business Practice Location Address"])}
                    {provider["Provider Second Line Business Practice Location Address"] && 
                      renderTableRow("Address Line 2", provider["Provider Second Line Business Practice Location Address"])}
                    {[
                      provider["Provider Business Practice Location Address City Name"],
                      provider["Provider Business Practice Location Address State Name"],
                      provider["Provider Business Practice Location Address Postal Code"]
                    ].filter(Boolean).length > 0 && 
                      renderTableRow("City/State/ZIP", [
                        provider["Provider Business Practice Location Address City Name"],
                        provider["Provider Business Practice Location Address State Name"],
                        provider["Provider Business Practice Location Address Postal Code"]
                      ].filter(Boolean).join(", "))}
                    {provider["Provider Business Practice Location Address Country Code (If country is US, the instruction to select a state is required)"] && 
                      renderTableRow("Country", provider["Provider Business Practice Location Address Country Code (If country is US, the instruction to select a state is required)"])}
                    {provider["Provider Business Practice Location Address Telephone Number"] && 
                      renderTableRow("Phone", provider["Provider Business Practice Location Address Telephone Number"], false, 'tel')}
                    {provider["Provider Business Practice Location Address Fax Number"] && 
                      renderTableRow("Fax", provider["Provider Business Practice Location Address Fax Number"])}
                  </dl>
                </div>
              </div>

              {/* Taxonomy Information */}
              {(provider["Healthcare Provider Taxonomy Code_1"] || provider.Classification || provider.Specialization) && (
                <div className="border-b border-gray-200">
                  <div className="px-4 py-5 sm:px-6 bg-gray-50">
                    <h3 className="text-xl font-medium text-gray-900 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-[#00CD97]" />
                      Taxonomy Information
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-gray-800">
                          {provider["Healthcare Provider Taxonomy Code_1"] || "No taxonomy available"}
                        </span>
                        {provider.Classifications && (
                          <span className="inline-flex items-center rounded-md bg-amber-100 text-amber-900 px-2 py-0.5 text-base font-medium">
                            Classificatios: {provider.Classifications}
                          </span>
                          
                        )}
                        {provider.Specializations && (
                          <span className="inline-flex items-center rounded-md bg-emerald-100 text-emerald-900 px-2 py-0.5 text-base font-medium">
                            Specializations: {provider.Specializations}
                          </span>
                        )}
                      </div>
                    </div>
                    {provider["Primary Taxonomy Switch"] && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Primary Taxonomy:</span>{' '}
                        {provider["Primary Taxonomy Switch"] === "Y" ? "Yes" : "No"}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* License Information */}
              {Array.from({ length: 15 }, (_, i) => i + 1).some(i => provider[`Provider License Number_${i}`]) && (
                <div className="border-t border-gray-200">
                  <div className="px-4 py-5 sm:px-6 bg-gray-50">
                    <h3 className="text-xl font-medium text-gray-900 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-[#00CD97]" />
                      License Information
                    </h3>
                  </div>
                  <div className="border-t border-gray-200 p-4">
                    <div className="space-y-2">
                      {Array.from({ length: 15 }, (_, i) => i + 1).map((i) => {
                        const license = provider[`Provider License Number_${i}`];
                        const state = provider[`Provider License Number State Code_${i}`];
                        
                        if (!license || license === "N/A") return null;
                        
                        return (
                          <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                            <div className="font-medium text-gray-900">License {i}:</div>
                            <div className="mt-1 text-[#00CD97]">
                              <User size={24} />
                            </div>
                            <div className="font-mono text-gray-900">{license}</div>
                            {state && state !== "N/A" && (
                              <div className="text-sm text-gray-500">State: {state}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Identifiers */}
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:px-6 bg-gray-50">
                  <h3 className="text-xl font-medium text-gray-900 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-[#00CD97]" />
                    Identifiers
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issuer</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Array.from({ length: 15 }, (_, i) => i + 1).map((i) => {
                      const identifier = provider[`Other Provider Identifier_${i}`];
                      const typeCode = provider[`Other Provider Identifier Type Code_${i}`];
                      const state = provider[`Other Provider Identifier State_${i}`];
                      const issuer = provider[`Other Provider Identifier Issuer_${i}`];
                      
                      if (!identifier || identifier === "N/A") return null;
                      
                      return (
                        <tr key={i}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {typeCode || 'N/A'}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-mono text-gray-900">
                            {identifier}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {state || 'N/A'}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {issuer || 'N/A'}
                          </td>
                        </tr>
                      );
                    })}
                    {!Array.from({ length: 15 }, (_, i) => i + 1).some(i => 
                      provider[`Other Provider Identifier_${i}`] && 
                      provider[`Other Provider Identifier_${i}`] !== "N/A"
                    ) && (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                          No additional identifiers available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Full Details Toggle */}
            {/* <div className="mt-6">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {expanded ? 'Hide' : 'Show'} Full Details
                {expanded ? (
                  <ChevronLeft className="w-4 h-4 ml-1 transform rotate-90" />
                ) : (
                  <ChevronLeft className="w-4 h-4 ml-1 transform -rotate-90" />
                )}
              </button>

              {expanded && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Complete Provider Data</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(provider).map(([key, value]) => {
                        if (!value || value === "N/A") return null;
                        return (
                          <tr key={key} className="hover:bg-gray-50">
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {key}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 break-all">
                              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div> */}
            </div>
          </div>

          {/* Footer */}
          {/* <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                NPI Registry Data • Last updated: {new Date().toLocaleDateString()}
              </div>
              <a
                href={`https://npiregistry.cms.hhs.gov/provider-view/${provider.NPI || provider.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View on NPPES NPI Registry
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
