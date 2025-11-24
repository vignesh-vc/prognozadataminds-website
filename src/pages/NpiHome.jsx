import React from "react";
import { Helmet } from "react-helmet";
import NpiHero from "../components/NpiHero";
import NpiSearchForm from "../components/Searchform";
import About from "../components/NpiAbout";
import { useNavigate } from "react-router-dom";
import NpiFooter from "../components/NpiFooter";

export default function NpiHome() {
  const navigate = useNavigate();

  const handleSearch = async (formData) => {
    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value && value.trim() !== "")
    );
    navigate("/search", { state: { searchParams: cleanedData } });
  };

  const canonicalUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://www.prognozadataminds.com/npi";

  const socialImage = "https://www.prognozadataminds.com/assets/npi-preview.png";

  return (
    <>
      <Helmet>
     
        <title>
          NPI Lookup, Provider Directory, NPI Verification & Taxonomy Search | Prognoza Dataminds
        </title>

     
        <meta
          name="description"
          content="Free NPI Lookup & NPI verification. Search healthcare providers, physicians, taxonomy codes, specialties, practice locations & directory data. Accurate NPI registry powered by Prognoza Dataminds."
        />

  
        <meta
          name="keywords"
          content="NPI lookup, NPI verification, provider directory, NPI search, NPI registry,
          healthcare provider search, physician lookup, taxonomy codes, healthcare data,
          NPI API, provider database, medical provider NPI, doctor NPI search,
          Prognoza Dataminds, healthcare analytics, provider identity verification,
          physician directory, healthcare taxonomy, specialty codes, NPI 1, NPI 2,
          KOL Healthcare, HCP profiling, physician data analytics, healthcare insights"
        />

        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />

        {/* =============== 📘 OPEN GRAPH =============== */}
        <meta
          property="og:title"
          content="NPI Lookup, Provider Directory & NPI Verification | Prognoza Dataminds"
        />
        <meta
          property="og:description"
          content="Search and verify NPI records, explore taxonomy details, and access accurate provider profiles with Prognoza Dataminds’ advanced NPI search engine."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={socialImage} />

        {/* =============== 🐦 TWITTER =============== */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialImage} />
        <meta
          name="twitter:title"
          content="NPI Lookup, Taxonomy Search & Provider Directory"
        />
        <meta
          name="twitter:description"
          content="Find verified NPI information for healthcare providers, physicians & organizations."
        />

        {/* ====================================================================== */}
        {/* ⚡ ENHANCED WEBPAGE STRUCTURED DATA */}
        {/* ====================================================================== */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "NPI Lookup & Provider Directory",
            description:
              "Search and verify National Provider Identifier (NPI) records and explore trusted healthcare provider profiles.",
            url: canonicalUrl,
            isPartOf: {
              "@type": "WebSite",
              url: "https://www.prognozadataminds.com",
            },
            about: [
              "NPI Lookup",
              "NPI Verification",
              "Provider Directory",
              "Healthcare Provider Data",
              "Physician Data Insights",
              "Healthcare Taxonomy Codes"
            ],
            publisher: {
              "@type": "Organization",
              name: "Prognoza Dataminds",
              url: "https://www.prognozadataminds.com",
              logo: {
                "@type": "ImageObject",
                url: "https://www.prognozadataminds.com/logo192.png",
              },
            },
          })}
        </script>

        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "NPI Lookup Service",
            provider: {
              "@type": "Organization",
              name: "Prognoza Dataminds",
            },
            description:
              "NPI number search, NPI verification, provider details, taxonomy lookup, and healthcare identity validation.",
            areaServed: "US",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              description: "Free NPI search & provider directory access",
            },
          })}
        </script>

       
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: "NPI Provider Dataset",
            description:
              "Healthcare provider dataset including NPI information, taxonomy, specialties and practice locations.",
            creator: {
              "@type": "Organization",
              name: "Prognoza Dataminds",
            },
            license: "https://www.prognozadataminds.com",
            url: canonicalUrl,
            keywords: [
              "NPI dataset",
              "provider directory",
              "physician database",
              "healthcare providers",
              "taxonomy codes",
            ],
          })}
        </script>

     
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is an NPI number?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "An NPI (National Provider Identifier) is a unique 10-digit ID issued to healthcare providers in the United States.",
                },
              },
              {
                "@type": "Question",
                name: "How do I verify an NPI?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Use Prognoza Dataminds’ NPI Lookup tool to verify provider identity, taxonomy codes, and practice information instantly.",
                },
              },
              {
                "@type": "Question",
                name: "Is the NPI Lookup free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we offer free NPI search & provider verification.",
                },
              },
            ],
          })}
        </script>

       <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.prognozadataminds.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "NPI Lookup",
                item: canonicalUrl,
              },
            ],
          })}
        </script>
      </Helmet>

      <NpiHero />
      <NpiSearchForm onSearch={handleSearch} />
      <About />
      <NpiFooter />
    </>
  );
}
