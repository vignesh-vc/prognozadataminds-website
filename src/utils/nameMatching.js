// Utility functions for name matching and percentage calculation

// Calculate similarity percentage between two strings
export const calculateSimilarityPercentage = (searchTerm, targetString) => {
  if (!searchTerm || !targetString) return 0;

  const search = searchTerm.toLowerCase().trim();
  const target = targetString.toLowerCase().trim();

  // Exact match gets 100%
  if (search === target) return 100;

  // Check if search term is contained in target
  if (target.includes(search)) {
    // Longer matches get higher percentage
    const ratio = search.length / target.length;
    return Math.round(70 + (ratio * 30)); // 70-100% based on length ratio
  }

  // Check if target is contained in search
  if (search.includes(target)) {
    const ratio = target.length / search.length;
    return Math.round(50 + (ratio * 50)); // 50-100% based on length ratio
  }

  // Calculate Levenshtein distance for fuzzy matching
  const distance = levenshteinDistance(search, target);
  const maxLength = Math.max(search.length, target.length);
  const similarity = (maxLength - distance) / maxLength;

  return Math.round(similarity * 100);
};

// Calculate Levenshtein distance between two strings
function levenshteinDistance(str1, str2) {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

// Calculate overall match percentage for a provider based on search terms
export const calculateProviderMatchPercentage = (provider, searchFirstName, searchLastName) => {
  const matches = [];

  // Check first name matches
  if (searchFirstName && provider["Provider First Name"]) {
    matches.push(calculateSimilarityPercentage(searchFirstName, provider["Provider First Name"]));
  }
  if (searchFirstName && provider["Authorized Official First Name"]) {
    matches.push(calculateSimilarityPercentage(searchFirstName, provider["Authorized Official First Name"]));
  }

  // Check last name matches
  if (searchLastName && provider["Provider Last Name (Legal Name)"]) {
    matches.push(calculateSimilarityPercentage(searchLastName, provider["Provider Last Name (Legal Name)"]));
  }
  if (searchLastName && provider["Authorized Official Last Name"]) {
    matches.push(calculateSimilarityPercentage(searchLastName, provider["Authorized Official Last Name"]));
  }

  // Check organization name matches
  if (searchFirstName && searchLastName && provider["Provider Organization Name (Legal Business Name)"]) {
    const fullName = `${searchFirstName} ${searchLastName}`.trim();
    matches.push(calculateSimilarityPercentage(fullName, provider["Provider Organization Name (Legal Business Name)"]));
  }

  // Return the highest match percentage
  return matches.length > 0 ? Math.max(...matches) : 0;
};
