import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  User,
  MapPin,
  Phone,
  FileText,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Map,
} from "lucide-react";
import { calculateProviderMatchPercentage } from "../utils/nameMatching";

const SearchResults = ({
  results,
  currentPage,
  totalPages,
  onPageChange,
  onClear = () => { },
  searchFirstName = "",
  searchLastName = ""
}) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(() => new Set());

  // Default collapse all results so details are hidden by default
  useEffect(() => {
    // Start with empty set - all details hidden
    setExpanded(new Set());
  }, [results]);

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
        <p className="text-gray-600 mb-4">No results found. Please refine your search.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  const handleViewDetails = (npi) => {
    // Save current search results to sessionStorage
    const searchState = {
      results,
      searchParams: Object.fromEntries(new URLSearchParams(window.location.search).entries()),
      currentPage,
      totalPages,
      totalResults: results.length
    };
    sessionStorage.setItem('searchState', JSON.stringify(searchState));
    
    // Navigate to details page
    navigate(`/result/${npi}`);
  };

  // Function to generate Google Maps URL from address components
  const generateMapUrl = (addressComponents) => {
    const address = addressComponents
      .filter(v => v && String(v).trim() !== "")
      .join(", ");

    if (address && address !== "Address not available") {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    }
    return null;
  };

  const toggleExpanded = (npi) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(npi)) next.delete(npi);
      else next.add(npi);
      return next;
    });
  };

  // Log the first result for debugging
  if (results.length > 0) {
    console.log('First result data in Searchresults:', {
      NPI: results[0].NPI,
      Specializations: results[0].Specializations,
      Classifications: results[0].Classifications,
      'Healthcare Provider Taxonomy_1': results[0]['Healthcare Provider Taxonomy_1'],
      'Healthcare Provider Taxonomy Code_1': results[0]['Healthcare Provider Taxonomy Code_1']
    });
  }

  return (
    <div className="space-y-6">
      {results.map((result, index) => {
        // Calculate match percentage for this result
        const matchPercentage = calculateProviderMatchPercentage(
          result,
          searchFirstName,
          searchLastName
        );

        return (
          <div
            key={index}
            className="group bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 hover:border-gray-300"
          >
            
            {/* Header */}
            <div className="overflow-x-auto">
              <table className="min-w-full  bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NPI</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                     
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City/State</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taxonomy</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classification</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {console.log('Result object keys:', Object.keys(result))}
                  <tr>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        {String(result["Entity Type Code"]) === "1" 
                          ? <User className="h-4 w-4 mr-2" /> 
                          : <Building2 className="h-4 w-4 mr-2" />
                        }
                        {result.NPI}
                      </div>
                    </td>
                   
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {result["Provider Organization Name (Legal Business Name)"] || "—"}
                    </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                      {(result["provider_full_name"] && result["provider_full_name"] !== "NaN NaN NaN") ? result["provider_full_name"] : (result["authorized_full_name"] || "N/A")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {result["Provider Business Mailing Address City Name"] || ""}
                      {result["Provider Business Mailing Address City Name"] && result["Provider Business Mailing Address State Name"] ? ", " : ""}
                      {result["Provider Business Mailing Address State Name"] || "—"}
                    </td>
                  

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {result["Healthcare Provider Taxonomy Code_1"] || "No taxonomy available"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-2">

                        {result.Specializations && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium  text-emerald-800">
                            {result.Specializations}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-2">
                        {result.Classifications && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium  text-amber-800">
                            {result.Classifications}
                          </span>
                        )}

                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(result.NPI)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-xs sm:text-sm"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View
                      </button>
                      {/* <button
                  onClick={() => toggleExpanded(result.NPI)}
                  className="hidden sm:inline-flex text-base sm:text-lg text-secondary hover:opacity-80 font-medium"
                >
                  {expanded.has(result.NPI) ? "Hide Full Details" : "Show Full Details"}
                </button> */}
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base sm:text-lg text-gray-700">
              {/* <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-500" />
                <span>{String(result["Entity Type Code"]) === "1" ? "Individual" : "Organization"}</span>
              </div> */}

              {/* {result["Provider Sex Code"] && result["Provider Sex Code"] !== "N/A" && (
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span>Gender: {result["Provider Sex Code"]}</span>
                </div>
              )} */}

              <div className="flex items-center gap-2 md:col-span-2">
                {/* <FileText className="w-5 h-5 text-gray-500" /> */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* <span className="text-gray-800">
                    {result["Healthcare Provider Taxonomy Code_1"] || "No taxonomy available"}
                  </span> */}
                  {/* {result.Classification && (
                    <span className="inline-flex items-center rounded-md bg-amber-100 text-amber-900 px-2 py-0.5 text-base sm:text-lg font-medium">
                     Classification: {result.Classification}
                    </span>
                  )}
                  {result.Specialization && (
                    <span className="inline-flex items-center rounded-md bg-emerald-100 text-emerald-900 px-2 py-0.5 text-base sm:text-lg font-medium">
                      Specialization:{result.Specialization}
                    </span>
                  )} */}
                </div>
                {/* {(result["Last Update Date"] && result["Last Update Date"] !== "N/A") ||
                 (result["Certification Date"] && result["Certification Date"] !== "N/A") ? (
                  <div className="mt-2 flex items-center gap-4 text-base sm:text-lg text-gray-700">
                    {result["Last Update Date"] && result["Last Update Date"] !== "N/A" && (
                      <span>Last Updated: {result["Last Update Date"]}</span>
                    )}
                    {result["Certification Date"] && result["Certification Date"] !== "N/A" && (
                      <span>Certification Date: {result["Certification Date"]}</span>
                    )}
                  </div>
                ) : null} */}
              </div>

              {/* Mailing Address */}
              {/* {(() => {
                const mailingAddress = [
                  result["Provider First Line Business Mailing Address"],
                  result["Provider Second Line Business Mailing Address"],
                  result["Provider Business Mailing Address City Name"],
                  result["Provider Business Mailing Address State Name"],
                  result["Provider Business Mailing Address Postal Code"]
                ].filter(v => v && String(v).trim() !== "" && v !== "N/A");

                return mailingAddress.length > 0 && (
                  <div className="col-span-1 bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <span className="font-semibold">Mailing Address</span>
                      </div>
                      {(() => {
                        const mapUrl = generateMapUrl([
                          result["Provider First Line Business Mailing Address"],
                          result["Provider Second Line Business Mailing Address"],
                          result["Provider Business Mailing Address City Name"],
                          result["Provider Business Mailing Address State Name"],
                          result["Provider Business Mailing Address Postal Code"]
                        ]);

                        return mapUrl ? (
                          <a
                            href={mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-base sm:text-lg font-medium transition-colors"
                            title="View on Google Maps"
                          >
                            <Map className="w-3 h-3" />
                            Map
                          </a>
                        ) : null;
                      })()}
                    </div>
                    <div className="text-base sm:text-lg text-gray-800">
                      {mailingAddress.join(", ") || "Address not available"}
                    </div>

                    {(result["Provider Business Mailing Address Telephone Number"] &&
                      result["Provider Business Mailing Address Telephone Number"] !== "N/A") ||
                     (result["Provider Business Mailing Address Fax Number"] &&
                      result["Provider Business Mailing Address Fax Number"] !== "N/A") ? (
                      <div className="mt-2 flex items-center gap-2 text-base sm:text-lg text-gray-700">
                        <Phone className="w-4 h-4 text-gray-500" />
                        {result["Provider Business Mailing Address Telephone Number"] &&
                         result["Provider Business Mailing Address Telephone Number"] !== "N/A" && (
                          <span>Tel: {result["Provider Business Mailing Address Telephone Number"]}</span>
                        )}
                        {result["Provider Business Mailing Address Fax Number"] &&
                         result["Provider Business Mailing Address Fax Number"] !== "N/A" && (
                          <span className="ml-3">
                            Fax: {result["Provider Business Mailing Address Fax Number"]}
                          </span>
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })()} */}

              {/* Practice Location Address */}
              {/* {(() => {
                const practiceAddress = [
                  result["Provider First Line Business Practice Location Address"],
                  result["Provider Second Line Business Practice Location Address"],
                  result["Provider Business Practice Location Address City Name"],
                  result["Provider Business Practice Location Address State Name"],
                  result["Provider Business Practice Location Address Postal Code"]
                ].filter(v => v && String(v).trim() !== "" && v !== "N/A");

                return practiceAddress.length > 0 && (
                  <div className="col-span-1 bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <span className="font-semibold">Practice Location Address</span>
                      </div>
                      {(() => {
                        const mapUrl = generateMapUrl([
                          result["Provider First Line Business Practice Location Address"],
                          result["Provider Second Line Business Practice Location Address"],
                          result["Provider Business Practice Location Address City Name"],
                          result["Provider Business Practice Location Address State Name"],
                          result["Provider Business Practice Location Address Postal Code"]
                        ]);

                        return mapUrl ? (
                          <a
                            href={mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-base sm:text-lg font-medium transition-colors"
                            title="View on Google Maps"
                          >
                            <Map className="w-3 h-3" />
                            Map
                          </a>
                        ) : null;
                      })()}
                    </div>
                    <div className="text-base sm:text-lg text-gray-800">
                      {practiceAddress.join(", ") || "Address not available"}
                    </div>

                    {(result["Provider Business Practice Location Address Telephone Number"] &&
                      result["Provider Business Practice Location Address Telephone Number"] !== "N/A") ||
                     (result["Provider Business Practice Location Address Fax Number"] &&
                      result["Provider Business Practice Location Address Fax Number"] !== "N/A") ? (
                      <div className="mt-2 flex items-center gap-2 text-base sm:text-lg text-gray-700">
                        <Phone className="w-4 h-4 text-gray-500" />
                        {result["Provider Business Practice Location Address Telephone Number"] &&
                         result["Provider Business Practice Location Address Telephone Number"] !== "N/A" && (
                          <span>
                            Tel: {result["Provider Business Practice Location Address Telephone Number"]}
                          </span>
                        )}
                        {result["Provider Business Practice Location Address Fax Number"] &&
                         result["Provider Business Practice Location Address Fax Number"] !== "N/A" && (
                          <span className="ml-3">
                            Fax: {result["Provider Business Practice Location Address Fax Number"]}
                          </span>
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })()} */}

              {/* License Information */}
              {/* {Array.from({ length: 15 }, (_, i) => i + 1).some(i => result[`Provider License Number_${i}`]) && (
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 md:col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <span className="font-semibold">License Information</span>
                  </div>
                  <div className="text-base sm:text-lg text-gray-800">
                    {Array.from({ length: 15 }, (_, i) => i + 1)
                      .map((i) => {
                        const license = result[`Provider License Number_${i}`];
                        const state = result[`Provider License Number State Code_${i}`];
                        if (license && license !== "N/A") {
                          return `License ${i}: ${license} (State: ${state || "N/A"})`;
                        }
                        return null;
                      })
                      .filter(Boolean)
                      .join(", ") || "No licenses available"}
                  </div>
                </div>
              )} */}

              {/* Other Identifiers Table */}
              {/* {Array.from({ length: 15 }, (_, i) => i + 1).some(i => {
                const identifier = result[`Other Provider Identifier_${i}`];
                const typeCode = result[`Other Provider Identifier Type Code_${i}`];
                const state = result[`Other Provider Identifier State_${i}`];
                const issuer = result[`Other Provider Identifier Issuer_${i}`];
                return (identifier && identifier !== "N/A") ||
                       (typeCode && typeCode !== "N/A") ||
                       (state && state !== "N/A") ||
                       (issuer && issuer !== "N/A");
              }) && (
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 md:col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <span className="font-semibold">Other Identifiers</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-base sm:text-lg text-gray-800 border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Identifier</th>
                          <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Type Code</th>
                          <th className="border border-gray-300 px-3 py-2 text-left font-semibold">State</th>
                          <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Issuer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 15 }, (_, i) => i + 1).map((i) => {
                          const identifier = result[`Other Provider Identifier_${i}`];
                          const typeCode = result[`Other Provider Identifier Type Code_${i}`];
                          const state = result[`Other Provider Identifier State_${i}`];
                          const issuer = result[`Other Provider Identifier Issuer_${i}`];

                          // Only show rows that have at least one non-N/A value
                          if ((identifier && identifier !== "N/A") ||
                              (typeCode && typeCode !== "N/A") ||
                              (state && state !== "N/A") ||
                              (issuer && issuer !== "N/A")) {
                            return (
                              <tr key={i} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-3 py-2">{identifier && identifier !== "N/A" ? identifier : ""}</td>
                                <td className="border border-gray-300 px-3 py-2">{typeCode && typeCode !== "N/A" ? typeCode : ""}</td>
                                <td className="border border-gray-300 px-3 py-2">{state && state !== "N/A" ? state : ""}</td>
                                <td className="border border-gray-300 px-3 py-2">{issuer && issuer !== "N/A" ? issuer : ""}</td>
                              </tr>
                            );
                          }
                          return null;
                        }).filter(Boolean).slice(0, 5) || (
                          <tr>
                            <td colSpan="4" className="border border-gray-300 px-3 py-2 text-center text-gray-500">
                              No other provider identifiers available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )} */}
            </div>

            {/* Expand/Collapse Full Data */}
            <div className="mt-4 border-t pt-4">
              <button
                onClick={() => toggleExpanded(result.NPI)}
                className="text-secondary hover:opacity-80 text-base sm:text-lg font-medium sm:hidden"
              >
                {expanded.has(result.NPI) ? "show Full Details" : "Hide Full Details"}
              </button>

              {expanded.has(result.NPI) && (
                <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base sm:text-lg">
                    {Object.entries(result).map(([key, value]) => {
                      const display = (val) => {
                        if (val === null || val === undefined || val === "" || val === "N/A") return null;
                        if (typeof val === "object") {
                          try {
                            return JSON.stringify(val);
                          } catch {
                            return "[object]";
                          }
                        }
                        return String(val);
                      };
                      return display(value) ? (
                        <div key={key} className="flex justify-between gap-4">
                          <span className="font-semibold text-gray-700 break-words">{key}</span>
                          <span className="text-gray-800 break-words">{display(value)}</span>
                        </div>
                      ) : null;
                    }).filter(Boolean)}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
            }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Prev
        </button>

        <span className="text-gray-700 text-base sm:text-lg">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
            }`}
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
