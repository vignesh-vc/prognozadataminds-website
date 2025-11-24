import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NpiHome from "./pages/NpiHome";
import NpiSearchResultsPage from "./pages/SearchResultsPage"
import NpiResult from "./pages/Result"
import { SearchProvider } from "./contexts/SearchContext";
const App = () => {
  return (
    <SearchProvider>
<div className="App flex flex-col min-h-screen">

      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path='/npi' element={<NpiHome />}></Route>
          <Route path='/search' element={<NpiSearchResultsPage />}></Route>
          <Route path='/result/:npi' element={<NpiResult />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
    </SearchProvider>
    
  );
};

export default App;
