import { useEffect, useMemo, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchResults from "../components/Searchresults";
import { ChevronLeft } from "lucide-react";
import { useSearch } from "../contexts/SearchContext";

export default function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchCache, updateSearchCache } = useSearch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedText, setAdvancedText] = useState("");
  const [searchParams, setSearchParams] = useState(searchCache.searchParams || {});
  const [results, setResults] = useState(searchCache.results || []);
  const [totalResults, setTotalResults] = useState(searchCache.totalResults || 0);
  const [currentPage, setCurrentPage] = useState(searchCache.currentPage || 1);
  const [totalPages, setTotalPages] = useState(searchCache.totalPages || 1);
  const initialLoad = useRef(true);

  const parsedCustomFilters = useMemo(() => {
    const out = {};
    if (!advancedText) return out;
    const lines = advancedText.split(/\r?\n/);
    for (const raw of lines) {
      const line = raw.trim();
      if (!line || !line.includes("=")) continue;
      const idx = line.indexOf("=");
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      if (!key || value === "") continue;
      out[key] = value;
    }
    return out;
  }, [advancedText]);

  useEffect(() => {
    // Try to restore from sessionStorage first
    const savedSearchState = sessionStorage.getItem('searchState');
    
    if (savedSearchState) {
      try {
        const { results: savedResults, searchParams, currentPage, totalPages, totalResults } = JSON.parse(savedSearchState);
        
        // Only use saved state if we have results and the URL params match
        const urlParams = Object.fromEntries(new URLSearchParams(location.search).entries());
        const paramsMatch = Object.entries(searchParams).every(([key, value]) => urlParams[key] === value);
        
        if (savedResults?.length > 0 && paramsMatch) {
          setResults(savedResults);
          setSearchParams(searchParams);
          setCurrentPage(currentPage);
          setTotalPages(totalPages);
          setTotalResults(totalResults);
          
          // Update search cache
          updateSearchCache({
            results: savedResults,
            searchParams,
            currentPage,
            totalPages,
            totalResults
          });
          
          // Clear the saved state to prevent reuse
          sessionStorage.removeItem('searchState');
          return;
        }
      } catch (e) {
        console.error('Failed to parse saved search state', e);
      }
    }

    // Normal search flow if no valid saved state
    const params = location.state?.searchParams || {};
    const urlParams = new URLSearchParams(location.search);

    const mergedParams = { ...params };
    for (let [key, value] of urlParams.entries()) {
      if (value) mergedParams[key] = value;
    }

    const cleanedParams = Object.fromEntries(
      Object.entries(mergedParams).filter(
        ([_, value]) => value !== undefined && value !== "" && value !== null
      )
    );

    setSearchParams(cleanedParams);

    // Check if we have cached results for these exact params
    const isSameSearch = Object.keys(cleanedParams).every(
      key => searchCache.searchParams[key] === cleanedParams[key]
    ) && Object.keys(searchCache.searchParams).length === Object.keys(cleanedParams).length;

    if (isSameSearch && searchCache.results.length > 0 && initialLoad.current) {
      // Use cached results
      setResults(searchCache.results);
      setTotalResults(searchCache.totalResults);
      setCurrentPage(searchCache.currentPage);
      setTotalPages(searchCache.totalPages);
      initialLoad.current = false;
    } else if (Object.keys(cleanedParams).length > 0) {
      // Perform new search
      performSearch(cleanedParams, 1);
      initialLoad.current = false;
    }
  }, [location]);

  const performSearch = async (params, page = 1) => {
    try {
      setLoading(true);
      setError("");
      
      // Update search params in state
      setSearchParams(params);
      setCurrentPage(page);

      const searchData = {
        ...params,
        page: 10,
        limit: 1000,
        ...(Object.keys(parsedCustomFilters).length > 0
          ? { customFilters: parsedCustomFilters }
          : {}),
      };

      // --- Primary search request ---
      const response = await axios.post(
        "https://api.prognozadataminds.com/api/npi/search",
        searchData
      );
      const data = response.data;

      // --- If no results and authorizedOfficial search used, fallback to provider ---
      if (
        (!data.results || data.results.length === 0) &&
        (params.authorizedOfficialFirst || params.authorizedOfficialLast)
      ) {
        console.log("No results with authorized official — trying provider search...");

        const fallbackResponse = await axios.post(
          "https://api.prognozadataminds.com/api/npi/search",
          {
            providerFirstName: params.authorizedOfficialFirst,
            providerLastLegalName: params.authorizedOfficialLast,
            page: page,
            limit: 1000,
          }
        );

        const fallbackData = fallbackResponse.data;
        
        // Limit to first 50 results
        const limitedResults = (fallbackData.results || []).slice(0, 1000);
        const totalPages = Math.ceil(limitedResults.length / 1000);
        
        setResults(limitedResults);
        setTotalResults(limitedResults.length);
        setTotalPages(totalPages);
        
        // Update cache
        updateSearchCache({
          results: limitedResults,
          searchParams: params,
          totalResults: limitedResults.length,
          currentPage: page,
          totalPages: totalPages
        });
      } else {
        // --- Normal results ---
        // Limit to first 50 results
        const limitedResults = (data.results || []).slice(0, 1000);
        setResults(limitedResults);
        setTotalResults(limitedResults.length);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error performing search");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = (formData) => {
    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value && value.trim() !== "")
    );

    // Clear any existing cache for new searches
    updateSearchCache({
      results: [],
      searchParams: {},
      totalResults: 0,
      currentPage: 1,
      totalPages: 1
    });

    setSearchParams(cleanedData);
    performSearch(cleanedData, 1);

    const searchParams = new URLSearchParams(cleanedData);
    navigate(`/search?${searchParams.toString()}`, { replace: true });
  };

  const handleClear = () => {
    // Clear the search cache
    updateSearchCache({
      results: [],
      searchParams: {},
      totalResults: 0,
      currentPage: 1,
      totalPages: 1
    });
    
    // Reset local state
    setResults([]);
    setSearchParams({});
    setError("");
    setTotalResults(0);
    setCurrentPage(1);
    setTotalPages(1);
    
    // Navigate to clean search
    navigate("/search", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6 flex pt-[100px] items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <div className="text-right">
            <h1 className="text-lg font-semibold text-gray-900">
              Search Results
            </h1>
            <div className="mb-4 text-sm text-gray-600">
              {loading ? (
                <span>Searching... <span className="animate-pulse">🔍</span></span>
              ) : (
                <span>
                  Found {results.length} result{results.length !== 1 ? 's' : ''} 
                  {results.length > 0 && '(limited to first 1000 matches)'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">

        {totalResults > 0 && (
          <div className="mb-6 text-gray-600">
            {/* <p>
              Found {totalResults} result{totalResults !== 1 ? "s" : ""}
            </p> */}
<p>The NPI Database was last updated on Nov 10, 2025 with 9,236,343 records</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-600">Searching...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <SearchResults
            results={results}
            onClear={handleClear}
            searchFirstName={
              searchParams.authorizedOfficialFirst ||
              searchParams.firstName ||
              ""
            }
            searchLastName={
              searchParams.authorizedOfficialLast ||
              searchParams.lastName ||
              ""
            }
          />
        )}
      </div>
    </div>
  );
}
